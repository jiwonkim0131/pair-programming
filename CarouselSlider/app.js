const $carousel = document.querySelector('.carousel');

const carousel = ($container, images) => {
  const $carouselSlides = document.createElement('div');
  $carouselSlides.classList.add('carousel-slides');
  $container.appendChild($carouselSlides);
  $carouselSlides.innerHTML = images
    .map(img => `<img src="${img}" style='width : 100%'>`)
    .join('');
  $carouselSlides.style.setProperty('--currentSlide', 1);
};

carousel($carousel, [
  'movies/movie-4.jpg',
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg',
  'movies/movie-1.jpg'
]);

const imageWidth = document.querySelector('img').naturalWidth;
$carousel.style.maxWidth = `${imageWidth}px`;

const $fragment = document.createDocumentFragment();

const buttonObj = [
  { key: 'prev', val: '&laquo' },
  { key: 'next', val: '&raquo' }
];

buttonObj.forEach(({ key, val }) => {
  const $carouselControl = document.createElement('button');
  $carouselControl.classList.add('carousel-control', key);
  $carouselControl.innerHTML = val;
  $fragment.appendChild($carouselControl);
});

$carousel.appendChild($fragment);

const $currentSlides = document.querySelector('.carousel-slides');

let currentSlide =
  getComputedStyle($currentSlides).getPropertyValue('--currentSlide') * 1;

$currentSlides.style.setProperty('--duration', 500);

$carousel.onclick = e => {
  if (!e.target.classList.contains('carousel-control')) return;

  if (e.target.classList.contains('prev')) {
    currentSlide -= 1;
    if (!currentSlide) {
      setTimeout(() => {
        $currentSlides.style.setProperty('--duration', 0);
        $currentSlides.style.setProperty(
          '--currentSlide',
          $currentSlides.children.length - 2
        );
        currentSlide = $currentSlides.children.length - 2;
      }, $currentSlides.style.getPropertyValue('--duration'));
    }
    $currentSlides.style.setProperty('--duration', 500);
    $currentSlides.style.setProperty('--currentSlide', currentSlide);
  }

  if (e.target.classList.contains('next')) {
    currentSlide += 1;
    if (currentSlide === $currentSlides.children.length - 1) {
      setTimeout(() => {
        $currentSlides.style.setProperty('--duration', 0);
        $currentSlides.style.setProperty('--currentSlide', 1);
        currentSlide = 1;
      }, $currentSlides.style.getPropertyValue('--duration'));
    }
    $currentSlides.style.setProperty('--currentSlide', currentSlide);
    $currentSlides.style.setProperty('--duration', 500);
  }
};
