// Transparent-over-hero header: solid once scrolled past the hero
(function () {
  var header = document.querySelector('.site-header--transparent');
  if (!header) return;
  function update() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// Mobile navigation
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
  });
})();

// Before/after slider
(function () {
  document.querySelectorAll('.ba').forEach(function (ba) {
    var range = ba.querySelector('.ba-range');
    if (!range) return;
    var set = function (v) { ba.style.setProperty('--pos', v + '%'); };
    range.addEventListener('input', function () { set(range.value); });

    // One orchestrated load moment: sweep from mostly "before" to the middle.
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { set(range.value); return; }
    var start = 88, end = 38, t0 = null, dur = 1400, touched = false;
    range.addEventListener('pointerdown', function () { touched = true; });
    range.addEventListener('keydown', function () { touched = true; });
    set(start);
    function step(ts) {
      if (touched) return;
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var v = start + (end - start) * eased;
      set(v); range.value = Math.round(v);
      if (p < 1) requestAnimationFrame(step);
    }
    setTimeout(function () { requestAnimationFrame(step); }, 500);
  });
})();

// Pre-select service on the form from ?service= links
(function () {
  var sel = document.getElementById('f-service');
  if (!sel) return;
  var q = new URLSearchParams(window.location.search).get('service');
  if (q) { for (var i = 0; i < sel.options.length; i++) { if (sel.options[i].value === q) sel.selectedIndex = i; } }
})();

// Pre-fill city on the form from ?city= links (used by the service areas page)
(function () {
  var city = document.getElementById('f-city');
  if (!city) return;
  var q = new URLSearchParams(window.location.search).get('city');
  if (q) city.value = q;
})();

// Reusable lead-form attribution + conversion tracking.
// Any <form data-lead-form="some_name"> with hidden utm_source/utm_medium/utm_campaign/utm_content/utm_term/referrer/landing_page
// fields gets them auto-filled from the URL (persisted in sessionStorage across the visit), plus start/submit events.
// Any element with data-track-cta="some_name" fires a <name>_cta_click event on click.
// No personally identifiable information (name, email, phone) is ever sent to gtag/fbq here.
(function () {
  var keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var params = new URLSearchParams(window.location.search);
  var stored = {};
  try {
    keys.forEach(function (k) {
      var v = params.get(k);
      if (v) sessionStorage.setItem(k, v);
      stored[k] = sessionStorage.getItem(k) || "";
    });
    if (!sessionStorage.getItem("referrer") && document.referrer) sessionStorage.setItem("referrer", document.referrer);
    if (!sessionStorage.getItem("landing_page")) sessionStorage.setItem("landing_page", window.location.pathname);
    stored.referrer = sessionStorage.getItem("referrer") || "";
    stored.landing_page = sessionStorage.getItem("landing_page") || "";
  } catch (e) {
    stored = { utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "", referrer: "", landing_page: "" };
  }

  function track(name, extra) {
    if (typeof gtag !== "function") return;
    var payload = { utm_source: stored.utm_source || "" };
    for (var k in extra) payload[k] = extra[k];
    gtag("event", name, payload);
  }
  function trackMeta(name, data) {
    if (typeof fbq === "function") fbq("track", name, data || {});
  }
  window.wcpTrack = track;
  window.wcpTrackMeta = trackMeta;

  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    Object.keys(stored).forEach(function (k) {
      var field = form.querySelector('[name="' + k + '"]');
      if (field) field.value = stored[k];
    });
    var eventBase = form.getAttribute("data-lead-form");
    var started = false;
    form.addEventListener("focusin", function () {
      if (!started) { started = true; track(eventBase + "_form_start"); }
    });
    form.addEventListener("submit", function () { track(eventBase + "_form_submit"); trackMeta("Lead"); });
  });

  document.querySelectorAll("[data-track-cta]").forEach(function (el) {
    el.addEventListener("click", function () { track(el.getAttribute("data-track-cta") + "_cta_click"); });
  });
})();

// Footer year
(function () { var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear(); })();

// Scroll reveal — progressive enhancement only; elements with .reveal stay fully visible if this never runs
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, { threshold: .15 });
  targets.forEach(function (el) { el.classList.add('reveal-ready'); io.observe(el); });
})();
