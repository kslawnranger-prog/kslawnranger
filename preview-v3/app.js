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
  const form = document.querySelector('.form');
  let lastFocused = null;

  if (year) year.textContent = new Date().getFullYear();

  const ensureHeadMetadata = () => {
    const canonicalUrl = 'https://kslawnranger.com/preview-v3/';
    if (!document.querySelector('link[rel="canonical"]')) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

    const meta = {
      'og:title': 'KS Lawn Ranger | Properties, Perfected.',
      'og:description': 'Professional lawn care, landscaping, commercial maintenance, cleanups, and snow service across Northeast Kansas.',
      'og:type': 'website',
      'og:url': canonicalUrl,
      'og:image': 'https://kslawnranger.com/images/hero.jpg',
      'twitter:card': 'summary_large_image'
    };

    Object.entries(meta).forEach(([property, content]) => {
      if (document.querySelector(`meta[property="${property}"], meta[name="${property}"]`)) return;
      const tag = document.createElement('meta');
      if (property.startsWith('twitter:')) tag.name = property;
      else tag.setAttribute('property', property);
      tag.content = content;
      document.head.appendChild(tag);
    });

    if (!document.querySelector('script[data-local-business-schema]')) {
      const schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.localBusinessSchema = 'true';
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LandscapingBusiness',
        name: 'KS Lawn Ranger LLC',
        url: 'https://kslawnranger.com/',
        telephone: '+1-913-221-7981',
        email: 'kslawnranger@gmail.com',
        image: 'https://kslawnranger.com/images/ks-lawn-ranger-logo.jpg',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Alma',
          addressRegion: 'KS',
          addressCountry: 'US'
        },
        areaServed: ['Manhattan', 'Wamego', 'St. George', 'Alma', 'Ogden', 'Junction City'],
        openingHours: 'Mo-Sa 07:00-18:00',
        priceRange: '$$'
      });
      document.head.appendChild(schema);
    }
  };

  ensureHeadMetadata();

  const focusableInMenu = () => navLinks
    ? [...navLinks.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    : [];

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!nav || !menu) return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
    if (restoreFocus && lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  const openMenu = () => {
    if (!nav || !menu || !navLinks) return;
    lastFocused = document.activeElement;
    nav.classList.add('open');
    menu.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-label', 'Close navigation');
    document.body.classList.add('menu-open');
    focusableInMenu()[0]?.focus();
  };

  if (menu && nav) {
    menu.addEventListener('click', () => {
      nav.classList.contains('open') ? closeMenu({ restoreFocus: true }) : openMenu();
    });
  }

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key !== 'Tab' || !nav?.classList.contains('open')) return;
    const focusable = focusableInMenu();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
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
  window.addEventListener('resize', () => {
    updateScrollState();
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });

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

  const trackedSections = [...document.querySelectorAll('main section[id]')];
  const navAnchors = [...document.querySelectorAll('.navlinks a[href^="#"]')];
  if ('IntersectionObserver' in window && trackedSections.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navAnchors.forEach((anchor) => {
        const active = anchor.getAttribute('href') === `#${visible.target.id}`;
        anchor.classList.toggle('is-active', active);
        if (active) anchor.setAttribute('aria-current', 'page');
        else anchor.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.01, 0.2, 0.5] });
    trackedSections.forEach((section) => activeObserver.observe(section));
  }

  if (form) {
    const button = form.querySelector('button[type="submit"]');
    const buttonLabel = button?.querySelector('span');
    const originalLabel = buttonLabel?.textContent || 'Send estimate request';
    const status = document.createElement('p');
    status.className = 'form-status full';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot?.value) return;

      if (button) {
        button.disabled = true;
        button.classList.add('is-loading');
      }
      if (buttonLabel) buttonLabel.textContent = 'Sending request…';
      status.textContent = '';
      status.className = 'form-status full';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        status.textContent = 'Thank you. Your estimate request was sent successfully.';
        status.classList.add('is-success');
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { event_category: 'Form', event_label: 'Preview V3 estimate form' });
        }
      } catch (error) {
        status.innerHTML = 'We could not send the form. Please call <a href="tel:+19132217981">(913) 221-7981</a> or email <a href="mailto:kslawnranger@gmail.com">kslawnranger@gmail.com</a>.';
        status.classList.add('is-error');
      } finally {
        if (button) {
          button.disabled = false;
          button.classList.remove('is-loading');
        }
        if (buttonLabel) buttonLabel.textContent = originalLabel;
      }
    });
  }
})();