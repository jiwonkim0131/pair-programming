const $display = document.querySelector('.display');
const $stopwatch = document.querySelector('.stopwatch');

$stopwatch.onclick = e => {
  if (!e.target.classList.contains('control')) return;
  console.log(e.target);
};
