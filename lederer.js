document.addEventListener('DOMContentLoaded', function () {
  var headline = document.querySelector('.p-info-headline h1');
  var infoGrid = document.querySelector('.p-info-grid');

  if (!headline || !infoGrid) return;

  var title = headline.textContent.trim();
  var isAuthenticXmas = /^Vánoční balíček .* Authentic Beauty Concept$/i.test(title);

  if (!isAuthenticXmas) return;

  var banner = document.createElement('div');
  banner.innerHTML = `
    <img src="https://www.lukaslederer.cz/user/documents/upload/bannery/Svicka.jpg" alt="Dárek svíčka" style="width:100%; border-radius:10px; margin-bottom:10px;">
  `;

  infoGrid.parentNode.insertBefore(banner, infoGrid.nextSibling);
});
