// Returns a fresh value every time Eleventy builds, used as a cache-busting
// query string on the stylesheet/script links in the base layout so a new
// deploy is never served stale from a 7-day asset cache.
export default () => Date.now();
