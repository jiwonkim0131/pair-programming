const $body = document.querySelector('body');
$body.style.overflowX = 'hidden';
const toastQueue = [];

const toaster = {
  add(callback) {
    const $toast = document.createElement('div');
    $toast.classList.add('toast', 'toast-' + callback.type);
    toastQueue.unshift($toast);
    $body.appendChild($toast);

    $toast.innerHTML = `
      <h4 class="toast-heading">${callback.title} ${toastQueue.length - 1}</h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href="#${callback.type}" />
        </svg>
        <p>${callback.message}</p>
      </div>
      <a class="close">&times;</a>
    `;

    toastQueue.forEach((toast, idx) => {
      toast.style.bottom = `${idx * $toast.offsetHeight}px`;
    });

    setTimeout(() => toastQueue.pop().remove(), 3000);
  }
};

const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

const createToastAction = (type, title, message) => ({ type, title, message });

// Button click Event Handlers
document.querySelector('.show-success').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.SUCCESS,
      'Well done!',
      'This is a success alert'
    )
  );

document.querySelector('.show-error').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.ERROR,
      'Check it out!',
      'This is a error alert'
    )
  );

document.querySelector('.show-warning').onclick = () =>
  toaster.add(
    createToastAction(
      TOAST_TYPE.WARNING,
      'Check it out!',
      'This is a warning alert'
    )
  );
