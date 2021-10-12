const $spinner = document.querySelector('.spinner');
const $tabs = document.querySelector('.tabs');

const render = v => {
  $tabs.style.setProperty('--tabs-length', v.length);
  $spinner.style.display = 'none';
  const $nav = document.createElement('nav');

  $tabs.appendChild($nav);

  v.forEach(({ title }, idx) => {
    const $tabTitle = document.createElement('div');
    $tabTitle.classList.add('tab');
    $tabTitle.setAttribute('data-index', idx);
    const textNode = document.createTextNode(title);
    $tabTitle.appendChild(textNode);
    $nav.appendChild($tabTitle);
  });
  const $glider = document.createElement('span');
  $glider.classList.add('glider');
  $nav.appendChild($glider);

  v.forEach(({ content }, idx) => {
    const $tabContent = document.createElement('div');
    $tabContent.classList.add('tab-content');
    const textNode = document.createTextNode(content);
    $tabContent.appendChild(textNode);
    $tabs.appendChild($tabContent);
    if (!idx) $tabContent.classList.add('active');
  });
};

const fetchTabsData = () =>
  new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          }
        ]),
      1000
    );
  }).then(v => render(v));

window.addEventListener('DOMContentLoaded', fetchTabsData);

$tabs.onclick = e => {
  if (!e.target.classList.contains('tab')) return;

  const $tabContent = document.querySelectorAll('.tab-content');
  const $glider = document.querySelector('.glider');

  [...$tabContent].map((v, idx) =>
    v.classList.toggle('active', +e.target.dataset.index === idx)
  );

  const tabWidth = getComputedStyle($tabs).getPropertyValue('--tab-width');
  $glider.style.left = `${tabWidth * e.target.dataset.index}px`;
};
