// Banner svíčka zdarma

document.addEventListener('DOMContentLoaded', function () {
  var headline = document.querySelector('.p-info-headline h1');
  var infoGrid = document.querySelector('.p-info-grid');

  if (!headline || !infoGrid) return;

  var title = headline.textContent.trim();
  var isAuthenticXmas = /^Vánoční balíček .* Authentic Beauty Concept$/i.test(title);

  if (!isAuthenticXmas) return;

  var banner = document.createElement('div');
  banner.innerHTML = `
    <a href="https://www.lukaslederer.cz/authentic-beauty-concept/?pv54=649">
      <img 
        src="https://www.lukaslederer.cz/user/documents/upload/bannery/Svicka.jpg"
        alt="Authentic Beauty Concept – dárek"
        style="width:100%; border-radius:10px; margin-bottom:20px; display:block;">
    </a>
  `;

  infoGrid.parentNode.insertBefore(banner, infoGrid.nextSibling);
});

// Banner u produktů se štítkem

document.addEventListener('DOMContentLoaded', function () {
  var infoGrid = document.querySelector('.p-info-grid');
  var flagContainer = document.querySelector('#main-slider .flags');

  if (!infoGrid || !flagContainer) return;

  var hasExtraGiftFlag = flagContainer.querySelector('.flag-darek-extra');

  if (!hasExtraGiftFlag) return;

  var banner = document.createElement('div');
  banner.innerHTML = `
    <a href="https://www.lukaslederer.cz/majovy-ulovek-od-authentic-beauty-concept/">
      <img 
        src="https://www.lukaslederer.cz/user/documents/upload/bannery/AkceABC2.jpg"
        alt="Authentic Beauty Concept – dárek navíc"
        style="width:100%; border-radius:10px; margin-bottom:20px; display:block;">
    </a>
  `;

  infoGrid.parentNode.insertBefore(banner, infoGrid.nextSibling);
});

// Badge „Přírodní složení“ – pouze pro produkty LERDEE (detail + kategorie výpis #products)

(function(){
  const BADGE_IMG="https://www.lukaslederer.cz/user/documents/upload/odznaky/prirodni-slozeni5-pad.png";
  const K="lerdee";

  const hasLerdee=s=>s&&s.toLowerCase().includes(K);

  function detail(){
    const h1=document.querySelector(".p-info-headline h1");
    if(!hasLerdee(h1&&h1.textContent))return;
    const main=document.querySelector(".gallery-new #main-slider");
    if(!main||main.querySelector(".js-product-badge--detail"))return;
    if(getComputedStyle(main).position==="static")main.style.position="relative";
    const b=document.createElement("img");
    b.className="js-product-badge js-product-badge--detail";
    b.src=BADGE_IMG;
    b.alt="Přírodní složení";
    main.appendChild(b);
  }

  function category(){
    const list=document.querySelector("#products.products-page:not(.products-additional):not(.products-related)");
    if(!list)return;
    list.querySelectorAll(".p").forEach(p=>{
      if(p.querySelector(".js-product-badge--cat"))return;
      const n=p.querySelector(".p-in-in .name span");
      if(!hasLerdee(n&&n.textContent))return;
      const a=p.querySelector("a.image");
      if(!a)return;
      if(getComputedStyle(a).position==="static")a.style.position="relative";
      const b=document.createElement("img");
      b.className="js-product-badge js-product-badge--cat";
      b.src=BADGE_IMG;
      b.alt="Přírodní složení";
      a.appendChild(b);
    });
  }

  function init(){ detail(); category(); }

  document.readyState==="loading"
    ? document.addEventListener("DOMContentLoaded",init)
    : init();

  new MutationObserver(init).observe(document.documentElement,{childList:true,subtree:true});
})();


// ===== Přesunuto z admin HTML kódů (2026-07-21) =====

