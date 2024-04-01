import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  const footerPath = footerMeta.footer || '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  footer.classList.add('container', 'text-center');

  const footerRows = Array.from(footer.children[0].children);

  footerRows.forEach(row => {
    row.classList.add('row', 'footer-items');
    Array.from(row.children).forEach(col => {
      col.classList.add('col-md-2', 'footer-item');
    });
  });
  const footerBottomRows = Array.from(footer.children[1].children);
  footerBottomRows.forEach(row => {
    row.classList.add('row', 'py-5');
    row.children[0].classList.add('col-lg-2', 'col-md-2', 'text-lg-end', 'text-start', 'footer-bar-bottom', 'left');
    row.children[1].classList.add('col-lg-7', 'col-md-7', 'text-start', 'footer-bar-bottom', 'right');
  });
  block.append(footer);
}
