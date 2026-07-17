(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu');
  const navLinks = document.querySelector('.navlinks');
  const progress = document.querySelector('.progress');
  const mobileCta = document.querySelector('.mobile-cta');
  const hero = document.querySelector('.hero');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!nav || !menu) return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
  }

  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const updateScrollState = () => {
    const y = window.scrollY;
    nav?.classList.toggle('scrolled', y > 32);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percent = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      progress.style.width = `${percent}%`;
    }

    if (mobileCta && hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      mobileCta.classList.toggle('is-visible', y > heroBottom * 0.72);
    }
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('resize', updateScrollState, { passive: true });

  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  document.querySelectorAll('[data-compare]').forEach((compare) => {
    const input = compare.querySelector('input[type="range"]');
    const before = compare.querySelector('.before');
    const line = compare.querySelector('.compare-line');
    const handle = compare.querySelector('.compare-handle');

    if (!input || !before || !line || !handle) return;

    const updateCompare = () => {
      const value = Number(input.value);
      before.style.width = `${value}%`;
      line.style.left = `${value}%`;
      handle.style.left = `${value}%`;
      input.setAttribute('aria-valuetext', `${value}% before image visible`);
    };

    input.addEventListener('input', updateCompare);
    updateCompare();
  });

  if (!reducedMotion) {
    const parallaxImages = document.querySelectorAll('.hero-media img, .project-media img, .commercial-media img');
    let ticking = false;

    const updateParallax = () => {
      parallaxImages.forEach((image) => {
        const container = image.parentElement;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        image.style.setProperty('--parallax-y', `${centerOffset * -18}px`);
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateParallax);
    }, { passive: true });

    updateParallax();
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', targetId);
    });
  });

  const form = document.querySelector('.form');
  form?.addEventListener('submit', () => {
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    button.disabled = true;
    button.classList.add('is-loading');
    const label = button.querySelector('span');
    if (label) label.textContent = 'Sending request…';
  });
})();
