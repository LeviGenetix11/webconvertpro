# Offers and pricing (CAD, plus HST)

Update here first, then search the project for the old number (Ctrl+Shift+F) and change it on the site.

**Updated 2026-10-29:** Growth changed from a flat one-time fee to a one-time build fee plus an ongoing monthly fee that bundles hosting and local SEO. Starter is unchanged. See `references/seo.md` if this gets revisited again — keep this file as the single source of truth and update everywhere this note's "Where prices appear" list points.

## Websites
Only two packages: **Starter** and **Growth**. "Growth" and "custom website" are the same package — both names are used on the site.

| Package | Price | Includes |
|---|---|---|
| **Starter** | **From $499 one-time** | Up to 5 pages, mobile responsive, contact form + click-to-call, **basic on-page and technical SEO**, **logo design (if you need one) and business set-up help — not just the website**, **unlimited revisions**. Live within 24 hours of approval. Paid in full after you approve your preview — no upfront payment, that's the whole hook. $499 is the starting point for a standard 5-page build; most projects land close to it, but more pages or extra features cost more — always quoted in writing before the client commits. |
| **Growth** (custom website) | **From $999 one-time to start, then $349/month** | Up to 8 pages, custom design, conversion-focused layout, technical SEO setup, service and city pages, analytics + conversion tracking, **logo design (if you need one) and business set-up help — not just the website**, **unlimited revisions**. The $999 build fee is **50% to start the build, 50% after you approve it, before launch** — not paid in full upfront. The $349/month covers hosting, updates, and **more SEO and local SEO — this is what builds traffic online and manages the business's local listings** (Google Business Profile and other directories) after launch. $999 is a starting point, not a flat price; final price varies with page count, integrations and service area. |
| **Larger builds** | Quoted | 9+ pages, multiple locations, integrations, redesign with SEO migration. |

**Revisions:** unlimited on both packages, not a capped number of rounds. If you ever see "2 rounds" or "3 rounds" anywhere on the site, that's stale — fix it.

**"From" / "starting at" framing applies to both packages, everywhere on the site — but the number is different per package.** Starter is "from $499." Growth is "from $999." These are floors, not typical final prices. Every price display (the big number on a pricing card, a hero line, a meta description) should say "From $X" or "starting at $X," never a bare number — and double-check which package's number you're editing before you change it, since both appear close together on several pages.

**SEO, spelled out — this is the main thing that separates the two packages:**
- **Starter** gets the one-time basics: on-page SEO (titles, headings, schema) and technical SEO (clean URLs, sitemap, fast load times). This gets a site found and ranking for its core services, but it's a one-time setup, not ongoing work.
- **Growth** gets Starter's basics plus an ongoing monthly layer: more SEO work, local SEO specifically, and management of the business's local listings (Google Business Profile plus other directories like Bing Places, Apple Maps, Yelp). This is what actively builds traffic over time and keeps the business ranking locally, instead of a one-time setup that doesn't change after launch.

**Logo and business set-up — included in both packages, not an add-on:** every client gets logo design (if they don't already have one) and help getting the basics of their business set up online. This isn't just a website-design service — don't describe either package as "just a website" anywhere on the site.

Growth's $349/month **replaces** the standalone $79/mo hosting and $299/mo Local SEO add-ons for Growth clients — don't charge both. Starter clients can still add either separately below.

## Monthly add-ons (cancel with 30 days' notice) — for Starter clients, or anyone not on Growth's bundle
| Add-on | Price |
|---|---|
| Hosting, updates and maintenance | $79/mo (includes up to 30 min of edits) |
| Local SEO support (Google Business Profile, citations, reviews, reporting) | $299/mo |
| Organic content creation (8 designed posts + 4 short videos, Instagram + Facebook) | $399/mo |

Organic content creation ($399/mo) is still a separate add-on for either package — Growth's bundle doesn't include it.

## Payment terms
- Starter: paid in full after the client approves the preview. No payment before approval — that's the point of the free preview.
- Growth: the $999 build fee is 50% to start, 50% after approval and before launch. The $349/month starts at launch, billed monthly after.
- Upgrade Starter to Growth within 90 days of launch: pay the difference.
- Revisions: unlimited on both packages. Don't quote a capped number of rounds.

## The hook
**"We build your new website first. You see it before you pay."** Every sales conversation starts with the free preview.

## Booking CTA
Primary CTAs on the homepage now point at a Google Calendar booking link (`site.calendarUrl` in `src/_data/site.json`) instead of the `/contact/` lead form, when that field is set — label becomes "Book a free audit." **This field is still blank** — paste the real Google Calendar appointment-scheduling link in to activate it. Until then, those buttons fall back to the old `/contact/` flow automatically. Only the homepage's CTAs were switched to this pattern; other pages still link to `/contact/`.

## Where prices appear on the site
`src/index.njk` (pricing section, path-split section and FAQs), `src/web-design-ajax/index.njk`, `src/services/index.njk`, `src/starter/index.njk`, `src/web-design/index.njk`, `src/google-business-profile/index.njk`, `src/social-media/index.njk`, `src/_includes/partials/lead-form.njk` (dropdown), the blog post on website costs, `references/style.md`, `content/ads/meta-ads.md`, `content/outreach/call-script.md`.

**2026-10-29:** "Website in a Day" was retired as a product name — the page moved from `/website-in-a-day/` to `/starter/` (301 redirect added in `netlify.toml`) and is now just called "Starter" everywhere. The underlying $499 one-time offer, the 24-hour turnaround and all the specs are unchanged — only the name went away. The lead-form's internal `?service=website-in-a-day` query value and Netlify form field were deliberately left unchanged to avoid breaking every existing CTA link site-wide — don't rename that value without updating every `href` that sets it.

**2026-10-29 (later same day):** Added logo design + business set-up help to both packages, and sharpened the SEO language to explicitly differentiate Starter (basic on-page + technical SEO, one-time) from Growth (adds ongoing SEO, local SEO and local listings management, monthly). Updated everywhere this file's "Where prices appear" list points, plus the FAQ on `src/starter/index.njk` that previously implied the client had to supply their own logo.

**2026-10-29 (evening):** Growth's one-time build fee raised from $499 to $999. Starter is unchanged at $499. Everything else about Growth is unchanged — still 50% to start / 50% before launch, still $349/month after launch, still unlimited revisions, still includes logo + business set-up. Updated every page in the "Where prices appear" list below, plus ad copy and the call script. When editing any page that shows both packages side by side, double-check you're changing the Growth number, not Starter's.
