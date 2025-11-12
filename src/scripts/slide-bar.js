import { galleries } from './config.js';

const galleryKeys = Object.keys(galleries);

document.querySelectorAll('.slider-wrapper').forEach((slider, idx) => {
  const galleryName = galleryKeys[idx];
  const images = galleries[galleryName];
  if (!images) return;

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
    slideBar.className = 'slide-bar ';
    slider.appendChild(slideBar);
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
});
