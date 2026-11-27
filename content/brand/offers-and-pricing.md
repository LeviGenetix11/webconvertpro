# Offers and pricing (CAD, plus HST)

Update here first, then search the project for the old number (Ctrl+Shift+F) and change it on the site.

**Updated 2026-11-21:** Restructured from two packages to three: Starter, Growth and Growth Partner. Every price now reads "starting at" rather than "from," per a direct instruction — same floor-not-final-price meaning, different wording. See `references/seo.md` if this gets revisited again — keep this file as the single source of truth and update everywhere this note's "Where prices appear" list points.

## Websites
Three packages: **Starter**, **Growth** and **Growth Partner**. "Growth" and "custom website" are the same package — both names are used on the site.

| Package | Price | Includes |
|---|---|---|
| **Starter** | **Starting at $799 one-time** | Conversion-focused design and copy, mobile-first build, contact form and click-to-call, basic on-page SEO, lead tracking with GA4. Live the next business day after approval. Paid in full after you approve your preview — no upfront payment, that's the whole hook. $799 is a starting point for a standard build; more pages or extra features cost more, always quoted in writing before the client commits. |
| **Growth** (custom website) | **Starting at $1,499 setup, then $349/month** | Everything in Starter, plus a custom website build, directory and listings setup and management, local SEO including Google Business Profile optimization, and hosting and ongoing maintenance. The $1,499 setup fee is **50% to start the build, 50% after you approve it, before launch**. The $349/month starts at launch. $1,499 is a starting point, not a flat price. |
| **Growth Partner** (flagship — "Most complete" badge) | **Starting at $1,499 setup, then $699/month** (confirmed 2026-11-22) | Everything in Growth, plus a dedicated business phone line with call tracking, business cards (`// TODO(Levi): decide scope — design + first print run, or design only`), automations for follow-ups and lead handling, email campaigns, a monthly report, and a monthly strategy call. Same 50/50 setup-fee split as Growth. Every Growth Partner plan is customized after a discovery call — the card copy says so explicitly. |
| **Larger builds** | Quoted | More pages, multiple locations, integrations, redesign with SEO migration. |

**Revisions:** the old "unlimited revisions" claim is **not** part of the new pricing copy for any tier — `// TODO(Levi): confirm whether unlimited revisions still applies to any package; it was dropped from the card copy because it wasn't in the verbatim pricing text supplied.`

**"Starting at" framing applies to all three packages, everywhere on the site — the number is different per package.** Starter is "starting at $799." Growth is "starting at $1,499 + $349/mo." Growth Partner is "starting at $1,499 + $699/mo." These are floors, not typical final prices. Every price display should say "Starting at $X," never a bare number — and double-check which package's number you're editing, since all three appear close together on several pages. There is also a required line under every pricing grid: "Final pricing is confirmed in writing after a free discovery call. All prices in CAD, plus HST."

**SEO and local visibility, spelled out — this is the main thing that separates the tiers:**
- **Starter** gets the one-time basics: on-page SEO only. This gets a site found and ranking for its core services, but it's a one-time setup, not ongoing work.
- **Growth** gets Starter's basics plus an ongoing monthly layer: directory and listings setup/management, and local SEO including Google Business Profile optimization. This is what actively builds traffic over time and keeps the business ranking locally.
- **Growth Partner** gets everything in Growth plus a phone line with call tracking, business cards, automations, email campaigns, a monthly report and a monthly strategy call — the fully managed option.

**Logo design and "business set-up help" are no longer part of the pricing-card copy for any package** — `// TODO(Levi): the previous two-package copy included logo design and business set-up help in both packages' feature lists. The new verbatim pricing copy you supplied doesn't mention either, for any tier. I removed these claims from the pricing cards and the pages' "what's included" lists rather than invent whether they still apply — confirm whether logo design and business set-up help are still offered, and if so, where that should be stated.`

Growth's $349/month **replaces** the standalone $79/mo hosting and $299/mo Local SEO add-ons for Growth and Growth Partner clients — don't charge both. Starter clients can still add any of the three add-ons separately below.

## Branding (added 2026-11-26)
A new standalone service, separate from the website tiers — not a recurring add-on. Three fixed-price, one-time packages, all digital deliverables (no printing, embroidery or physical vehicle wrapping). Source of truth for the page is `src/_data/brandingPlans.json`; keep this table in sync with it.

| Package | Price | Includes |
|---|---|---|
| **Brand Starter** | **$199 one-time** | 2 initial logo concepts, 1 finalized primary logo, brand colour palette, font recommendations, 2 revision rounds, PNG/JPG/SVG files, basic usage guide. |
| **Professional Branding** (badge: "Most popular") | **$399 one-time** | Everything in Brand Starter, plus 3 initial concepts, secondary logo and icon mark, business card design, social profile and cover graphics, email signature, professional brand guidelines, 3 revision rounds. |
| **Complete Brand Identity** | **$699 one-time** | Everything in Professional Branding, plus expanded logo variations, 5 social templates, vehicle and workwear branding concepts (digital only), letterhead and document template, comprehensive brand guidelines, 4 revision rounds. |

