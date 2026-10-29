// Eleventy builds everything in /src into /_site. Netlify publishes /_site.
export default function (eleventyConfig) {
  // Copy images, CSS and JS to the built site unchanged
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Rebuild when assets change during `npm start`
  eleventyConfig.addWatchTarget("src/assets");

  // {{ date | dateLong }} -> "October 28, 2026"
  eleventyConfig.addFilter("dateLong", (d) =>
    new Intl.DateTimeFormat("en-CA", { dateStyle: "long", timeZone: "UTC" }).format(new Date(d))
  );
  // {{ date | dateISO }} -> "2026-10-28"
  eleventyConfig.addFilter("dateISO", (d) => new Date(d).toISOString().slice(0, 10));

  // {{ collections.posts | relatedPosts(page.url) }} -> up to 3 other posts
  eleventyConfig.addFilter("relatedPosts", (posts, url) => posts.filter((p) => p.url !== url).slice(0, 3));

  // {{ faqs | faqPageSchema }} -> a ready-to-dump FAQPage JSON-LD object
  eleventyConfig.addFilter("faqPageSchema", (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqs || []).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }));

  // Blog posts, newest first
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => b.date - a.date)
  );

  // Pages that go in sitemap.xml (anything not marked noindex)
  eleventyConfig.addCollection("sitemapPages", (api) =>
    api.getAll().filter((p) => !p.data.noindex && !p.data.excludeFromSitemap && p.url && p.url !== false)
  );

  // Every markdown image (blog post body) gets loading="lazy" automatically.
  // These are always below the fold (the hero image has its own eager-loaded <img>
  // in post.njk), so lazy-loading them is a free Core Web Vitals win on every post,
  // present and future, with nothing to remember per-post.
  eleventyConfig.amendLibrary("md", (mdLib) => {
    const defaultImageRenderer =
      mdLib.renderer.rules.image ||
      ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
    mdLib.renderer.rules.image = (tokens, idx, options, env, self) => {
      tokens[idx].attrSet("loading", "lazy");
      tokens[idx].attrSet("decoding", "async");
      return defaultImageRenderer(tokens, idx, options, env, self);
    };
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
