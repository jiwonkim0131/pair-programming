const $display = document.querySelector('.display');
const [$startOrStopButton, $resetOrLapButton] =
  document.querySelectorAll('.control');
const $laps = document.querySelector('.laps');
$laps.style.display = 'none';

let buttonState = true;
let stopwatch = null;
let interval = 0;
let lapList = [];

const startStopwatch = () => {
  interval += 1;
  const mm = Math.floor(interval / 6000);
  const ss = Math.floor(interval / 100) % 60;
  const ms = interval % 100;

  $display.textContent = `${mm < 10 ? '0' + mm : mm}:${
    ss < 10 ? '0' + ss : ss
  }:${ms < 10 ? '0' + ms : ms}`;
};

$startOrStopButton.onclick = () => {
  buttonState = !buttonState;

  if ($startOrStopButton.textContent === 'Start') {
    stopwatch = setInterval(startStopwatch, 10);
    $resetOrLapButton.disabled = false;
  } else {
    clearInterval(stopwatch);
  }

  $startOrStopButton.textContent = buttonState ? 'Start' : 'Stop';
  $resetOrLapButton.textContent = buttonState ? 'Reset' : 'Lap';
};

$resetOrLapButton.onclick = () => {
  if ($resetOrLapButton.textContent === 'Reset') {
    $display.textContent = `00:00:00`;
    $resetOrLapButton.disabled = true;
    $laps.style.display = 'none';

    interval = 0;
    lapList = [];

    [...$laps.children].forEach(lap => {
      if (!lap.classList.contains('lap-title')) lap.remove();
    });
  } else {
    $laps.style.display = 'grid';
    lapList.push($display.textContent);

    const $fragmentForLaps = document.createDocumentFragment();
    const $lap = document.createElement('div');
    $lap.textContent = `${lapList.length}`;
    const $time = document.createElement('div');
    $time.textContent = `${lapList[lapList.length - 1]}`;

    $fragmentForLaps.appendChild($lap);
    $fragmentForLaps.appendChild($time);
    $laps.appendChild($fragmentForLaps);
  }
};
