import {
  captureDefaultPalette,
  applyPaletteToSlider,
  fillSliderImagesFromGallery,
} from './slider-common.js';

import { galleries } from './config.js';

const themePalettes1 = {
  forest: {
    '--bg': 'linear-gradient(135deg, #4B352A 60%, #B2CD9C 100%)',
    '--primary': '#4B352A',
    '--secondary': '#B2CD9C',
    '--text': '#210F37',
    '--btn-bg': '#CA7842',
    '--btn-color': '#F0F2BD',
    '--btn-hover-bg': '#F0F2BD',
    '--btn-hover-color': '#4B352A',
    '--border': '4px solid #CA7842',
    '--dot-bg': '#B2CD9C', // farba bodky
    '--dot-active-bg': '#CA7842', // farba aktívnej bodky
  },
  pastel: {
    '--bg': 'linear-gradient(135deg, #CADCAE 60%, #EDA35A 100%)',
    '--primary': '#EDA35A',
    '--secondary': '#FEE8D9',
    '--text': '#4F1C51',
    '--btn-bg': '#E1E9C9',
    '--btn-color': '#210F37',
    '--btn-hover-bg': '#EDA35A',
    '--btn-hover-color': '#FEE8D9',
    '--border': '4px dotted #EDA35A',
    '--dot-bg': '#EDA35A',
    '--dot-active-bg': '#FEE8D9',
  },
  retro: {
    '--bg': 'linear-gradient(135deg, #210F37 60%, #DCA06D 100%)',
    '--primary': '#A55B4B',
    '--secondary': '#DCA06D',
    '--text': '#F0F2BD',
    '--btn-bg': '#4F1C51',
    '--btn-color': '#FEE8D9',
    '--btn-hover-bg': '#A55B4B',
    '--btn-hover-color': '#210F37',
    '--border': '4px double #A55B4B',
    '--dot-bg': '#DCA06D',
    '--dot-active-bg': '#A55B4B',
  },
  default: {}, // Default paleta bude načítaná z CSS
};

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-wrapper.slider1-wrapper');
  if (!slider) return;

  // Načítanie predvolenej palety z CSS
  const defaultPalette = captureDefaultPalette(slider);
  themePalettes1.default = defaultPalette;

  // Pridanie event listenerov na tlačidlá tém
  slider.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      const palette =
        theme === 'default' ? defaultPalette : themePalettes1[theme];
      applyPaletteToSlider(slider, palette);
    });
  });

  // Naplnenie obrázkov z galérie
  const galleryName = slider.dataset.slider || 'gallery1';
  fillSliderImagesFromGallery(
    slider,
    galleryName,
    galleries,
    '.slider1-img-container',
  );

  // Slide bar generovanie (rovnako ako v slider3.js)
  const images = galleries.gallery1;
  const sliderEl = document.querySelectorAll('.slider-wrapper')[0]; // prvý slider na stránke

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
      slideBar.className = 'slide-bar slide-bar1';
      sliderEl.appendChild(slideBar);
    } else {
      slideBar.className = 'slide-bar slide-bar1';
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
      console.log('slider1 ready');
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
