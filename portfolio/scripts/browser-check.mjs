import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { startStaticPreview } from './serve-static.mjs';
import { navigation } from '../src/data/navigation.js';

const port = Number(process.env.PORTFOLIO_TEST_PORT || 4174);
const base = `http://127.0.0.1:${port}`;
const artifacts = 'test-results/v4';
await mkdir(artifacts, { recursive: true });
const interactionsOnly = process.env.PORTFOLIO_INTERACTIONS_ONLY === '1';
const report = interactionsOnly ? JSON.parse(await readFile(`${artifacts}/report.json`, 'utf8')) : { routes: [], viewports: [], checks: [], accessibility: [], errors: [] };
if (interactionsOnly) { expect(report.viewports).toHaveLength(80); expect(report.errors).toEqual([]); delete report.failure; report.checks = []; report.accessibility = report.accessibility.filter(item => item.route); }
const server = await startStaticPreview(port);
let browser;
try {
  let executablePath;
  for (const candidate of [process.env.BROWSER_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean)) {
    try { await access(candidate); executablePath = candidate; break; } catch {}
  }
  browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  for (const width of (interactionsOnly ? [] : [1440, 390, 320, 768, 1024])) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: width < 700 ? 844 : 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => report.errors.push(error.message));
      page.on('console', msg => { if (msg.type() === 'error') report.errors.push(msg.text()); });
      page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) report.errors.push(`${response.status()} ${response.url()}`); });
      for (const item of navigation) {
        const slug = item.href.slice(1) || 'home';
        const response = await page.goto(base + item.href, { waitUntil: 'networkidle' });
        expect(response.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('main [data-page]')).toHaveAttribute('data-page', slug);
        await expect(page.locator('main h1')).toHaveCount(1);
        await expect(page.locator('main h1')).toBeVisible();
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        expect(await page.locator('img[src*="images/campus"], img[src*="editorial-v3"]').count()).toBe(0);
        expect(await page.locator('img[src*="profile/portrait.webp"]').count()).toBe(item.href === '/' ? 1 : 0);
        expect(await page.locator('body').innerText()).not.toMatch(/Circle of Accounting|\u2014/);
        const geometry = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, overflow: [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.width && r.right > innerWidth + 1 && getComputedStyle(el).position !== 'fixed'; }).map(el => ({ tag: el.tagName, class: el.className.baseVal ?? el.className, right: el.getBoundingClientRect().right })).slice(0, 10) }));
        report.viewports.push({ route: item.href, width, theme, ...geometry });
        if (geometry.document > width) await page.screenshot({ path: `${artifacts}/overflow-${slug}-${width}-${theme}.png`, fullPage: true, animations: 'disabled' });
        expect(geometry.document, `Horizontal overflow at ${item.href}, ${width}px, ${theme}`).toBeLessThanOrEqual(width);
        const anchors = await page.locator('a').evaluateAll(links => links.filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#' || (a.hash && a.origin === location.origin && a.hash !== '#main-content')).map(a => a.outerHTML));
        expect(anchors).toEqual([]);
        await page.evaluate(async () => { for (const img of document.images) img.loading = 'eager'; await Promise.all([...document.images].map(img => img.decode().catch(() => {}))); });
        expect(await page.locator('img').evaluateAll(images => images.filter(img => !img.complete || !img.naturalWidth).map(img => img.src))).toEqual([]);
        if ([1440, 390].includes(width)) {
          await page.screenshot({ path: `${artifacts}/${slug}-${width}-${theme}.png`, fullPage: true, animations: 'disabled' });
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
          report.accessibility.push({ route: item.href, width, theme, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
        }
        if (width === 1440 && theme === 'light') report.routes.push({ url: item.href, page: slug, title: await page.title(), heading: await page.locator('h1').innerText() });
      }
      await context.close();
      console.log(`Responsive pass: ${width}px ${theme}, all eight routes.`);
    }
  }
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', colorScheme: 'light', permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', msg => { if (msg.type() === 'error') report.errors.push(msg.text()); });
  await page.goto(base);
  for (const item of navigation.filter(item => item.href !== '/')) {
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: item.label, exact: true }).click();
    await expect(page).toHaveURL(base + item.href);
    await expect(page.locator(`main [data-page="${item.href.slice(1)}"]`)).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: item.label, exact: true })).toHaveAttribute('aria-current', 'page');
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  }
  await page.locator('header .brand').click();
  await expect(page).toHaveURL(base + '/');
  await expect(page.locator('main [data-page="home"]')).toBeVisible();
  expect(await page.locator('main .record-card').count()).toBe(0);
  await expect(page.locator('.page-preview')).toHaveCount(7);
  report.checks.push('All seven navigation destinations change URLs and content, reset scroll, and update active NavLink; logo returns Home. Home contains curated previews.');

  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Education', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Articles', exact: true }).click();
  await page.reload(); await expect(page.locator('main [data-page="articles"]')).toBeVisible();
  await page.goBack(); await expect(page.locator('main [data-page="education"]')).toBeVisible();
  await page.goForward(); await expect(page.locator('main [data-page="articles"]')).toBeVisible();
  report.checks.push('Production static rewrites serve direct routes, including Education; Articles refresh, history back/forward, and theme persistence across routes and refresh pass.');

  await page.goto(base + '/education');
  await expect(page.getByRole('heading', { name: /CIM Level 4\s*Curriculum Overview/ })).toBeVisible();
  await expect(page.locator('.module-card')).toHaveCount(7);
  await page.locator('.module-card summary').first().click();
  await expect(page.locator('.module-card details').first()).toHaveAttribute('open', '');
  await expect(page.getByText('Marketing foundations, customer behaviour, research, and tactical planning.', { exact: true })).toBeVisible();
  report.checks.push('CIM is in progress, seven published modules are labelled curriculum overview, and native module expansions work.');

  await page.goto(base + '/credentials');
  await expect(page.locator('.record-badge')).toHaveCount(3);
  await expect(page.locator('.record-certificate')).toHaveCount(5);
  await expect(page.locator('.record-learning')).toHaveCount(6);
  for (const [name, count] of [['Technology', 3], ['Business', 1], ['Marketing', 9]]) {
    await page.getByRole('button', { name, exact: true }).click();
    const unique = await page.locator('[data-certificate-id]').evaluateAll(nodes => [...new Set(nodes.map(n => n.dataset.certificateId))]);
    expect(unique).toHaveLength(count);
  }
  await page.getByRole('button', { name: 'All', exact: true }).click();
  const google = page.locator('[data-certificate-id="google-display"][data-view="certificate"]');
  await google.click(); await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText('Expired: September 21, 2026', { exact: true })).toBeVisible();
  const dialogAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  report.accessibility.push({ context: 'Credential dialog', violations: dialogAxe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
  for (let i = 0; i < 8; i++) { await page.keyboard.press('Tab'); expect(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement))).toBe(true); }
  await page.screenshot({ path: `${artifacts}/credential-dialog.png`, animations: 'disabled' });
  await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).toHaveCount(0); await expect(google).toBeFocused();
  report.checks.push('Badge / certificate / additional-learning galleries, all filters, expired Google status, full-size dialog, keyboard focus trap, Escape, and focus restoration pass.');

  await page.goto(base + '/contact');
  await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:adarshavimukthikani@gmail.com');
  await page.getByRole('button', { name: 'Copy email address', exact: true }).click();
  await expect(page.getByText('Email address copied.', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('adarshavimukthikani@gmail.com');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape'); await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /Skills/ }).click();
  await expect(page).toHaveURL(base + '/skills');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
  report.checks.push('Contact mailto and clipboard actions, accessible feedback, mobile menu, Escape dismissal, and mobile route navigation pass.');
  await page.goto(base + '/not-a-page'); await expect(page.locator('[data-page="not-found"]')).toBeVisible();
  await page.getByRole('link', { name: 'Back to Home' }).click(); await expect(page).toHaveURL(base + '/');
  expect(await page.locator('.marquee-track').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  report.checks.push('Unknown URL renders a real 404 page with a working return link; reduced-motion marquee is static.');
  await context.close();

  const motionContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', colorScheme: 'dark' });
  const motionPage = await motionContext.newPage(); await motionPage.goto(base);
  await expect(motionPage.locator('.hero-copy')).toHaveCSS('opacity', '1');
  await expect(motionPage.locator('.hero-art')).toHaveCSS('opacity', '1');
  await motionPage.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Education', exact: true }).click();
  await expect(motionPage.locator('.route-view')).toHaveCSS('opacity', '1');
  await motionPage.locator('.cim-identity').scrollIntoViewIfNeeded(); await expect(motionPage.locator('.cim-identity')).toHaveCSS('opacity', '1');
  await motionContext.close(); report.checks.push('Normal-motion hero, route entrance, and education scroll reveal finish correctly.');
  const bootstrapContext = await browser.newContext({ colorScheme: 'light' });
  const bootstrapPage = await bootstrapContext.newPage();
  await bootstrapPage.addInitScript(() => localStorage.setItem('adarsha-theme', 'dark'));
  await bootstrapPage.route('**/assets/*.js', route => route.abort());
  await bootstrapPage.goto(base + '/about', { waitUntil: 'domcontentloaded' });
  await expect(bootstrapPage.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await bootstrapPage.locator('html').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(36, 28, 24)');
  await bootstrapContext.close();
  report.checks.push('Saved theme applies in the HTML before the React bundle loads, including a dark preference with a light OS theme.');
  expect(report.errors, 'Console errors and local asset failures').toEqual([]);
  expect(report.accessibility.flatMap(item => item.violations), 'Automated accessibility violations').toEqual([]);
  await writeFile(`${artifacts}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ pages: report.routes.length, responsiveChecks: report.viewports.length, screenshots: 33, consoleErrors: report.errors.length, accessibilityViolations: 0, checks: report.checks }, null, 2));
} catch (error) {
  report.failure = String(error);
  await writeFile(`${artifacts}/report.json`, JSON.stringify(report, null, 2));
  console.error(error); process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
