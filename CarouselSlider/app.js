const $carousel = document.querySelector('.carousel');

const carousel = ($container, images) => {
  const $carouselSlides = document.createElement('div');
  $carouselSlides.classList.add('carousel-slides');
  $container.appendChild($carouselSlides);
  $carouselSlides.innerHTML = images.map(img => `<img src="${img}">`).join('');
};

carousel($carousel, [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);

const $fragment = document.createDocumentFragment();

['&laquo;', '&raquo;'].forEach(text => {
  const $carouselControl = document.createElement('button');
  $carouselControl.classList.add('carousel-control');
  const textNode = document.createTextNode(`${text}`);
  $carouselControl.appendChild(textNode);
  $fragment.appendChild($carouselControl);
});

$carousel.appendChild($fragment);

// const $carouselControlNext = document.createElement('button');

// const nextText = document.createTextNode('&raquo');
// $carouselControlPrev.appendChild(prevText);
// $carouselControlNext.appendChild(nextText);

// $carouselControlPrev.classList.add('carousel-control', 'prev');
// $carouselControlNext.classList.add('carousel-control', 'next');
