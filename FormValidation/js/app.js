import { toaster, createToastAction } from './toast.js';

const $signinLink = document.querySelector('.form.signup .link>a');
const $signupLink = document.querySelector('.form.signin .link>a');

const inputStatus = {
  userid: {
    RegExp:
      /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    errorMessage: '올바른 아이디 형식을 입력하세요.',
    status: false
  },
  password: {
    RegExp: /^[A-Za-z0-9]{6,12}$/,
    errorMessage: '영문 또는 숫자를 6-12자 입력하세요.',
    status: false
  },
  username: {
    RegExp: /(.)/,
    errorMessage: '이름을 입력해주세요.',
    status: false
  },
  'confirm-password': {
    errorMessage: '패스워드가 일치하지 않습니다.',
    status: false
  }
};

const isSubmit = allInputOfForm =>
  [...allInputOfForm].every(inputType => inputStatus[inputType.name].status);

const isSamePassword = confirmPassword =>
  confirmPassword === document.getElementById('signup-password').value;

document.body.oninput = e => {
  const $form = e.target.closest('.form');
  const allInputOfForm = $form.querySelectorAll('input');
  const [$iconSuccess, $iconError] =
    e.target.parentNode.querySelectorAll('.icon');
  const $errorMessage = e.target.parentNode.querySelector('.error');
  const inputType = inputStatus[e.target.name];

  inputType.status =
    e.target.name !== 'confirm-password'
      ? inputType.RegExp.test(e.target.value)
      : isSamePassword(e.target.value);

  $iconSuccess.classList.toggle('hidden', !inputType.status);
  $iconError.classList.toggle('hidden', inputType.status);
  $errorMessage.textContent = inputType.status ? '' : inputType.errorMessage;

  e.target.closest('.form').querySelector('.button').disabled =
    !isSubmit(allInputOfForm);
};

document.body.onsubmit = e => {
  e.preventDefault();

  toaster.add(
    createToastAction('success', 'Well done!', 'This is a success alert')
  );

  const userInfo = {};
  e.target.querySelectorAll('input').forEach(input => {
    userInfo[`${input.nextElementSibling.textContent}`] = `${input.value}`;
  });

  console.log(userInfo);
};

[$signinLink, $signupLink].forEach($formLink => {
  $formLink.onclick = () => {
    $signinLink.closest('form').classList.toggle('hidden');
    $signupLink.closest('form').classList.toggle('hidden');
  };
});
