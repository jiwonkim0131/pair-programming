// toaster
const $body = document.querySelector('body');

const toaster = {
  add(callback) {
    const $toast = document.createElement('div');
    $toast.classList.add('toast', 'toast-' + callback.type);
    $body.appendChild($toast);
    $body.style.overflowX = 'hidden';

    const $toastList = document.querySelectorAll('.toast');

    $toast.innerHTML = `
      <h4 class="toast-heading">${callback.title} ${$toastList.length - 1}</h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href="#${callback.type}" />
        </svg>
        <p>${callback.message}</p>
      </div>
      <a class="close">&times;</a>
    `;

    const height = $toast.offsetHeight;

    [...$toastList].reverse().forEach((toast, idx) => {
      toast.style.bottom = `${idx * height}px`;
    });

    setTimeout(() => $toast.remove(), 3000);
  }
};

const createToastAction = (type, title, message) => ({ type, title, message });

// signIn
const $signinForm = document.querySelector('.form.signin');
const $signupForm = document.querySelector('.form.signup');
const $signinIcons = document.querySelectorAll('.form.signin .icon');
const $signupIcons = document.querySelectorAll('.form.signup .icon');
const $signinError = document.querySelectorAll('.form.signin .error');
const $signupError = document.querySelectorAll('.form.signup .error');
const $signinButton = document.querySelector('button.signin');
const $signupButton = document.querySelector('button.signup');
const $signinUserid = document.getElementById('signin-userid');
const $signinPassword = document.getElementById('signin-password');
const $signinLink = document.querySelector('.form.signup .link>a');
const $signupLink = document.querySelector('.form.signin .link>a');

const signInState = {
  userid: false,
  password: false
};

const checkId = checkVal => {
  let idState = false;
  idState =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
      checkVal
    );
  if (idState) {
    $signinIcons[0].classList.remove('hidden');
    $signinIcons[1].classList.add('hidden');
    $signinError[0].textContent = '';
  } else {
    $signinIcons[0].classList.add('hidden');
    $signinIcons[1].classList.remove('hidden');
    $signinError[0].textContent = '올바른 아이디 형식을 입력하세요';
  }
  return idState;
};

const checkPwd = checkVal => {
  let passwordState = false;

  passwordState = /^[A-Za-z0-9]{6,12}$/.test(checkVal);
  if (passwordState) {
    $signinIcons[2].classList.remove('hidden');
    $signinIcons[3].classList.add('hidden');
    $signinError[1].textContent = '';
  } else {
    $signinIcons[2].classList.add('hidden');
    $signinIcons[3].classList.remove('hidden');
    $signinError[1].textContent = '영문 또는 숫자를 6~12자 입력하세요';
  }
  return passwordState;
};

$signinUserid.onkeyup = e => {
  signInState[e.target.name] = checkId(e.target.value);
};

$signinPassword.onkeyup = e => {
  signInState[e.target.name] = checkPwd(e.target.value);
};

$signinForm.onkeyup = () => {
  if (signInState.userid && signInState.password)
    $signinButton.disabled = false;
  else {
    $signinButton.disabled = true;
  }
};

$signinForm.onsubmit = e => {
  e.preventDefault();
  toaster.add(
    createToastAction('success', 'Well done!', 'This is a success alert')
  );
  console.log($signinUserid.value);
  console.log($signinPassword.value);
};

$signinLink.onclick = () => {
  $signupForm.classList.add('hidden');
  $signinForm.classList.remove('hidden');
};

// signUp
const $signupUserid = document.getElementById('signup-userid');
const $signupName = document.getElementById('signup-name');
const $signupPassword = document.getElementById('signup-password');
const $signupConfirmPassword = document.getElementById(
  'signup-confirm-password'
);

const signUpState = {
  userid: false,
  password: false,
  username: false,
  'confirm-password': false
};
const checkSingupId = checkVal => {
  let idState = false;
  idState =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
      checkVal
    );
  if (idState) {
    $signupIcons[0].classList.remove('hidden');
    $signupIcons[1].classList.add('hidden');
    $signupError[0].textContent = '';
  } else {
    $signupIcons[0].classList.add('hidden');
    $signupIcons[1].classList.remove('hidden');
    $signupError[0].textContent = '올바른 아이디 형식을 입력하세요';
  }
  return idState;
};

const checkName = checkVal => {
  if (checkVal) {
    $signupIcons[2].classList.remove('hidden');
    $signupIcons[3].classList.add('hidden');
    $signupError[1].textContent = '';
  } else {
    $signupIcons[2].classList.add('hidden');
    $signupIcons[3].classList.remove('hidden');
    $signupError[1].textContent = '이름을 입력해주세요';
  }
  return !!checkVal;
};

const checkSignupPwd = checkVal => {
  let passwordState = false;

  passwordState = /^[A-Za-z0-9]{6,12}$/.test(checkVal);
  if (passwordState) {
    $signupIcons[4].classList.remove('hidden');
    $signupIcons[5].classList.add('hidden');
    $signupError[2].textContent = '';
  } else {
    $signupIcons[4].classList.add('hidden');
    $signupIcons[5].classList.remove('hidden');
    $signupError[2].textContent = '영문 또는 숫자를 6~12자 입력하세요';
  }
  return passwordState;
};

const checkConfirmPwd = checkVal => {
  if (checkVal === $signupPassword.value) {
    $signupIcons[6].classList.remove('hidden');
    $signupIcons[7].classList.add('hidden');
    $signupError[3].textContent = '';
  } else {
    $signupIcons[6].classList.add('hidden');
    $signupIcons[7].classList.remove('hidden');
    $signupError[3].textContent = '패스워드가 일치하지 않습니다.';
  }

  return checkVal === $signupPassword.value;
};

$signupUserid.onkeyup = e => {
  signUpState[e.target.name] = checkSingupId(e.target.value);
};

$signupName.onkeyup = e => {
  signUpState[e.target.name] = checkName(e.target.value.trim());
};

$signupPassword.onkeyup = e => {
  signUpState[e.target.name] = checkSignupPwd(e.target.value);
};

$signupConfirmPassword.onkeyup = e => {
  signUpState[e.target.name] = checkConfirmPwd(e.target.value);
};

$signupLink.onclick = () => {
  $signinForm.classList.add('hidden');
  $signupForm.classList.remove('hidden');
};

$signupForm.onkeyup = () => {
  // console.log(signUpState['confirm-password']);
  if (
    signUpState.userid &&
    signUpState.password &&
    signUpState.username &&
    signUpState['confirm-password']
  )
    $signupButton.disabled = false;
  else {
    $signupButton.disabled = true;
  }
};

$signupForm.onsubmit = e => {
  e.preventDefault();
  toaster.add(
    createToastAction('success', 'Well done!', 'This is a success alert')
  );
  console.log($signupUserid.value);
  console.log($signupName.value);
  console.log($signupPassword.value);
  console.log($signupConfirmPassword.value);
};
