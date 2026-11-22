# GBP setup — Web Convert Pro

Generated via `SEO-local/references/gbp-setup.md`'s spec, applied to webconvertpro.com. This is planning material — review every TODO(Levi) before pasting anything into Google Business Profile.

---

## Research summary

**Business:** Web Convert Pro (webconvertpro.com)
**Website analyzed:** webconvertpro.com (homepage fetched live)
**Competitors analyzed** (local Ajax/Durham web design agencies, via web search — not GBP-verified listings, since I can't browse Google Maps directly):
1. **Impulsive Media Solutions** (Ajax, ON) · Full-service web design + print/signage · likely primary: Website designer
2. **The Web Club** (Ajax, ON) · Subscription web design + hosting + local SEO bundle — closest business-model match to Growth/Growth Partner · likely primary: Website designer
3. **CartExcel** (Ajax, ON) · 10+ years, web design + SEO + Google Ads + social · likely primary: Website designer

**Recommended primary category:** `Website designer`
Reasoning: website builds (Starter/Growth/Growth Partner) are the entry product and largest one-time revenue line; all three local competitors analyzed lead with web design, so this also mirrors the competitive set.

**Service area (SAB):** 20 cities across Durham, Toronto, York, Peel and Halton Region — pulled from the site's own `/locations/` page, within a normal GTA drive time (well under the 2-hour cap).
**Services extracted:** 6 real packages/services from the website (Starter, Growth, Growth Partner, Local SEO support, Organic content creation, Redesign). No invented services.
**Citation directories identified:** 7 Tier 1 (universal) + 4 Tier 2 (authority) + 5 Tier 3 (industry-specific, web-design/agency directories — researched live).
**Identity attributes recommended:** none assumed — see TODO in Section 7. Google's current identity attribute list is: Asian-owned, Black-owned, Latino-owned, LGBTQ+-owned, Disabled-owned, Indigenous-owned, Veteran-owned, Women-owned, Small business.
**Suspension risk flags:** `16 Bellotti Crescent` reads as a residential address. This matches what the project's own SEO strategy already says (`references/seo.md`: "hide the address, list the service area instead") — so this profile should be set up as a **Service Area Business with the address hidden**, not a storefront listing. Flagging this so it's deliberate, not accidental.

---

### 1. Identity

```yaml
legal_name: "Web Convert Pro"       # TODO(Levi): confirm this is the exact legal/registered name (vs. a sole proprietorship under your own name, or a numbered company)
dba_name: "Web Convert Pro"
year_founded: ""                     # TODO(Levi): not documented anywhere in the project — provide the real year
founders:
  - "Levi Lindsay"
website: "https://webconvertpro.com"
address: "16 Bellotti Crescent, Ajax, ON"   # TODO(Levi): confirm full address incl. postal code for GBP verification
address_visible: false               # Service Area Business — see suspension-risk flag above
phone: "(289) 512-8112"
```

**Rules check:**
- ✅ No keywords stuffed into the name
- ✅ Phone has a local (289) area code
- ⚠️ Confirm `year_founded` and the exact legal name before submitting

---

### 2. Categories

```yaml
primary_category: "Website designer"
secondary_categories:
  - "Internet marketing service"     # covers local SEO / GBP management
  - "Marketing agency"                # covers organic content / social media
  - "Marketing consultant"            # covers the discovery-call / monthly strategy angle (Growth Partner)
  - "Web hosting company"             # Growth and Growth Partner bundle hosting
  - "Design agency"                   # custom website design (Growth/Growth Partner)
  - ""                                 # TODO(Levi): verify 1-2 more via GBP autocomplete — see note
  - ""
  - ""
  - ""
```

**Verification notes:**
- `Website designer`, `Internet marketing service`, `Marketing agency`, `Marketing consultant`, `Web hosting company`, `Design agency` were all cross-confirmed live against two independent, regularly-updated category reference lists (Dalton Luka's and Local Dominator's GBP category lists) as of today.
- I deliberately left 4 secondary slots blank rather than fill them with unverified guesses. Candidates worth checking live in GBP's own autocomplete before adding: "SEO agency," "Social media marketing service," "Graphic designer" (only if logo design is confirmed back in scope — see pricing TODO below), "Advertising agency" (only if you actually run paid ads for clients, not just for Web Convert Pro's own acquisition — current site copy doesn't describe this as a client-facing service).
- Did not add "Advertising agency" as a secondary despite it showing up near the top category list, because the site currently describes paid ads only as Web Convert Pro's *own* acquisition channel (`content/ads/`), not a service sold to clients.

---

### 3. Services

```yaml
services:
  - name: "Starter website"
    description: "Fast, mobile-friendly website build for GTA home services businesses — conversion-focused design, click-to-call, basic on-page SEO, lead tracking. Starting at $799, one-time."
    price_tier: "$"
    type: "custom"
  - name: "Growth website"
    description: "Custom website build plus ongoing local visibility — directory listings, local SEO, Google Business Profile optimization, hosting and maintenance. Starting at $1,499 setup + $349/month."
    price_tier: "$$"
    type: "custom"
  - name: "Growth Partner"
    description: "Full-service package: everything in Growth plus a tracked business phone line, automations, email campaigns and a monthly strategy call. Starting at $1,499 setup + $699/month."
    price_tier: "$$$"
    type: "custom"
  - name: "Local SEO support"
    description: "Google Business Profile management for GTA home services businesses: profile optimization, posts, review system, monthly reporting. Starting at $299/month."
    price_tier: "$"
    type: "custom"
  - name: "Organic content creation"
    description: "Social media content planning, design and scheduling for GTA home services businesses — Instagram and Facebook. Starting at $399/month."
    price_tier: "$"
    type: "custom"
  - name: "Website redesign"
    description: "Redesign an existing site without losing Google rankings — full URL mapping and 301 redirects included. Priced as a Growth package."
    price_tier: "$$"
    type: "custom"
  # TODO(Levi): the predefined-service names below are commonly reported for the
  # "Website designer" category by third-party guides, but I could not confirm them
  # against Google's live service picker (it's account-specific, not publicly browsable).
  # Check these in your own GBP service editor and keep only what it actually offers:
  - name: "Website design"
    description: ""
    price_tier: ""
    type: "predefined (unverified — check GBP service picker)"
  - name: "Website redesign"
    description: ""
    price_tier: ""
    type: "predefined (unverified — check GBP service picker)"
```

---

### 4. Description (750 chars max)

```yaml
description: |
  Web Convert Pro builds fast, mobile-friendly websites for home services
  businesses across the GTA — contractors, renovators, roofers, plumbers,
  electricians, HVAC, landscapers, painters and cleaners. We build your new
  homepage first, free, so you see it before you pay anything. Starter sites
  from $799 one-time; Growth and Growth Partner add ongoing local SEO,
  Google Business Profile management and hosting, from $1,499 + $349/month.
  One business per trade per city, so your competitor can't get the same
  site. Based in Ajax, serving Durham, Toronto, York, Peel and Halton Region.
```

Character count: ~460 (room to spare under the 750 cap). First 100 characters lead with the niche + the free-preview hook, matching the site's own primary offer.

**Rules check:**
- ✅ No URLs
- ✅ No keyword stuffing — reads as plain sentences
- ✅ Primary differentiator ("free preview before you pay," "one business per trade per city") is real, already-published site copy, not invented

---

### 5. Hours

```yaml
hours:
  regular: {}       # TODO(Levi): not documented anywhere in the project — provide real hours
  holiday_hours: []
  is_24_7: false     # default to false until confirmed — don't claim 24/7 without a real answering process
  has_answering_service: false
```

**Note:** the spec flags leaving hours "unconfirmed" as a visibility killer, but I won't invent them. Fill this in before publishing — a solo-founder consultancy's hours are probably just "by appointment" or standard weekday hours, but that's your call, not mine to guess.

---

### 6. Photos brief

```yaml
photos_brief:
  exterior: []        # TODO(Levi): N/A if address stays hidden as a service-area business — skip or use a neutral GTA-area shot instead
  team:
    - "Levi Lindsay headshot — the About page already uses a placeholder silhouette (src/assets/img/about/founder-placeholder.svg); swap that and reuse the same photo here"
  work_in_progress:
    - "Before/after screenshots of real client sites once you have any (never the homepage's labeled 'Concept example' mockup — that's explicitly fictional, see src/index.njk)"
  products:
    - "Simple graphic for each of the 3 packages (Starter / Growth / Growth Partner) — could reuse the homepage pricing card design"
  monthly_upload_target: "3-5 new photos / month"
```

**Note:** no real client photos exist yet per this project's proof rules (`content/brand/brand.md`) — don't substitute stock photos or AI-generated "client work" and label it as real.

---

### 7. Attributes

```yaml
attributes:
  identity:
    # TODO(Levi): none assumed. If any apply (e.g. founder-owned/small business), add them —
    # otherwise leave this whole section blank rather than guess.
  accessibility: {}   # N/A for a service-area business with no physical storefront
  payments:
    - credit_cards: true   # TODO(Levi): confirm actual accepted payment methods
  amenities: {}        # N/A — no physical location customers visit
```

**Note:** "Small business" is a safe, almost-certainly-true identity attribute for a solo-founder agency, but I'm leaving even that for you to tick rather than assume anything about ownership structure.

---

### 8. Service area

```yaml
service_area:
  is_sab: true
  cities:
    - "Ajax"
    - "Pickering"
    - "Whitby"
    - "Oshawa"
    - "Toronto"
    - "Scarborough"
    - "North York"
    - "Etobicoke"
    - "Markham"
    - "Richmond Hill"
    - "Vaughan"
    - "Newmarket"
    - "Aurora"
    - "Mississauga"
    - "Brampton"
    - "Caledon"
    - "Oakville"
    - "Burlington"
    - "Milton"
    - "Halton Hills"
  max_drive_time: "under 1.5 hours from Ajax"
```

Pulled directly from `src/locations/index.njk`'s already-published region/city breakdown — 20 cities exactly (Google's soft cap), all real GTA municipalities already claimed as service area on the live site, none invented for this document.

