(function printNow() {
  const $handHour = document.querySelector('.clock > .hand.hour');
  const $handMinute = document.querySelector('.clock > .hand.minute');
  const $handSecond = document.querySelector('.clock > .hand.second');

  const currentTime = new Date();

  const getCurrentHour = (hour, min) => {
    hour %= 12;
    hour = hour || 12;
    return hour * 30 + min * 0.5;
  };

  const getCurrentMinute = (min, sec) => min * 6 + sec * 0.1;
  const getCurrentSecond = sec => sec * 6;

  (function () {
    $handHour.style.setProperty(
      '--deg',
      getCurrentHour(
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds()
      )
    );

    $handMinute.style.setProperty(
      '--deg',
      getCurrentMinute(currentTime.getMinutes(), currentTime.getSeconds())
    );

    $handSecond.style.setProperty(
      '--deg',
      getCurrentSecond(currentTime.getSeconds())
    );
  })();

  setTimeout(printNow, 1000);
})();
