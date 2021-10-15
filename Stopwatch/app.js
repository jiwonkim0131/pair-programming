const $display = document.querySelector('.display');
const [$startOrStopButton, $resetOrLapButton] =
  document.querySelectorAll('.control');
const $laps = document.querySelector('.laps');
$laps.style.display = 'none';

let buttonState = true;
let [mm, ss, ms] = [0, 0, 0];
let stopwatch = null;
let lapList = [];

const startStopwatch = () => {
  ms += 1;

  if (ms > 99) {
    ss += 1;
    ms = 0;
  }

  if (ss > 59) {
    mm += 1;
    ss = 0;
  }
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
    [mm, ss, ms] = [0, 0, 0];
    lapList = [];

    while ($laps.children.length > 2) {
      $laps.removeChild($laps.lastElementChild);
    }
  } else {
    $laps.style.display = 'grid';
    lapList.push($display.textContent);

    const $fragment = document.createDocumentFragment();
    const $lap = document.createElement('div');
    $lap.textContent = `${lapList[lapList.length - 1]}`;
    const $order = document.createElement('div');
    $order.textContent = `${lapList.length}`;

    $fragment.appendChild($order);
    $fragment.appendChild($lap);
    $laps.appendChild($fragment);
  }
};
