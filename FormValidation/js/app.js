const $signinForm = document.querySelector('.form.signin');
const $icons = document.querySelectorAll('.icon');
const $error = document.querySelectorAll('.error');
const $signinButton = document.querySelector('button.signin');
const $signinUserid = document.getElementById('signin-userid');
const $signinPassword = document.getElementById('signin-password');

const signInState = {
  userid: false,
  password: false
};

const signUpState = {
  userid: false,
  password: false,
  username: false,
  'confirm-password': false
};

const checkId = checkVal => {
  let idState = false;
  idState =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
      checkVal
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
  return idState;
};

const checkPwd = checkVal => {
  let passwordState = false;

  passwordState = /^[A-Za-z0-9]{6,12}$/.test(checkVal);
  if (passwordState) {
    $icons[2].classList.remove('hidden');
    $icons[3].classList.add('hidden');
    $error[1].textContent = '';
  } else {
    $icons[2].classList.add('hidden');
    $icons[3].classList.remove('hidden');
    $error[1].textContent = '영문 또는 숫자를 6~12자 입력하세요';
  }
  return passwordState;
};

$signinUserid.onkeyup = e => {
  signInState[e.target.name] = checkId(e.target.value);
};

$signinPassword.onkeyup = e => {
  signInState[e.target.name] = checkPwd(e.target.value);
};

$signinForm.onkeyup = e => {
  if (signInState.userid && signInState.password) {
    $signinButton.disabled = false;
  }
};

$signinForm.onsubmit = e => {
  e.preventDefault();
  console.log($signinUserid.value);
  console.log($signinPassword.value);
};
