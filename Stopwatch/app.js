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

const lapList = [];
$rightButton.onclick = () => {
  if ($rightButton.firstChild.nodeValue === 'Reset') {
    $display.textContent = `00:00:00`;
    $rightButton.disabled = true;
    [min, sec, mm] = [0, 0, 0];
  } else {
    $laps.style.display = 'grid';
    lapList.push($display.firstChild.nodeValue);
    const $fragment = document.createDocumentFragment();
    lapList.forEach((list, idx) => {
      const $lap = document.createElement('div');
      const lapTime = document.createTextNode(list);
      const $order = document.createElement('div');
      const orderNum = document.createTextNode(idx + 1);

      $lap.appendChild(lapTime);
      $order.appendChild(orderNum);

      $fragment.appendChild($lap);
      $fragment.appendChild($order);
    });
    $laps.appendChild($fragment);
  }
};
