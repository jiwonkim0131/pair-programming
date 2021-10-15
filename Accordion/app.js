const $accordion = document.querySelector('.accordion');
const $menuContainerActive = document.querySelector('.menu-container.active');
const $menuContainers = document.querySelectorAll('.menu-container');

const fetchAccordion = () => {
  $menuContainerActive.lastElementChild.style.height = `${$menuContainerActive.lastElementChild.scrollHeight}px`;
  $menuContainerActive.lastElementChild.style.transition = 'none';
};

window.addEventListener('DOMContentLoaded', fetchAccordion);

$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;

  $menuContainerActive.lastElementChild.style.removeProperty('transition');

  [...$menuContainers].forEach(menuContainer => {
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
