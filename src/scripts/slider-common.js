export const DEFAULT_PALETTE_KEYS = [
  '--bg',
  '--primary',
  '--secondary',
  '--text',
  '--btn-bg',
  '--btn-color',
  '--btn-hover-bg',
  '--btn-hover-color',
  '--border',
  '--dot-bg', // pridaj
  '--dot-active-bg', // pridaj
];

export function captureDefaultPalette(slider, keys = DEFAULT_PALETTE_KEYS) {
  const computed = getComputedStyle(slider);
  const palette = {};
  keys.forEach((k) => {
    palette[k] = computed.getPropertyValue(k) || '';
  });
  return palette;
}

export function applyPaletteToSlider(slider, palette) {
  if (!slider || !palette) {
    return;
  }

  Object.entries(palette).forEach(([key, value]) => {
    slider.style.setProperty(key, value);
  });
}

export function fillSliderImagesFromGallery(
  slider,
  galleryName,
  galleries,
  containerSelector = '.img-container',
) {
  const images = galleries[galleryName]; // Získa obrázky z galérie
  const container = slider.querySelector(containerSelector); // Nájde kontajner pre obrázky
  if (!container || !images) return; // Ak kontajner alebo obrázky neexistujú, ukonči funkciu

  container.innerHTML = ''; // Vyčisti kontajner

  images.forEach((src, idx) => {
    const item = document.createElement('div');
    item.className = 'slide-item';
    if (idx === 0) item.setAttribute('data-carousel-item', 'active');

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.className = 'slide-image';

    item.appendChild(img);
    container.appendChild(item);
  });
}
