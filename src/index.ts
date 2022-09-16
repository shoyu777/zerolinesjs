import Factory from './utils/factory';

function init() {
  if (typeof window === 'object') {
    const elements = document.querySelectorAll('[data-zl]');

    const factory = new Factory();

    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        factory.create(element);
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
