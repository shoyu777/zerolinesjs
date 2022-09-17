import Factory from './utils/factory';

function init() {
  if (typeof window === 'object') {
    const elements = document.querySelectorAll('[data-zl]');

    const factory = new Factory();

    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        factory.create(element, element.dataset.zl);
      }
    });

    document.querySelectorAll('[zl-cloak]').forEach((element) => {
      if (element instanceof HTMLElement) {
        element.removeAttribute('zl-cloak');
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
