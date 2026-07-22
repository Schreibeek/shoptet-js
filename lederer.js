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
document.addEventListener("DOMContentLoaded", function() {
    var possibleFlags = [
        { selector: ".flag-kupon-sleva", className: "custom-discount-info" },
        { selector: ".flag-black10", className: "custom-discount-black" },
        { selector: ".flag-black20", className: "custom-discount-black" }
    ];
    // FIX 2026-07-22: flag nemusí být uvnitř .p-image — u produktů s gallery-new/splide
    // ho Shoptet vykresluje v .p-image-wrapper (flags-inline). Hledáme proto v celém
    // dokumentu a vylučujeme jen flagy z produktových karet (související produkty, výpisy).
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
    if (couponElement) {
        var couponText = couponElement.textContent.trim();
        var parts = couponText.match(/-?(\d+)%\s+s kódem\s+(\S+)/i);
        if (parts && parts.length === 3) {
            var discount = parts[1];
            var code = parts[2];
            var newDiv = document.createElement("div");
            newDiv.innerHTML = '<strong>🔥 AKCE:</strong> -' + discount + '% s kódem <strong>' + code + '</strong>';
            newDiv.classList.add(classToApply);
            var infoGrid = document.querySelector(".p-info-grid");
            if (infoGrid) {
                infoGrid.parentNode.insertBefore(newDiv, infoGrid.nextSibling);
            }
        }
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
    doprava.textContent = price > 1998 ? "Doprava ZDARMA!" : "Doprava jen za 49 Kč!";
    box.insertAdjacentElement("afterend", doprava);
  }
});
