const $display = document.querySelector('.display');
const $stopwatch = document.querySelector('.stopwatch');

const [$leftButton, $rightButton] = document.querySelectorAll('.control');

let timerState = true;
let [min, sec, mm] = [0, 0, 0];

const startTime = () => {
  mm++;

  if (mm > 99) {
    sec += 1;
    mm = 0;
  }

  if (sec > 59) {
    min += 1;
    sec = 0;
  }
  $display.textContent = `${min < 10 ? '0' + min : min}:${
    sec < 10 ? '0' + sec : sec
  }:${mm < 10 ? '0' + mm : mm}`;
};

let stopWatch = null;

$leftButton.onclick = () => {
  $leftButton.textContent = timerState ? 'Start' : 'Stop';
  $rightButton.textContent = timerState ? 'Reset' : 'Lap';

  if ($leftButton.firstChild.nodeValue === 'Start') {
    stopWatch = setInterval(startTime, 10);
    timerState = !timerState;
  } else {
    clearInterval(stopWatch);
    timerState = !timerState;
  }
};
