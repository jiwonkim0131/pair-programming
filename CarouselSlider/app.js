const $carousel = document.querySelector('.carousel');

const carousel = ($container, _images) => {
  const images = [_images[_images.length - 1], ..._images, _images[0]];
  const $carouselSlides = document.createElement('div');
  $carouselSlides.classList.add('carousel-slides');
  $carouselSlides.style.setProperty('--currentSlide', 1);
  $carouselSlides.innerHTML = images
    .map(img => `<img src="${img}" style='width : 100%'>`)
    .join('');
  $container.appendChild($carouselSlides);
};

carousel($carousel, [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);

const $currentSlides = document.querySelector('.carousel-slides');
const $fragmentForButtons = document.createDocumentFragment();
const buttonObj = [
  { key: 'prev', val: '&laquo' },
  { key: 'next', val: '&raquo' }
];

let currentSlide =
  getComputedStyle($currentSlides).getPropertyValue('--currentSlide') * 1;
let transitionState = false;

buttonObj.forEach(({ key, val }) => {
  const $carouselControl = document.createElement('button');
  $carouselControl.classList.add('carousel-control', key);
  $carouselControl.innerHTML = val;
  $fragmentForButtons.appendChild($carouselControl);
});

$carousel.appendChild($fragmentForButtons);

window.onload = () => {
  const imageWidth = document.querySelector('img').scrollWidth;
  $carousel.style.maxWidth = `${imageWidth}px`;
  $carousel.style.opacity = 1;
};

$carousel.onclick = e => {
  if (transitionState) return;
  if (!e.target.classList.contains('carousel-control')) return;
  transitionState = true;

  e.target.classList.contains('prev')
    ? (currentSlide -= 1)
    : (currentSlide += 1);

  $currentSlides.style.setProperty('--duration', 500);
  $currentSlides.style.setProperty('--currentSlide', currentSlide);
};

$carousel.ontransitionend = () => {
  transitionState = false;

  $currentSlides.style.setProperty('--duration', 0);

  if (!currentSlide) {
    $currentSlides.style.setProperty(
      '--currentSlide',
      $currentSlides.children.length - 2
    );
    currentSlide = $currentSlides.children.length - 2;
  }

  if (currentSlide === $currentSlides.children.length - 1) {
    $currentSlides.style.setProperty('--currentSlide', 1);
    currentSlide = 1;
  }
};
