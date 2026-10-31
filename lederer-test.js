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

  // ---------- Homepage: doplnění podle šablony PageHome v design systému ----------
  function qsa(sel) { return Array.prototype.slice.call(d.querySelectorAll(sel)); }
  function icon(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  }
  // Pilíře (TrustBar): ikona Lucide v kruhu a krátký text pod titulkem. Texty jsou z design systému.
  var TRUST = [
    { icon: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
      text: 'Nabízíme produkty, které sami používáme a známe z praxe.' },
    { icon: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
      text: 'Šampony, masky, styling i doplňky stravy pro zdravé vlasy.' },
    { icon: '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',
      text: 'Napište nám nebo využijte vlasovou poradnu.' }
  ];
  // Popisky nad nadpisy sekcí (SectionHeader).
  var EYEBROWS = { 'Doporučujeme': 'Výběr ze salonu', 'Novinky': 'Právě dorazilo', 'Nové články': 'Z blogu', 'Recenze': 'Ověřeno zákazníky' };

  function homepage() {
    if (!(d.body.classList.contains('type-index') || location.pathname === '/')) return;
    qsa('.list-icon.top .list-icon-detail').forEach(function (item, i) {
      if (!TRUST[i] || item.querySelector('.ll-trust-icon')) return;
      var ic = d.createElement('span');
      ic.className = 'll-trust-icon';
      ic.innerHTML = icon(TRUST[i].icon);
      item.insertBefore(ic, item.firstChild);
      var p = d.createElement('p');
      p.className = 'll-trust-text';
      p.textContent = TRUST[i].text;
      item.appendChild(p);
    });
    qsa('.homepage-group-title').forEach(function (h) {
      var label = EYEBROWS[(h.textContent || '').replace(/\s+/g, ' ').trim()];
      var prev = h.previousElementSibling;
      if (!label || (prev && prev.classList.contains('ll-eyebrow'))) return;
      var e = d.createElement('span');
      e.className = 'll-eyebrow';
      e.textContent = label;
      h.parentNode.insertBefore(e, h);
    });
  }

  // Emoji v menu a horní liště: design systém je povoluje jen v promo řádcích a newsletterech, v testu je skryjeme.
  var EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{1F000}-\u{1F2FF}]\uFE0F?|\uFE0F|\u200D/gu;
  function stripEmoji() {
    qsa('#navigation .menu-level-1 > li > a, .menu-helper .menu-level-1 > li > a, .top-navigation-bar-menu a').forEach(function (a) {
      var w = d.createTreeWalker(a, NodeFilter.SHOW_TEXT, null);
      var n;
      while ((n = w.nextNode())) {
        if (EMOJI.test(n.nodeValue)) { EMOJI.lastIndex = 0; n.nodeValue = n.nodeValue.replace(EMOJI, '').replace(/\s+$/, ''); }
        EMOJI.lastIndex = 0;
      }
    });
  }

  // Značky: místo plovoucího karuselu klidný pruh mezi linkami (každá značka jednou, odkaz na všechny značky).
  function brands() {
    var block = d.querySelector('.partners-block');
    if (!block || d.querySelector('.ll-brands')) return;
    var seen = {}, items = [];
    qsa('.partners-block .partners__item a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var img = a.querySelector('img');
      if (!img || !href || seen[href]) return;
      var src = img.currentSrc || img.getAttribute('data-src') || img.getAttribute('src') || '';
      if (!src || /^data:/.test(src)) return;
      seen[href] = 1;
      items.push({ href: href, src: src, alt: img.getAttribute('alt') || a.getAttribute('title') || '' });
    });
    if (items.length < 4) return;
    var wrap = d.createElement('div');
    wrap.className = 'container';
    var sec = d.createElement('section');
    sec.className = 'll-brands';
    sec.setAttribute('aria-label', 'Značky');
    var head = d.createElement('div');
    head.className = 'll-brands__head';
    var eb = d.createElement('span');
    eb.className = 'll-brands__eyebrow';
    eb.textContent = 'Značky, které používáme';
    var all = d.createElement('a');
    all.className = 'll-brands__all';
    all.href = '/znacky/';
    all.textContent = 'Všechny značky';
    head.appendChild(eb);
    head.appendChild(all);
    var ul = d.createElement('ul');
    ul.className = 'll-brands__list';
    items.slice(0, 10).forEach(function (it) {
      var li = d.createElement('li');
      var a = d.createElement('a');
      a.href = it.href;
      a.setAttribute('aria-label', it.alt || it.href);
      var im = d.createElement('img');
      im.src = it.src;
      im.alt = it.alt;
      im.loading = 'lazy';
      a.appendChild(im);
      li.appendChild(a);
      ul.appendChild(li);
    });
    sec.appendChild(head);
    sec.appendChild(ul);
    wrap.appendChild(sec);
    block.parentNode.insertBefore(wrap, block.nextSibling);
    root.classList.add('ll-has-brands');
  }

  onReady(badge);
  onReady(homepage);
  onReady(stripEmoji);
  onReady(function () { if (d.body.classList.contains('type-index') || location.pathname === '/') brands(); });
})();
