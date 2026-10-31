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
    qsa('#navigation .menu-level-1 > li > a, .menu-helper .menu-level-1 > li > a, .top-navigation-bar-menu a, .empty-cart-boxes li > a').forEach(function (a) {
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

  // Pruh výhod (benefitBanner): barevné obrázky nahradí ikony Lucide podle názvu výhody. Neznámou výhodu nechá s obrázkem.
  var BENEFIT_ICONS = [
    { re: /dárek|darek/i, icon: '<path d="M12 7v14"/><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"/><rect x="3" y="7" width="18" height="4" rx="1"/>' },
    { re: /doprav|doruč|doruc/i, icon: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>' },
    { re: /věrnost|vernost|slev/i, icon: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>' },
    { re: /eko|přírod|prirod|zabal/i, icon: '<path d="M11 20a10 10 0 0 0 10-10 25.9 25.9 0 0 0-1.04-7.281 1 1 0 0 0-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0 0 11 20"/><path d="M2 21a5 5 0 0 1 2.911-4.544C7.613 15.212 8.351 15.24 11 13"/>' }
  ];
  function benefits() {
    qsa('.benefitBanner__item').forEach(function (item) {
      var pic = item.querySelector('.benefitBanner__picture');
      if (!pic || pic.classList.contains('ll-has-icon')) return;
      var img = pic.querySelector('img');
      var title = item.querySelector('.benefitBanner__title');
      var label = (title ? title.textContent : '') + ' ' + (img ? img.getAttribute('alt') || '' : '');
      for (var i = 0; i < BENEFIT_ICONS.length; i++) {
        if (BENEFIT_ICONS[i].re.test(label)) {
          pic.insertAdjacentHTML('beforeend', icon(BENEFIT_ICONS[i].icon));
          pic.classList.add('ll-has-icon');
          return;
        }
      }
    });
  }

  // Sleva po přihlášení na detailu produktu: emoji dárku nahradí ikona Lucide (buybox__note v design systému).
  function loyalty() {
    qsa('.loyalty-box-content').forEach(function (box) {
      var t = box.querySelector('.loyalty-box-text');
      if (!t || box.querySelector('.ll-loyalty-icon')) return;
      var w = d.createTreeWalker(t, NodeFilter.SHOW_TEXT, null);
      var n;
      while ((n = w.nextNode())) {
        if (EMOJI.test(n.nodeValue)) { EMOJI.lastIndex = 0; n.nodeValue = n.nodeValue.replace(EMOJI, '').replace(/^\s+/, ''); }
        EMOJI.lastIndex = 0;
      }
      var ic = d.createElement('span');
      ic.className = 'll-loyalty-icon';
      ic.innerHTML = icon(BENEFIT_ICONS[0].icon);
      box.insertBefore(ic, t);
    });
  }

  // Hodnocení jako v DS (ll-rating__value): hodnota s desetinnou čárkou do data-ll-value, CSS ji vypíše za hvězdy.
  // Karty ji mají v data-micro-rating-value, detail jen ve skrytém textu ("Průměrné hodnocení produktu je 4,6 z 5 hvězdiček").
  function ratings() {
    qsa('.stars-wrapper:not([data-ll-value])').forEach(function (el) {
      var v = parseFloat(el.getAttribute('data-micro-rating-value'));
      if (!(v > 0)) {
        var sr = el.querySelector('.sr-only');
        var m = sr && sr.textContent.match(/(\d+(?:[.,]\d+)?)\s*z\s*5/);
        v = m ? parseFloat(m[1].replace(',', '.')) : 0;
      }
      if (v > 0) el.setAttribute('data-ll-value', v.toFixed(1).replace('.', ','));
    });
  }

  // Otevřený filtr na mobilu (MobileFilters): tlačítko „Zobrazit produkty (32)“ v patičce je počet .filter-total-count,
  // klik na něj zavře list stejně jako křížek (tlačítko šablony Zavřít filtr). „Vymazat filtry“ vedle něj zůstává odkazem.
  // Filtr se po překreslení vyměňuje, proto delegace.
  function filtersSheet() {
    var mq = window.matchMedia ? window.matchMedia('(max-width: 767px)') : null;
    var html = d.documentElement;
    var lastTop = 0;
    function unveil() { return d.querySelector('.filters-unveil-button-wrapper .unveil-button'); }
    // List přes celou obrazovku jen po kliknutí na Otevřít filtr (třída ll-filters-sheet), ne když filtr otevře šablona sama
    d.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('.filters-unveil-button-wrapper .unveil-button')) return;
      lastTop = 0;
      setTimeout(function () { html.classList.toggle('ll-filters-sheet', d.body.classList.contains('filters-visible')); }, 0);
    });
    // Stránka s vybraným filtrem se načte s otevřeným filtrem: na mobilu ho zavřeme, ať jsou vidět produkty
    function closeOnLoad() {
      if (mq && mq.matches && d.body.classList.contains('filters-visible') && !html.classList.contains('ll-filters-sheet')) {
        var b = unveil();
        if (b) b.click();
      }
    }
    if (d.readyState === 'complete') setTimeout(closeOnLoad, 300); else window.addEventListener('load', closeOnLoad);
    // Po zaškrtnutí šablona filtr překreslí i s listem a ten by odskočil nahoru: pozici posunu si pamatujeme a vrátíme
    d.addEventListener('scroll', function (e) {
      var t = e.target;
      if (t && t.classList && t.classList.contains('filters-wrapper')) lastTop = t.scrollTop;
    }, true);
    if (window.MutationObserver) {
      new MutationObserver(function () {
        if (!lastTop || !d.body.classList.contains('filters-visible')) return;
        var w = d.querySelector('#filters-wrapper .filters-wrapper');
        if (w && !w.llKept) { w.llKept = true; if (w.scrollTop !== lastTop) w.scrollTop = lastTop; }
      }).observe(d.body, { childList: true, subtree: true });
    }
    d.addEventListener('click', function (e) {
      if (!d.body.classList.contains('filters-visible')) return;
      if (!window.matchMedia || !window.matchMedia('(max-width: 767px)').matches) return;
      if (!e.target.closest || !e.target.closest('#filters .filter-total-count')) return;
      var b = unveil();
      if (!b) return;
      e.preventDefault();
      b.click();
    });
  }

  // Košík (DS PageCart): kontakt z hlavičky košíku („Potřebujete pomoci?“) jako pomoc dole v panelu se souhrnem.
  // Košík se po změně množství překresluje, proto se pomoc vkládá znovu.
  function cartHelp() {
    if (!d.getElementById('cart-wrapper')) return;
    function tel(n) { var m = n.replace(/\s+/g, '').match(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/); return m ? m.slice(1).join(' ') : n; }
    function place() {
      var sum = d.querySelector('#cart-wrapper .cart-summary');
      if (!sum || sum.querySelector('.ll-cart-help')) return;
      var src = d.querySelector('.cart-header__contact');
      var mail = src && src.querySelector('a[href^="mailto:"]');
      var phone = src && src.querySelector('a[href^="tel:"]');
      if (!mail && !phone) return;
      var title = src.querySelector('h2, .h4');
      var box = d.createElement('div');
      box.className = 'll-cart-help';
      var t = d.createElement('span');
      t.textContent = title ? title.textContent.trim() : 'Potřebujete pomoci?';
      box.appendChild(t);
      [mail, phone].forEach(function (a) {
        if (!a) return;
        var href = a.getAttribute('href');
        var link = d.createElement('a');
        link.href = href;
        link.textContent = /^tel:/.test(href) ? tel(href.slice(4)) : href.replace(/^mailto:/, '');
        box.appendChild(link);
      });
      sum.appendChild(box);
    }
    // Kopie termínu doručení do souhrnu pod dopravu zdarma (pořadí dá CSS order), originál nad souhrnem CSS schová.
    // Hned v observeru (bez čekání), ať po překreslení košíku termín neproblikne na původním místě.
    function date() {
      var src = d.querySelector('#cart-wrapper .cart-content > .text-center > .delivery-time');
      var wrap = d.querySelector('#cart-wrapper .cart-summary .extras-wrapper');
      if (!src || !wrap) return;
      var cur = wrap.querySelector('.ll-cart-date');
      if (cur && cur.textContent === src.textContent) return;
      var box = d.createElement('div');
      box.className = 'll-cart-date';
      var copy = src.cloneNode(true);
      copy.removeAttribute('data-testid');
      box.appendChild(copy);
      if (cur) wrap.replaceChild(box, cur); else wrap.appendChild(box);
    }
    // Prázdný košík (i po odebrání poslední položky): telefon v kontaktu ve tvaru +420 724 000 360, emoji v kategoriích pryč
    function empty() {
      qsa('#cart-wrapper .cart-empty .contact-box a[href^="tel:"]').forEach(function (a) {
        var v = tel(a.getAttribute('href').slice(4));
        if (a.textContent !== v) a.textContent = v;
      });
      if (d.querySelector('#cart-wrapper .cart-empty')) stripEmoji();
    }
    empty();
    date();
    place();
    if (!window.MutationObserver) return;
    var t = 0;
    new MutationObserver(function () { date(); clearTimeout(t); t = setTimeout(function () { place(); empty(); }, 50); }).observe(d.body, { childList: true, subtree: true });
  }

  // Kroky objednávky: ZDARMA jako Zdarma (Shoptet píše verzálkami; rekapitulaci po změně dopravy překresluje, proto hned v observeru)
  function zdarma() {
    if (!d.body.classList.contains('ordering-process')) return;
    function run() {
      qsa('.payment-shipping-price, .recapitulation-shipping-billing-info > span, .cart-summary .price, .extra-delivery-price').forEach(function (e) {
        // jen textové uzly: na mobilu šablona vkládá do ceny i logo platby
        for (var n = e.firstChild; n; n = n.nextSibling) {
          if (n.nodeType === 3 && /^\s*ZDARMA\s*$/.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace('ZDARMA', 'Zdarma');
        }
      });
    }
    run();
    if (window.MutationObserver) new MutationObserver(run).observe(d.body, { childList: true, subtree: true });
  }

  onReady(badge);
  onReady(cartHelp);
  onReady(zdarma);
  onReady(filtersSheet);
  onReady(homepage);
  onReady(benefits);
  onReady(loyalty);
  onReady(stripEmoji);
  onReady(function () { if (d.body.classList.contains('type-index') || location.pathname === '/') brands(); });
  onReady(function () {
    ratings();
    // Karty donačtené filtrem, řazením nebo stránkováním
    if (!window.MutationObserver) return;
    var t = 0;
    new MutationObserver(function () { clearTimeout(t); t = setTimeout(ratings, 60); }).observe(d.body, { childList: true, subtree: true });
  });
})();
