export default class AutoPlay {
  constructor(slider, interval = 3000) {
    this.slider = slider;
    this.interval = interval;
    this.autoPlayInterval = null;
    this.isTouch = this.isTouchDevice();

    if (this.isTouch) {
      this.init();
    }
  }

  isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  init() {
    this.start();

    // Zastav autoplay pri dotyku na slider
    this.slider.container.addEventListener('touchstart', () => {
      this.stop();
    });

    // Reštartuj autoplay po kliknutí na tlačidlá
    this.slider.prevBtn.addEventListener('click', () => {
      this.restart();
    });

    this.slider.nextBtn.addEventListener('click', () => {
      this.restart();
    });
  }

  start() {
    if (this.autoPlayInterval) return; // Už beží

    this.autoPlayInterval = setInterval(() => {
      this.slider.next();
    }, this.interval);
  }

  stop() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  restart() {
    this.stop();
    this.start();
  }

  isActive() {
    return this.autoPlayInterval !== null;
  }
}
