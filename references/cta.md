# CTA library

Canonical calls to action already in production. Reuse these exact phrases on new pages instead of drifting into new wording — consistency compounds, and the lead form (`src/_includes/partials/lead-form.njk`) is built around this specific offer.

## The offer, in one line
"We build your new website first. You see it before you pay." (from `content/brand/offers-and-pricing.md` — this is the hook every page should lead back to.)

## Primary buttons (`.btn--primary`)
- "Get my free website preview"
- "Get my free preview"
- "Build my free preview" (form submit button)

## Secondary / ghost buttons (`.btn--ghost`)
- "Compare options"
- "See how it works"
- "See pricing"
- "Need it faster? See Starter"

## Service-specific primary CTAs (keep the `?service=` query param — it pre-selects the form dropdown, see `src/assets/js/main.js`)
- Starter: `/contact/?service=website-in-a-day` (the query value stayed `website-in-a-day` internally even after the page was renamed to Starter — don't rename it, every existing CTA and the Netlify form field depend on it matching)
- Custom website: `/contact/?service=custom`
- Local SEO / GBP: `/contact/?service=gbp`
- Social content: `/contact/?service=social`
- Not sure / hub pages: `/contact/?service=not-sure`
- Location pages additionally pass `&city=<City>` to pre-fill the city field.

## Lead form section headings (`formHeading` / `formSub`)
Default (home, services, contact): "See your new website before you pay" / "Send us your business name and what you do. We build a working first draft of your new homepage with your logo, services and service area, then walk you through it on a 15-minute call. If you don't like it, you don't pay anything."

Vary the sub-line to reference the specific page topic (city, service) but keep the structure: what we build → how fast → the no-risk close.

## Form bullets (`formBullets`), reusable pool — pick 3–4
- "Your draft is ready within one business day"
- "Built for your trade and your city, not a stock demo"
- "No payment details needed to see it"
- "One business per trade per city, so your competitor can't get the same site"
- "Written for your city, not a generic template" (location pages)

## Closing line for blog posts
End every post with a short CTA block (not a hard sell) that links to the most relevant service page, then offers the free preview. Don't paste the full lead form mid-post; link to `/contact/?service=...` or include the form only at the very end of the page, matching how existing pages do it.
