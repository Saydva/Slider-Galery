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
