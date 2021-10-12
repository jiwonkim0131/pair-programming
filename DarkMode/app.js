const $toggleButton = document.querySelector('.toggle-button');

window.addEventListener('DOMContentLoaded', fetchTheme);
$toggleButton.onclick = () => {
  $body.classList.toggle('dark');
  $body.classList.contains('dark')
    ? localStorage.setItem('themeState', 'dark')
    : localStorage.setItem('themeState', 'white');
};
