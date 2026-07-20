(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const filters = [...document.querySelectorAll('.portfolio-filter')];
  const cards = [...document.querySelectorAll('.portfolio-card')];
  filters.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => {
      const show = category === 'all' || card.dataset.category === category;
      card.hidden = !show;
    });
  }));

  const counters = [...document.querySelectorAll('[data-count]')];
  const setCounter = (node, value) => {
    const suffix = node.dataset.suffix || '';
    node.textContent = `${Math.round(value)}${suffix}`;
  };
  if (reduce || !('IntersectionObserver' in window)) {
    counters.forEach((node) => setCounter(node, Number(node.dataset.count)));
  } else {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const target = Number(node.dataset.count);
        const start = performance.now();
        const duration = 1100;
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounter(node, target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(node);
      });
    }, { threshold: .5 });
    counters.forEach((node) => counterObserver.observe(node));
  }

  const banner = document.querySelector('[data-seasonal-banner]');
  if (banner) {
    const month = new Date().getMonth() + 1;
    let copy = 'Now scheduling property improvements and recurring maintenance.';
    if (month >= 3 && month <= 5) copy = 'Spring scheduling is open for cleanups, mulch, mowing and landscape improvements.';
    else if (month >= 6 && month <= 8) copy = 'Summer routes and landscape improvement scheduling are open.';
    else if (month >= 9 && month <= 11) copy = 'Fall cleanup, aeration, overseeding and leaf-removal scheduling is open.';
    else copy = 'Snow and ice service plus early spring scheduling are available.';
    const message = banner.querySelector('span');
    if (message) message.textContent = copy;
  }

  document.querySelectorAll('.faq details').forEach((details) => {
    details.addEventListener('toggle', () => {
      if (!details.open) return;
      document.querySelectorAll('.faq details[open]').forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });
})();
