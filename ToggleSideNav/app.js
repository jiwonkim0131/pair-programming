// 01. toggle side nav

// DOM Nodes
const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggleButton = document.querySelector('.toggle');

// state function
const fetchNav = () => {
  if (localStorage.getItem('navState') === 'true') {
    $nav.classList.add('active');
    [$nav, $main, $toggleButton].forEach($el =>
      $el.classList.add('notransition')
    );
  } else {
    localStorage.setItem('navState', 'false');
  }
};

// Event bindings
window.addEventListener('DOMContentLoaded', fetchNav);

$toggleButton.onclick = () => {
  $nav.classList.toggle('active');
  [$nav, $main, $toggleButton].forEach($el =>
    $el.classList.remove('notransition')
  );

  $nav.classList.contains('active')
    ? localStorage.setItem('navState', 'true')
    : localStorage.setItem('navState', 'false');
};
