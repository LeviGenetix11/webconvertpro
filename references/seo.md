# SEO strategy

Strategic rules. For the pre-publish checklist, see `content/seo/seo-checklist.md`. For which keyword goes on which page, see `content/seo/keyword-map.md`.

## The two tactics that actually move the needle
1. **Blog posts for topical authority.** Informational keywords (how much, how to, what to put on...) build trust signals and pass link equity to service pages. They rarely convert directly — that's not their job.
2. **Service pages for money keywords.** Commercial-intent keywords (someone searching to hire, not to learn) go on dedicated landing pages built to convert, not just rank. `/web-design/`, `/starter/`, `/google-business-profile/`, `/social-media/` are the core set; city-specific variants are the "zipper" expansion below.

Blog posts raise domain-wide trust. Service pages cash it in. Both need to exist; neither replaces the other.

## The zipper: service × city
Cross a short list of services against a short list of cities to generate landing pages for commercial local-intent keywords ("web design ajax", "website designer whitby"). Two lists, zipped together:

- **Services:** Starter, Custom website design (Growth), Local SEO / Google Business Profile, Social content.
- **Cities:** see `src/_data/site.json` → `cities` (currently Ajax, Pickering, Whitby, Oshawa, Scarborough, Markham, Richmond Hill, Mississauga, Oakville) and the full region list in `/locations/`.

**Don't max this out.** A handful of real, differentiated city pages beats dozens of thin ones. Only build a city page when there's a real reason to believe someone searches for it (check `content/seo/keyword-map.md`, ideally verified in Search Console or Semrush, not guessed) — Google treats a wall of near-duplicate city pages as a negative signal, not a positive one.

## WebConvertPro is service-area, not multi-branch — this changes local SEO
We have one real address (Ajax, Ontario) and one real business, serving many cities. We are **not** a franchise with a local office in each city. So:
- Never invent a different phone number, address or "founded in X" story per city page. One real NAP (`src/_data/site.json`), used everywhere.
- City pages differentiate on content (what that city's building stock/bylaws/competition look like, which of our existing clients or demo sites are from there if any), not on fake local branch details.
- This is exactly what Google's own Business Profile guidance recommends for service-area businesses: hide the address, list the service area instead. See `/google-business-profile/` FAQ on the site for the public-facing version of this.

## AI SEO
Ranking well for AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude) follows the same playbook as ranking well for classic SEO: those tools still retrieve from the same indexed, crawlable, well-structured pages. There is no separate "AI SEO" checklist — static pages, clear structure, real schema and genuinely useful content serve both. Don't build a parallel workflow for it.

## Why static site generation is non-negotiable
Google (and AI crawlers) need to receive the finished HTML immediately, not wait for it to render client-side or fail to render at all. This site is built with Eleventy, which pre-renders every page to static HTML at build time — there is no server-rendering or client-side-only rendering step to break. Keep it that way: don't introduce client-side-only content (SPA routing, content injected only by JS after load) for anything that needs to rank. See `CLAUDE.md` for the hard rule.

## The black box, reverse-engineered
Nobody outside Google knows the full ranking algorithm, including Google employees who don't work on it. What's well understood: Google wants to keep serving ads, which means it wants people to keep coming back, which means it rewards pages that keep people satisfied (dwell time, low bounce, people not immediately hitting "back" to try a different result). The practical takeaway: write pages a real reader finishes and acts on. Every tactic in this project (voice, humour, real numbers, a clear next step) serves that one goal. Chasing an individual ranking signal instead of reader satisfaction is a bad trade.
