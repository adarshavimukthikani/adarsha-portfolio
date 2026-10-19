import { access, readFile, stat, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { certificates } from '../src/data/certificates.js';
import { articles } from '../src/data/articles.js';
import { profile } from '../src/data/profile.js';
import { brands } from '../src/data/brands.js';

for (const item of certificates) {
  await access(`public/images/certificates/${item.image}`);
  if (item.badgeImage) await access(`public/images/certificates/${item.badgeImage}`);
  assert.ok(item.title && item.issuer && item.category);
}
const feed = await readFile('docs/medium-feed.xml','utf8');
const freshFeed = await readFile('docs/source/medium-feed-v3.xml', 'utf8');
for (const item of articles) {
  await access(`public/images/articles/${item.image}`);
  assert.ok(feed.includes(item.url), `Article URL missing from the author’s feed: ${item.title}`);
  assert.ok(freshFeed.includes(item.url), `Article URL missing from the current official feed: ${item.title}`);
  assert.equal(new URL(item.url).hostname, 'medium.com');
  assert.ok(!item.url.endsWith('#'));
}
assert.equal(new Set(certificates.map(x=>x.id)).size, certificates.length);
assert.equal(new Set(articles.map(x=>x.id)).size, articles.length);
assert.equal(profile.email, 'adarshavimukthikani@gmail.com');
for (const file of ['portrait.webp','illustrated.webp']) await access(`public/images/profile/${file}`);
for (const brand of Object.values(brands)) await access(`public/images/logos/${brand.image}`);
await access('public/images/social-preview.webp');
assert.ok((await stat('public/images/profile/portrait.webp')).size < 200000);
const pageFiles = await readdir('src/pages');
for (const file of pageFiles) {
  const source = await readFile(`src/pages/${file}`, 'utf8');
  assert.ok(!/images\/campus|Circle of Accounting|editorial-v3/.test(source), `Retired content in ${file}`);
  if (file !== 'Home.jsx') assert.ok(!source.includes('profile/portrait.webp'), `Original photo repeated on ${file}`);
}
assert.equal(pageFiles.length, 9, 'Eight individual pages and one 404 are required.');
assert.deepEqual((await readdir('public/images/profile')).sort(), ['illustrated.webp', 'portrait.webp']);
assert.ok(!(await readdir('public/images')).includes('campus'));
console.log(`Content verified: ${certificates.length} distinct credentials, ${articles.length} article URLs matched to the public author feed, and all referenced local imagery.`);
