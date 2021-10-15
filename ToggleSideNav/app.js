// 01. toggle side nav

// DOM Nodes
const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggleButton = document.querySelector('.toggle');

// state function
const fetchNav = () => {
  if (JSON.parse(localStorage.getItem('navState'))) {
    $nav.classList.add('active');
    [$nav, $main, $toggleButton].forEach($el =>
      $el.classList.add('notransition')
    );
  }
};

// Event bindings
window.addEventListener('DOMContentLoaded', fetchNav);

$toggleButton.onclick = () => {
  $nav.classList.toggle('active');
  [$nav, $main, $toggleButton].forEach($el =>
    $el.classList.remove('notransition')
  );

  localStorage.navState = !!$nav.classList.contains('active');
};
