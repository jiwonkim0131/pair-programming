const $body = document.querySelector('body');
const $toggleButton = document.querySelector('.toggle-button');

$toggleButton.onclick = () => {
  $body.classList.toggle('dark');
  $body.classList.contains('dark')
    ? localStorage.setItem('themeState', 'dark')
    : localStorage.setItem('themeState', 'white');
};
