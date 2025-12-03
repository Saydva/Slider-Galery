import {
  captureDefaultPalette,
  applyPaletteToSlider,
} from './slider-common.js';

export default class UnifiedSlider {
  constructor(container, images, options = {}) {
    this.container = container;
    this.images = images;
    this.options = { type: 'carousel', themes: {}, ...options };
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.preloadImages();
    this.createImgContainer();
    this.createNavigationButtons();
    this.createThemeButtons();
    this.addEventListeners();
    this.updateSlides();
  }

  preloadImages() {
    this.images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  createImgContainer() {
    this.imgContainer = this.container.querySelector('.img-container');
    if (!this.imgContainer) {
      this.imgContainer = document.createElement('div');
      this.imgContainer.className = 'img-container';
      this.container.appendChild(this.imgContainer);
    }
  }

  createNavigationButtons() {
    this.prevBtn = this.container.querySelector('.prev-btn');
    this.nextBtn = this.container.querySelector('.next-btn');
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
  }

  createThemeButtons() {
    const defaultPalette = captureDefaultPalette(this.container);
    this.options.themes.default = defaultPalette;
    this.container.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        const palette = this.options.themes[theme] || defaultPalette;
        applyPaletteToSlider(this.container, palette);
      });
    });
  }

  addEventListeners() {
    window.addEventListener('resize', () => this.updateSlides());
  }

  getSlidesCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 2200) return 4;
    if (screenWidth >= 768) return 3;
    if (screenWidth >= 480) return 2;
    return 1;
  }

  updateSlides() {
    this.imgContainer.innerHTML = '';
    const number = this.getSlidesCount();
    for (let i = 0; i < number && i < this.images.length; i++) {
      const imgIndex = (this.currentIndex + i) % this.images.length;
      const img = document.createElement('img');
      img.src = this.images[imgIndex];
      img.className = 'slide fade-in';
      img.alt = `Obrázok ${imgIndex + 1} z ${this.images.length}`;
      img.loading = 'lazy';
      img.addEventListener('click', () =>
        this.openModal(this.images[imgIndex]),
      );
      this.imgContainer.appendChild(img);
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateSlides();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateSlides();
  }

  openModal(src) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    if (modal && modalImg) {
      modalImg.src = src;
      modal.style.display = 'flex';
    }
  }
}
