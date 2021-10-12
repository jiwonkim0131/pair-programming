const $body = document.querySelector('body');

const fetchTheme = () => {
  if (localStorage.getItem('themeState') === 'dark')
    $body.classList.add('dark');
};
