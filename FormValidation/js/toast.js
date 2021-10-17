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
      <h4 class="toast-heading">${callback.title}</h4>
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

const createToastAction = (type, title, message) => ({ type, title, message });

$body.onclick = e => {
  if (!e.target.classList.contains('close')) return;
  e.target.parentNode.remove();
};

export { toaster, createToastAction };
