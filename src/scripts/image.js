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
