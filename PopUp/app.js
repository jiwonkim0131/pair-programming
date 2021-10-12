const $togglePopUp = document.querySelector('.toggle-popup');
const $modalWrap = document.querySelector('.modal-wrap');
const $form = document.querySelector('form');
const $input = document.querySelector('input');

const $popupMessage = document.querySelector('.popup-message');

$togglePopUp.onclick = () => {
  $modalWrap.classList.toggle('active');
};

$form.onsubmit = e => {
  e.preventDefault();
  const content = $input.value.trim();

  if (content) {
    $popupMessage.textContent = content;
    $input.value = '';
    $modalWrap.classList.remove('active');
  }
};

$modalWrap.onclick = e => {
  if (!e.target.classList.contains('close')) return;
  $modalWrap.classList.remove('active');
  if ($input.value) $input.value = '';
};
