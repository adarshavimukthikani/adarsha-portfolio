# V3 design and content audit

Implemented for the owner's critical correction brief dated October 18, 2026.

The existing project was a single-page React application with section anchors. V3 replaces that architecture with BrowserRouter, Routes, Route, and NavLink, a persistent shared layout, eight separate page components, and a 404 route. Home is a curated introduction. Dedicated pages render their own content. Theme context remains above the router, and the shared layout handles route metadata, focus, and scroll reset.

## Art direction

Inspected both supplied reference images: a website reference and the original lime/blue palette. No screen recordings are present in the available project files, so no video inspection is claimed. The reference informed hierarchy and visual depth, not copied layouts or content.

The original lime accent remains `#CDF22B`. Its blue companion is softened to powder blue `#C2D5E2`; muted blue surfaces use `#E0E9ED` in light mode and `#23343B` in dark mode. Existing cream `#F6F7F2` and green-black `#10130F` maintain continuity. Manrope, DM Sans, restrained serif emphasis, and the recognizable `adarsha.` wordmark remain. Official brand artwork is not recoloured.

Home uses the actual photograph, an editorial frame, a continuous text strip, and short linked previews. About uses the separate [refined illustrated portrait](v3-portrait.md), not the same raw photo. Skills combines original HTML/CSS brand, planning, communication, and business compositions. Those are identified as conceptual studies, not client projects. Work gives the single supported role a prominent typographic layout. Education uses authentic university and CIM identities, campus context, and native expandable curriculum cards. Credentials distinguishes badge images from document previews and smaller additional-course records. Articles has a featured cover and a varied editorial sequence. Contact offers direct actions without a simulated form.

Route entrances, image masks, staggered reveals, typography movement, and logo hover depth use Motion/CSS selectively. Motion preferences are respected. The moving strip is a doubled equal-width group for a seamless loop; it becomes static under reduced motion.

## Sources and evidence

- Personal role: **Public Relations Coordinator, Circle of Marketing, University of Ruhuna**, as corrected by the owner. No appointment dates, numeric results, employers, or personal activity claims were invented.
- Degree: existing BBA Management record, University of Ruhuna; Marketing specialization supplied by the owner. Existing 2024 academic record retained.
- CIM: current Level 4 student. The official Certificate has Marketing Impact plus selectable core/specialist modules. Displayed as a curriculum overview because the full personal module selection is unconfirmed. [Official source audit](v3-official-sources.md).
- Badges: supplied Responsible Marketing and Social Media Marketing Level 4 artwork, plus the supplied Google Ads companion badge. No credential recipient data, badge dates, or qualification completion inferred from the artwork.
- Certificates: 13 distinct existing learning records preserved. The Google Ads badge and certificate are two views of the same record, not counted as separate qualifications. EC-Council and other course records retain their actual completion/participation types. No expired credential is represented as current.
- Articles: all six existing titles and canonical URLs matched the fresh official Medium author feed. Direct automated requests receive publisher access restrictions; the current feed verifies the linked records. No publication dates or reading times were added. [Report](v3-article-links.json).
- Contact: existing verified email, phone, LinkedIn, Medium, and résumé destinations retained. Email opens the visitor's mail application, and copying reports success only after clipboard completion.

See [asset provenance](asset-provenance.json), [logo manifest](logo-assets.json), [logo sources](logo-sources.md), and the [portrait prompt and provenance](v3-portrait.md). All project assets are saved locally. Intellectual property remains with its respective owner; the campus photograph is not represented as royalty-free.

## Validation and deployment

`npm run check` validates source records, article feed references, image files, and the current brand registry. `npm run build` produces the static bundle. `npm run test:browser` checks the actual production output with its SPA fallback, all eight routes, five viewport widths and both themes, screenshot captures, accessibility, modal interaction, email actions, and navigation/refresh/history behavior. Reports and route screenshots are in `test-results/v3/`.

Netlify is the documented target; Netlify/Cloudflare, Vercel, and Apache fallback configurations are included. Local fallback testing does not assert that an external hosting provider has been deployed.

The recoverable source checkpoint is `backups/before-v3-multipage-2026-10-18.zip`.
