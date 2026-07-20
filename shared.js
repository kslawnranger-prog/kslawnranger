(() => {
  'use strict';
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.navlinks');
  const header = document.querySelector('.nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      menu.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      header?.classList.toggle('open', !open);
      nav.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menu.setAttribute('aria-expanded', 'false');
      header?.classList.remove('open');
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    }));
  }
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
