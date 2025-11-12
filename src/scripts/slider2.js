import {
  captureDefaultPalette,
  applyPaletteToSlider,
  fillSliderImagesFromGallery,
} from './slider-common.js';
import { galleries } from './config.js';

const themePalettes2 = {
  vibrant: {
    '--bg': 'linear-gradient(135deg, #450693 60%, #FFC400 100%)',
    '--primary': '#8C00FF',
    '--secondary': '#FF3F7F',
    '--text': '#37353E',
    '--btn-bg': '#FFC400',
    '--btn-color': '#fff',
    '--btn-hover-bg': '#FF3F7F',
    '--btn-hover-color': '#450693',
    '--border': '4px solid #8C00FF',
    '--dot-bg': '#FFC400', // farba bodky
    '--dot-active-bg': '#FF3F7F', // farba aktívnej bodky
  },
  sand: {
    '--bg': 'linear-gradient(135deg, #B6AE9F 60%, #FBF3D1 100%)',
    '--primary': '#C5C7BC',
    '--secondary': '#DEDED1',
    '--text': '#44444E',
    '--btn-bg': '#FBF3D1',
    '--btn-color': '#37353E',
    '--btn-hover-bg': '#DEDED1',
    '--btn-hover-color': '#B6AE9F',
    '--border': '4px solid #C5C7BC',
    '--dot-bg': '#DEDED1',
    '--dot-active-bg': '#B6AE9F',
  },
  dusk: {
    '--bg': 'linear-gradient(135deg, #37353E 60%, #D3DAD9 100%)',
    '--primary': '#44444E',
    '--secondary': '#715A5A',
    '--text': '#FBF3D1',
    '--btn-bg': '#715A5A',
    '--btn-color': '#D3DAD9',
    '--btn-hover-bg': '#44444E',
    '--btn-hover-color': '#FFC400',
    '--border': '4px double #44444E',
    '--dot-bg': '#715A5A',
    '--dot-active-bg': '#D3DAD9',
  },
  default: {}, // Default paleta bude načítaná z CSS
};

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-wrapper.slider2-wrapper');
  if (!slider) return;

  // Naplnenie obrázkov z galérie
  const galleryName = slider.dataset.slider || 'gallery2';
  fillSliderImagesFromGallery(
    slider,
    galleryName,
    galleries,
    '.slider2-img-container',
  );

  // Načítanie predvolenej palety z CSS
  const defaultPalette = captureDefaultPalette(slider);
  themePalettes2.default = defaultPalette;

  // Pridanie event listenerov na tlačidlá tém
  slider.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      const palette =
        theme === 'default' ? defaultPalette : themePalettes2[theme];
      applyPaletteToSlider(slider, palette);
    });
  });
});

const images = galleries.gallery2;
const slider = document.querySelectorAll('.slider-wrapper')[1]; // druhý slider na stránke

if (slider && images) {
  // Vytvor img-container a obrázky
  let imgContainer = slider.querySelector('.img-container');
  if (!imgContainer) {
    imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';
    slider.appendChild(imgContainer);
  }
  imgContainer.innerHTML = '';
  images.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'slide';
    imgContainer.appendChild(img);
  });

  // Vytvor slide-bar a dots
  let slideBar = slider.querySelector('.slide-bar');
  if (!slideBar) {
    slideBar = document.createElement('div');
    slideBar.className = 'slide-bar slide-bar2';
    slider.appendChild(slideBar);
  } else {
    slideBar.className = 'slide-bar slide-bar2';
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
  const prevBtn = slider.querySelector('.prev-btn');
  const nextBtn = slider.querySelector('.next-btn');
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