// Věrnostní box na detailu produktu
document.addEventListener('DOMContentLoaded',function(){
  var t=document.querySelector('.p-info-grid');
  var b=document.body;
  var x=[];
  var m=document.querySelector('meta[itemprop="productID"]');
  var id=m?m.getAttribute('content'):null;
  if(x.includes(id))return;
  if(t){
    var l=b.classList.contains('is-logged');
    var d=document.createElement('div');
    d.className='loyalty-box-wrapper';
    d.innerHTML=`<div class="loyalty-box-content"><div class="loyalty-box-text">${l?'⭐ Věrnostní sleva je <strong>aktivní</strong>!':'🎁 Získejte <strong>2%</strong> slevu po <a href="/login/">přihlášení</a>.'}</div></div>`;
    t.parentNode.insertBefore(d,t.nextSibling);
  }
  var s=document.createElement('style');
  s.innerHTML=`
  .loyalty-box-wrapper{margin-top:-5px;width:100%}
  .loyalty-box-content{border-radius:10px;background:#faf0e4;padding:12px 10px;display:flex;align-items:center;justify-content:center;font-size:16px;color:#333;text-align:center;margin-bottom:20px}
  .loyalty-box-text a{color:var(--color-primary,#e67e22);text-decoration:underline}
  .loyalty-box-text strong{color:#000}`;
  document.head.appendChild(s);
});

// Blok objemových slev (flag-objemove-slevy)
document.addEventListener('DOMContentLoaded', function () {
  const flagExists = [...document.querySelectorAll('.flag-objemove-slevy')].some(el => !el.closest('.product'));
  const descBlock = document.querySelector('.p-short-description-block');
  if (flagExists && descBlock) {
    const newBlock = document.createElement('div');
    newBlock.className = 'custom-discount-block';
    newBlock.innerHTML = `
      <div class="discount-title">🔥 Nakup <span style="color:#fb4061;">víc</span>, zaplať <span style="color:#fb4061;">méně!</span></div>
      <div class="discount-desc">
        <div><strong>✅ Sleva 5%</strong> při nákupu nad <strong>500 Kč</strong></div>
        <div><strong>✅ Sleva 10%</strong> při nákupu nad <strong>1000 Kč</strong></div>
        <div><strong>✅ Sleva 15%</strong> při nákupu nad <strong>2000 Kč</strong></div>
         <div class="discount-note">Akce se vztahuje na celou objednávku.</div>
      </div>
    `;
    descBlock.insertAdjacentElement('afterend', newBlock);
  }
});

