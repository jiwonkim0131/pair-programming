import { toaster, createToastAction } from './toast.js';

const $signinForm = document.querySelector('.form.signin');
const $signupForm = document.querySelector('.form.signup');
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

[$signinForm, $signupForm].forEach($form => {
  const allInputOfForm = $form.querySelectorAll('input');

  $form.oninput = e => {
    const $iconSuccess = e.target.parentNode.querySelector('.icon-success');
    const $iconError = e.target.parentNode.querySelector('.icon-error');
    const $errorMessage = e.target.parentNode.querySelector('.error');
    const inputName = inputStatus[e.target.name];

    inputName.status =
      e.target.name !== 'confirm-password'
        ? inputName.RegExp.test(e.target.value)
        : isSamePassword(e.target.value);

    $iconSuccess.classList.toggle('hidden', !inputName.status);
    $iconError.classList.toggle('hidden', inputName.status);
    $errorMessage.textContent = inputName.status ? '' : inputName.errorMessage;

    e.target.closest('.form').querySelector('.button').disabled =
      !isSubmit(allInputOfForm);
  };

  $form.onsubmit = e => {
    e.preventDefault();

    toaster.add(
      createToastAction('success', 'Well done!', 'This is a success alert')
    );

    const userInfo = {};
    allInputOfForm.forEach(input => {
      userInfo[`${input.nextElementSibling.textContent}`] = `${input.value}`;
    });

    console.log(userInfo);
  };
});

[$signinLink, $signupLink].forEach($formLink => {
  $formLink.onclick = () => {
    $signinLink.closest('form').classList.toggle('hidden');
    $signupLink.closest('form').classList.toggle('hidden');
  };
});
