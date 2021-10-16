const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggleButton = document.querySelector('.toggle');

const fetchNav = () => {
  $nav.classList.toggle('active', JSON.parse(localStorage.getItem('navState')));
  [$nav, $main, $toggleButton].forEach($el =>
    $el.classList.add('notransition')
  );
};

window.addEventListener('DOMContentLoaded', fetchNav);
window.addEventListener('load', () => {
  [$nav, $main, $toggleButton].forEach($el =>
    $el.classList.remove('notransition')
  );
});

$toggleButton.onclick = () => {
  localStorage.navState = $nav.classList.toggle('active');
};
