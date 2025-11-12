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

# Štruktúra projektu Slider-Galery

Projekt je napísaný v **HTML**, **CSS** a **JavaScript (ES6)**.  
Nepoužíva žiadny framework, všetko je čistý kód.

---

## Stromová štruktúra

```
Slider-Galery/
├── .gitignore               # Ignorované súbory pre Git
├── eslint.config.mjs        # Konfigurácia pre ESLint (kontrola JS štýlu)
├── index.html               # Hlavný HTML súbor aplikácie
├── package.json             # Základný balíček pre npm (len meta, žiadne závislosti)
├── readme.md                # Dokumentácia projektu
├── public/                  # Verejné obrázky pre galérie
│   ├── bikes/               # Obrázky pre galériu bicyklov
│   ├── cycles/              # Obrázky pre galériu cyklov
│   └── foods/               # Obrázky pre galériu jedál
├── src/
│   ├── scripts/             # JavaScript logika
│   │   ├── config.js        # Definícia galérií (zoznam obrázkov pre každý slider)
│   │   ├── imageSlider.js   # Základná logika slideru (prepínanie obrázkov, animácie)
│   │   ├── main.js          # Inicializácia a spúšťanie všetkých sliderov na stránke
│   │   ├── modal.js         # Logika modálneho okna (zväčšené zobrazenie obrázka)
│   │   ├── slide-bar.js     # Generovanie a správa slide baru (bodky pod sliderom)
│   │   ├── slider-common.js # Zdieľané funkcie pre všetky slidery (témy, palety, utilitky)
│   │   ├── slider1.js       # Špecifická logika a témy pre prvý slider
│   │   ├── slider2.js       # Špecifická logika a témy pre druhý slider
│   │   ├── slider3.js       # Špecifická logika a témy pre tretí slider
│   └── style/               # CSS štýly
│       ├── css-variables.css# Globálne CSS premenné (farby, fonty, rozmery)
│       ├── main.css         # Základné štýly pre stránku
│       ├── modal.css        # Štýly pre modálne okno
│       ├── responsive.css   # Responzívne úpravy pre mobil/tablet
│       ├── slide-bar.css    # Štýly pre slide bar (bodky pod sliderom)
│       ├── slider.css       # Všeobecné štýly pre všetky slidery
│       ├── slider1.css      # Špecifické štýly pre prvý slider
│       ├── slider2.css      # Špecifické štýly pre druhý slider
│       ├── slider3.css      # Špecifické štýly pre tretí slider
```

---

## Popis technológií a súborov

- **HTML**

  - `index.html` – základná štruktúra stránky, vkladá slidery a modálne okno.

- **CSS**

  - `main.css` – základné štýly pre layout, text, tlačidlá.
  - `css-variables.css` – globálne premenné pre farby, fonty, rozmery.
  - `slider.css` – všeobecné štýly pre všetky slidery.
  - `slider1.css`, `slider2.css`, `slider3.css` – špecifické štýly pre jednotlivé slidery.
  - `slide-bar.css` – štýly pre slide bar (bodky pod sliderom).
  - `modal.css` – štýly pre modálne okno (zväčšený obrázok).
  - `responsive.css` – úpravy pre mobilné zariadenia.

- **JavaScript**

  - `main.js` – inicializuje a spúšťa všetky slidery, prepája komponenty.
  - `config.js` – zoznam obrázkov pre každú galériu (slider).
  - `imageSlider.js` – základná logika slideru (prepínanie obrázkov, animácie).
  - `modal.js` – logika modálneho okna (otváranie, zatváranie, zobrazenie obrázka).
  - `slide-bar.js` – generuje slide bar (bodky), spravuje ich interakciu.
  - `slider-common.js` – zdieľané utility (prepínanie tém, palety, pomocné funkcie).
  - `slider1.js`, `slider2.js`, `slider3.js` – špecifická logika a témy pre každý slider.

- **Obrázky**

  - `public/foods/`, `public/bikes/`, `public/cycles/` – obrázky pre jednotlivé galérie.

- **Ostatné**
  - `.gitignore` – zoznam ignorovaných súborov pre Git.
  - `package.json` – základný npm balíček (meta, bez závislostí).
  - `eslint.config.mjs` – konfigurácia pre kontrolu štýlu JS.
  - `aresare.txt` – exportovaná štruktúra adresárov (pomocný súbor).

---

## Ako projekt funguje

- Po načítaní stránky sa inicializujú všetky slidery podľa konfigurácie v `config.js`.
- Každý slider má vlastné témy, slide bar a štýly.
- Kliknutím na obrázok sa otvorí modal s väčším zobrazením.
- Prepínanie tém mení farby slidera aj slide baru.
- Všetko funguje bez frameworku, len s čistým JS a CSS.

---

## Ako pridať nový slider

1. Pridaj nový blok slideru do `index.html`.
2. Pridaj obrázky do `public/` a cestu do `config.js`.
3. Pridaj JS súbor (napr. `slider4.js`) a CSS (napr. `slider4.css`) podľa potreby.
4. Pripoj nové témy v JS a štýly v CSS.

---

## Online verzia

Projekt live:  
[https://Saydva.github.io/Slider-Galery/](https://Saydva.github.io/Slider-Galery/)

<img alt="QR kód" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://Saydva.github.io/Slider-Galery/" />
