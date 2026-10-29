# Outscraper settings for no-website leads

**Tool:** Outscraper → Google Maps Data Scraper

**One niche per run.** Locations: one city at a time (Ajax, Pickering, Whitby, Oshawa, Clarington, Scarborough, Markham, Richmond Hill, Vaughan, Brampton, Mississauga).

## Niches (best first)
1. general contractor, basement renovation
2. roofing contractor
3. landscaper, interlock contractor, paving contractor
4. HVAC contractor, furnace repair
5. painter, house painter
6. house cleaning service, commercial cleaning service
7. car detailing service, mobile detailing

## Filters
| Field | Rule |
|---|---|
| site | is blank |
| phone | is not blank |
| business_status | OPERATIONAL |
| reviews | 5 or more (use 3 or more for more volume) |
| rating | 4.0 or more |

## Enrichments
- Emails & Contacts (catches the occasional email, plus Facebook and Instagram links)
- Phone enricher (mobile vs landline: call mobiles first)

## Export
XLSX. Save to `lead-lists/` named `YYYYMMDD-niche-city.xlsx`. **That folder is ignored by Git** because it contains personal data.

## Lead sheet columns
Business | Trade | City | Phone | Phone type | Email | Facebook / Instagram | Rating | Reviews | Preview built? | Preview link | Call 1 date | Outcome | Next step | Follow-up date | Notes
