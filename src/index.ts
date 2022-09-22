import {
  createModule,
  deleteCloak,
  setMutationObserver,
} from './utils/initUtils';

function init() {
  if (typeof window === 'object') {
    createModule(document);
    setMutationObserver();
    deleteCloak(document);
  }
}

if (document.readyState !== 'loading') {
  // DOMContentLoaded event were already fired. Perform explicit initialization now
  init();
} else {
  // DOMContentLoaded event not yet fired, attach initialization process to it
  document.addEventListener('DOMContentLoaded', init);
}
