# Portfolio redesign audit

Implemented October 19, 2026, Asia/Colombo, in the existing `portfolio` project.

## Workspace inventory and cleanup

| Material | Decision |
| --- | --- |
| `old details/` | Original site preserved outside the app. No legacy template code or layouts imported. Five genuine existing learning documents remain as optimized production assets. |
| `portfolio/` | The active React/Vite project, rebuilt directly. |
| `reference web/` | Two JPEGs inspected: a website reference and a lime/electric-blue colour reference. Preserved as source material. |
| `Resources/Badges/` | Three supplied badges retained. Google badge and certificate are one learning record. |
| `Resources/Cetificates/` | Actual folder spelling is `Cetificates`. Seven supplied certificate screenshots preserved; optimized local copies retained. |
| `Resources/Medium/` | Six supplied campaign images retained as optimized article covers. |
| `Resources/my image.jpeg` | Original identity reference and source of Home portrait. |
| `Resources/New Text Document.txt` | Six shortened article links, mapped to the existing verified canonical Medium URLs. |
| Campus image | Removed from `public` and all page code; retained only in the archive. |
| Old painted portraits | Removed from `public`; replaced with a new illustration. Original masters preserved. |
| Duplicate public fonts | Archived. Production now uses only bundled fontsource WOFF2 files. |
| Prior exports, output, screenshots and backups | Preserved outside the active build. New QA lives in `test-results/v4`. |
| Old components and layouts | Replaced with common, navigation, and visuals components plus the new app/layout architecture. |
| Obsolete asset preparation scripts | Moved into `docs/archive/retired-scripts` so they cannot accidentally restore retired assets during routine development. |

Recovery checkpoint: `backups/before-editorial-redesign-2026-10-19.zip`. It contains the prior source, public assets, scripts, package lock, hosting configuration and README. Source resources were not deleted.

## Reference limits and art direction

Only two reference images exist in the supplied workspace. Neither is the described named NEON / COLD BREW / SKY reference, and the portrait examples numbered 5, 6 and 7 and the final three typography examples are absent. Their exact visual content was not fabricated or claimed to have been inspected.

The owner's written correction takes precedence over the old blue image: neon `#D0F344`, cold brew `#2C211D`, sky `#C2D8E5`, cream `#F6F3EC`. Espresso is the dark-mode foundation. Lime pill highlights, oversized Manrope typography, slim rules, rounded panels, restrained serif accents and original poster compositions interpret the requested direction. Official organization, software and credential artwork is not recoloured.

Home is limited to an original portrait introduction, marquee and seven compact route previews. About, Work, Skills, Education, Credentials, Articles and Contact have different page compositions. No fabricated client work, testimonials, statistics, dates, appointments or achievements were introduced.

## Content decisions

- Role: **Public Relations Coordinator, Circle of Marketing, University of Ruhuna**, supplied explicitly by the owner. The university URL provides organizational context, not independent appointment verification. Role relevance is written as interests and developing practice, without invented deliverables or results.
- Degree: **BBA Management**, University of Ruhuna, with Marketing specialization. The existing 2024 record and 2022 A/L Commerce record were retained. The stale first-year description was not reused.
- CIM: current Level 4 student, in progress. The published curriculum is labelled **CIM Level 4 Curriculum Overview**. All seven available modules are shown without claiming they were all selected or completed. Responsible Marketing and Social Media Marketing supplied badges are linked separately.
- Credentials: 13 distinct existing learning records. Course participation and completion are kept distinct from professional certification. The Google Ads Display record carries its supplied September 21, 2026 expiry, shown as expired at the task date.
- Tools: Canva and Photoshop are supported by the original personal content. Google Ads and GA4 are supported by supplied learning documents. Familiarity is described honestly, with no invented proficiency percentages.
- Articles: six canonical URLs and titles match both saved official author feeds. Source images come from `Resources/Medium`. A live refresh attempt on October 19 was blocked by the current network environment; Medium also restricts automated retrieval. Existing feed evidence is dated October 18. This run does not claim HTTP 200 access to every live article.
- Contact: original email, phone, LinkedIn, Medium and résumé destinations retained. Email opens the visitor's mail application; copying only reports success after the clipboard API succeeds. No simulated form submission.

## New illustration

Generation mode: built-in Imagegen, identity-preserving style transfer directly from `Resources/my image.jpeg`. The original photo is used once in the visible site, on Home. The illustration is used once, on About; Skills uses graphic compositions to avoid overusing portraits.

- Saved master: `docs/source/portrait-illustration-v4.png`.
- Production asset: `public/images/profile/illustrated.webp`, 880 pixels wide, Sharp WebP quality 88.
- The master and optimized asset were visually inspected for recognizability, facial structure, hairstyle, professional presentation and palette.

Prompt:

```text
Use case: style-transfer, identity-preserve. Asset type: final professional illustrated portrait for this woman's personal marketing and branding portfolio About page. Use the supplied real photograph as the ONLY identity reference. Make a sophisticated semi-cartoon digital editorial illustration of the SAME Sri Lankan woman, recognizable facial structure, brown skin, dark almond eyes, natural nose and lips, thick eyebrows, very long dark wavy hair with the same part and hairline. Retain her calm confident expression and natural proportions. Waist-up, facing the viewer, centered, generous cream negative space above and at sides, portrait 4:5 composition. Crisp clean contour lines, carefully shaped flat colors with subtle cel shading, elegant contemporary magazine illustration, polished facial geometry, restrained detail. Dark espresso shirt, warm off-white background, single soft sky blue rounded geometric backdrop, tiny restrained neon lime graphic circle. Palette #2C211D espresso, #C2D8E5 sky, #D0F344 neon, #F6F3EA cream. Contemporary visual identity studio quality, youthful yet professional and intelligent. Not a painting: no canvas, gouache, brushwork or painterly texture. No chibi, oversized eyes, anime, cute character, toy, doll, caricature, random avatar, makeup alteration, graduation cap, badge, text, lettering, watermark or logos. Keep her identity; do not replace with another person. Only one portrait, no collage, no panels.
```

## Verification

`npm.cmd run check` checks unique genuine records, saved Medium feed matches, production image availability, original-photo exclusivity in page source and retired-asset exclusion.

`npm.cmd run build` builds the production bundle. `npm.cmd run test:browser` serves that bundle with the actual SPA fallback and tests eight routes at 320, 390, 768, 1024 and 1440 pixels in both themes. It checks page identity, one H1 per page, image decoding, no horizontal overflow, no dummy anchor navigation, original-photo placement, excluded campus assets, console errors and automated WCAG A/AA rules on desktop/mobile. It also exercises real route navigation, active links, focus and scroll reset, refresh/history, theme persistence, module expansion, credential filters and modal keyboard behaviour, mailto and clipboard, mobile navigation, 404 and reduced motion.

The screenshots were visually inspected. Mobile article intrinsic sizing, contrast in decorative type, and overlap in rotated skill layers were corrected during QA. The in-app browser preview was unavailable; local Chromium supplied the screenshots and automated checks. No external hosting deployment was requested or performed.
