// Lukáš Lederer - skripty webu (shoptet-js/lederer.js), načítá se v patičce přes HTML kódy Shoptetu.
// Nahoře původní úpravy (bannery, věrnostní box, objemové slevy, kupony, doprava), na konci doplňky vzhledu podle design systému v2.
// Původní verze je zálohovaná v backup/puvodni-vzhled-2026-11-03/.

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
    d.innerHTML=`<div class="loyalty-box-content"><div class="loyalty-box-text">${l?'Věrnostní sleva je <strong>aktivní</strong>!':'Získejte <strong>2%</strong> slevu po <a href="/login/">přihlášení</a>.'}</div></div>`;
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

// ===== Sdílená logika kupónových cen (detail produktu + výpis) ==============
// Cena se vždycky bere z právě zobrazené ceny, ne z data layeru — tím sedí
// i u přihlášeného zákazníka s věrnostní slevou a u zvolené varianty.
var LedererCoupon = (function() {

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

    // Text nečteme přes innerText — Shoptet drží stránku v blank-mode
    // (visibility:hidden), kde innerText vrací prázdno. Procházíme uzly ručně
    // a přeskakujeme jen skutečně skryté varianty.
    function readVisibleText(el) {
        var out = "";
        var nodes = el.childNodes;
        for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            if (n.nodeType === 3) { out += n.nodeValue; continue; }
            if (n.nodeType !== 1) continue;
            if (n.classList && (n.classList.contains("no-display") || n.classList.contains("noDisplay"))) continue;
            if (window.getComputedStyle && getComputedStyle(n).display === "none") continue;
            out += readVisibleText(n);
        }
        return out;
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

    function round(value, sep, mode) {
        switch (mode) {
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

    // "-9% s kódem DEVITKA" → { percent: 9, code: "DEVITKA" }
    function parseFlag(flagEl) {
        if (!flagEl) return null;
        var m = flagEl.textContent.trim().match(/-?(\d+)%\s+s kódem\s+(\S+)/i);
        if (!m) return null;
        var percent = parseFloat(m[1]);
        if (!(percent > 0) || percent >= 100) return null;
        return { percent: percent, code: m[2] };
    }

    // Z prvku s cenou spočítá cenu po kupónu. Vrátí null, když cena není
    // jednoznačná (rozsah "od–do", nezvolená varianta, nula) — radši nic než nesmysl.
    function priceAfterCoupon(priceEl, percent, rounding) {
        if (!priceEl) return null;
        var sep = separators();
        var raw = readVisibleText(priceEl).trim();
        var numbers = extractNumbers(raw, sep);
        if (numbers.length !== 1 || !(numbers[0] > 0)) return null;
        var base = numbers[0];
        var value = round(base * (1 - percent / 100), sep, rounding);
        if (!(value > 0) || value >= base) return null;
        return {
            base: base,
            value: value,
            prefix: /^\s*od\b/i.test(raw) ? "od " : "",
            baseText: format(base, sep),
            valueText: format(value, sep)
        };
    }

    function escapeRe(s) {
        return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    return {
        separators: separators,
        readVisibleText: readVisibleText,
        extractNumbers: extractNumbers,
        round: round,
        format: format,
        parseFlag: parseFlag,
        priceAfterCoupon: priceAfterCoupon
    };
})();

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
        clickToApply: true,
        // Shoptet kupón k prázdnému košíku nepřijme. "copy" = jen zkopírovat kód do
        // schránky; "addToCart" = vložit tenhle produkt a hned uplatnit kód.
        emptyCartAction: "copy"
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

    function readPriceText(el) {
        return LedererCoupon.readVisibleText(el);
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
        busy = true;
        setTimeout(function() { busy = false; }, 3000);
        if (cartIsEmpty()) {
            if (CONFIG.emptyCartAction === "copy") { busy = false; copyCode(); return; }
            addToCartThenApply();
            return;
        }
        applyCoupon();
    }

    // Kupón se váže na položky košíku, ne na session — s prázdným košíkem ho Shoptet
    // odmítne ("není použitelný pro žádnou položku v košíku"). Vložíme proto nejdřív
    // tenhle produkt (přes skutečný formulář, takže platí zvolená varianta i množství)
    // a kód uplatníme až na úspěšné vložení.
    function addToCartThenApply() {
        var form = document.getElementById("product-detail-form");
        if (!form || !shoptet.config.addToCartUrl) { busy = false; copyCode(); return; }

        var fallback = null;
        var onAdded = function() {
            document.removeEventListener("ShoptetCartAddCartItem", onAdded);
            clearTimeout(fallback);
            setTimeout(applyCoupon, 300);
        };
        // varianta nezvolená / vyprodáno → Shoptet vypíše svou chybu a událost nepřijde
        fallback = setTimeout(function() {
            document.removeEventListener("ShoptetCartAddCartItem", onAdded);
            busy = false;
        }, 8000);

        document.addEventListener("ShoptetCartAddCartItem", onAdded);
        try {
            shoptet.cart.ajaxSubmitForm(shoptet.config.addToCartUrl, form, "functionsForCart", "cart", true);
        } catch (err) {
            clearTimeout(fallback);
            document.removeEventListener("ShoptetCartAddCartItem", onAdded);
            busy = false;
            copyCode();
        }
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

    // --- pomocné (výpočet ceny je ve sdíleném LedererCoupon) ----------------

    function separators() {
        return LedererCoupon.separators();
    }

    function extractNumbers(text, sep) {
        return LedererCoupon.extractNumbers(text, sep);
    }

    function round(value, sep) {
        return LedererCoupon.round(value, sep, CONFIG.rounding);
    }

    function format(value, sep) {
        return LedererCoupon.format(value, sep);
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

});

// Cena po kupónu i ve výpisu produktů (kategorie, vyhledávání, související)
// Chip se vkládá pod cenu na kartě. Barvu si bere z kupónového flagu té karty —
// kampaňové CSS v adminu flag přebarvuje, takže se cena barví spolu s kampaní.
(function() {

    var CONFIG = {
        rounding: "auto",
        label: "s kódem",
        // podíl barvy flagu v pozadí chipu
        backgroundAlpha: 0.1
    };

    var FLAGS = ".flag-kupon-sleva, .flag-black10, .flag-black20";
    var CLASS = "p-coupon-price";

    function decorate(card) {
        if (card.querySelector("." + CLASS)) return;
        var flag = card.querySelector(FLAGS);
        if (!flag) return;
        var info = LedererCoupon.parseFlag(flag);
        if (!info) return;
        var priceBox = card.querySelector(".prices .price-final") || card.querySelector(".price-final");
        if (!priceBox) return;

        // U zlevněných produktů je uvnitř .price-final i přeškrtnutá původní cena
        // (.price-standard) — výsledná částka je v <strong>, tak počítáme z něj.
        var priceSource = priceBox.querySelector("strong") || priceBox;

        // null = cena není jednoznačná (rozsah, nezvolená varianta, nula) → nic nepíšeme
        var price = LedererCoupon.priceAfterCoupon(priceSource, info.percent, CONFIG.rounding);
        if (!price) return;

        var chip = document.createElement("span");
        chip.className = CLASS;
        chip.textContent = CONFIG.label + " " + price.prefix + price.valueText;
        paint(chip, flag);
        priceBox.parentNode.insertBefore(chip, priceBox.nextSibling);
    }

    // Kampaňové CSS obarvuje flag gradientem, tak sáhneme po jeho první barvě;
    // jinak po background-color (Shoptet ho dává inline z nastavení štítku).
    function paint(chip, flag) {
        var rgb = flagColor(flag);
        if (!rgb) return; // necháme výchozí barvu z CSS
        rgb = darkenForContrast(rgb);
        chip.style.color = "rgb(" + rgb.join(",") + ")";
        chip.style.backgroundColor = "rgba(" + rgb.join(",") + "," + CONFIG.backgroundAlpha + ")";
    }

    function flagColor(flag) {
        if (!window.getComputedStyle) return null;
        var cs = getComputedStyle(flag);
        var gradient = String(cs.backgroundImage || "").match(/rgba?\([^)]+\)/);
        return (gradient && parseRgb(gradient[0])) || parseRgb(cs.backgroundColor);
    }

    function parseRgb(value) {
        var m = String(value).match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.]+))?/i);
        if (!m) return null;
        if (m[4] !== undefined && parseFloat(m[4]) === 0) return null; // průhledné
        return [Math.round(+m[1]), Math.round(+m[2]), Math.round(+m[3])];
    }

    // Světlý štítek by na bílé kartě nebyl čitelný — ztmavíme na kontrast 4,5:1.
    function darkenForContrast(rgb) {
        var out = rgb.slice();
        for (var i = 0; i < 12 && contrastOnWhite(out) < 4.5; i++) {
            out = [Math.round(out[0] * 0.85), Math.round(out[1] * 0.85), Math.round(out[2] * 0.85)];
        }
        return out;
    }

    function contrastOnWhite(rgb) {
        var lum = 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
        return 1.05 / (lum + 0.05);
    }

    function channel(value) {
        value = value / 255;
        return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    }

    function run() {
        var cards = document.querySelectorAll(".p");
        for (var i = 0; i < cards.length; i++) decorate(cards[i]);
    }

    var pending = null;
    function schedule() {
        clearTimeout(pending);
        pending = setTimeout(run, 120);
    }

    function init() {
        run();
        [
            "ShoptetDOMPageContentLoaded",
            "ShoptetDOMPageMoreProductsLoaded",
            "ShoptetDOMSearchResultsLoaded",
            "ShoptetDOMContentChanged"
        ].forEach(function(evt) {
            document.addEventListener(evt, schedule);
        });
        // stránkování, filtry a "načíst další" dosypávají karty i mimo Shoptet události
        if (window.MutationObserver && document.body) {
            new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
        }
    }

    document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", init)
        : init();
})();

