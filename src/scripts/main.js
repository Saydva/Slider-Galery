// Import všetkého čo potrebuješ
import UnifiedSlider from './unifiedSlider.js';
import { initModal } from './modal.js';
import { galleries, sliderConfigs } from './config.js';

// Inicializácia po načítaní stránky
window.addEventListener('DOMContentLoaded', () => {
  // Inicializuj modal (raz pre všetky slidery)
  initModal();

  // Inicializuj slidery
  Object.keys(galleries).forEach((galleryId) => {
    const container = document.querySelector(`[data-slider="${galleryId}"]`);
    if (container) {
      new UnifiedSlider(
        container,
        galleries[galleryId],
        sliderConfigs[galleryId],
      );
    }
  });
});
