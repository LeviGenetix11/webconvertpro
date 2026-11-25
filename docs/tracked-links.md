# Tracked links for /preview/

Use these exact URLs in bios, captions and Stories so every submission on `/preview/` shows which platform and post it came from. The page captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and the referrer automatically and writes them into hidden form fields — nothing extra to do beyond using the right link.

Swap `organic-30day` for whatever campaign name actually matches what you're running; it's a placeholder, not a fixed value.

## Bio links (one per platform, permanent)

- **Instagram bio:** `https://webconvertpro.com/preview/?utm_source=instagram&utm_medium=social&utm_campaign=organic-30day&utm_content=bio`
- **Facebook bio/about:** `https://webconvertpro.com/preview/?utm_source=facebook&utm_medium=social&utm_campaign=organic-30day&utm_content=bio`
- **TikTok bio:** `https://webconvertpro.com/preview/?utm_source=tiktok&utm_medium=social&utm_campaign=organic-30day&utm_content=bio`
- **LinkedIn profile/company page:** `https://webconvertpro.com/preview/?utm_source=linkedin&utm_medium=social&utm_campaign=organic-30day&utm_content=bio`

## Per-post / per-video links

Use `utm_content=video-1`, `video-2`, and so on, one per post, so you can tell which specific video drove a submission (not just which platform).

- **Instagram Reels:** `https://webconvertpro.com/preview/?utm_source=instagram&utm_medium=social&utm_campaign=organic-30day&utm_content=video-1`
- **Facebook post/Reel:** `https://webconvertpro.com/preview/?utm_source=facebook&utm_medium=social&utm_campaign=organic-30day&utm_content=video-1`
- **TikTok video:** `https://webconvertpro.com/preview/?utm_source=tiktok&utm_medium=social&utm_campaign=organic-30day&utm_content=video-1`
- **LinkedIn post:** `https://webconvertpro.com/preview/?utm_source=linkedin&utm_medium=social&utm_campaign=organic-30day&utm_content=video-1`

Repeat with `video-2` through `video-10` (or higher) as you post. Template:

```
https://webconvertpro.com/preview/?utm_source=<platform>&utm_medium=social&utm_campaign=<campaign-name>&utm_content=video-<n>
```

## Stories (swipe-up / link sticker)

Stories don't have a persistent bio link, so tag each one individually:

- `https://webconvertpro.com/preview/?utm_source=instagram&utm_medium=social&utm_campaign=organic-30day&utm_content=story-<date-or-topic>`
- `https://webconvertpro.com/preview/?utm_source=facebook&utm_medium=social&utm_campaign=organic-30day&utm_content=story-<date-or-topic>`

Example: `...&utm_content=story-2026-11-25-roofing-tip`

## Where this data shows up

Every `/preview/` form submission (visible in Netlify → Forms → `preview-request`) includes hidden `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `referrer` and `landing_page` fields with whatever was in the URL when that visitor first landed, even if they didn't submit right away (it's cached in `sessionStorage` for that browser session). If GA4 is connected (`analyticsId` in `src/_data/site.json` — currently blank), the same `utm_source` also rides along on the `preview_cta_click`, `preview_form_start` and `preview_form_submit` events.

// TODO(Levi): pick real campaign names once you know your actual posting schedule/theme — "organic-30day" above is a placeholder, not something I invented as your real campaign.
