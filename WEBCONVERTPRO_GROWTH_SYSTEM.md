# WebConvertPro Growth System

Central reference for the lead-generation funnel built on top of the existing WebConvertPro marketing site. Read `CLAUDE.md` first for the site's general rules (voice, SEO, non-negotiables) — this file covers the growth/funnel layer specifically.

**Status as of 2026-11-27: Phases 1 and 2 of the 6-phase plan are built and live in the codebase (not deployed). Phase 3 is one-fifth built (the calculator); Phases 4–5 are partially covered or explicitly deferred — see the breakdown below. Nothing here was invented to look finished; anything not actually built is marked "Not started."**

---

## 1. What this project already had (inspected before building anything)

- **Framework:** Eleventy (SSG) → static HTML, hosted on **Vercel**, auto-deploy on push.
- **Forms:** **Formspree only** (`site.formspreeId` in `src/_data/site.json`), one project ID shared across all forms, differentiated by hidden `_subject`/`offer` fields. No Netlify Forms fallback paths remain active (they're dead code kept only for `formspreeId` being blank).
- **No CRM.** No ESP (email service provider). No serverless functions (`/api` or similar) anywhere in the repo. No PageSpeed Insights, directory-data, or other third-party API wired up.
- **Analytics:** GA4 (`gtag`) and Meta Pixel scaffolding already exist in `src/_includes/layouts/base.njk`, gated behind `site.analyticsId` / `site.metaPixelId` — both are currently **empty strings**, so no analytics actually fire yet. No duplicate tracking scripts were added.
- **An existing, working funnel example:** `/preview/` (the original "free homepage preview" landing page) already had a hero, before/after, steps, FAQ, a Formspree form with hidden UTM/referrer/landing-page fields, and page-specific `gtag`/`fbq` event calls. This page's pattern was reused as the template for every new landing page below, rather than inventing a new structure.
- **Design system:** one hand-written stylesheet (`src/assets/css/styles.css`), reused as-is. No new component families were invented where an existing one (`.bento-card`, `.rows`/`.row`, `.faq`, `.form`, `.page-hero`, `.btn-row`) already covered the need.

Because of this reality, a large share of the original 16-part spec (CRM sync, email automation, PDF generation, paid third-party scanning APIs) **cannot be honestly built without new infrastructure decisions from you** — see §6.

---

## 2. New landing pages (Part 2)

All four reuse the `/preview/` page's proven structure: hero → educational sections → honest "what's measured vs. manually reviewed" section → Formspree form with UTM capture → FAQ → service cross-link. `/preview/` itself was left untouched (already worked, not broken).

| Page | Route | Primary objective | Thanks page |
|---|---|---|---|
| Free website audit | `/free-website-audit/` | Website-audit leads | `/free-website-audit/thanks/` |
| Free local SEO audit | `/local-seo-audit/` | Local SEO leads | `/local-seo-audit/thanks/` |
| Directory visibility scan | `/directory-scan/` | Directory/citation leads | `/directory-scan/thanks/` |
| Free branding preview | `/branding-preview/` | Branding leads | `/branding-preview/thanks/` |

`/preview/` (existing) continues to serve the "Free website preview" objective and already has `/preview/thanks/`.

**Naming note:** the brief asked for flat routes like `/thank-you/website-audit`. This project's established convention is a nested `/<page>/thanks/` page (see `/preview/thanks/`). I kept that convention for consistency and added 302 redirects in `vercel.json` from the flat spec URLs to the real nested pages, so either URL works if it's already in campaign materials:
```
/thank-you/website-preview → /preview/thanks/
/thank-you/website-audit   → /free-website-audit/thanks/
/thank-you/local-seo       → /local-seo-audit/thanks/
/thank-you/directory-scan  → /directory-scan/thanks/
/thank-you/branding        → /branding-preview/thanks/
```
`/thank-you/resources/` is a real page (not a redirect) — it's the generic confirmation target for the calculator's optional email-summary form.

**Honesty decisions made on these pages (see non-negotiables: no fake audit results, no guaranteed rankings):**
- The website audit page explicitly separates "measured" (real Google PageSpeed Insights score, where your site supports it) from "manually reviewed" (design, mobile UX, credibility — by a person) from "not assessed" (can't be checked). **No PageSpeed API key exists yet**, so this page currently promises a person will check PageSpeed manually too, not an instant automated score — update the copy once you wire up the API (see §6).
- The directory scan page uses a **configurable registry** (`src/_data/directories.json`) rather than a hardcoded "we check these 30+ platforms, guaranteed" claim. Copy says "platforms we typically check" and explicitly states results are manually reviewed — never automated, never a guessed "missing."
- The local SEO audit page explicitly states results vary by location/device/search term and makes no ranking guarantees.
- The branding preview page labels its example concepts (reused from `/branding/`'s existing `brandingConcepts.json`) as illustrative, and the logo-upload field has a documented manual fallback ("reply to our confirmation email") in case Formspree's file-upload has an issue.

---

## 3. Lead magnets (Part 4) — what's real vs. deferred

| # | Lead magnet | Status |
|---|---|---|
| 1 | Contractor Website Health Report | **Done, as a fulfillment template.** `content/templates/website-health-report-template.md` is the internal document our team fills in by hand for every `/free-website-audit/` submission — 11 sections matching the spec exactly, each tagged MEASURED / REVIEWED / NOT ASSESSED. Not auto-generated (no PageSpeed API yet — see §6), but no longer just "methodology on a landing page": it's a real, usable template. |
| 2 | Local Visibility Scorecard | **Done, same pattern.** `content/templates/local-visibility-scorecard-template.md`, tied to `/local-seo-audit/`. |
| 3 | 30+ Directory Visibility Report | **Done, same pattern.** `content/templates/directory-visibility-report-template.md`, with the status categories from `src/_data/directories.json`, tied to `/directory-scan/`. |
| 4 | The Contractor's Digital Growth Playbook (15–25 page PDF) | **Done.** A flawed draft appeared in the project at `lead magnets/The-Contractors-Digital-Growth-Playbook-WebConvertPro.pdf` during this session (not created by this work) — it cited an unsourced "70% of searches" stat and only covered 7 of its own 26 promised sections. I kept its genuinely good writing for sections 1–7, removed the unsourced stat, and wrote the missing 19 sections + references in the same voice. The complete, 26-section, brand-styled guide is now built as `content/lead-magnets/contractor-growth-playbook.html` (the editable source) and rendered via Playwright to the real, servable PDF at `src/assets/downloads/contractor-growth-playbook.pdf` (29 printed pages). Landing page at `/resources/contractor-growth-playbook/` with email capture; delivery page at `/resources/contractor-growth-playbook/thanks/` links the real file directly (no false "check your inbox" promise, since no email-automation exists to send it — see §6). **The original flawed PDF in `lead magnets/` was left alone, not deleted** — it's not linked from the site. |
| 5 | Local Competitor Analysis Report | **Done.** `content/templates/competitor-analysis-report-template.md` (fulfillment template, publicly-observable-only data, no fabricated competitor metrics) + a real landing page at `/resources/competitor-analysis/` where a visitor names up to three competitors or asks us to identify them. |
| 6 | Contractor Brand Makeover Kit | **Done, as a fulfillment template.** `content/templates/brand-makeover-kit-template.md`, tied to the existing `/branding-preview/` lead-capture flow (which already has the "illustrative, not a finished deliverable" framing this kit needs). |
| 7 | Website Opportunity Calculator | **Done, fully functional.** See §4. |

All seven lead magnets now have a real artifact behind them — either a fully automated tool (the calculator), a complete downloadable asset (the playbook), or an internal fulfillment template used to honestly answer a manually-reviewed request (the other five). `/resources/` lists all seven.

---

## 4. Interactive tools (Part 5)

| Tool | Status | Route |
|---|---|---|
| Website Opportunity Calculator | **Done.** Pure client-side JS, real-time, no backend, no email required to see results. Formulas match the spec exactly (inquiries → customers → revenue), with an explicit "revenue-to-spend ratio, not profit" label when a spend figure is entered, and a visible disclaimer that results are hypothetical. | `/tools/website-opportunity-calculator/` |
| Website Readiness Assessment | **Not started.** | `/tools/website-readiness-assessment` (not built) |
| Google Business Profile Checklist | **Not started.** | `/tools/google-business-checklist` (not built) |
| Brand Strength Assessment | **Not started.** | `/tools/brand-assessment` (not built) |
| Digital Marketing Budget Planner | **Not started.** | `/tools/marketing-budget-planner` (not built) |

These four are genuinely easy to build honestly later (self-scored questionnaires, no backend needed) — they were deferred only for time, not because they're infeasible. `/tools/` says so explicitly rather than linking to something that doesn't work yet.

---

## 5. Funnel infrastructure actually built (Part 6, 10, 11)

- **Reusable attribution/tracking module** added to `src/assets/js/main.js`: any `<form data-lead-form="name">` with the standard hidden UTM/referrer/landing-page fields (new partial: `src/_includes/partials/lead-attribution-fields.njk`) gets them auto-filled and fires `<name>_form_start` / `<name>_form_submit` events; any element with `data-track-cta="name"` fires a `<name>_cta_click` event. No PII (name/email/phone) is ever passed to `gtag`/`fbq` — only the event name and `utm_source`. The original `/preview/` page's own inline script was left untouched (it already worked).
- **Lead categorization**: every new form sets a hidden `offer` field (`website-audit`, `local-seo-audit`, `directory-scan`, `branding-preview`, `calculator`) and a `_subject` so each submission arrives distinguishable in your inbox/Formspree dashboard. This is the honest version of "CRM lead categorization" available today — see §6 for what a real CRM integration would need.
- **Navigation**: added a "Resources" dropdown (desktop hover/focus, plain nested list on mobile) linking to all four new pages plus `/tools/`. `Pricing`, `Portfolio`, and the primary "Get my free preview" CTA were left exactly where they were.
- **Homepage**: new "Free tools to grow your business" section (4 cards: audit, local SEO, directory scan, calculator) with a "View all free resources" link to `/resources/`. Placed after the existing services grid, before the before/after section — no existing section was reordered or removed.
- **Contextual cross-links** added (one short section each, not a popup): `/web-design/` → audit + calculator, `/google-business-profile/` → local SEO audit, `/branding/` → branding preview.
- **Marketing consent**: none of the new forms auto-enrolls anyone into a promotional sequence (none exists to enroll into — see §6). Every form's only promise is "we use your details to do the thing you asked for," matching the existing privacy copy pattern.

---

## 6. What requires decisions or credentials only you can provide

These are genuinely not things I can build or fake my way past — they need either an account/budget decision or a credential from you.

| Need | Why it's blocked | What to do |
|---|---|---|
| **CRM** | None exists in this project. No serverless backend exists to post to one securely. | Pick a CRM (or confirm "Formspree + email is fine for now"). If you want one, Vercel supports serverless functions (`/api/*.js`) — that's the secure place to post form data to a CRM's API without exposing its key in frontend code. |
| **Email service provider (ESP)** | None exists. The "email follow-up sequences" in Part 7 are written as **ready-to-paste templates in §8 below**, not active automation. | Pick an ESP (Brevo, Mailchimp, etc.), then wire its API or Zapier/Make automation to Formspree's webhook. Until then, do not tell leads an automated sequence is running. |
| **Google PageSpeed Insights API key** | Needs a (free) Google Cloud API key and ideally a server-side call (the key shouldn't sit in frontend JS with no quota control) — no `/api` functions exist yet to call it from safely. | Get a key at https://developers.google.com/speed/docs/insights/v5/get-started, add a Vercel serverless function, then update `/free-website-audit/` to show the real number automatically instead of "checked by hand." |
| **Directory data provider** | Automated, verifiable checking across 10+ directories needs a paid data provider (e.g. a citation-management API) — none is configured, and scraping directories yourself risks violating their terms. | Decide a budget/provider if you want this automated. Until then, `/directory-scan/` is honestly a manual-review funnel, which is what the brief's own fallback rule allows. |
| **15–25 page PDF guide** | A large, original long-form writing + document-generation deliverable in its own right. | Treat as its own task/session rather than a line item inside this one. |
| **Competitor analysis automation** | Same reasoning as directory data — honest automation needs licensed data; otherwise it's a manual research service. | Decide whether this becomes a paid manual add-on or stays unbuilt. |

**Environment variables** (none of these exist yet; add only once you have the real service):
```
# .env.example additions once the above are decided — do not commit real values
PAGESPEED_API_KEY=
CRM_API_KEY=
CRM_WEBHOOK_URL=
ESP_API_KEY=
```

---

## 7. Campaign attribution (Part 9)

No existing 12-video titles/scripts were found in the project (checked `content/social/`, `content/ads/`) — the table below uses the brief's provisional mapping. `content/ads/utm-guide.md` already defines the UTM convention for this project; the links below follow it exactly (lowercase, hyphenated `utm_campaign`, `organic_social` as the medium for organic posts) rather than inventing a new format.

| Video | Topic | Landing page | Example link (Instagram) |
|---|---|---|---|
| 01 | Contractor website problems | `/free-website-audit/` | `https://webconvertpro.com/free-website-audit/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_01` |
| 02 | Why competitors get found first | `/local-seo-audit/` | `...local-seo-audit/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_02` |
| 03 | Outdated website transformation | `/preview/` | `...preview/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_03` |
| 04 | Website before and after | `/preview/` | `...preview/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_04` |
| 05 | Google Maps visibility | `/local-seo-audit/` | `...local-seo-audit/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_05` |
| 06 | 30+ directory listings | `/directory-scan/` | `...directory-scan/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_06` |
| 07 | Website conversion opportunities | `/tools/website-opportunity-calculator/` | `...tools/website-opportunity-calculator/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_07` |
| 08 | Branding transformation | `/branding-preview/` | `...branding-preview/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_08` |
| 09 | Professional contractor website showcase | `/preview/` | `...preview/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_09` |
| 10 | Online credibility | `/free-website-audit/` | `...free-website-audit/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_10` |
| 11 | Contractor digital growth tips | `/resources/contractor-growth-playbook/` | `...resources/contractor-growth-playbook/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_11` |
| 12 | Complete digital growth solution | `/free-website-audit/` | `...free-website-audit/?utm_source=instagram&utm_medium=organic_social&utm_campaign=contractor_growth&utm_content=video_12` (the `/digital-growth-assessment` page from Part 8 wasn't built this round — see §9 — so this currently points at the nearest real equivalent) |

**To generate the same table for Facebook, TikTok, YouTube Shorts, LinkedIn and X:** swap `utm_source` for `facebook`, `tiktok`, `youtube`, `linkedin`, `x` respectively, keep everything else the same. Capture happens automatically: any visitor who lands with these parameters has them stored (session-scoped) and attached to whichever form they eventually submit, per §5.

---

## 8. Email templates (Part 7) — written, not wired up

These are ready to paste into whichever ESP you choose (§6). **No email sends automatically today — there is nothing to send them with.** Keep them short; this is the structure, not polished final copy.

**Website audit sequence**
1. *Confirmation* — "We're reviewing [business]'s website now. PageSpeed is checked where your site supports it; a person reviews the rest by hand. Expect your summary within [X] business days."
2. *Common problems* — "Here are the five things that cost contractors the most enquiries on their website." (link to `/free-website-audit/`)
3. *Before/after* — one illustrative transformation, clearly labelled as a concept, link to `/preview/`.
4. *How the preview process works* — link to `/preview/` steps.
5. *Invitation to talk* — link to `/contact/?service=not-sure`.

**Local SEO sequence**: confirmation → GBP optimization explainer → directories/citations explainer (link to `/directory-scan/`) → competitor-visibility note (no fabricated competitor data) → invitation to `/google-business-profile/`.

**Directory visibility sequence**: confirmation/report → why consistency matters → what submission/verification involves → how it pairs with local SEO → invitation to `/google-business-profile/`.

**Branding sequence**: confirmation → why consistent branding matters → one illustrative transformation (labelled) → branding+website integration note → invitation to `/branding/`.

**Educational resource sequence** (calculator, future quizzes): deliver the thing requested → one practical tip → a short checklist → calculator invitation (if they didn't start there) → `/preview/` invitation.

Each sequence should only send to someone who gave consent for follow-up — the current forms don't yet have a separate marketing-consent checkbox (the spec asks for one distinct from "send me what I asked for"). Add that checkbox when an ESP is chosen, since without one there's nothing to attach the consent flag to.

---

## 9. Explicitly not started this round

- `/digital-growth-assessment` (Part 8) — a premium, multi-deliverable consultation offer; building it honestly means first deciding which of its seven listed elements are actually operationally deliverable today (most aren't automated — see §6), which is a business-process decision, not a coding one.
- Four of the five Part-5 tools (readiness quiz, GBP checklist, brand assessment, budget planner).
- Any CRM, ESP, or paid third-party API integration (§6).

None of these are linked from navigation, the homepage, or `/resources/`, so nothing on the live site promises something that doesn't exist.

---

## 10. Files created or modified

**New pages:** `src/free-website-audit/index.njk` (+`thanks/`), `src/local-seo-audit/index.njk` (+`thanks/`), `src/directory-scan/index.njk` (+`thanks/`), `src/branding-preview/index.njk` (+`thanks/`), `src/tools/index.njk`, `src/tools/website-opportunity-calculator/index.njk`, `src/resources/index.njk`, `src/resources/competitor-analysis/index.njk`, `src/resources/contractor-growth-playbook/index.njk` (+`thanks/`), `src/thank-you/resources/index.njk`.

**New data:** `src/_data/directories.json`.

**New partial:** `src/_includes/partials/lead-attribution-fields.njk`.

**New lead-magnet fulfillment templates** (`content/templates/`, planning material, never published): `website-health-report-template.md`, `local-visibility-scorecard-template.md`, `directory-visibility-report-template.md`, `competitor-analysis-report-template.md`, `brand-makeover-kit-template.md`.

**New playbook asset:** `content/lead-magnets/contractor-growth-playbook.html` (editable source) → rendered to `src/assets/downloads/contractor-growth-playbook.pdf` (the real, servable download).

**Modified:** `src/_data/site.json` (nav dropdown, now including the playbook), `src/_includes/partials/header.njk` (dropdown markup), `src/assets/css/styles.css` (dropdown, calculator, directory-chip, consent-checkbox styles, a transparent-header dropdown contrast fix), `src/assets/js/main.js` (reusable attribution/tracking module), `src/index.njk` (new homepage section), `src/web-design/index.njk`, `src/google-business-profile/index.njk`, `src/branding/index.njk` (contextual cross-link sections), `vercel.json` (thank-you redirects), `scripts/visual-audit.mjs` (added new pages to the existing audit script).

**Left alone, not touched:** `lead magnets/The-Contractors-Digital-Growth-Playbook-WebConvertPro.pdf` — the flawed draft that prompted the rewrite above. It isn't linked from the site and wasn't deleted, since it wasn't mine to remove without being asked.

---

## 11. Build, test and deploy

- `npm run build` — zero errors, all new routes present in `_site/` and `_site/sitemap.xml`; all `/thanks/` pages correctly excluded from the sitemap (noindex respected).
- Playwright sweep across 20 pages × 375/768/1440px: zero horizontal overflow, zero oversized icons, after fixing one real bug caught by the sweep (the nav dropdown was rendering white-on-white on the transparent homepage header — fixed in `styles.css`).
- Calculator manually tested: slider inputs update results in real time, numbers match the spec's formulas exactly, bar chart scales proportionally, mobile layout stacks cleanly with no overlap (double-checked with DOM measurements, not just a screenshot, after a downscaled screenshot made it look like it overlapped when it didn't).
- **Not deployed.** No push, no Vercel trigger. When you're ready: review the diff, then push to the branch Vercel watches.

---

## 12. Honest summary

**Built, real, working today:** 6 new landing pages + their thank-you pages, the directory registry, a complete and corrected 26-section PDF guide with its own landing page, five internal fulfillment templates covering every remaining lead magnet, the fully functional website opportunity calculator, the resources/tools hubs, nav + homepage integration, contextual CTAs, reusable UTM/attribution tracking, the 12-video UTM link reference.

**Partially built (templates + structure exist; automated data pulls don't):** the website/local-SEO/directory reports are manually fulfilled using real templates, not auto-generated — which is explicitly what the brief allows when an API isn't available.

**Not started, and clearly marked as such everywhere it would otherwise be promised:** four of five quiz-style tools, the digital growth assessment page, and any CRM/ESP/paid-API integration.
