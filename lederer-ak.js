document.addEventListener('DOMContentLoaded', function () {
  // 1) Podmínka – běž jen tehdy, pokud je brand Acca Kappa
  var isAccaKappa = /Acca\s*Kappa/i.test(document.documentElement.innerHTML);
  if (!isAccaKappa) return;

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
