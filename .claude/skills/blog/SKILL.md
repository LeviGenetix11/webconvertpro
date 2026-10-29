---
name: blog
description: Generate a new long-form, SEO-optimised, voice-matched blog post for WebConvertPro. Picks an unused keyword, researches the top-3 SERP, optionally fetches a Pexels hero image, and publishes a ready .md file into src/blog/posts/. Use when the user types /blog or asks for a new blog post.
---

# `/blog` — Blog post generator

Creates a production-ready blog post end-to-end for the WebConvertPro Eleventy site. Output: a new file at `src/blog/posts/YYYY-MM-DD-<slug>.md`, an updated `content/seo/used-keywords.md`, and optionally a downloaded hero image under `src/assets/img/blog/<slug>/`. Must pass `npm run build` before reporting done.

---

## Inputs
- No args → pick the best unused **informational** keyword from `content/seo/keyword-map.md`.
- User-supplied topic/keyword (e.g. `/blog how much does website hosting cost`) → use that phrase as the primary keyword even if it's not yet in `keyword-map.md` (add it there as you go).

---

## Read these files before doing anything
1. `CLAUDE.md` — project rules (SSG constraint, proof rules, dev rules).
2. `content/seo/keyword-map.md` and `content/seo/used-keywords.md` — what's planned, what's taken.
3. `content/seo/seo-checklist.md` — every applicable item must be satisfied before you're done.
4. `references/voice.md`, `references/humour.md`, `references/style.md` — how we write.
5. `references/cta.md` — reuse exact CTA wording, don't rephrase.
6. `references/stats.md`, `references/stories.md`, `references/opinions.md` — the **only** numbers, anecdotes and hot takes you're allowed to use. If none fit the topic, skip that element — never invent one.
7. `content/templates/blog-post.md` — the front-matter shape and section pattern to follow.
8. One existing post, e.g. `src/blog/posts/2026-10-28-how-much-does-a-business-website-cost-ontario.md`, for tone and length reference.
9. `src/_includes/layouts/post.njk` — confirms what front-matter fields render (`title`, `seoTitle`, `description`, `date`, `category`, `author`, optional `image`/`imageAlt`, optional `faqs: [{q, a}]`).

---

## Step-by-step workflow

### 1. Pick the primary keyword
- If no arg: read `content/seo/keyword-map.md`'s keyword pool, drop anything already in `content/seo/used-keywords.md`, drop anything tagged `Local` or clearly commercial/buy-intent (those belong to `/service`, not here — this skill is for informational intent: how, what, why, how much, is-it-worth-it). Prefer rows with a lower "Difficulty" and a real (ideally verified) volume.
- Say in one line what you picked and why, then proceed — don't wait for approval unless the user flagged a strong preference earlier.
- **Volume/difficulty numbers in `keyword-map.md` are marked unverified.** If Semrush is connected and has API units, you may use `mcp__claude_ai_Semrush__keyword_research` → `get_report_schema` → `execute_report` to check the real numbers for the candidate keyword before committing (seed keyword in the `keyword` report, database `ca`). If Semrush has no units or isn't connected, proceed on topical judgement and say so in the summary — don't invent a volume or difficulty number to fill the gap.
- If arg supplied: use that exact phrase as the primary keyword. Confirm it's not already in `used-keywords.md`; if it is, stop and ask which angle makes it different enough for a second post, or pick a different keyword.

### 2. Build the keyword cluster
List 3–5 same-intent secondary phrases a reader of the primary keyword would also search. Pull from `keyword-map.md` where they exist; otherwise use your judgement on realistic phrasing (mark these as not-yet-verified). These don't get their own front-matter field — weave them naturally into H2s and body copy, and log the full cluster in `used-keywords.md` when you publish.

### 3. Research the top-3 SERP (if WebSearch/WebFetch are available)
Search the primary keyword. From the organic results (skip ads, forums, Reddit, YouTube):
- Note the dominant format (guide / list / comparison / FAQ).
- Note roughly how long the top pages are — target the body within 20% of that.
- Note every subtopic they cover, combined.
- Add 1–2 subtopics none of them cover, if genuinely useful to a GTA service-business owner.

If search tools aren't available, use judgement based on what a real owner would actually want answered, informed by `content/brand/offers-and-pricing.md` and the existing published posts' structure.

