const images = [
  'public/anh-nguyen-kcA-c3f_3FE-unsplash.jpg',
  'public/casey-lee-awj7sRviVXo-unsplash.jpg',
  'public/chad-montano-eeqbbemH9-c-unsplash.jpg',
  'public/chad-montano-MqT0asuoIcU-unsplash.jpg',
  'public/eiliv-aceron-ZuIDLSz3XLg-unsplash.jpg',
  'public/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg',
  'public/joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg',
  'public/rachel-park-hrlvr2ZlUNk-unsplash.jpg',
];

let startIndex = 0;

function updateSlideSizes() {
  const container = document.querySelector('.img-container');
  const screenWidth = window.innerWidth;

  let number = 0;

  if (screenWidth >= 2200) {
    number = 4;
  } else if (screenWidth > 1600) {
    number = 3;
  } else if (screenWidth > 768) {
    number = 3;
  } else if (screenWidth > 480) {
    number = 2;
  } else if (screenWidth > 0) {
    number = 1;
  }

  container.innerHTML = '';
  for (let i = 0; i < number && i < images.length; i++) {
    const imgIndex = (startIndex + i) % images.length;
    const img = document.createElement('img');
    img.src = images[imgIndex];
    img.id = 'slide';
    img.alt = '';
    img.loading = 'lazy';
    img.classList.add('fade-in');
    // Pridaj event na otvorenie modalu s týmto obrázkom
    img.addEventListener('click', () => {
      document.getElementById('modal-img').src = images[imgIndex];
      modal.style.display = 'block';
    });
    container.appendChild(img);
  }
}

document.getElementById('next-btn').addEventListener('click', () => {
  startIndex = (startIndex + 1) % images.length;
  updateSlideSizes();
});

document.getElementById('prev-btn').addEventListener('click', () => {
  startIndex = (startIndex - 1 + images.length) % images.length;
  updateSlideSizes();
});

window.addEventListener('DOMContentLoaded', updateSlideSizes);
window.addEventListener('resize', updateSlideSizes);

const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close-modal');

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
