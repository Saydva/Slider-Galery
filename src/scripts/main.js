// Import všetkého čo potrebuješ
import ImageSlider from './imageSlider.js';
import { initModal } from './modal.js';
import { galleries } from './config.js';

// Inicializácia po načítaní stránky
window.addEventListener('DOMContentLoaded', () => {
  // Inicializuj modal (raz pre všetky slidery)
  initModal();

  // Inicializuj slidery
  Object.keys(galleries).forEach((galleryId) => {
    const container = document.querySelector(`[data-slider="${galleryId}"]`);
    if (container) {
      new ImageSlider(container, galleries[galleryId]);
    }
  });
});
