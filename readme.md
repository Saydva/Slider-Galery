# Galéria obrázkov

Moderný, responzívny slider galérie s modálnym zobrazením obrázkov.  
Projekt je napísaný v čistom HTML, CSS a JavaScript (ES6).

---

## Funkcie

- Viacero nezávislých sliderov na jednej stránke
- Plynulý posun obrázkov pomocou šípok
- Responzívny dizajn (prispôsobenie veľkosti obrázkov a tlačidiel podľa šírky obrazovky)
- Modal okno pre zväčšené zobrazenie obrázka (štvorcový pomer, nikdy nepresahuje viewport)
- Fade-in efekt pri zobrazení obrázkov
- Prednačítanie obrázkov pre plynulý zážitok
- Podpora lazy loadingu obrázkov
- Farebné témy pre každý slider (prepínanie tém)
- Slide bar s bodkami, ktoré menia farbu podľa témy
- Každý slider má vlastný štýl slide baru

---

## Použitie

1. **Klonuj repozitár:**

   ```bash
   git clone https://github.com/Saydva/Slider-Galery.git
   ```

2. **Otvoriť projekt v prehliadači:**
   - Stačí otvoriť `index.html` v prehliadači.
   - Nie je potrebná žiadna inštalácia ani build.

---

## Štruktúra projektu

```
/
├── index.html
├── src/
│   ├── style/
│   │   ├── main.css
│   │   ├── slider.css
│   │   ├── slide-bar.css
│   │   └── css-variables.css
│   └── scripts/
│       ├── main.js
│       ├── config.js
│       ├── slider1.js
│       ├── slider2.js
│       ├── slider3.js
│       ├── slider-common.js
│       ├── modal.js
│       └── imageSlider.js
├── public/
│   ├── foods/
│   ├── bikes/
│   └── cycles/
└── readme.md
```

---

## Prispôsobenie

- **Pridať nový slider:**  
  Skopíruj blok `<div class="slider-wrapper ...">` v `index.html` a uprav atribúty a triedy podľa potreby.
- **Pridať obrázky:**  
  Pridaj cesty k obrázkom do príslušnej galérie v `src/scripts/config.js`.
- **Upraviť štýl:**  
  Zmeň CSS v `src/style/slider.css`, `slide-bar.css` alebo pridaj vlastné témy v JS.
- **Pridať/meniť témy:**  
  Upraviť objekty tém v `slider1.js`, `slider2.js`, `slider3.js` (custom properties).

---

## Online verzia

Projekt je dostupný na GitHub Pages:  
[https://Saydva.github.io/Slider-Galery/](https://Saydva.github.io/Slider-Galery/)

---

## QR kód

Pre rýchly prístup k online verzii:

<img alt="QR kód" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://Saydva.github.io/Slider-Galery/" />
