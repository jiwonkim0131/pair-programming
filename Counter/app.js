const counter = (() => {
  let num = 0;

  const $count = document.querySelector('.counter');
  const render = () => {
    $count.textContent = num;
  };

  return {
    increase() {
      num += 1;
      render();
    },
    decrease() {
      if (num >= 1) num -= 1;
      render();
    }
  };
})();

document.querySelector('.increase').onclick = counter.increase;
document.querySelector('.decrease').onclick = counter.decrease;
