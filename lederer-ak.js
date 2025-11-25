document.addEventListener('DOMContentLoaded', function () {
  // Funkce, která vrátí true jen pro produkty se značkou Acca Kappa
  function isAccaKappa() {
    // 1) pokus č.1 – značka z DOMu (to, cos posílal: data-testid="productCardBrandName")
    var brandSpan = document.querySelector('a[data-testid="productCardBrandName"] span');
    if (brandSpan) {
      var brandText = brandSpan.textContent.trim().toLowerCase();
      if (brandText === 'acca kappa') {
        return true;
      } else {
        return false; // značka existuje, ale není to Acca Kappa → rovnou skončíme
      }
    }

    // 2) fallback – značka z dataLayeru (shoptet.product.manufacturer)
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      for (var i = 0; i < window.dataLayer.length; i++) {
        var item = window.dataLayer[i];
        if (item && item.shoptet && item.shoptet.product && typeof item.shoptet.product.manufacturer === 'string') {
          var manufacturer = item.shoptet.product.manufacturer.trim().toLowerCase();
          if (manufacturer === 'acca kappa') {
            return true;
          } else {
            return false;
          }
        }
      }
    }

    // 3) jinak ne – nenašli jsme Acca Kappa
    return false;
  }

  // 1) Podmínka – běž jen tehdy, pokud je brand Acca Kappa
  if (!isAccaKappa()) return;

  // 2) Najdi základní popis
  var basic = document.querySelector('.basic-description');
  if (!basic) return;

  // 3) Přidej class na wrapper, ať ho můžeme v CSS udělat jako flex
  var wrapper = basic.closest('.description-inner');
  if (wrapper) {
    wrapper.classList.add('ak-two-cols');
  }

  // 4) Vytvoř vedlejší sloupec s informací o značce
  var brandBox = document.createElement('aside');
  brandBox.className = 'ak-brand-box';

  brandBox.innerHTML = `
    <h3 class="ak-brand-title">O značce Acca Kappa</h3>
    <img src="/user/documents/upload/acca-kappa/Acca Kappa - cat.jpg" alt="Acca Kappa" class="ak-brand-img">
    <p class="ak-brand-text">
      Acca Kappa je ikonická italská značka s dlouhou tradicí výroby kartáčů a luxusní péče o vlasy.
      Spojuje kvalitní materiály, funkční design a maximální šetrnost k vlasům i pokožce hlavy.
    </p>
    <a href="/znacka/acca-kappa" class="btn btn-primary ak-brand-btn">Více informací</a>
  `;

  // 5) Vlož box hned za .basic-description
  basic.parentNode.insertBefore(brandBox, basic.nextSibling);
});
