#!/usr/bin/env node
// One-off fetch for the homepage "Industries we serve" photo strip.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

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

const industries = {
  roofing: { query: "roofer installing shingles", alt: "Roofer installing shingles on a residential roof" },
  plumbing: { query: "plumber fixing pipe under sink", alt: "Plumber repairing a pipe under a sink" },
  electrical: { query: "electrician working on panel", alt: "Electrician working on an electrical panel" },
  hvac: { query: "hvac technician air conditioner", alt: "HVAC technician servicing an air conditioning unit" },
  landscaping: { query: "landscaper mowing lawn", alt: "Landscaper maintaining a lawn" },
  renovations: { query: "contractor renovating kitchen", alt: "Contractor renovating a kitchen" },
  cleaning: { query: "professional cleaner wiping surface", alt: "Professional cleaner wiping a surface" },
};

async function searchPexels(query, apiKey) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=square`;
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
  const env = { ...loadEnv(), ...process.env };
  const apiKey = env.PEXELS_API_KEY;
  if (!apiKey) { console.error("No PEXELS_API_KEY found."); process.exit(1); }

  const outDir = path.join(ROOT, "src", "assets", "img", "industries");
  mkdirSync(outDir, { recursive: true });

  const creditsPath = path.join(ROOT, "content", "seo", "pexels-credits.json");
  const credits = existsSync(creditsPath) ? JSON.parse(readFileSync(creditsPath, "utf8")) : {};
  credits["homepage-industries"] = credits["homepage-industries"] || {};

  for (const [key, { query, alt }] of Object.entries(industries)) {
    try {
      const photo = await searchPexels(query, apiKey);
      const destPath = path.join(outDir, `${key}.jpg`);
      await downloadImage(photo.src.medium, destPath);
      credits["homepage-industries"][key] = {
        alt, query, photographer: photo.photographer, photographerUrl: photo.photographer_url,
        pexelsUrl: photo.url, publicPath: `/assets/img/industries/${key}.jpg`,
      };
      console.log(`  ✓ ${key} <- "${query}" (photo by ${photo.photographer})`);
    } catch (err) {
      console.log(`  ✗ ${key} <- "${query}": ${err.message}`);
    }
  }

  mkdirSync(path.dirname(creditsPath), { recursive: true });
  writeFileSync(creditsPath, JSON.stringify(credits, null, 2) + "\n");
  console.log("Done.");
}

main();
