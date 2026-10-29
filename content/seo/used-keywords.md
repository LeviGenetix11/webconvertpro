# Used keywords

Every primary keyword that already has a page. The `/blog` and `/service` skills check this file before picking a new keyword and append to it after publishing. Keep it in sync with `keyword-map.md` — this file is the "is it taken?" check; `keyword-map.md` is the full plan.

## Active primaries

### web design for service businesses GTA
- **Page:** `/`
- **Type:** Home page
- **Secondaries:** website design services, small business web design

### fast website for small business
- **Page:** `/starter/` (renamed from `/website-in-a-day/` on 2026-10-29, redirect in `netlify.toml`)
- **Type:** Service page
- **Secondaries:** quick small business website, website live in 24 hours

### small business web design
- **Page:** `/web-design/`
- **Type:** Service page
- **Secondaries:** custom website design, website redesign services

### google business profile management
- **Page:** `/google-business-profile/`
- **Type:** Service page
- **Secondaries:** local SEO services, google maps ranking

### social media content for small business
- **Page:** `/social-media/`
- **Type:** Service page
- **Secondaries:** organic content creation, social media for contractors

### web design services (hub)
- **Page:** `/services/`
- **Type:** Service index / hub page

### website design service areas GTA (hub)
- **Page:** `/locations/`
- **Type:** Location index / hub page

### how much does a business website cost
- **Page:** `/blog/how-much-does-a-business-website-cost-ontario/`
- **Type:** Blog post
- **Secondaries:** website cost Ontario, small business website price

### contractor website design
- **Page:** `/blog/what-to-put-on-a-contractor-website-homepage/`
- **Type:** Blog post
- **Secondaries:** contractor website examples, trades website

### how to improve website conversion rate
- **Page:** `/blog/how-to-improve-website-conversion-rate/`
- **Type:** Blog post
- **Secondaries:** website not generating leads what to do (from keyword-map.md pool), how to increase website leads (invented), why is my website not converting (invented), landing page conversion rate optimization (invented), website conversion rate benchmark (invented)
- **Source:** no `keywords.csv` exists in this project (only in the unrelated `SEO_brief/` demo project); picked from `content/seo/keyword-map.md`'s keyword pool. Volume/difficulty in that file are unverified estimates — Semrush had no API units available at time of writing.

### web design ajax
- **Page:** `/web-design-ajax/`
- **Type:** Service page (city) — built from the homepage template per the user's request, not the `/web-design/` service-page template
- **Secondaries:** website designer ajax (invented), ajax web design company (invented), web design company near me ajax (invented), custom website ajax ontario (invented)
- **Source:** no `Service-keywords.csv` exists in this project (only `SEO_brief/Service-keywords.csv`, which belongs to the unrelated plumbing demo project and was not used). Picked from `content/seo/keyword-map.md` → "Local city pages" / keyword pool. Volume (50) and difficulty (Low) are unverified estimates.

---

## How to add an entry
After `/blog` or `/service` publishes a page, append a new `###` section here in the same format: primary keyword, page URL, type, and the secondary cluster used. Do this before reporting the task done — an un-logged keyword will get reused by the next run.