// Kupónová akce z flagu (flag-kupon-sleva, flag-black10/20)
// FIX 2026-07-22: flag nemusí být uvnitř .p-image — u produktů s gallery-new/splide
// ho Shoptet vykresluje v .p-image-wrapper (flags-inline). Hledáme proto v celém
// dokumentu a vylučujeme jen flagy z produktových karet (související produkty, výpisy).
// NOVÉ 2026-09-03: štítek propisuje i reálnou cenu po uplatnění kupónu. Cena se bere
// z aktuálně zobrazené ceny na detailu (tj. včetně věrnostní slevy i zvolené varianty)
// a přepočítá se při každé změně varianty / příplatku.
document.addEventListener("DOMContentLoaded", function() {

    var CONFIG = {
        // 'auto'  = zaokrouhlit na počet desetinných míst e-shopu (CZK → 681,59 Kč)
        // 'round' | 'ceil' | 'floor' = zaokrouhlit na celé koruny
        rounding: "auto",
        // vypsat i přeškrtnutou původní cenu
        showOriginal: true,
        label: "Cena s kódem:",
        // kliknutím na štítek uplatnit kupón (Shoptet AJAX /action/Cart/addDiscountCoupon/)
        clickToApply: true
    };

    var possibleFlags = [
        { selector: ".flag-kupon-sleva", className: "custom-discount-info" },
        { selector: ".flag-black10", className: "custom-discount-black" },
        { selector: ".flag-black20", className: "custom-discount-black" }
    ];

    if (document.querySelector(".coupon-banner")) return;

    var couponElement = null;
    var classToApply = "custom-discount-info";
    for (var i = 0; i < possibleFlags.length; i++) {
        var els = document.querySelectorAll(possibleFlags[i].selector);
        for (var j = 0; j < els.length; j++) {
            if (!els[j].closest(".product") && !els[j].closest("#products")) {
                couponElement = els[j];
                classToApply = possibleFlags[i].className;
                break;
            }
        }
        if (couponElement) break;
    }
    if (!couponElement) return;

    var parts = couponElement.textContent.trim().match(/-?(\d+)%\s+s kódem\s+(\S+)/i);
    if (!parts || parts.length !== 3) return;

    var discount = parseFloat(parts[1]);
    var code = parts[2];

    var anchor = document.querySelector(".p-info-grid") || document.querySelector(".p-final-price-wrapper");
    if (!anchor) return;

    // --- sestavení štítku (stejné místo i text jako dosud, jen s cenovou částí navíc)
    var banner = document.createElement("div");
    banner.className = classToApply + " coupon-banner";

    var main = document.createElement("span");
    main.className = "cdi-main";
    main.appendChild(strong("🔥 AKCE:"));
    main.appendChild(document.createTextNode(" -" + parts[1] + "% s kódem "));
    main.appendChild(strong(code));
    banner.appendChild(main);

    var priceWrap = document.createElement("span");
    priceWrap.className = "cdi-price";
    priceWrap.style.display = "none";
    banner.appendChild(priceWrap);

    anchor.parentNode.insertBefore(banner, anchor.nextSibling);

    // POZOR: deklarace musi byt nad volanim init funkci — `var x = ...` se vykonava
    // az na svem radku a prepsalo by referenci nastavenou uvnitr enableApply().
    var busy = false;
    var pending = null;

    updatePrice();
    watchPrice();
    if (CONFIG.clickToApply) enableApply();

    // --- cena po kupónu ------------------------------------------------------

    function updatePrice() {
        var sep = separators();
        var el = visiblePriceElement();
        var raw = el ? readPriceText(el).trim() : "";
        var numbers = extractNumbers(raw, sep);

        // jedna jednoznačná cena = můžeme počítat; rozsah („od–do“) nebo nepřečtená
        // cena = necháme štítek v původní podobě, ať nikdy nesvítí nesmysl
        if (numbers.length !== 1 || !(numbers[0] > 0) || !(discount > 0) || discount >= 100) {
            priceWrap.style.display = "none";
            priceWrap.textContent = "";
            return;
        }

        var base = numbers[0];
        var discounted = round(base * (1 - discount / 100), sep);
        if (!(discounted > 0) || discounted >= base) {
            priceWrap.style.display = "none";
            priceWrap.textContent = "";
            return;
        }

        var prefix = /^\s*od\b/i.test(raw) ? "od " : "";

        priceWrap.textContent = "";
        priceWrap.appendChild(span("cdi-price-label", CONFIG.label));
        if (CONFIG.showOriginal) {
            var old = document.createElement("s");
            old.className = "cdi-price-old";
            old.textContent = prefix + format(base, sep);
            priceWrap.appendChild(old);
        }
        priceWrap.appendChild(strong(prefix + format(discounted, sep), "cdi-price-new"));
        priceWrap.style.display = "";
    }

    // Cenu hlídáme na cenovém bloku (štítek leží mimo něj, takže nehrozí smyčka)
    // + na Shoptet událostech kolem variant a příplatků.
    function watchPrice() {
        var scope = document.querySelector(".p-final-price-wrapper")
            || document.querySelector(".p-info-grid")
            || document.querySelector("#product-detail-form");
        if (scope && window.MutationObserver) {
            new MutationObserver(schedule).observe(scope, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
                attributeFilter: ["class", "style"]
            });
        }
        [
            "ShoptetSimpleVariantChange",
            "ShoptetSplitVariantParameterChange",
            "ShoptetSelectedParametersReset",
            "ShoptetVariantAvailable",
            "ShoptetVariantUnavailable",
            "ShoptetSurchargesPriceUpdated"
        ].forEach(function(evt) {
            document.addEventListener(evt, schedule);
        });
        window.addEventListener("load", schedule);
    }

    function schedule() {
        clearTimeout(pending);
        pending = setTimeout(updatePrice, 50);
    }

    // Text ceny nečteme přes innerText — Shoptet drží stránku v blank-mode
    // (visibility:hidden), kde innerText vrací prázdno. Procházíme proto uzly ručně
    // a přeskakujeme jen skutečně skryté varianty (no-display / noDisplay / display:none).
    function readPriceText(el) {
        var out = "";
        var nodes = el.childNodes;
        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            if (n.nodeType === 3) { out += n.nodeValue; continue; }
            if (n.nodeType !== 1) continue;
            if (n.classList && (n.classList.contains("no-display") || n.classList.contains("noDisplay"))) continue;
            if (window.getComputedStyle && getComputedStyle(n).display === "none") continue;
            out += readPriceText(n);
        }
        return out;
    }

    function visiblePriceElement() {
        // POZOR: cena NENÍ uvnitř .p-detail-info (tam jsou jen flagy, hodnocení a h1) —
        // leží v sourozeneckém sloupci .p-info-wrapper uvnitř #product-detail-form.
        var scope = document.querySelector("#product-detail-form")
            || document.querySelector(".p-detail-inner")
            || document.querySelector(".p-info-wrapper")
            || document;
        var selectors = [
            ".p-final-price-wrapper .price-final-holder",
            ".p-final-price-wrapper .price-final",
            ".price-final-holder"
        ];
        for (var s = 0; s < selectors.length; s++) {
            var nodes = scope.querySelectorAll(selectors[s]);
            for (var n = 0; n < nodes.length; n++) {
                var el = nodes[n];
                if (el.offsetWidth || el.offsetHeight || el.getClientRects().length) return el;
            }
        }
        return null;
    }

    // --- uplatnění kupónu kliknutím -----------------------------------------
    // Shoptet ma na to vlastni endpoint i vlastni hlasku: pri neprazdnem kosiku
    // vrati "Slevovy kupon byl uspesne pridan.", pri prazdnem kosiku odmitne
    // ("neni pouzitelny pro zadnou polozku v kosiku"). Prazdny kosik proto resime
    // sami — zkopirujeme kod do schranky, at zakaznik nedostane cervenou chybu.

    function enableApply() {
        if (!window.shoptet || !shoptet.config || !shoptet.config.addDiscountCouponUrl) return;
        if (!shoptet.cart || typeof shoptet.cart.ajaxSubmitForm !== "function") return;

        banner.classList.add("coupon-banner--clickable");
        banner.setAttribute("role", "button");
        banner.setAttribute("tabindex", "0");
        banner.setAttribute("title", "Uplatnit slevový kód " + code);

        banner.addEventListener("click", activate);
        banner.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                e.preventDefault();
                activate(e);
            }
        });
        document.addEventListener("ShoptetCartUpdated", refreshApplied);
        document.addEventListener("ShoptetCartAddDiscountCoupon", refreshApplied);
        refreshApplied();
    }

    function activate(e) {
        if (e) e.preventDefault();
        if (busy || isApplied()) return;
        if (cartIsEmpty()) { copyCode(); return; }
        busy = true;
        setTimeout(function() { busy = false; }, 1500);
        applyCoupon();
    }

    function applyCoupon() {
        var url = shoptet.config.addDiscountCouponUrl;
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", url);
        form.className = "csrf-enabled";
        form.style.display = "none";
        form.appendChild(hiddenInput("discountCouponCode", code));
        if (shoptet.csrf && shoptet.csrf.token) {
            form.appendChild(hiddenInput("__csrf__", shoptet.csrf.token));
        }
        document.body.appendChild(form);
        try {
            shoptet.cart.ajaxSubmitForm(url, form, "functionsForCart", "cart", true);
        } catch (err) {
            copyCode();
        }
        setTimeout(function() {
            if (form.parentNode) form.parentNode.removeChild(form);
        }, 5000);
    }

    // Kosik hlida hlavicka — updateCartButton() do #header .cart-count doplnuje <i>
    // s poctem polozek a tridu full. DataLayer je zaloha.
    function cartIsEmpty() {
        var btn = document.querySelector("#header .cart-count");
        if (btn) {
            var counter = btn.querySelector("i");
            if (counter && parseFloat(counter.textContent) > 0) return false;
            return !btn.classList.contains("full");
        }
        try {
            var cart = getShoptetDataLayer("cart");
            if (Array.isArray(cart)) return cart.length === 0;
        } catch (e) {}
        return true;
    }

    function isApplied() {
        try {
            var info = getShoptetDataLayer("cartInfo");
            var coupon = info && info.discountCoupon;
            if (coupon && !Array.isArray(coupon) && coupon.code) {
                return String(coupon.code).toUpperCase() === code.toUpperCase();
            }
        } catch (e) {}
        return false;
    }

    // Zadny vlastni prvek uvnitr stitku — jen trida, kdyby se chtel stav nastylovat.
    function refreshApplied() {
        banner.classList.toggle("is-applied", isApplied());
    }

    function copyCode() {
        var report = function(ok) {
            notify(ok
                ? "Kód " + code + " je zkopírovaný. Vlož ho v košíku do pole „Slevový kupón\"."
                : "Slevový kód " + code + " zadej v košíku do pole „Slevový kupón\".",
                ok ? "success" : "info");
        };
        if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
            navigator.clipboard.writeText(code).then(
                function() { report(true); },
                function() { report(legacyCopy()); }
            );
        } else {
            report(legacyCopy());
        }
    }

    function legacyCopy() {
        try {
            var ta = document.createElement("textarea");
            ta.value = code;
            ta.setAttribute("readonly", "");
            ta.style.position = "fixed";
            ta.style.top = "-1000px";
            document.body.appendChild(ta);
            ta.select();
            var ok = document.execCommand("copy");
            document.body.removeChild(ta);
            return ok;
        } catch (e) {
            return false;
        }
    }

    // Shoptetuv vlastni notifikacni system, at hlaska vypada jako od e-shopu
    function notify(text, type) {
        if (typeof window.showMessage === "function") {
            try {
                window.showMessage(text, type || "success");
                return;
            } catch (e) {}
        }
    }

    function hiddenInput(name, value) {
        var el = document.createElement("input");
        el.type = "hidden";
        el.name = name;
        el.value = value;
        return el;
    }

    // --- pomocné ------------------------------------------------------------

    function separators() {
        var cfg = (window.shoptet && shoptet.config) || {};
        var dec = cfg.decSeparator;
        var thou = cfg.thousandSeparator;
        var places = cfg.decPlaces;
        try {
            var ci = getShoptetDataLayer("currencyInfo");
            if (ci) {
                if (dec === undefined) dec = ci.decimalSeparator;
                if (thou === undefined) thou = ci.thousandSeparator;
                if (places === undefined) places = ci.priceDecimalPlaces;
            }
        } catch (e) {}
        places = parseInt(places, 10);
        return {
            dec: dec || ",",
            thou: thou === undefined ? " " : thou,
            places: isNaN(places) ? 2 : Math.abs(places)
        };
    }

    // "1 234,50 Kč" → [1234.5] ; "749 Kč – 899 Kč" → [749, 899] (rozsah = neukazujeme)
    function extractNumbers(text, sep) {
        var s = String(text).replace(/[\u00a0\u202f\u2009]/g, " ");
        s = s.replace(/(\d)[ ](?=\d)/g, "$1");
        if (sep.thou && sep.thou.trim()) {
            s = s.replace(new RegExp("(\\d)" + escapeRe(sep.thou) + "(?=\\d)", "g"), "$1");
        }
        var out = [];
        var re = /\d+(?:[.,]\d+)?/g;
        var m;
        while ((m = re.exec(s)) !== null) {
            var value = parseFloat(m[0].replace(",", "."));
            if (!isNaN(value)) out.push(value);
        }
        return out;
    }

    function round(value, sep) {
        switch (CONFIG.rounding) {
            case "ceil": return Math.ceil(value);
            case "floor": return Math.floor(value);
            case "round": return Math.round(value);
            default:
                var f = Math.pow(10, sep.places);
                return Math.round(value * f) / f;
        }
    }

    // Primárně Shoptetí formátovač — drží se nastavení měny e-shopu
    // (celé číslo bez desetinných míst, jinak 749,50 Kč).
    function format(value, sep) {
        try {
            if (typeof Number.prototype.ShoptetFormatAsCurrency === "function") {
                return value.ShoptetFormatAsCurrency();
            }
        } catch (e) {}
        var cfg = (window.shoptet && shoptet.config) || {};
        var symbol = cfg.currencySymbol;
        if (symbol === undefined) {
            try { symbol = getShoptetDataLayer("currencyInfo").symbol; } catch (e) { symbol = "Kč"; }
        }
        var left = false;
        try {
            left = cfg.currencySymbolLeft !== undefined
                ? Boolean(parseInt(cfg.currencySymbolLeft, 10))
                : Boolean(parseInt(getShoptetDataLayer("currencyInfo").symbolLeft, 10));
        } catch (e) {}
        var places = value % 1 === 0 ? 0 : sep.places;
        var chunks = Math.abs(value).toFixed(places).split(".");
        chunks[0] = chunks[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep.thou);
        var number = (value < 0 ? "-" : "") + chunks.join(sep.dec);
        return (left ? symbol + number : number + " " + symbol).trim();
    }

    function strong(text, className) {
        var el = document.createElement("strong");
        if (className) el.className = className;
        el.textContent = text;
        return el;
    }

    function span(className, text) {
        var el = document.createElement("span");
        el.className = className;
        el.textContent = text;
        return el;
    }

    function escapeRe(s) {
        return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
});

