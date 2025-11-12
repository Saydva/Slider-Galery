import {
  captureDefaultPalette,
  applyPaletteToSlider,
  fillSliderImagesFromGallery,
} from './slider-common.js';
import { galleries } from './config.js';

const themePalettes3 = {
  aqua: {
    '--bg': 'linear-gradient(120deg, #66D2CE 60%, #E3D2C3 100%)',
    '--primary': '#2DAA9E',
    '--secondary': '#EAEAEA',
    '--text': '#8D0B41',
    '--btn-bg': '#2DAA9E',
    '--btn-color': '#EAEAEA',
    '--btn-hover-bg': '#E3D2C3',
    '--btn-hover-color': '#66D2CE',
    '--border': '5px solid #2DAA9E',
    '--dot-bg': '#EAEAEA', // farba bodky
    '--dot-active-bg': '#2DAA9E', // farba aktívnej bodky
  },
  ocean: {
    '--bg': 'linear-gradient(120deg, #F2EFE7 60%, #2973B2 100%)',
    '--primary': '#9ACBD0',
    '--secondary': '#48A6A7',
    '--text': '#D39D55',
    '--btn-bg': '#2973B2',
    '--btn-color': '#FFF8E6',
    '--btn-hover-bg': '#9ACBD0',
    '--btn-hover-color': '#2973B2',
    '--border': '5px solid #2973B2',
    '--dot-bg': '#9ACBD0',
    '--dot-active-bg': '#2973B2',
  },
  rose: {
    '--bg': 'linear-gradient(120deg, #8D0B41 60%, #FFF8E6 100%)',
    '--primary': '#D39D55',
    '--secondary': '#D6CFB4',
    '--text': '#2DAA9E',
    '--btn-bg': '#8D0B41',
    '--btn-color': '#FFF8E6',
    '--btn-hover-bg': '#D39D55',
    '--btn-hover-color': '#8D0B41',
    '--border': '5px double #8D0B41',
    '--dot-bg': '#D6CFB4',
    '--dot-active-bg': '#8D0B41',
  },
  default: {}, // Default paleta bude načítaná z CSS
};

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-wrapper.slider3-wrapper');
  if (!slider) return;

  // Naplnenie obrázkov z galérie
  const galleryName = slider.dataset.slider || 'gallery3';
  fillSliderImagesFromGallery(
    slider,
    galleryName, // Názov galérie
    galleries, // Celý objekt galérií
    '.slider3-img-container', // Kontajner pre obrázky
  );

  // Načítanie predvolenej palety z CSS
  const defaultPalette = captureDefaultPalette(slider);
  themePalettes3.default = defaultPalette;

  // Pridanie event listenerov na tlačidlá tém
  slider.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      const palette =
        theme === 'default' ? defaultPalette : themePalettes3[theme];
      applyPaletteToSlider(slider, palette);
    });
  });

  const images = galleries.gallery3;
  const sliderEl = document.querySelectorAll('.slider-wrapper')[2]; // tretí slider na stránke

  if (sliderEl && images) {
    // Vytvor img-container a obrázky
    let imgContainer = sliderEl.querySelector('.img-container');
    if (!imgContainer) {
      imgContainer = document.createElement('div');
      imgContainer.className = 'img-container';
      sliderEl.appendChild(imgContainer);
    }
    imgContainer.innerHTML = '';
    images.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'slide';
      imgContainer.appendChild(img);
    });

    // Vytvor slide-bar a dots
    let slideBar = sliderEl.querySelector('.slide-bar');
    if (!slideBar) {
      slideBar = document.createElement('div');
      slideBar.className = 'slide-bar slide-bar3';
      sliderEl.appendChild(slideBar);
    } else {
      slideBar.className = 'slide-bar slide-bar3';
    }
    slideBar.innerHTML = '';
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
      slideBar.appendChild(dot);
    });

    // Funkčnosť prepínania
    let currentIndex = 0;
    const slides = imgContainer.querySelectorAll('.slide');
    const dots = slideBar.querySelectorAll('.slide-dot');

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Synchronizácia pri kliknutí na bodku
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentIndex = i;
        showSlide(currentIndex);
      });
    });

    // Synchronizácia pri kliknutí na šípky (ak existujú)
    const prevBtn = sliderEl.querySelector('.prev-btn');
    const nextBtn = sliderEl.querySelector('.next-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });
    }

    // Inicializácia
    showSlide(currentIndex);
  }
});
