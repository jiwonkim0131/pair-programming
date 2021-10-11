// toggle side nav
const $nav = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggleButton = document.querySelector('i.toggle');

const toggleClass = $node => $node.classList.toggle('active');

localStorage.setItem('navState', 'false');

const fetchNav = () => {
  //   localStorage.setItem('navState', 'false');
  if (localStorage.getItem('navState')) {
    $nav.classList.add('active');
    $nav.classList.add('notransition');
    $main.classList.add('notransition');
    $toggleButton.classList.add('notransition');
  } else {
    localStorage.setItem('navState', 'false');
  }
};

window.addEventListener('DOMContentLoaded', fetchNav);

$toggleButton.onclick = () => {
  toggleClass($nav);
  $nav.classList.remove('notransition');
  $main.classList.remove('notransition');
  $toggleButton.classList.remove('notransition');

  $nav.classList.contains('active')
    ? localStorage.setItem('navState', 'false')
    : localStorage.setItem('navState', 'true');
};
