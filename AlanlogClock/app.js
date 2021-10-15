(function clocking() {
  const $handHour = document.querySelector('.hand.hour');
  const $handMinute = document.querySelector('.hand.minute');
  const $handSecond = document.querySelector('.hand.second');

  const currentTime = (() => {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const second = new Date().getSeconds();

    return { hour, minute, second };
  })();

  const getCurrentHour = (hour, minute) => {
    const formatedHour = hour % 12 ? hour % 12 : 12;
    return formatedHour * 30 + minute * 0.5;
  };
  const getCurrentMinute = (minute, second) => minute * 6 + second * 0.1;
  const getCurrentSecond = second => second * 6;

  (function () {
    $handHour.style.setProperty(
      '--deg',
      getCurrentHour(currentTime.hour, currentTime.minute)
    );

    $handMinute.style.setProperty(
      '--deg',
      getCurrentMinute(currentTime.minute, currentTime.second)
    );

    $handSecond.style.setProperty(
      '--deg',
      getCurrentSecond(currentTime.second)
    );
  })();

  setTimeout(clocking, 1000);
})();
