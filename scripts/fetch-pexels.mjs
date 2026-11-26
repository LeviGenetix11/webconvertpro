#!/usr/bin/env node
// Downloads free stock photos from Pexels for a blog post, and records attribution.
//
// Usage: node scripts/fetch-pexels.mjs <slug>
// Reads image requests from the `posts` table below (edit it before running), downloads
// each one into src/assets/img/blog/<slug>/<key>.jpg, and appends credit metadata to
// content/seo/pexels-credits.json so we can give credit later if we choose to.
//
// Requires PEXELS_API_KEY in a .env file at the project root (see .env.example).
// Get a free key at https://www.pexels.com/api/ (create an account, request a key).
//
// Attribution is NOT required by the Pexels license, but we keep a record anyway —
// it's good practice and costs nothing.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// --- load .env (no dependency needed for one key) ---
function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) return {};
  const out = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

// --- image requests per blog post slug ---
// Each key becomes a filename under src/assets/img/blog/<slug>/<key>.jpg
// `query` is what we search Pexels for; `alt` is the alt text used on the page.
const posts = {
  // Example — the /blog skill adds a new entry here before running this script:
  // "plumber-for-low-water-pressure": {
  //   hero: { query: "plumber fixing pipe", alt: "Plumber repairing a water pressure valve" },
  // },
  "how-to-improve-website-conversion-rate": {
    hero: { query: "business analytics dashboard laptop", alt: "Website analytics dashboard showing visitor and conversion data" },
    "good-conversion-rate": { query: "line graph chart growth", alt: "Chart showing a conversion rate trending upward" },
    "conversion-event": { query: "contractor checking smartphone", alt: "Tradesperson checking a phone for a new lead notification" },
    "next-step-obvious": { query: "website homepage laptop screen", alt: "Clean website homepage with a clear call-to-action button" },
    "phone-one-tap": { query: "hand holding smartphone call", alt: "Person tapping a phone number to call a business directly" },
    "cut-form-fields": { query: "filling online form tablet", alt: "Simple online contact form filled out on a tablet" },
    "load-speed-mobile": { query: "smartphone loading screen hand", alt: "Smartphone screen showing a fast-loading website" },
    "trust-proof": { query: "five star rating review screen", alt: "Five-star customer review shown on a screen" },
    "google-business-profile": { query: "map location pin city street", alt: "Map pin marking a local business location" },
    "drop-off-data": { query: "analytics heatmap computer screen", alt: "Analytics heatmap showing where website visitors click" },
  },
  "how-much-does-a-business-website-cost-ontario": {
    hero: { query: "canadian dollars calculator invoice", alt: "Calculator and invoice representing a website cost estimate" },
    "price-levels": { query: "price comparison chart tiers", alt: "Chart comparing three pricing tiers" },
    "changes-price": { query: "web designer working laptop", alt: "Web designer working on a laptop" },
    "costs-forget": { query: "small business owner reviewing invoice", alt: "Small business owner reviewing an invoice" },
    "try-before-buy": { query: "handshake business agreement", alt: "Handshake confirming a business agreement" },
  },
  "what-to-put-on-a-contractor-website-homepage": {
    hero: { query: "contractor laptop website", alt: "Contractor reviewing a website on a laptop" },
    "headline-service-area": { query: "contractor working job site", alt: "Contractor working at a job site" },
    "phone-easy-tap": { query: "tradesperson phone call", alt: "Tradesperson taking a call on a phone" },
    "reviews-near-cta": { query: "customer review rating screen", alt: "Customer review and star rating shown on a screen" },
    "your-real-work": { query: "renovation before after", alt: "Before and after renovation photos" },
    "proof-legitimate": { query: "contractor license certificate", alt: "Contractor license and certification documents" },
  },
  "how-long-does-local-seo-take-to-work": {
    hero: { query: "calendar growth chart desk", alt: "Calendar and upward growth chart representing a local SEO timeline" },
    "timeline-calendar": { query: "desk calendar planning", alt: "Calendar and growth chart on a desk" },
    "checking-rankings": { query: "business owner laptop charts", alt: "Small business owner checking search rankings on a laptop" },
    "gbp-map-search": { query: "smartphone map search pin", alt: "Google Business Profile shown on a smartphone map search" },
  },
  "how-much-does-local-seo-cost": {
    hero: { query: "calculator map pin desk", alt: "Calculator and local map pin representing local SEO pricing" },
    "calculator-map-pin": { query: "calculator coins desk", alt: "Calculator sitting next to a local map pin icon" },
    "monthly-report-review": { query: "business owner reviewing report laptop", alt: "Business owner reviewing a monthly report on a laptop" },
    "storefront-map-pin": { query: "small storefront street sign", alt: "Small business storefront with a Google Maps pin overlay" },
  },
  "how-to-get-more-google-reviews": {
    hero: { query: "person using smartphone review", alt: "Customer leaving a Google review on a smartphone" },
    "leaving-review-phone": { query: "hand holding phone typing", alt: "Customer leaving a Google review on a smartphone" },
    "qr-code-scan": { query: "qr code scan smartphone", alt: "QR code being scanned with a smartphone" },
    "five-star-reviews": { query: "five star rating review", alt: "Five-star reviews displayed for a local business" },
  },
  "how-to-choose-a-web-designer": {
    hero: { query: "business owner comparing laptop options", alt: "Business owner comparing web design options on a laptop" },
    "comparing-options": { query: "person comparing options laptop desk", alt: "Business owner comparing web design options on a laptop" },
    "launch-timeline": { query: "calendar desk planning date", alt: "Calendar showing a website launch date" },
    "trade-specific-site": { query: "contractor tablet quote job site", alt: "Contractor reviewing a quote request on a tablet" },
  },
  "how-long-does-it-take-to-build-a-website": {
    hero: { query: "clock calendar desk planning", alt: "Clock and calendar representing a website build timeline" },
    "clock-calendar": { query: "clock calendar desk", alt: "Clock and calendar representing a website build timeline" },
    "gathering-files": { query: "small business owner photos files laptop", alt: "Small business owner gathering photos and files for a website" },
  },
  "how-often-should-i-post-on-social-media": {
    hero: { query: "social media content calendar phone", alt: "Monthly social media content calendar planned on a phone" },
    "posting-consistency": { query: "smartphone social media feed scrolling", alt: "Scrolling a business's social media feed on a smartphone" },
    "batch-content-day": { query: "contractor taking photo job site phone", alt: "Contractor taking a photo on a job site for social media" },
  },
};