// Doprava 49 Kč / ZDARMA na detailu produktu (ZDARMA od 1999 Kč včetně)
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
    doprava.textContent = price >= 1999 ? "Doprava ZDARMA!" : "Doprava jen za 49 Kč!";
    box.insertAdjacentElement("afterend", doprava);
  }
});

/* ===== Vzhled podle design systému v2 (ostrý od 3. 11. 2026, dřív lederer-test.js) =====
   Doplňky šablony, které samotné CSS neudělá: pilíře a popisky sekcí na homepage, pruh značek, ikony výhod,
   hodnocení s číslem, mobilní filtr, pomoc a termín v košíku, Zdarma v objednávce a drobné opravy textů. */
(function () {
  'use strict';
  var d = document;
  var root = d.documentElement;

  function onReady(fn) { if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', fn); else fn(); }

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

  // Sleva po přihlášení na detailu produktu: ikona Lucide před textem (buybox__note v design systému).
  function loyalty() {
    qsa('.loyalty-box-content').forEach(function (box) {
      var t = box.querySelector('.loyalty-box-text');
      if (!t || box.querySelector('.ll-loyalty-icon')) return;
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
    // Prázdný košík (i po odebrání poslední položky): telefon v kontaktu ve tvaru +420 724 000 360
    function empty() {
      qsa('#cart-wrapper .cart-empty .contact-box a[href^="tel:"]').forEach(function (a) {
        var v = tel(a.getAttribute('href').slice(4));
        if (a.textContent !== v) a.textContent = v;
      });
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

  onReady(cartHelp);
  onReady(zdarma);
  onReady(filtersSheet);
  onReady(homepage);
  onReady(benefits);
  onReady(loyalty);
  // Prázdné odstavce z editoru (jen &nbsp;) na textových stránkách a v článcích dělají díry: označit a schovat (třída ll-blank v CSS).
  function blankParas() {
    qsa('body.type-page .pageArticleDetail [itemprop="about"] p, body.type-post .news-item-detail .text p').forEach(function (p) {
      if (p.querySelector('img, iframe, video, picture, svg, input, button')) return;
      if (!p.textContent.replace(/[\s\u00a0]+/g, '')) { p.classList.add('ll-blank'); return; }
      // mezera (&nbsp;) na začátku odstavce posouvala oddíly o znak doprava
      var f = p.firstChild;
      while (f && f.nodeType === 3 && !f.nodeValue.replace(/[\s\u00a0]+/g, '')) { var n = f.nextSibling; p.removeChild(f); f = n; }
      if (f && f.nodeType === 3) f.nodeValue = f.nodeValue.replace(/^[\s\u00a0]+/, '');
    });
  }
  onReady(blankParas);
  // Kroužek focusu jen při ovládání klávesnicí. Shoptet po zavření okna košíku nebo přihlášení (po najetí myší) vrací focus
  // na tlačítko a Chrome to bere jako :focus-visible, tlačítko pak zůstalo obtažené. Myš a dotyk drží třídu ll-pointer,
  // klávesy pro pohyb po stránce (Tab, šipky, Enter, mezerník, Esc…) ji odeberou.
  function focusMode() {
    var KEYS = /^(Tab|Arrow|Enter|Escape|Home|End|PageUp|PageDown| $)/;
    var on = function () { root.classList.add('ll-pointer'); };
    on();
    d.addEventListener('pointerdown', on, true);
    d.addEventListener('mousemove', on, { capture: true, passive: true });
    d.addEventListener('keydown', function (e) { if (KEYS.test(e.key)) root.classList.remove('ll-pointer'); }, true);
  }
  focusMode();
  // Texty recenzí vypisuje Shoptet s odřádkováním a mezerami na začátku; se zachovanými řádky (pre-line) by začínaly prázdným řádkem.
  function reviewText() {
    qsa('#ratingsList .vote-content').forEach(function (el) {
      var f = el.firstChild, l = el.lastChild;
      if (f && f.nodeType === 3) f.nodeValue = f.nodeValue.replace(/^\s+/, '');
      if (l && l.nodeType === 3) l.nodeValue = l.nodeValue.replace(/\s+$/, '');
      el.classList.add('ll-pre');
    });
  }
  onReady(reviewText);
  // Přidat hodnocení rozbaluje formulář třídou visible, ale aria-expanded nechává false; srovnáme ho se stavem formuláře.
  function rateFormExpanded() {
    var btn = d.querySelector('[data-testid="buttonAddRating"]'), form = d.getElementById('rate-form');
    if (!btn || !form) return;
    var sync = function () { btn.setAttribute('aria-expanded', form.classList.contains('visible') ? 'true' : 'false'); };
    sync();
    new MutationObserver(sync).observe(form, { attributes: true, attributeFilter: ['class'] });
  }
  onReady(rateFormExpanded);
  // Okno po přidání do košíku: Shoptet dává #colorbox třídu colorbox--order až po doběhnutí animace (asi 250 ms),
  // takže při prvním otevření je chvíli vidět klasické okno uprostřed a až pak se změní na postranní panel. Obsah
  // .advanced-order je v okně hned od otevření: třídu podle něj přidáme dřív, než se okno vykreslí (MutationObserver
  // běží před překreslením). Šablona třídu po zavření nechává, takže jiná okna (galerie, Hlídat cenu) by vypadala jako
  // panel: u jiného obsahu ji odebereme. Prázdné okno (při zavírání) nechává třídu beze změny.
  function orderDrawerEarly() {
    var watch = function (box) {
      var sync = function () {
        var loaded = box.querySelector('#cboxLoadedContent');
        if (!loaded || !loaded.firstElementChild) return;
        box.classList.toggle('colorbox--order', !!loaded.querySelector('.advanced-order'));
      };
      new MutationObserver(sync).observe(box, { childList: true, subtree: true });
      sync();
    };
    var box = d.getElementById('colorbox');
    if (box) { watch(box); return; }
    var wait = new MutationObserver(function () {
      var el = d.getElementById('colorbox');
      if (el) { wait.disconnect(); watch(el); }
    });
    wait.observe(d.body, { childList: true });
  }
  onReady(orderDrawerEarly);
  onReady(function () { if (d.body.classList.contains('type-index') || location.pathname === '/') brands(); });
  onReady(function () {
    ratings();
    // Karty donačtené filtrem, řazením nebo stránkováním
    if (!window.MutationObserver) return;
    var t = 0;
    new MutationObserver(function () { clearTimeout(t); t = setTimeout(ratings, 60); }).observe(d.body, { childList: true, subtree: true });
  });
})();
