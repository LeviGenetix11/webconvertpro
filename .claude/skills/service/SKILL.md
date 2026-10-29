---
name: service
description: Generate a new service x city landing page for WebConvertPro (the "zipper" strategy — e.g. web design ajax). Picks an unused commercial-intent local keyword, builds the page from the matching core service page, wires it into the locations and services hubs, and publishes it. Use when the user types /service or asks for a new local/city landing page.
---

# `/service` — Service x city landing page generator

Creates a production-ready local-SEO landing page end-to-end. Output: a new route at `src/<service>-<city>/index.njk`, updated links from `src/locations/index.njk` and the matching core service page, and an updated `content/seo/used-keywords.md`. Must pass `npm run build` before reporting done.

**Read `references/seo.md` → "The zipper: service × city" and "WebConvertPro is service-area, not multi-branch" before starting. This is the single most important constraint on this skill: one real business, one real address, many cities. Never invent a per-city phone number, address or "est. in <city>" story.**

---

## Inputs
- No args → pick the highest-value unused service×city combination from `content/seo/keyword-map.md` → "Local city pages" list, crossed with the 4 core services.
- User-supplied (e.g. `/service web design ajax` or `/service local seo whitby`) → use that exact service + city.

---

## Read these files before doing anything
1. `CLAUDE.md`.
2. `references/seo.md` — the zipper rule and the service-area NAP rule.
3. `content/seo/keyword-map.md` and `content/seo/used-keywords.md`.
4. `content/seo/seo-checklist.md`.
5. `references/voice.md`, `references/style.md`, `references/cta.md`.
6. `references/stats.md` — real numbers only; most city pages won't need many beyond pricing.
7. `src/_data/site.json` — the one real NAP (name, email, phone if set, city, areas, cities). This is the only source of truth for business identity on every city page.
8. The matching core service page under `src/` (`starter/`, `web-design/`, `google-business-profile/`, or `social-media/`) — this is the template you adapt, not rewrite from scratch.
9. `src/locations/index.njk` and `src/services/index.njk` — the hub pages you'll link the new page from.

---

## Step-by-step workflow

### 1. Pick the keyword and parse it
Format is always `<service keyword> <city>` (e.g. "web design ajax", "local seo whitby"). Map the service keyword to one of the four real services:
- web design / website design / custom website → `web-design`
- starter / fast website → `starter`
- local seo / google business profile / gbp → `google-business-profile`
- social media / content creation → `social-media`

Confirm the city is in `site.json`'s `cities` array or the broader region lists in `src/locations/index.njk`. If it's a city we don't credibly serve, stop and ask rather than guessing.

Check `content/seo/used-keywords.md` — if this exact service+city combo is already published, stop and ask (don't create a duplicate).

### 2. Build the keyword cluster
3–5 local variations, e.g. for "web design ajax": "website designer ajax", "ajax web design company", "web design company near me ajax", "custom website ajax ontario". Mark anything not in `keyword-map.md` as unverified.

### 3. Don't skip the "how many is too many" check
Re-read `references/seo.md`. If more than ~8–10 of these pages already exist, or you're about to publish more than 1–2 in the same sitting, stop and tell the user — recommend spacing them out instead of batch-publishing. This is explicitly called out as a risk (Google treats a sudden wall of near-duplicate local pages as a negative signal), not just a style preference.

### 4. Draft the page
Create `src/<service>-<city-slug>/index.njk` (e.g. `src/web-design-ajax/index.njk`), permalink `/<service>-<city-slug>/`.

Base the structure on the matching core service page — same sections, same design-system classes (`page-hero`, `.compare`/`.rows`/`.split` as used on that page, the lead form include) — but:
- **H1 and lede name the city explicitly** ("Web design for service businesses in Ajax" not a copy-pasted generic headline).
- **At least one paragraph of real local specificity**: reference the actual region (`site.json` → `areas`) this city sits in, and why a local business there benefits — not invented local landmarks or fake "we've worked with X businesses in <city>" claims. If you genuinely have no city-specific fact, keep the differentiation to "what services/cities we serve" framing rather than fabricating local colour.
- **Reuse the exact pricing and FAQ content** from the core service page — don't rewrite prices or create new FAQ answers; copy verbatim from `content/brand/offers-and-pricing.md` / the core page.
- **NAP:** use `site.json` values only. If `site.phone` is blank (it currently is), don't invent one — omit the phone line like the existing pages already do.
- **CTA:** `/contact/?service=<service-param>&city=<City>` (see `references/cta.md` for the exact query param pattern and `src/assets/js/main.js` for how `city` pre-fills the form).
- **Schema:** copy the `Service` + `BreadcrumbList` JSON-LD pattern from the core page. Set `areaServed` to `{"@type": "City", "name": "<City>"}` (in addition to, not instead of, the existing region-level `areaServed` list) and update the `url` and breadcrumb entries to the new path.

### 5. Wire it into the hubs
- In `src/locations/index.njk`, find the matching city pill (under the right region) and change its `href` from `/contact/?service=not-sure&city=<City>` to the new page's real URL (keep the `city-pill` class; drop `city-pill--main` styling decision as-is).
- Add one descriptive internal link to the new page from the matching core service page (e.g. a short "Serving Ajax, Whitby and the rest of Durham Region" line near the bottom, or extend an existing areas section) — only if it reads naturally; don't force a clunky list into a page that doesn't already have room for one.
- `src/services/index.njk` doesn't need a per-city entry (it stays at the 4-service level) — skip that one.

### 6. Log the keyword
Append to `content/seo/used-keywords.md`: primary keyword, page URL, type (`Service page (city)`), cluster. Add the combo to `content/seo/keyword-map.md`'s city list if it wasn't already there.

### 7. Verify
```
npm run build
```
- No errors. Confirm `_site/<service>-<city>/index.html` exists and is in `_site/sitemap.xml`.
- View the generated HTML: one `<h1>` containing the service+city, `Service`+`BreadcrumbList` JSON-LD present with the correct `areaServed`, CTA links carry the right `?service=` and `&city=` params, no invented NAP anywhere on the page.
- Confirm the updated `src/locations/index.njk` city pill now points at the new page and the build still succeeds.

---

## Output summary (report to user, ~10 lines)
- Service + city (+ verified volume/difficulty if checked via Semrush, otherwise "unverified").
- Cluster.
- File path + live URL.
- What was linked from the locations hub.
- Build status.
- A one-line reminder of the posting-cadence guidance if this is the 2nd+ city page created in the same session.

---

## Anti-patterns
- **Don't** invent a phone number, street address, "founded in <city>" story, or local testimonial for a city page. One real NAP, from `site.json`, everywhere.
- **Don't** copy a generic page and just swap the city name with no real differentiation — that's the thin-content pattern `references/seo.md` warns against.
- **Don't** publish more than 1–2 of these in one sitting without flagging the cadence risk to the user.
- **Don't** reuse a service+city combo already in `content/seo/used-keywords.md`.
- **Don't** skip the `Service`/`BreadcrumbList` schema.
- **Don't** change the pricing numbers — copy them verbatim from `content/brand/offers-and-pricing.md`.
- **Don't** ship without running `npm run build`.