// Doprava 49 Kč / ZDARMA na detailu produktu
// FIX 2026-07-21: cena se čte primárně ze Shoptet data layeru — u přihlášených
// s věrnostní slevou je cena desetinná (489,02 Kč) a původní parsování přes
// replace(/[^\d]/g,"") z ní udělalo 48902 → falešná "Doprava ZDARMA".
document.addEventListener("DOMContentLoaded", function() {
  var box = document.querySelector(".availability-value");
  var priceBox = document.querySelector(".price-final-holder");
  if (box && box.textContent.includes("Skladem") && priceBox) {
    var price = NaN;
    try {
      var dl = getShoptetDataLayer("product");
      if (dl && dl.priceWithVat) price = parseFloat(dl.priceWithVat);
    } catch (e) {}
    if (isNaN(price)) {
      var t = priceBox.textContent.replace(/[\s ]/g, "").replace(",", ".");
      price = parseFloat(t.replace(/[^\d.]/g, ""));
    }
    var doprava = document.createElement("div");
    doprava.style.fontWeight = "600";
    doprava.style.marginTop = "-5px";
    doprava.style.marginBottom = "5px";
    doprava.style.color = "#dfb072";
    doprava.textContent = price > 498 ? "Doprava ZDARMA!" : "Doprava jen za 49 Kč!";
    box.insertAdjacentElement("afterend", doprava);
  }
});
