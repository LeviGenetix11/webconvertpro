# Used keywords

Every primary keyword that already has a page. The `/blog` and `/service` skills check this file before picking a new keyword and append to it after publishing. Keep it in sync with `keyword-map.md` — this file is the "is it taken?" check; `keyword-map.md` is the full plan.

## Active primaries

### web design for home services businesses GTA
- **Page:** `/`
- **Type:** Home page
- **Secondaries:** website design services, small business web design
- **Note:** renamed from "web design for service businesses GTA" on 2026-11-22 — the site's niche was clarified to home services (home improvement) specifically, not service businesses generally.

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

### how long does local seo take to work
- **Page:** `/blog/how-long-does-local-seo-take-to-work/`
- **Type:** Blog post
- **Secondaries:** local seo timeline, how long does seo take for a new website, when will my google business profile start ranking, local seo results timeline
- **Source:** verified via Semrush `phrase_these` (database `ca`): volume 90/mo, keyword difficulty 17, informational intent. Not yet in `keyword-map.md`'s pool — added below.

### how much does local seo cost
- **Page:** `/blog/how-much-does-local-seo-cost/`
- **Type:** Blog post
- **Secondaries:** local seo pricing, local seo packages, google business profile management cost, local seo cost per month
- **Source:** verified via Semrush `phrase_these` (database `ca`): volume 20/mo, CPC $0, competition 0.21. Not yet in `keyword-map.md`'s pool — added below.

### how to get more google reviews for my business
- **Page:** `/blog/how-to-get-more-google-reviews/`
- **Type:** Blog post
- **Secondaries:** get google reviews, google review link, ask customers for reviews, google business profile reviews
- **Source:** verified via Semrush `phrase_these` (database `ca`): volume 20/mo, CPC $9.28, competition 0.77. Not yet in `keyword-map.md`'s pool — added below. Note: the pool's existing "website not generating leads what to do" (est. 400/mo) was checked and returned no tracked volume in Semrush's `ca` database — flagging that estimate as likely wrong rather than picking it.

### how to choose a web designer
- **Page:** `/blog/how-to-choose-a-web-designer/`
- **Type:** Blog post
- **Secondaries:** web design agency checklist, questions to ask a web designer, how to pick a website designer, web designer vs agency
- **Source:** verified via Semrush `phrase_these` (database `ca`): volume 50/mo (highest of the batch checked).

### how long does it take to build a website
- **Page:** `/blog/how-long-does-it-take-to-build-a-website/`
- **Type:** Blog post
- **Secondaries:** website build timeline, how fast can a website be built, website development timeline, fast website vs custom website timeline
- **Source:** verified via Semrush `phrase_these` (database `ca`): volume 20/mo, CPC $2.72. Checked alongside "how to get more roofing leads" (20/mo), "how often should i post on social media" (20/mo), and several zero-volume candidates ("how to get more contractor leads", "how to market a contracting business", "diy website vs hiring a designer", "website vs google business profile") that were not used.

---

## How to add an entry
After `/blog` or `/service` publishes a page, append a new `###` section here in the same format: primary keyword, page URL, type, and the secondary cluster used. Do this before reporting the task done — an un-logged keyword will get reused by the next run.
