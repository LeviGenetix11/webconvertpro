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

// Footer year
(function () { var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear(); })();
