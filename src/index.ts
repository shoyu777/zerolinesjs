import ScrollTop from './components/scrolltop';

function init() {
  if (typeof window === 'object') {
    const elements = document.querySelectorAll('[data-zl]');

    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        if (element.dataset.zl?.includes('scroll-top')) {
          new ScrollTop(element);
        }
      }
    });
  }
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  init();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', init);
}
