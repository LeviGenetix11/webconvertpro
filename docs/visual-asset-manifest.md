# Visual asset manifest

No image-generation tool is available in this environment, so every visual that the redesign brief asked for as "realistic product photography" was built instead as a CSS/SVG composition (the same honest-placeholder approach already used for the before/after widget and the founder-video thumbnail). This doc lists each one, its real dimensions, and a ready-to-use generation prompt, so any of them can be swapped for a real photo or AI render later without touching page layout — just add the image file and point the existing `<img>`/`background-image` at it.

## How to swap one in
Each slot below is currently a CSS element, not an `<img>`. To swap in a real asset:
1. Generate or source the image at the dimensions given.
2. Export as WebP, under 200KB.
3. Replace the CSS element with an `<img>` of the same aspect ratio (or set it as a `background-image` on the existing container class) — ask Claude to do this swap once the file exists in `src/assets/img/`.

## 1. Homepage hero device visual
**Current:** CSS before/after browser-chrome widget (`.ba`) + a small CSS phone mockup (`.phone-frame`), both already interactive/functional, not a dead end.
**Would upgrade to:** a single composed photo of a laptop and phone, overlapping, both showing the same fictional contractor homepage, soft studio lighting, subtle blue/green ambient glow, shot from a slight angle.
**Dimensions:** 1600×1400px (roughly square-ish, it sits in a ~1fr column next to hero text).
**Generation prompt:** "Professional product photography of a modern laptop and smartphone overlapping on a dark navy surface, both screens showing a clean home-services contractor website homepage (headline, photo, call-to-action button), soft directional studio lighting, subtle blue and green ambient glow in the background, realistic shadows, shallow depth of field, premium tech marketing photography style, no visible brand logos other than a generic placeholder."

## 2. Branding page hero — branded merchandise flatlay
**Current:** a 6-tile CSS grid (logo mark, colour palette, business card, vehicle silhouette, apparel silhouette, device) inside a dark card, each tile a simple flat shape, not a photo.
**Would upgrade to:** the literal reference composition supplied — a pickup truck, hard hat, polo shirt, safety vest, tumbler, notebooks, business cards and letterhead, all branded with one fictional construction/contractor identity, arranged as a flat-lay or 3D product shot on a dark studio surface.
**Dimensions:** 1800×1400px.
**Generation prompt:** "Professional studio product photography flat-lay of branded merchandise for a fictional construction company called 'Summit': a pickup truck side panel with vehicle wrap graphics, a hard hat, a polo shirt, a high-vis safety vest, a steel tumbler, two notebooks, business cards and letterhead, all sharing one consistent navy-and-gold brand identity with a mountain-peak logo mark, arranged on a dark charcoal studio surface, soft overhead lighting, realistic shadows, premium brand-identity portfolio photography style (Behance-quality), no real company names or logos."

## 3. Industries-served photography (next phase, not yet built)
**Would be:** small rectangular photos for roofing, plumbing, electrical, HVAC, landscaping, renovations, cleaning — real licensed stock photography, not AI-generated, since these are meant to look authentic rather than conceptual.
**Dimensions:** 480×360px each (4:3), 7 images.
**Source plan:** `scripts/fetch-pexels.mjs` already exists and is already used for blog hero images — the same Pexels API key can pull real, licensed photography for this section when it's built (queries like "roofer on ladder", "plumber fixing pipe", "electrician panel", etc.), no generation prompt needed since these would be real photos, not renders.

## 4. Selected-work / featured portfolio imagery (next phase, not yet built)
**Would be:** large project visuals for the "Selected Work" section (roofing, plumbing, renovations, landscaping, electrical, HVAC concepts), replacing the current small CSS portfolio cards with bigger imagery.
**Dimensions:** 1200×800px each.
**Generation prompt (per industry, swap the bracketed details):** "Professional website mockup displayed on a desktop monitor, showing a homepage for a fictional [roofing/plumbing/renovation/landscaping/electrical/HVAC] company with a bold hero image, clear call-to-action, and mobile-responsive layout shown alongside on a smartphone, clean studio photography, soft shadows, neutral background, premium web design portfolio presentation style, no real company names."

## What's intentionally NOT on this list
Anything from the brief that assumes a backend (customer/admin dashboards, checkout, branding questionnaire UI, database-backed project tracking) isn't a visual-asset question — this is a static site with no server, so those aren't "images we're missing," they're features that don't exist. See the chat history / commit messages from 2026-11-26 for that distinction.
