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
