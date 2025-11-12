import AutoPlay from './autoplay.js';

export default class ImageSlider {
  constructor(container, images) {
    this.container = container;
    this.images = images;
    this.startIndex = 0;

    this.imgContainer = container.querySelector('.img-container');
    this.prevBtn = container.querySelector('.prev-btn');
    this.nextBtn = container.querySelector('.next-btn');
    this.modal = document.getElementById('modal');
    this.modalImg = document.getElementById('modal-img');

    this.init();
  }

  init() {
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    this.updateSlides();
    window.addEventListener('resize', () => this.updateSlides());

    // Inicializuj autoplay (funguje len na dotykových zariadeniach)
    this.autoPlay = new AutoPlay(this, 3000); // 3000ms = 3 sekundy
  }

  next() {
    this.startIndex = (this.startIndex + 1) % this.images.length;
    this.updateSlides();
  }

  prev() {
    this.startIndex =
      (this.startIndex - 1 + this.images.length) % this.images.length;
    this.updateSlides();
  }

  getSlidesCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 2200) return 4;
    if (screenWidth >= 768) return 3;
    if (screenWidth >= 480) return 2;
    return 1;
  }

  updateSlides() {
    const number = this.getSlidesCount();
    this.imgContainer.innerHTML = '';

    for (let i = 0; i < number && i < this.images.length; i++) {
      const imgIndex = (this.startIndex + i) % this.images.length;
      const img = document.createElement('img');
      img.src = this.images[imgIndex];
      img.className = 'slide fade-in';
      img.alt = `Obrázok ${imgIndex + 1} z ${this.images.length}`;
      img.loading = 'lazy';

      img.addEventListener('click', () => {
        this.modalImg.src = this.images[imgIndex];
        this.modal.style.display = 'flex';
      });

      this.imgContainer.appendChild(img);
    }
  }
}

const themePalettes = {
  light: {
    '--bg': '#FFFFFF', // čisto biela
    '--primary': '#4FC3F7', // jasná modrá
    '--secondary': '#FFB6B9', // pastelová ružová
    '--text': '#222831', // tmavý text
  },
  dark: {
    '--bg': '#181818', // takmer čierna
    '--primary': '#00ADB5', // výrazná tyrkysová
    '--secondary': '#393E46', // tmavá šedá
    '--text': '#EEEEEE', // svetlý text
  },
  neutral: {
    '--bg': '#FFF8E1', // jemná krémová
    '--primary': '#FFD600', // výrazná žltá
    '--secondary': '#FFAB91', // pastelová oranžová
    '--text': '#5D4037', // hnedý text
  },
  default: {
    '--bg': ' #cccccc5b',
    '--primary': '#83bdcb',
    '--secondary': '#98afc6',
    '--text': '#222831',
  },
};
