import {
  captureDefaultPalette,
  applyPaletteToSlider,
} from './slider-common.js';

export default class UnifiedSlider {
  constructor(container, images, options = {}) {
    this.container = container;
    this.images = images;
    this.options = { type: 'single', themes: {}, ...options };
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.createImgContainer();
    if (this.options.type === 'single') {
      this.createSlideBar();
    }
    this.createNavigationButtons();
    this.createThemeButtons();
    this.addEventListeners();
    this.updateSlides();
  }

  createImgContainer() {
    this.imgContainer = this.container.querySelector('.img-container');
    if (!this.imgContainer) {
      this.imgContainer = document.createElement('div');
      this.imgContainer.className = 'img-container';
      this.container.appendChild(this.imgContainer);
    }
  }

  createSlides() {
    this.imgContainer.innerHTML = '';
    this.images.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'slide';
      img.alt = `Obrázok ${idx + 1}`;
      img.loading = 'lazy';
      img.addEventListener('click', () => this.openModal(src));
      this.imgContainer.appendChild(img);
    });
    this.slides = this.imgContainer.querySelectorAll('.slide');
  }

  createSlideBar() {
    this.slideBar = this.container.querySelector('.slide-bar');
    if (!this.slideBar) {
      this.slideBar = document.createElement('div');
      this.slideBar.className = 'slide-bar';
      this.container.appendChild(this.slideBar);
    }
    this.slideBar.innerHTML = '';
    this.images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => this.showSlide(i));
      this.slideBar.appendChild(dot);
    });
    this.dots = this.slideBar.querySelectorAll('.slide-dot');
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

    if (this.options.type === 'carousel') {
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
    } else {
      // single
      const img = document.createElement('img');
      img.src = this.images[this.currentIndex];
      img.className = 'slide fade-in';
      img.alt = `Obrázok ${this.currentIndex + 1} z ${this.images.length}`;
      img.loading = 'lazy';
      img.addEventListener('click', () =>
        this.openModal(this.images[this.currentIndex]),
      );
      this.imgContainer.appendChild(img);
    }
  }

  showSlide(index) {
    if (this.options.type === 'single') {
      this.slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    } else {
      // Carousel logika - zatiaľ jednoduchá, možno rozšíriť
      this.slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    this.currentIndex = index;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    if (this.options.type === 'single') {
      this.showSlide(this.currentIndex);
    } else {
      this.updateSlides();
    }
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    if (this.options.type === 'single') {
      this.showSlide(this.currentIndex);
    } else {
      this.updateSlides();
    }
  }

  handleResize() {
    // Pre carousel typ - možno pridať logiku pre počet slidov
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
