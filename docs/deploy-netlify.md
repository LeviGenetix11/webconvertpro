# Deploy to Netlify

## Option A: connect GitHub (recommended, deploys on every push)

1. In VS Code, open the terminal and run:
   ```
   git init
   git add .
   git commit -m "Initial site"
   ```
2. Create an empty repository on github.com (private is fine). Follow GitHub's instructions to push this folder to it.
3. In Netlify: **Add new site → Import an existing project → GitHub**, choose the repo.
4. Netlify reads `netlify.toml` and fills in: build command `npm run build`, publish directory `_site`. Click **Deploy**.

Your site is live at a `*.netlify.app` address within a minute or two.

## Option B: drag and drop (fastest for a first look)

1. Run `npm run build`.
2. In Netlify: **Add new site → Deploy manually**, and drag the `_site` folder onto the page.

You'll need to repeat this every time you change something, so switch to Option A when you can.

## Turn on form notifications

1. Site configuration → **Forms** → make sure form detection is enabled, then redeploy once.
2. Forms → Form notifications → **Add notification → Email notification**, choose the `site-plan` form, and use your email.
3. Submit a test entry on the live site to confirm it arrives. Submissions are also stored in the Forms tab.

Check Netlify's current free-plan limit on monthly form submissions.

## Connect webconvertpro.com

1. Netlify → **Domain management → Add a domain** → `webconvertpro.com`.
2. Netlify shows the DNS records to add. Open your DNS settings at the company where you manage the domain (Hostinger, if that's where it is) and add exactly what Netlify shows. You can keep your domain and email at Hostinger.
3. Wait for DNS to update (minutes to a few hours), then in Netlify click **Verify** and enable **HTTPS** (free certificate).
4. Set `https://webconvertpro.com` as the primary domain and let Netlify redirect `www`.

## Email on your domain

Netlify doesn't host email. Keep email at Hostinger or use Google Workspace. When you change DNS, make sure the email (MX) records stay in place. Confirm `hello@webconvertpro.com` receives mail before launch.

## After launch

- Add the site in Google Search Console and submit `https://webconvertpro.com/sitemap.xml`
- Paste your GA4 ID into `src/_data/site.json`
- Walk through `content/seo/seo-checklist.md`
