const $body = document.querySelector('body');
const $toggleButton = document.querySelector('.toggle-button');

const fetchTheme = () => {
  if (localStorage.getItem('themeState') === 'dark')
    $body.classList.add('dark');
  $toggleButton.style.left = '52';
};

window.addEventListener('DOMContentLoaded', fetchTheme);
$toggleButton.onclick = () => {
  $body.classList.toggle('dark');
  $body.classList.contains('dark')
    ? localStorage.setItem('themeState', 'dark')
    : localStorage.setItem('themeState', 'white');
};
