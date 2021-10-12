const $accordion = document.querySelector('.accordion');
const $menuContainerActive = document.querySelector('.menu-container.active');
const $menuContainers = document.querySelectorAll('.menu-container');

const fetchAccordion = () => {
  $menuContainerActive.lastElementChild.style.height = `${$menuContainerActive.lastElementChild.scrollHeight}px`;
};

$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;
  //   active = !active;

  [...$menuContainers].forEach(v => {
    v.classList.toggle('active', v.firstElementChild === e.target);
    v.lastElementChild.style.height = v.classList.contains('active')
      ? `${v.lastElementChild.scrollHeight}px`
      : '0';
  });
};

window.addEventListener('DOMContentLoaded', fetchAccordion);
