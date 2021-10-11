// toggle side nav

// DOM Nodes
const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggleButton = document.querySelector('i.toggle');

const toggleClass = $node => $node.classList.toggle('active');

// state function
const fetchNav = () => {
  if (localStorage.getItem('navState') === 'true') {
    $nav.classList.add('active');
    $nav.classList.add('notransition');
    $main.classList.add('notransition');
    $toggleButton.classList.add('notransition');
  }
};

// Event bindings
window.addEventListener('DOMContentLoaded', fetchNav);

$toggleButton.onclick = () => {
  toggleClass($nav);
  $nav.classList.remove('notransition');
  $main.classList.remove('notransition');
  $toggleButton.classList.remove('notransition');

  $nav.classList.contains('active')
    ? localStorage.setItem('navState', 'true')
    : localStorage.setItem('navState', 'false');
};
