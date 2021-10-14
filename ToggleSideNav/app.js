// 01. toggle side nav

// DOM Nodes
const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggleButton = document.querySelector('i.toggle');

// state function
const fetchNav = () => {
  if (localStorage.getItem('navState') === 'true') {
    $nav.classList.add('active');
    $nav.classList.add('notransition');
    $main.classList.add('notransition');
    $toggleButton.classList.add('notransition');
  } else {
    localStorage.setItem('navState', 'false');
  }
};

// Event bindings
window.addEventListener('DOMContentLoaded', fetchNav);

$toggleButton.onclick = () => {
  $nav.classList.toggle('active');
  $nav.classList.remove('notransition');
  $main.classList.remove('notransition');
  $toggleButton.classList.remove('notransition');

  $nav.classList.contains('active')
    ? localStorage.setItem('navState', 'true')
    : localStorage.setItem('navState', 'false');
};
