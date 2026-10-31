# shoptet-js

Vlastní skripty pro e-shopy na Shoptetu, běží přes GitHub Pages (https://schreibeek.github.io/shoptet-js/...).

- lederer.js - lukaslederer.cz, načítá se v zápatí Shoptetu. Po změně zvednout ?v= v odkazu v HTML kódech (patička), jinak se může až 10 minut načítat stará verze.
- lederer-test.js - štítek testovacího vzhledu (Porovnat, Vypnout).

Testovací vzhled lukaslederer.cz (design systém v2):

- ?lltest=1 v adrese ho zapne, ?lltest=0 nebo tlačítko Vypnout ve štítku vlevo dole vypne. Platí jen v prohlížeči, kde se zapnul (localStorage), pro zákazníky je web beze změny.
- Přepínač je na začátku lederer.js. Styly jsou v shoptet-css/lederer-test.css pod html.ll-test.
- Testovací soubory se načítají vždy čerstvé (?t=), po změně stačí nahrát na GitHub.
- Tlačítko Porovnat ve štítku dočasně vrátí původní vzhled stránky.
- Bez přebliknutí: skript v záhlaví Shoptetu (HTML kód > Záhlaví, za lederer.css) načte testovací CSS ještě před vykreslením stránky. lederer.js pak CSS nenačítá podruhé, jen štítek a testovací JS.
