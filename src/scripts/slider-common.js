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
