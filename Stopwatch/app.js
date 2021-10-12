const $display = document.querySelector('.display');
const [$leftButton, $rightButton] = document.querySelectorAll('.control');
const $laps = document.querySelector('.laps');

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
  timerState = !timerState;

  if ($leftButton.firstChild.nodeValue === 'Start') {
    stopWatch = setInterval(startTime, 10);
    $rightButton.disabled = false;
  } else {
    clearInterval(stopWatch);
  }

  $leftButton.textContent = timerState ? 'Start' : 'Stop';
  $rightButton.textContent = timerState ? 'Reset' : 'Lap';
};

$laps.style.display = 'none';

let lapList = [];
$rightButton.onclick = () => {
  if ($rightButton.firstChild.nodeValue === 'Reset') {
    $display.textContent = `00:00:00`;
    $rightButton.disabled = true;
    [min, sec, mm] = [0, 0, 0];
    $laps.style.display = 'none';

    while ($laps.children.length > 2) {
      $laps.removeChild($laps.lastElementChild);
    }

    lapList = [];
  } else {
    $laps.style.display = 'grid';
    lapList.push($display.firstChild.nodeValue);
    const $fragment = document.createDocumentFragment();

    const $lap = document.createElement('div');
    const lapTime = document.createTextNode(lapList[lapList.length - 1]);
    const $order = document.createElement('div');
    const orderNum = document.createTextNode(lapList.length);

    $order.appendChild(orderNum);
    $lap.appendChild(lapTime);

    $fragment.appendChild($order);
    $fragment.appendChild($lap);
    $laps.appendChild($fragment);
  }
};
