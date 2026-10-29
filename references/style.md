# Style mechanics

Small, consistent decisions so new pages match the old ones without a human re-deciding each time.

## Language
- Canadian English in prose: "colour" in copy where it's not a searched term, "optimize" where that matches what people actually type into Google (search terms win over dictionary spelling).
- Province is "Ontario" on first mention per page, "ON" in schema/addresses.
- "GTA" is fine on second mention; spell out "Greater Toronto Area" at least once per page that uses it, for readers who land from outside the region.

## Numbers and money
- Prices: `$499`, `$999`, `$349/mo`, `$79/mo` or `$79/month` depending on space — match the existing pattern on the page you're editing. Starter is $499; Growth is $999 — don't mix them up, they sit close together on several pages. Growth is written as "From $999 one-time, then $349/month" (or "from $999 + $349/mo" where space is tight) — not as a single combined figure, and never a bare "$999" without "from"/"starting at."
- Always CAD; don't add "CAD" inline in body copy (it's in the schema and footer already), but do say so explicitly on the contact and pricing sections.
- Percentages and stats: one decimal max ("2.35%"), always cited (`<cite>` tag, see `.stats` block in `styles.css`) with the real source.
- Round numbers don't get ".0" — "$499" not "$499.00".

## Dates
- `YYYY-MM-DD` in filenames and front matter.
- Rendered on-page as "October 28, 2026" (the `dateLong` filter in `eleventy.config.js` already does this — use it, don't hardcode a date string).

## URLs and slugs
- Lowercase, hyphenated, no stop words removed artificially ("how-much-does-a-business-website-cost-ontario" is fine as-is).
- Service pages: `/<service>/` (existing) or `/<service>-<city>/` for zipper pages (e.g. `/web-design-ajax/`) — keep service first, city second, to match how `keyword-map.md` plans them.
- Blog posts: `/blog/<slug>/` via the `YYYY-MM-DD-slug.md` filename convention in `content/blog-drafts/README.md`.

## Headings
- Exactly one `<h1>` per page.
- Headings are statements people would actually say, not label words: "How is a website live in one day?" beats "Timeline."
- Title case is not used; sentence case throughout ("Starter" and "Growth", proper names, are the exception).

## Links
- Internal links use descriptive anchor text, never "click here" or "learn more" on its own.
- External links (citing a stat or a source) open in the same tab unless citing a long external resource — match existing pages, none currently force `target="_blank"`.

## Schema
- Every page type already has a pattern to copy: `ProfessionalService` + `WebPage` + `FAQPage` (home, contact), `Service` + `BreadcrumbList` + `FAQPage` (service pages), `BreadcrumbList` (+ `ItemList` where relevant) (hub pages). Copy the nearest existing example; don't write JSON-LD from scratch.
