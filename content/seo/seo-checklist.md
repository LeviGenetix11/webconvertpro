# SEO checklists

## Before you publish any page or post
- [ ] One main keyword chosen, and it's in `keyword-map.md`
- [ ] **Title tag** 50 to 60 characters, keyword near the start (`seoTitle` for posts)
- [ ] **Meta description** 130 to 155 characters: benefit + keyword + a reason to click
- [ ] **One H1** containing the keyword
- [ ] Keyword appears in the first 100 words and in at least one H2
- [ ] 3 or more internal links with descriptive anchor text (never "click here")
- [ ] 1 or 2 links to trustworthy outside sources, if you cite facts
- [ ] Images compressed (under 200 KB), descriptive file name, alt text written
- [ ] Reads at a grade 8 level or lower
- [ ] Ends with one clear call to action
- [ ] URL is short, lowercase and uses hyphens
- [ ] No sentence you couldn't back up

## One-time setup (do this the week you launch)
- [ ] **Google Search Console:** add `https://webconvertpro.com`, verify, submit `/sitemap.xml`
- [ ] **Google Analytics 4:** create a property, then paste the `G-XXXXXXX` ID into `src/_data/site.json` (`analyticsId`)
- [ ] **Google Business Profile for WebConvertPro:** category "Web designer", service area = your cities, link to the site
- [ ] **Bing Webmaster Tools:** import from Search Console
- [ ] **Consistent business info (NAP):** same name, address (or service area) and phone everywhere
- [ ] **Citations:** Apple Maps Connect, Bing Places, Yelp, Yellow Pages Canada, BBB, Clutch
- [ ] Add your real phone number and address in `src/_data/site.json`
- [ ] Confirm `hello@webconvertpro.com` actually receives email

## Monthly
- [ ] Search Console: which queries and pages are getting impressions? Which have impressions but few clicks? Rewrite those titles.
- [ ] Update one older post with new information
- [ ] Publish 2 to 4 new posts
- [ ] Ask every client for a Google review
- [ ] Check form submissions in Netlify (Site → Forms)
- [ ] Check page speed on PageSpeed Insights for the home page (target 90+ mobile)

## Technical (already handled by this project)
Sitemap at `/sitemap.xml`, `robots.txt`, canonical tags, Open Graph tags, LocalBusiness / Service / FAQ / Article / Breadcrumb schema, mobile-first layout, clean URLs. Don't remove them.

## Things that hurt rankings
Copying text between city pages, stuffing keywords, buying links, publishing thin posts just to hit a schedule, fake reviews.
