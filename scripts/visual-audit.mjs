// One-off Playwright audit script (dev-only, not part of the build).
// Checks horizontal overflow + oversized icon SVGs across key pages/widths,
// and saves screenshots for manual visual inspection.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:8080";
const pages = [
  "/", "/branding/", "/services/", "/web-design/", "/starter/",
  "/google-business-profile/", "/social-media/", "/about/", "/contact/",
  "/blog/", "/blog/how-to-choose-a-web-designer/", "/privacy/", "/preview/", "/locations/",
];
const widths = [375, 768, 1440];
const shotWidths = [390, 1440];
const shotPages = ["/", "/branding/"];

mkdirSync("scripts/screenshots", { recursive: true });

const browser = await chromium.launch();
const results = { overflow: [], bigIcons: [] };

for (const path of pages) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    if (!res || res.status() >= 400) {
      results.overflow.push(`${path} @ ${width}px: HTTP ${res ? res.status() : "no response"}`);
      await page.close();
      continue;
    }
    const overflowPx = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflowPx > 1) results.overflow.push(`${path} @ ${width}px: scrollWidth exceeds viewport by ${overflowPx}px`);

    const bigIcons = await page.evaluate(() => {
      const skip = (el) => el.closest(".logo, .hero-visual, .frame, .preview-frame, .mock-new, .mock-old, .work-frame, .brand-hero-concept, .concept-head, img");
      const found = [];
      document.querySelectorAll("svg").forEach((svg) => {
        if (skip(svg)) return;
        const r = svg.getBoundingClientRect();
        if (r.width > 64 || r.height > 64) {
          found.push(`${svg.closest("[class]")?.className || "svg"} -> ${Math.round(r.width)}x${Math.round(r.height)}`);
        }
      });
      return found;
    });
    if (bigIcons.length) results.bigIcons.push(`${path} @ ${width}px: ${bigIcons.join(" | ")}`);

    if (shotPages.includes(path) && shotWidths.includes(width)) {
      const safe = path.replace(/\//g, "_") || "_home";
      await page.screenshot({ path: `scripts/screenshots/${safe || "home"}_${width}.png`, fullPage: true });
    }
    await page.close();
  }
}

await browser.close();

console.log("=== HORIZONTAL OVERFLOW ===");
console.log(results.overflow.length ? results.overflow.join("\n") : "none found");
console.log("\n=== ICONS OVER 64px (outside logos/mockups) ===");
console.log(results.bigIcons.length ? results.bigIcons.join("\n") : "none found");