Available standalone or alongside any website package. No checkout/payment processing exists on this site (see dev note below) — customers submit the shared lead form (`?service=branding`) and are followed up with manually, same as every other service.

## Monthly add-ons (cancel with 30 days' notice) — for Starter clients only, labelled "starting at"
| Add-on | Price |
|---|---|
| Hosting, updates and maintenance | Starting at $79/mo (includes up to 30 min of edits) |
| Local SEO support (Google Business Profile, citations, reviews, reporting) | Starting at $299/mo `// TODO(Levi): confirm exactly how this differs in scope from Growth's bundled local SEO/listings management` |
| Organic content creation (8 designed posts + 4 short videos, Instagram + Facebook) | Starting at $399/mo |

Organic content creation is included in Growth Partner's bundle, so it's now framed as a Starter-only add-on (previously it was an add-on for either package). The `google-business-profile/` and `social-media/` pages' own CTAs used to deep-link the form's dropdown directly to "gbp"/"social" options; the dropdown no longer has those options (see Development note below), so those CTAs now pre-select "Not sure" with a TODO comment on each page.

## Payment terms
- Starter: paid in full after the client approves the preview. No payment before approval — that's the point of the free preview.
- Growth and Growth Partner: the $1,499 setup fee is 50% to start, 50% after approval and before launch. The monthly fee ($349 or $699) starts at launch, billed monthly after.
- Upgrade Starter to Growth or Growth Partner within 90 days of launch: pay the difference. `// TODO(Levi): confirm the 90-day upgrade-and-pay-the-difference policy explicitly covers upgrading all the way to Growth Partner, not just to Growth.`

## The hook
**"We build your new website first. You see it before you pay."** Every sales conversation starts with the free preview.

## Booking CTA
Primary CTAs on the homepage now point at a Google Calendar booking link (`site.calendarUrl` in `src/_data/site.json`) instead of the `/contact/` lead form, when that field is set — label becomes "Book a free audit." **This field is still blank** — paste the real Google Calendar appointment-scheduling link in to activate it. Until then, those buttons fall back to the old `/contact/` flow automatically. Only the homepage's CTAs were switched to this pattern; other pages still link to `/contact/`.

## Where prices appear on the site
`src/index.njk` (pricing section via `src/_includes/partials/pricing-plans.njk`, path-split section, "included" rows and FAQs), `src/web-design-ajax/index.njk` (same partial), `src/services/index.njk`, `src/starter/index.njk`, `src/web-design/index.njk`, `src/google-business-profile/index.njk`, `src/social-media/index.njk`, `src/_includes/partials/lead-form.njk` (dropdown), the blog posts on website costs and conversion rate, `references/style.md`, `references/voice.md`, `content/ads/meta-ads.md`, `content/ads/google-ads.md`, `content/outreach/call-script.md`, `content/social/30-day-calendar.md`.

**Form dropdown values changed 2026-11-21:** the `?service=` query param and the form's `<select>` values are now `starter` / `growth` / `growth-partner` / `redesign` / `not-sure` (previously `website-in-a-day` / `custom` / `redesign` / `gbp` / `social` / `not-sure`). Every CTA link using the old values was repointed. The `gbp` and `social` options were dropped entirely (not renamed) — `google-business-profile/` and `social-media/`'s own CTAs now pre-select `not-sure` instead, flagged with a TODO on each page in case you want a dedicated option back.

**2026-10-29:** "Website in a Day" was retired as a product name — the page moved from `/website-in-a-day/` to `/starter/` (301 redirect added in `netlify.toml`) and is now just called "Starter" everywhere.

**2026-10-29 (later same day):** Added logo design + business set-up help to both packages, and sharpened the SEO language to explicitly differentiate Starter from Growth.

**2026-10-29 (evening):** Growth's one-time build fee raised from $499 to $999. Starter unchanged at $499.

**2026-11-21:** Restructured to three tiers per a direct instruction with verbatim pricing-card copy. Starter: $499 → **starting at $799**, one-time (feature list replaced — see Revisions/logo TODOs above). Growth: $999 + $349/mo → **starting at $1,499 + $349/mo** (monthly fee unchanged, only the setup fee moved; feature list trimmed to the 4 verbatim bullets). New: **Growth Partner**, starting at $1,499 + $699/mo (monthly price unconfirmed at the time), the flagship/"Most complete" card.

**2026-11-22:** Growth Partner's $699/mo confirmed. Removed the TODO from `src/_includes/partials/pricing-plans.njk` and `src/services/index.njk`. The business-cards scope question (design + print run, or design only) is still open. Add-ons ($79/$299/$399 per month) now read "starting at" and are framed as Starter-only, since Growth's bundle already includes hosting/directories/local SEO and Growth Partner's bundle already includes content. Updated every page in the "Where prices appear" list above, plus ad copy, the call script and the 30-day content calendar. The homepage's and web-design-ajax's `.plans` pricing grid now comes from a shared partial (`src/_includes/partials/pricing-plans.njk`) instead of being hand-duplicated, to stop the two pages drifting apart. When editing any page that shows multiple tiers side by side, double-check which package's number you're changing — all three sit close together on several pages.