### 4. Draft the post
Front matter (match `content/templates/blog-post.md` exactly):
```yaml
---
title: "<Full title with primary keyword>"
seoTitle: "<keyword-first, under 60 chars>"
description: "<130-155 chars: benefit + keyword + reason to click>"
date: <today, YYYY-MM-DD>
category: <one of: Pricing, Web design, Local SEO, Social media, or a new short category if none fit>
targetKeyword: <the exact primary keyword>
---
```
Optional fields, only if you have real content for them:
- `image: /assets/img/blog/<slug>/hero.jpg` + `imageAlt: "<description>"` — only after step 5 succeeds.
- `faqs: [{q: "...", a: "..."}]` — 3–6 real questions with direct answers, sourced from the SERP research or obvious reader questions. This renders an FAQ section and `FAQPage` schema automatically (see `post.njk`).

Body:
- Answer the primary keyword's question directly in the first ~100 words.
- Short paragraphs, 2nd-person where natural ("If you run a service business in the GTA...").
- Use a real number from `references/stats.md` where one applies — never invent one.
- At most one anecdote from `references/stories.md` and one opinion from `references/opinions.md`, only if genuinely relevant. It's fine to use neither.
- One dry aside max, in the style defined by `references/humour.md` — never at the reader's expense.
- 3+ internal links with descriptive anchor text to real existing routes (service pages, `/services/`, `/locations/`, other posts) — check they exist before linking.
- 1–2 external links to real authoritative sources if you cite an outside fact.
- End with the CTA pattern already used in `post.njk`'s closing section (handled by the template — no need to duplicate it in the body), but you may add one in-body link using `references/cta.md` wording if the topic calls for a mid-post nudge.
- Re-read `references/voice.md` → "Tells that it's AI-written" and delete anything that matches before moving on.

### 5. Hero image (optional — skip gracefully if no Pexels key)
Check for `.env` with `PEXELS_API_KEY` set (see `.env.example`). If missing, skip images entirely — don't block the post on this, just omit the `image`/`imageAlt` front matter.

If a key is available:
1. Edit `scripts/fetch-pexels.mjs` — add an entry to the `posts` object keyed by the post's slug, with at least a `hero: { query, alt }` entry (concrete, single-concept queries work best — "plumber checking pipe" not "plumbing website SEO").
2. Run `node scripts/fetch-pexels.mjs <slug>`.
3. Confirm the script reports `✓` for the hero image and that `src/assets/img/blog/<slug>/hero.jpg` exists. If it fails, try a simpler query once; if it still fails, skip the image rather than loop indefinitely.
4. Add `image: /assets/img/blog/<slug>/hero.jpg` and `imageAlt` to the post's front matter.

### 6. Publish the file
Write the file to `src/blog/posts/<today:YYYY-MM-DD>-<slug>.md`, where `<slug>` is the kebab-case primary keyword (match the existing filename pattern).

### 7. Log the keyword
Append a new `###` section to `content/seo/used-keywords.md` with the primary keyword, page URL, type (`Blog post`), and the secondary cluster. If the keyword wasn't already in `content/seo/keyword-map.md`, add it there too under the keyword pool table.

### 8. Verify
```
npm run build
```
- Build must complete with no errors.
- Confirm `_site/blog/<slug>/index.html` was generated.
- Confirm `_site/sitemap.xml` includes the new URL (automatic — don't hand-edit).
- Spot check the generated HTML: one `<h1>`, `Article` + `BreadcrumbList` JSON-LD present, `FAQPage` JSON-LD present if you added FAQs, hero image renders if you added one, internal links resolve.

Don't report done until the build is green and the copy has been checked against `references/voice.md`.

---

## Output summary (report to user, ~10 lines)
- Primary keyword (+ volume/difficulty if verified via Semrush, otherwise say "unverified").
- Secondary cluster (3–5).
- Top-3 SERP competitors referenced (if researched) + what they skip that this post covers.
- File path + live URL (`/blog/<slug>/`).
- Whether a hero image was fetched, or skipped and why.
- Build status.

---

## Anti-patterns
- **Don't** invent a search volume or keyword difficulty number — verify via Semrush or say "unverified."
- **Don't** reuse a primary keyword already in `content/seo/used-keywords.md`.
- **Don't** invent a stat, story, client name or testimonial not already in `references/stats.md` / `stories.md`.
- **Don't** skip `content/seo/seo-checklist.md` items.
- **Don't** add exclamation marks, emoji, or any banned word from `references/voice.md`.
- **Don't** block the whole task on a missing Pexels key — skip the image instead.
- **Don't** ship without running `npm run build`.
- **Don't** introduce anything that only renders client-side — this is a static site.
