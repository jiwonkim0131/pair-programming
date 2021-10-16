const $modalWrap = document.querySelector('.modal-wrap');
const $input = document.querySelector('input');

document.querySelector('.toggle-popup').onclick = () => {
  $modalWrap.classList.toggle('active');
  $input.focus();
};

document.querySelector('form').onsubmit = e => {
  e.preventDefault();
  const content = $input.value.trim();

  if (content) {
    document.querySelector('.popup-message').textContent = content;
    $input.value = '';
    $modalWrap.classList.remove('active');
  }
};

$modalWrap.onclick = e => {
  if (!e.target.classList.contains('close')) return;
  $modalWrap.classList.remove('active');
  if ($input.value) $input.value = '';
};
