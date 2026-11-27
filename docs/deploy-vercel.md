# Deploy to Vercel

Netlify stopped deploying because its usage credits ran out. This gets the same site live on Vercel instead. `netlify.toml` is left in place untouched — nothing stops you from going back to Netlify once it resets or is upgraded.

## 1. Connect the repo

1. Go to vercel.com, sign in (GitHub login is easiest).
2. **Add New → Project → Import** `LeviGenetix11/webconvertpro`.
3. Vercel reads `vercel.json` in this repo and fills in the build command (`npm run build`) and output directory (`_site`) automatically. Framework preset: choose **Other**.
4. Click **Deploy**. First deploy takes 1–2 minutes; you'll get a `*.vercel.app` URL.

## 2. Set up form handling (Formspree)

Every form on this site (contact, free preview, branding enquiry) used Netlify's built-in form handler, which doesn't exist on Vercel. It's now wired for **Formspree** instead, guarded by one blank config field so the site keeps building safely either way:

1. Create a free account at formspree.io.
2. Create one new form (any name — e.g. "WebConvertPro leads").
3. Copy its form ID from the endpoint URL: `https://formspree.io/f/`**`xxxxxxxx`** ← that part.
4. Paste it into `src/_data/site.json` → `"formspreeId": "xxxxxxxx"`.
5. Commit, push, redeploy. Both forms will now post to Formspree, redirect to the existing `/thank-you/` or `/preview/thanks/` pages after submit (same as before), and Formspree emails you each submission.

Until `formspreeId` is filled in, forms fall back to their old Netlify markup — harmless on Vercel (the form won't submit anywhere useful), but it means the build never breaks while you're mid-setup.

## 3. Connect webconvertpro.com

1. Vercel → your project → **Settings → Domains → Add** → `webconvertpro.com`.
2. Vercel shows the DNS records to add. Add them wherever you manage DNS for the domain (Namecheap).
3. Wait for DNS to propagate (minutes to a few hours), then Vercel auto-issues HTTPS.
4. If Netlify's domain is still attached there too, remove it from Netlify first (or your DNS points at whichever one still has the records) to avoid the two fighting over the same domain.

## After launch

Same as the Netlify checklist in `docs/deploy-netlify.md` — Search Console, GA4 ID in `site.json`, `content/seo/seo-checklist.md`. Nothing else about the site changes.
