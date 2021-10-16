const $accordion = document.querySelector('.accordion');
const $menuContainerActive = document.querySelector('.menu-container.active');

const fetchAccordion = () => {
  $menuContainerActive.lastElementChild.style.height = `${$menuContainerActive.lastElementChild.scrollHeight}px`;
  $menuContainerActive.lastElementChild.style.transition = 'none';
};

window.addEventListener('DOMContentLoaded', fetchAccordion);
window.addEventListener('load', () => {
  $menuContainerActive.lastElementChild.style.removeProperty('transition');
});

$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;

  [...document.querySelectorAll('.menu-container')].forEach(menuContainer => {
    menuContainer.classList.toggle(
      'active',
      menuContainer.firstElementChild === e.target
    );
    menuContainer.lastElementChild.style.height =
      menuContainer.classList.contains('active')
        ? `${menuContainer.lastElementChild.scrollHeight}px`
        : '0';
  });
};
