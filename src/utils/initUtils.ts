import Factory from './factory';

export function deleteCloak(element: HTMLElement | Document) {
  element.querySelectorAll('[zl-cloak]').forEach((element) => {
    if (element instanceof HTMLElement) {
      element.removeAttribute('zl-cloak');
    }
  });
}

export function createModule(baseElement: HTMLElement | Document) {
  const elements = baseElement.querySelectorAll('[data-zl]');

  const factory = new Factory();

  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      factory.create(element, element.dataset.zl);
    }
  });
}

export function setMutationObserver() {
  const NODE_TYPE_ELEMENT = 1;
  // mutation observer setting
  const targetObserveNode = document.querySelector('[zl-observe]');
  if (targetObserveNode) {
    // observer option
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function (
      mutationsList: Array<MutationRecord>,
      observer: MutationObserver
    ) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === NODE_TYPE_ELEMENT) {
              const element = node as HTMLElement;
              createModule(element);
              deleteCloak(element);
            }
          });
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetObserveNode, config);
  }
}
