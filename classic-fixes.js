(() => {
  'use strict';

  document.querySelectorAll('.ba-wrapper').forEach((wrapper) => {
    const resize = wrapper.querySelector('.ba-resize');
    const image = resize?.querySelector('img');
    if (!resize || !image) return;

    const alignImages = () => {
      image.style.width = `${wrapper.clientWidth}px`;
      image.style.maxWidth = 'none';
      image.style.height = '100%';
      image.style.objectFit = 'cover';
    };

    alignImages();
    if ('ResizeObserver' in window) {
      new ResizeObserver(alignImages).observe(wrapper);
    } else {
      window.addEventListener('resize', alignImages, { passive: true });
    }
  });
})();
