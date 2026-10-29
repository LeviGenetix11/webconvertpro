# WebConvertPro website

Marketing site for WebConvertPro: web design for GTA service businesses. Built with [Eleventy](https://www.11ty.dev/) (a static site generator) and hosted on Netlify.

## Run it on your computer

1. Install **Node.js 20 or newer** (the LTS version) from nodejs.org.
2. Open this folder in VS Code, then open the terminal (Ctrl+` ).
3. Run:
   ```
   npm install
   npm start
   ```
4. Open **http://localhost:8080**. The page refreshes every time you save a file.

To make the real build: `npm run build` (output goes to `_site/`).

## Folder map

```
webconvertpro/
├── src/                      THE WEBSITE (edit here)
│   ├── index.njk             Home page
│   ├── services/              Service index (hub page linking to all 4 services below)
│   ├── starter/               Starter package page
│   ├── web-design/           Custom website (Growth) page
│   ├── google-business-profile/   Local SEO page
│   ├── social-media/         Content creation page
│   ├── locations/             Service area hub page (regions + cities across the GTA)
│   ├── contact/  thank-you/  privacy/  404.njk
│   ├── blog/
│   │   ├── index.njk         Blog listing
│   │   └── posts/            One .md file per post
│   ├── _data/site.json       Business name, email, phone, nav, analytics ID
│   ├── _includes/
│   │   ├── layouts/          base.njk (every page), post.njk (blog posts)
│   │   └── partials/         header, footer, lead form
│   └── assets/               css/, js/, img/
├── content/                  PLANNING MATERIAL (never published)
│   ├── seo/  blog-drafts/  social/  ads/  outreach/  brand/  templates/
├── docs/                     Deploy and how-to guides
├── eleventy.config.js        Build settings
├── netlify.toml              Netlify settings, redirects, security headers
└── package.json
```

## Everyday tasks

**Change your phone, email or nav:** edit `src/_data/site.json`. Add your Google Analytics ID there too (`analyticsId`).

**Change a price:** see `content/brand/offers-and-pricing.md` for every file it appears in. Use **Ctrl+Shift+F** to find the old number.

**Edit a page:** open the `.njk` file in `src/`. The top block between `---` lines is the page's title and description (these are your SEO tags). Everything below is the page content in HTML.

**Edit the header, footer or the quote form:** `src/_includes/partials/`. Changes apply to every page.

**Publish a blog post:** write in `content/blog-drafts/`, then move to `src/blog/posts/` named `YYYY-MM-DD-keyword-slug.md`. Details in `content/blog-drafts/README.md`.

**Add a new page:** copy any folder in `src/` (for example `web-design/`), rename it, and edit the front matter (`title`, `description`, `permalink`). Add it to the nav in `site.json` if you want a menu link. It's added to the sitemap automatically.

**Rename or delete a page:** add a redirect in `netlify.toml` so the old URL doesn't break.

## Deploy

See `docs/deploy-netlify.md`. In short: push this folder to GitHub, connect the repo to Netlify, and every push deploys automatically.

## SEO

Start with `content/seo/seo-checklist.md` and `content/seo/keyword-map.md`.

### Generating new pages automatically
`CLAUDE.md` (project root) trains Claude on this project's voice, SEO strategy and rules — read it first in any new session. Two slash-command skills build on it:

- **`/blog`** — generates a full blog post: picks an unused keyword, researches competitors, writes it in voice, optionally pulls a Pexels hero image, and publishes it.
- **`/service`** — generates a service × city landing page (the "zipper" strategy: 4 services × GTA cities), wired into the locations and services hub pages.

Both check `content/seo/used-keywords.md` first so they never duplicate a keyword, and both must pass `npm run build` before they're done. See `.claude/skills/blog/SKILL.md` and `.claude/skills/service/SKILL.md` for the full workflow, and `references/` for the voice, humour, stats, stories and opinions files they write from — fill those in with real material; they're deliberately empty of invented claims.

To fetch blog images, copy `.env.example` to `.env` and add a free Pexels API key from pexels.com/api.
