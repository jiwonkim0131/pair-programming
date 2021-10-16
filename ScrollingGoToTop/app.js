const $scrollIcon = document.querySelector('.scroll-icon');

const gotoTop = () => {
  $scrollIcon.style.display = window.pageYOffset > 200 ? 'block' : 'none';
};

const throttle = (callback, delay) => {
  let scrollTiming;
  return event => {
    if (scrollTiming) return;
    scrollTiming = setTimeout(
      () => {
        callback(event);
        scrollTiming = null;
      },
      delay,
      event
    );
  };
};

$scrollIcon.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

window.onscroll = throttle(() => {
  gotoTop();
}, 100);