async function searchPexels(query, apiKey) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: apiKey } });
  if (!res.ok) throw new Error(`Pexels search failed (${res.status}): ${await res.text()}`);
  const data = await res.json();
  if (!data.photos || !data.photos.length) throw new Error(`No Pexels results for "${query}"`);
  return data.photos[0];
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buf);
}

async function main() {
  const slug = process.argv[2];
  const env = { ...loadEnv(), ...process.env };
  const apiKey = env.PEXELS_API_KEY;

  if (!slug) {
    console.error("Usage: node scripts/fetch-pexels.mjs <slug>");
    process.exit(1);
  }
  if (!apiKey) {
    console.error("No PEXELS_API_KEY found. Copy .env.example to .env and add your key, or skip images for this post.");
    process.exit(1);
  }
  const requests = posts[slug];
  if (!requests) {
    console.error(`No image requests defined for slug "${slug}". Add an entry to the \`posts\` object in scripts/fetch-pexels.mjs first.`);
    process.exit(1);
  }

  const outDir = path.join(ROOT, "src", "assets", "img", "blog", slug);
  mkdirSync(outDir, { recursive: true });

  const creditsPath = path.join(ROOT, "content", "seo", "pexels-credits.json");
  const credits = existsSync(creditsPath) ? JSON.parse(readFileSync(creditsPath, "utf8")) : {};
  credits[slug] = credits[slug] || {};

  for (const [key, { query, alt }] of Object.entries(requests)) {
    try {
      const photo = await searchPexels(query, apiKey);
      const destPath = path.join(outDir, `${key}.jpg`);
      await downloadImage(photo.src.large, destPath);
      credits[slug][key] = {
        alt,
        query,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url,
        pexelsUrl: photo.url,
        publicPath: `/assets/img/blog/${slug}/${key}.jpg`,
      };
      console.log(`  ✓ ${key} <- "${query}" (photo by ${photo.photographer})`);
    } catch (err) {
      console.log(`  ✗ ${key} <- "${query}": ${err.message}`);
    }
  }

  mkdirSync(path.dirname(creditsPath), { recursive: true });
  writeFileSync(creditsPath, JSON.stringify(credits, null, 2) + "\n");
  console.log(`Done. Images in src/assets/img/blog/${slug}/, credits recorded in content/seo/pexels-credits.json`);
}

main();
