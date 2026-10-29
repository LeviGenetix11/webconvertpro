# WebConvertPro — project rules

Marketing site for WebConvertPro: web design, local SEO and social content for GTA service businesses. This file is read before any content or SEO work — treat it the way you'd train a new hire.

## Tech stack
- **Framework:** Eleventy (`@11ty/eleventy`), templates in Nunjucks (`.njk`), posts in Markdown.
- **Rendering:** Static Site Generation. Every page is pre-rendered to plain HTML at build time — there is no server or client-side rendering step. This is a hard requirement, not a preference: Google (and AI crawlers) need the finished HTML immediately. Never introduce content that only appears after client-side JS runs, a runtime API route, or anything that needs a server at request time.
- **Hosting:** Netlify, auto-deploys on push (`netlify.toml`). Forms use Netlify Forms (`data-netlify="true"` in `lead-form.njk`) — don't swap this for a different form backend without updating that.
- **Styling:** one hand-written stylesheet, `src/assets/css/styles.css`. No framework, no utility classes, no build step for CSS. Reuse existing classes before inventing new ones — see `references/style.md`.
- **Content model:** page content lives directly in `.njk` files under `src/` (front matter + markup); blog posts are Markdown files under `src/blog/posts/`. No database, no CMS.

## Read before writing any customer-facing copy
| File | What it is |
|---|---|
| `references/voice.md` | Sentence rhythm, banned words, AI-written tells |
| `references/humour.md` | How and where we use dry humour |
| `references/style.md` | Mechanical conventions (numbers, dates, URLs, headings) |
| `references/cta.md` | Canonical button text and form copy — reuse, don't rephrase |
| `references/stats.md` | The only numbers you're allowed to cite |
| `references/stories.md` | The only anecdotes you're allowed to use (one per post max, or none) |
| `references/opinions.md` | The only "hot takes" you're allowed to use (one per post max, or none) |
| `content/brand/brand.md` | Brand voice summary, colours, fonts, proof rules |

**Proof rule, non-negotiable:** never invent testimonials, client names, review counts, case studies, or stats. If `stats.md`/`stories.md`/`opinions.md` don't have what you need, make the point a different way or skip it. A plausible-sounding fake is worse than an honest gap.

## SEO workflow
| File | What it is |
|---|---|
| `references/seo.md` | Strategy: blog-for-authority + service-pages-for-money, the service×city zipper rule, why we're service-area not multi-branch, AI SEO |
| `content/seo/keyword-map.md` | Which keyword goes on which page/future page |
| `content/seo/used-keywords.md` | Keywords already spent — check before picking a new one |
| `content/seo/seo-checklist.md` | The pre-publish checklist — every item applies to every new page |
| `.claude/skills/blog/SKILL.md` | `/blog` — generates a new blog post end-to-end |
| `.claude/skills/service/SKILL.md` | `/service` — generates a new service×city landing page end-to-end |

Keyword data in `keyword-map.md` is currently **unverified estimates** — the project has a Semrush connection but no API units available as of the last check. Before trusting a volume/difficulty number enough to build a page around it, verify it in Google Search Console, Keyword Planner, or Semrush once units are available. Don't let Claude invent search volume or difficulty numbers — if there's no verified number, say so and proceed on topical judgement instead (does a real person actually ask this?).

## Development rules
1. **Read first.** Before any content task, read this file plus whichever `references/*` files apply.
2. **Look before you create.** Check `content/seo/used-keywords.md` and the existing `src/` tree before adding a new page — don't duplicate a keyword or a route.
3. **One keyword, one page.** Never target the same primary keyword on two pages.
4. **Build before you say done.** Run `npm run build` after any content or template change. Zero errors, and spot-check the generated file under `_site/` for the page you touched.
5. **Do exactly what's asked.** Don't restructure nav, pricing, or unrelated pages as a side effect of a content task.
6. **Ask before scope changes.** New top-level folders, a new page type, changing the deploy target, or anything touching money/pricing/legal copy — check first.

## File structure
```
webconvertpro/
├── src/                        THE WEBSITE (edit here)
│   ├── index.njk                Home page
│   ├── services/                Service index (hub)
│   ├── locations/               Service-area index (hub)
│   ├── starter/  web-design/  google-business-profile/  social-media/   Service pages
│   ├── contact/  thank-you/  privacy/  404.njk
│   ├── blog/
│   │   ├── index.njk             Blog listing
│   │   └── posts/                 One .md file per post (YYYY-MM-DD-slug.md)
│   ├── _data/site.json           Business name, email, phone, nav, cities — single source of truth for NAP
│   ├── _includes/layouts/ partials/
│   └── assets/css/ js/ img/
├── content/                     PLANNING MATERIAL (never published)
│   ├── seo/   keyword-map.md, used-keywords.md, seo-checklist.md, content-calendar.md
│   ├── brand/ brand.md, offers-and-pricing.md
│   ├── blog-drafts/   write new posts here first, then move into src/blog/posts/
│   └── templates/   starting points for new content types
├── references/                  VOICE & STRATEGY (read before writing copy)
├── .claude/skills/               /blog and /service generators
├── docs/                         Deploy and how-to guides
├── eleventy.config.js
├── netlify.toml
└── package.json
```

## Testing
Before marking any content or template task done:
- `npm run build` completes with no errors.
- The new/changed page appears under `_site/` at the expected path.
- `_site/sitemap.xml` includes the new URL (it's automatic via the `sitemapPages` collection — don't hand-edit the sitemap).
- JSON-LD blocks are present and valid (no unescaped quotes breaking the `<script type="application/ld+json">` block).
- Internal links resolve to real pages (no link to a route that doesn't exist yet).
- Re-read `references/voice.md` → "Tells that it's AI-written" against the new copy and delete anything that matches.

Never say "done" if the build is failing or the copy still reads as AI-written.
