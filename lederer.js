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
    <a href="https://www.lukaslederer.cz/authentic-beauty-concept/darkovy-box-authentic-beauty-concept/">
      <img 
        src="https://www.lukaslederer.cz/user/documents/upload/bannery/3a1.jpg"
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
