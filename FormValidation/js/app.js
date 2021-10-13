const $signinForm = document.querySelector('.form.signin');
const $icons = document.querySelectorAll('.icon');
const $error = document.querySelectorAll('.error');

$signinForm.onkeyup = e => {
  if (e.target.getAttribute('id') === 'signin-userid') {
    const idState =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        e.target.value
      );

    if (idState) {
      $icons[0].classList.remove('hidden');
      $icons[1].classList.add('hidden');
      $error[0].textContent = '';
    } else {
      $icons[0].classList.add('hidden');
      $icons[1].classList.remove('hidden');
      $error[0].textContent = '올바른 아이디 형식을 입력하세요';
    }
  }
  if (e.target.getAttribute('id') === 'signin-password') {
    const passowrdState = /^[A-Za-z0-9]{6,12}$/.test(e.target.value);

    if (passowrdState) {
      $icons[2].classList.remove('hidden');
      $icons[3].classList.add('hidden');
      $error[1].textContent = '';
    } else {
      $icons[2].classList.add('hidden');
      $icons[3].classList.remove('hidden');
      $error[1].textContent = '영문 또는 숫자를 6~12자 입력하세요';
    }
  }
};
