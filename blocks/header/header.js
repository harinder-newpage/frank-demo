import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.classList.add('navbar', 'navbar-expand-md')
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  const navSection = nav.querySelector('.section');
  navSection.classList.add('container-fluid');
  const hamburgerHTML = `<a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>`;
  navSection.insertAdjacentHTML('afterbegin', hamburgerHTML)
  const siteNavbar = nav.querySelector('.default-content-wrapper');
  siteNavbar.classList.add('offcanvas', 'offcanvas-start');
  siteNavbar.id = 'offcanvasNavbar';
  siteNavbar.setAttribute('tabindex', -1)
  siteNavbar.setAttribute('aria-labelledby', 'offcanvasNavbarLabel');
  const menuHeaderHTML = `<div class="offcanvas-header">
  <h5 class="offcanvas-title" id="offcanvasNavbarLabel"><img src="./images/Know-Pneumonia-Logo.png" class="img-fluid" alt="Know Pneumonia Image"></h5>
  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>`
  siteNavbar.insertAdjacentHTML('afterbegin', menuHeaderHTML);
  const itemsArray = Array.from(siteNavbar.children);
  itemsArray.forEach(function (item) {
    if (item.nodeName === 'UL') {
      var offcanvasBody = document.createElement('div');
      offcanvasBody.classList.add('offcanvas-body');
      var ulClone = item.cloneNode(true);
      offcanvasBody.appendChild(ulClone);
      item.parentNode.replaceChild(offcanvasBody, item);
      const ulMenu = offcanvasBody.children[0]
      ulMenu.classList.add('navbar-nav', 'justify-content-center', 'flex-grow-1');
      var listItem = Array.from(ulMenu.children);
      listItem.forEach(function (subItem) {
        subItem.classList.add('nav-item', 'main-menu', 'dropdown');
        const aTag = subItem.querySelectorAll('a');
        aTag.forEach((a) => {
          a.classList.add('nav-link');
          a.setAttribute('aria-current', 'page');
          const subMenu = subItem.querySelector('ul');
          if (subMenu) {
            subMenu.classList.add('dropdown-menu')
            a.setAttribute('role', 'button');
            a.setAttribute('data-bs-toggle', 'dropdown');
            a.setAttribute('aria-expanded', 'false');
            const aTagChild = subMenu.querySelectorAll('a');
            aTagChild.forEach((subItemNew) => {
              subItemNew.classList.add('dropdown-item', 'text-wrap');
            })
            const liTagChild = subMenu.querySelectorAll('li');
            liTagChild.forEach((subItemNew) => {
              subItemNew.classList.add('nav-item', 'sub-menu');
            })
          }
        })

      })
    }
  });
  // My Code From Till Here
  block.append(nav);
}