---

### 9. Products

```yaml
products:
  - name: "Starter"
    description: "Just the website — starting at $799 one-time."
    price: "From $799"
    image_brief: "Starter pricing card graphic"
    linked_service_page: "https://webconvertpro.com/starter/"
  - name: "Growth"
    description: "Website + local visibility — starting at $1,499 + $349/month."
    price: "From $1,499 + $349/mo"
    image_brief: "Growth pricing card graphic"
    linked_service_page: "https://webconvertpro.com/web-design/"
  - name: "Growth Partner"
    description: "Website + phone + local visibility + content — starting at $1,499 + $699/month."
    price: "From $1,499 + $699/mo"
    image_brief: "Growth Partner pricing card graphic"
    linked_service_page: "https://webconvertpro.com/#pricing"
  - name: "Local SEO support"
    description: "Google Business Profile management — starting at $299/month."
    price: "From $299/mo"
    image_brief: "GBP management graphic"
    linked_service_page: "https://webconvertpro.com/google-business-profile/"
  - name: "Organic content creation"
    description: "Social media content, done for you — starting at $399/month."
    price: "From $399/mo"
    image_brief: "Social content graphic"
    linked_service_page: "https://webconvertpro.com/social-media/"
```

All 5 are real, already-priced packages from the live site — no gap-filling needed here.

