window.addEventListener('DOMContentLoaded', () => {
  const $toggleButton = document.querySelector('.toggle-button');

  if (localStorage.getItem('theme')) document.body.classList.add('dark');

  $toggleButton.onclick = () => {
    document.body.classList.toggle('dark');
    localStorage.theme = document.body.classList.contains('dark') ? 'dark' : '';
  };
});
