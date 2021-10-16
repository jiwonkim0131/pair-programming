const $tabs = document.querySelector('.tabs');

const render = tabItems => {
  $tabs.style.setProperty('--tabs-length', tabItems.length);
  document.querySelector('.spinner').style.display = 'none';
  const $nav = document.createElement('nav');
  const $fragmentForNav = document.createDocumentFragment();

  tabItems.forEach(({ title }, idx) => {
    const $tabTitle = document.createElement('div');
    $tabTitle.classList.add('tab');
    $tabTitle.dataset.index = idx;
    $tabTitle.textContent = `${title}`;
    $fragmentForNav.appendChild($tabTitle);
  });

  const $glider = document.createElement('span');
  $glider.classList.add('glider');
  $fragmentForNav.appendChild($glider);
  $nav.appendChild($fragmentForNav);
  $tabs.appendChild($nav);

  const $fragmentForContent = document.createDocumentFragment();
  tabItems.forEach(({ content }, idx) => {
    const $tabContent = document.createElement('div');
    $tabContent.classList.add('tab-content');
    $tabContent.textContent = `${content}`;
    $fragmentForContent.appendChild($tabContent);
    if (idx === 0) $tabContent.classList.add('active');
  });
  $tabs.appendChild($fragmentForContent);
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
  }).then(tabItems => render(tabItems));

window.addEventListener('DOMContentLoaded', fetchTabsData);

$tabs.onclick = e => {
  if (!e.target.classList.contains('tab')) return;

  [...document.querySelectorAll('.tab-content')].map((content, idx) =>
    content.classList.toggle('active', +e.target.dataset.index === idx)
  );

  document.querySelector('.glider').style.left = `${
    getComputedStyle($tabs).getPropertyValue('--tab-width') *
    e.target.dataset.index
  }px`;
};
