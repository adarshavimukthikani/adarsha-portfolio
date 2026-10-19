# V3 illustrated portrait refinement

Date: 2026-10-18 (Asia/Colombo)

## Purpose and source

Refine the existing illustrated About portrait by softening the electric-blue painted oval to powder blue and gently muting the lime circle, while preserving the recognizable person, navy top, cream paper ground, and gouache detail.

- Edit target: `public/images/profile/editorial.webp` (880 × 1100).
- Original edit target remains unchanged.
- Generation mode: built-in `image_gen.imagegen`, identity-preserve edit.
- Tool output source: `C:/Users/ASUS/.codex/generated_images/01a14ea3-2825-7441-8700-4944ab8b2d72/exec-5d9b8635-0c39-470b-93a9-6860ee367dd3.png`.
- Saved generated master: `docs/source/editorial-v3.png`, 1122 × 1402, 2,626,756 bytes.
- Production asset: `public/images/profile/editorial-v3.webp`, 880 × 1100, 175,832 bytes.
- Web conversion: Sharp, resize width 880 with preserved aspect ratio, WebP quality 88. No retouching beyond the built-in generated edit.
- No CLI or direct API generation was used.

## Final prompt

```text
Use case: identity-preserve
Asset type: illustrated portrait for a personal portfolio About page.
Input image: The provided local editorial.webp is the edit target. Preserve this exact portrait.
Primary request: Change ONLY the large electric-blue painted background oval behind the person to soft muted powder blue, approximately #C2D5E2, retaining its original brush texture, irregular oval silhouette, position, and size. Gently mute the existing lime circle to a subtle pale yellow-green if needed. Keep the cream paper background and all painted details.
Invariants: preserve the exact recognizable facial identity, all facial proportions and features, brown skin tone, eyes, eyebrows, nose, lips, neutral expression, head angle, pose, long dark wavy hair, hairline, navy top, cropping, composition, gouache/paint texture and fine portrait detail. Do not reinterpret or beautify the face. The person and clothing should remain as close to pixel-identical as possible.
Avoid: no saturated blue background; no new objects; no text; no logos; no graduation cap, certificate, diploma or qualification imagery; no decorative additions; no altered hairstyle, expression or pose. Output the same portrait orientation with no border.
```

## Visual inspection

Inspected the original, generated master, and final optimized WebP. The face remains clearly recognizable, with the same expression, pose, dark wavy hair, brown skin tone, and navy top. Cream paper texture and gouache brush detail remain. The background oval is now muted powder blue, and the small circle is pale yellow-green. No added text, objects, or qualification imagery is present.

The edit is generative, so individual brush details and subtle facial rendering are not pixel-identical. No obvious identity drift or saturated-blue background was observed. The target hex was an approximate palette request rather than an exact flat fill.

