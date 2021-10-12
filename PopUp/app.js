const $togglePopUp = document.querySelector('.toggle-popup');
const $modalWrap = document.querySelector('.modal-wrap');
// const $form = document.querySelector('form');
const $input = document.querySelector('input');

const $popupMessage = document.querySelector('.popup-message');

$togglePopUp.onclick = () => {
  $modalWrap.classList.toggle('active');
};

$input.onkeyup = e => {
  e.preventDefault();
  if (e.key !== 'Enter') return;
  const content = $input.value.trim();
  if (content) {
    $popupMessage.textContent = content;
  }
};
