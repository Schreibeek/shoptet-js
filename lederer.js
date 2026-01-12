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

// Badge „Přírodní složení“ přes hlavní fotku – pouze pro produkty LERDEE
(function(){
  const BADGE_IMG="https://www.lukaslederer.cz/user/documents/upload/odznaky/prirodni-slozeni.png";
  const BRAND_KEYWORD="lerdee";

  function productHasBrand(){
    const h1=document.querySelector(".p-info-headline h1");
    if(!h1)return false;
    return h1.textContent.toLowerCase().includes(BRAND_KEYWORD);
  }

  function injectBadge(){
    if(!productHasBrand())return;

    const main=document.querySelector(".gallery-new #main-slider");
    if(!main||main.querySelector(".js-product-badge"))return;

    if(getComputedStyle(main).position==="static")main.style.position="relative";

    const badge=document.createElement("img");
    badge.className="js-product-badge";
    badge.src=BADGE_IMG;
    badge.alt="Přírodní složení";

    main.appendChild(badge);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",injectBadge);
  }else{
    injectBadge();
  }

  new MutationObserver(injectBadge).observe(document.documentElement,{childList:true,subtree:true});
})();
