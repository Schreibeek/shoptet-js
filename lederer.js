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

// Badge „Přírodní složení“ – pouze pro produkty LERDEE (detail + kategorie)

(function(){
  const BADGE_IMG="https://www.lukaslederer.cz/user/documents/upload/odznaky/prirodni-slozeni.png";
  const BRAND_KEYWORD="lerdee";

  /* ===== DETAIL PRODUKTU ===== */
  function detailHasBrand(){
    const h1=document.querySelector(".p-info-headline h1");
    return h1 && h1.textContent.toLowerCase().includes(BRAND_KEYWORD);
  }

  function injectDetailBadge(){
    if(!detailHasBrand())return;

    const main=document.querySelector(".gallery-new #main-slider");
    if(!main||main.querySelector(".js-product-badge"))return;

    if(getComputedStyle(main).position==="static")main.style.position="relative";

    const badge=document.createElement("img");
    badge.className="js-product-badge";
    badge.src=BADGE_IMG;
    badge.alt="Přírodní složení";

    main.appendChild(badge);
  }

  /* ===== KATEGORIE / VÝPIS PRODUKTŮ ===== */
  function injectCategoryBadges(){
    document.querySelectorAll(".p").forEach(card=>{
      if(card.querySelector(".js-product-badge"))return;

      const nameEl=card.querySelector(".p-in-in .name span");
      if(!nameEl||!nameEl.textContent.toLowerCase().includes(BRAND_KEYWORD))return;

      const imageLink=card.querySelector("a.image");
      if(!imageLink)return;

      if(getComputedStyle(imageLink).position==="static")imageLink.style.position="relative";

      const badge=document.createElement("img");
      badge.className="js-product-badge";
      badge.src=BADGE_IMG;
      badge.alt="Přírodní složení";

      imageLink.appendChild(badge);
    });
  }

  /* ===== INIT ===== */
  function init(){
    injectDetailBadge();
    injectCategoryBadges();
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init);
  }else{
    init();
  }

  new MutationObserver(init).observe(document.documentElement,{childList:true,subtree:true});
})();
