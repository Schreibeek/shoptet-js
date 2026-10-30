/* Lukáš Lederer - testovací vzhled podle design systému v2.
   Načítá se jen v prohlížeči, kde je zapnutý test (?lltest=1, přepínač je na začátku lederer.js).
   Styly jsou v shoptet-css/lederer-test.css pod html.ll-test. Tady je jen štítek vlevo dole:
   Porovnat dočasně vrátí původní vzhled na téhle stránce, Vypnout test ukončí (?lltest=0). */
(function () {
  'use strict';
  var d = document;
  var root = d.documentElement;

  function onReady(fn) { if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', fn); else fn(); }

  function offUrl() {
    try { var u = new URL(location.href); u.searchParams.set('lltest', '0'); return u.toString(); }
    catch (e) { return location.pathname + '?lltest=0'; }
  }

  // Styly štítku jsou tady, ne v lederer-test.css, aby štítek zůstal vidět i při porovnání s původním vzhledem.
  var UI_CSS =
    '.ll-test-badge{position:fixed;left:12px;bottom:12px;z-index:2147483000;display:flex;align-items:center;gap:6px;padding:6px 6px 6px 12px;' +
    'background:#201f1f;color:#fff;border-radius:4px;box-shadow:0 10px 30px -10px rgba(0,0,0,.45);font:500 13px/18px Poppins,system-ui,sans-serif;letter-spacing:0}' +
    '.ll-test-badge__label{display:flex;align-items:center;gap:8px;margin-right:4px;white-space:nowrap}' +
    '.ll-test-badge__label:before{content:"";width:8px;height:8px;border-radius:50%;background:#d9ad4c}' +
    '.ll-test-badge button,.ll-test-badge a{display:inline-flex;align-items:center;height:30px;padding:0 10px;margin:0;border-radius:3px;' +
    'font:500 13px/18px Poppins,system-ui,sans-serif;text-decoration:none;cursor:pointer;white-space:nowrap}' +
    '.ll-test-badge button{color:#fff;background:transparent;border:1px solid rgba(255,255,255,.35)}' +
    '.ll-test-badge button:hover{border-color:#fff}' +
    '.ll-test-badge button[aria-pressed="true"]{color:#201f1f;background:#d9ad4c;border-color:#d9ad4c}' +
    '.ll-test-badge a{color:#201f1f;background:#fff;border:1px solid #fff}' +
    '.ll-test-badge a:hover{background:#f5f2ee;border-color:#f5f2ee}' +
    '@media (max-width:480px){.ll-test-badge{left:8px;right:8px;bottom:8px;justify-content:space-between}}' +
    '@media print{.ll-test-badge{display:none}}';

  function badge() {
    if (d.querySelector('.ll-test-badge')) return;
    var st = d.createElement('style');
    st.id = 'll-test-ui';
    st.textContent = UI_CSS;
    d.head.appendChild(st);

    var b = d.createElement('div');
    b.className = 'll-test-badge';
    b.setAttribute('role', 'region');
    b.setAttribute('aria-label', 'Testovací vzhled');
    b.innerHTML =
      '<span class="ll-test-badge__label">Testovací vzhled</span>' +
      '<button type="button" aria-pressed="false" title="Dočasně ukáže původní vzhled této stránky">Porovnat</button>' +
      '<a href="' + offUrl() + '">Vypnout</a>';
    d.body.appendChild(b);

    var btn = b.querySelector('button');
    btn.addEventListener('click', function () {
      var showOriginal = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', showOriginal ? 'true' : 'false');
      btn.textContent = showOriginal ? 'Původní vzhled' : 'Porovnat';
      root.classList.toggle('ll-test', !showOriginal);
    });
  }

  onReady(badge);
})();