---

### 10. Booking link

```yaml
booking:
  enabled: false
  platform: ""
  booking_url: ""
  fallback_cta: "Get my free preview"   # matches the site's actual CTA wording, not the spec's generic "Call now"
```

**Note:** the site runs on a lead form (`/contact/`), not a booking calendar, so there's nothing to connect here. `src/_data/site.json` has an unused `calendarUrl` field for a future Google Calendar booking flow — if that gets filled in later, this section should point there instead.

---

### 11. FAQ seed (for the website, not GBP — per the spec, Q&A is being phased out on GBP itself)

The site already has FAQ content on nearly every page with matching schema (`FAQPage` JSON-LD) — see `src/index.njk`, `/starter/`, `/web-design/`, `/google-business-profile/`. No new FAQ seed needed here; that box is already checked. One gap worth adding once you have real data: a GBP-specific FAQ like "Is Web Convert Pro based in my city?" answered honestly as a service-area business, if you want to pre-empt that question.

---

### 12. NAP citations (master record)

```yaml
nap_master:
  name: "Web Convert Pro"
  address: "16 Bellotti Crescent, Ajax, ON"   # TODO(Levi): confirm full format incl. postal code — hidden on public listings per SAB mode
  phone: "(289) 512-8112"

citation_directories:
  tier_1_universal:
    - "Google Business Profile"
    - "Apple Maps Connect"
    - "Bing Places"
    - "Yelp"
    - "Facebook Business Page"
    - "Foursquare"
    - "Yellow Pages"
  tier_2_authority:
    - "Better Business Bureau"
    - "Chamber of Commerce (Ajax/Durham chapter)"
    - "Nextdoor Business"
    - "MapQuest"
  tier_3_industry:   # researched live for web design / marketing agencies
    - "Clutch.co"
    - "DesignRush"
    - "Sortlist"
    - "GoodFirms"
    - "The Manifest"
```

**Rule:** NAP must be byte-identical everywhere — once the legal name, full address and phone format above are confirmed, use that exact string on every directory, no abbreviation swaps.

---

## Suspension-proofing checklist

- ✅ No keyword-stuffed business name
- ⚠️ **Residential-looking address** — set up as Service Area Business with address hidden (matches existing project policy in `references/seo.md`)
- ❓ Virtual office / shared address / multiple GBPs at this address — can't verify from here; confirm this is a real, single-business address
- ✅ Service area cities are all real, already-claimed GTA municipalities within normal drive time
- ❓ Home-based business — if `16 Bellotti Crescent` is a home address, SAB + hidden address (already planned above) is the correct, required setup, not optional

---

## What's still a placeholder

Before pasting anything into Google Business Profile:
1. **Legal business name** — confirm "Web Convert Pro" is exact (vs. a numbered company or sole proprietorship name)
2. **Full address with postal code** — only "16 Bellotti Crescent" was given
3. **Year founded**
4. **Business hours**
5. **4 more secondary categories** — verify live in GBP's own autocomplete (candidates suggested above)
6. **2 predefined service entries** — verify against GBP's actual service picker for the Website designer category
7. **Identity attributes** — none assumed, pick what's actually true
8. **Payment methods** — confirm beyond the assumed "credit cards"
9. Resolve whether logo design / graphic design is actually back in scope (it was removed from the pricing-card copy in an earlier pass, flagged as unresolved in `content/brand/offers-and-pricing.md`) — that decision affects whether "Graphic designer" belongs as a secondary category
