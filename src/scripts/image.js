const images = [
  'public/anh-nguyen-kcA-c3f_3FE-unsplash.jpg',
  'public/casey-lee-awj7sRviVXo-unsplash.jpg',
  'public/chad-montano-eeqbbemH9-c-unsplash.jpg',
];

const container = document.querySelector('.img-container');
images.forEach((src) => {
  const img = document.createElement('img');
  img.src = src;
  img.id = 'slide';
  img.alt = '';
  container.appendChild(img);
});

function updateSlideSizes() {
  const slides = document.querySelectorAll('#slide');
  const screenWidth = window.innerWidth;

  let number = 0;

  if (screenWidth > 1024) {
    number = 3;
  } else if (screenWidth > 768) {
    number = 2;
  } else {
    number = 1;
  }

  console.log(number);
}

window.addEventListener('resize', updateSlideSizes);
