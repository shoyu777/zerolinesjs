import {
  HIDDEN_CLASS,
  modalAnimationClassList,
  modalFadeClassList,
  SHOW_CLASS,
  TRANSITION,
} from '../utils/classList';

// regexs
const TARGET_REGEX = /(?<=target-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa

class Modal {
  toggleElement: HTMLElement | undefined;
  toggleTarget: HTMLElement | undefined;
  modalBackdrop: HTMLElement | undefined;
  modalContent: HTMLElement | undefined;
  modalDismissArray: Array<HTMLElement>;
  parameter: string;

  constructor(toggleElement: HTMLElement, parameter: string) {
    this.toggleElement = toggleElement;
    this.parameter = parameter;

    const matchedTargetSelector = parameter.match(TARGET_REGEX);
    if (matchedTargetSelector) {
      const toggleTarget = document.querySelector(
        matchedTargetSelector[0]
      ) as HTMLElement;
      this.toggleTarget = toggleTarget;
    }

    // backdrop and content and dismiss initialize
    if (this.toggleTarget) {
      this.modalDismissArray = [];

      if (
        this.toggleTarget.dataset.zl &&
        this.toggleTarget.dataset.zl.includes('modal-backdrop')
      ) {
        this.modalBackdrop = this.toggleTarget;
      }
      const modalItems = this.toggleTarget.querySelectorAll('[data-zl]');
      modalItems.forEach((element) => {
        if (element instanceof HTMLElement) {
          if (element.dataset.zl.includes('modal-backdrop')) {
            this.modalBackdrop = element;
          } else if (element.dataset.zl.includes('modal-content')) {
            this.modalContent = element;
          } else if (element.dataset.zl.includes('modal-dismiss')) {
            this.modalDismissArray.push(element);
          }
        }
      });
    }

    if (this._isInitializeCompleted()) {
      this._init();
    }
  }

  _init() {
    const toggleElement = this.toggleElement;
    const toggleTarget = this.toggleTarget;
    const modalBackdrop = this.modalBackdrop;
    const modalContent = this.modalContent;
    const fadeClass = this._assembleFadeClass(modalContent.dataset.zl);
    const animationClass = this._assembleAnimationClass(
      modalContent.dataset.zl
    );

    // 初期状態でtargetとcontentを消した状態
    toggleTarget.classList.add(HIDDEN_CLASS);
    modalContent.classList.add(HIDDEN_CLASS);
    modalBackdrop.classList.add(HIDDEN_CLASS);

    modalContent.classList.add(...fadeClass);
    modalBackdrop.classList.add(...fadeClass);

    modalContent.classList.add(SHOW_CLASS);
    modalContent.classList.add(...animationClass);

    // show modal
    toggleElement.addEventListener('click', function () {
      if (toggleTarget) {
        modalContent.classList.add(TRANSITION);
        modalBackdrop.classList.add(TRANSITION);

        toggleTarget.classList.remove(HIDDEN_CLASS);
        modalContent.classList.remove(HIDDEN_CLASS);
        modalBackdrop.classList.remove(HIDDEN_CLASS);
        modalContent.classList.remove(...animationClass);

        // scroll lock
        document.body.style.overflowY = 'hidden';
      }
    });

    // modal-backdropが存在すればクリック時にdismiss
    modalBackdrop.addEventListener('click', function (event) {
      if (event && modalBackdrop === (event.target as HTMLElement)) {
        // scroll unlock
        document.body.style.overflowY = '';

        modalContent.classList.add(...animationClass);
        toggleTarget.classList.add(HIDDEN_CLASS);
        modalContent.classList.add(HIDDEN_CLASS);
        modalBackdrop.classList.add(HIDDEN_CLASS);
      }
    });

    // modal-dismissにイベント付与
    this.modalDismissArray.forEach((element) => {
      element.addEventListener('click', function () {
        // scroll unlock
        document.body.style.overflowY = '';

        modalContent.classList.add(...animationClass);
        toggleTarget.classList.add(HIDDEN_CLASS);
        modalContent.classList.add(HIDDEN_CLASS);
        modalBackdrop.classList.add(HIDDEN_CLASS);
      });
    });
  }

  _isInitializeCompleted(): boolean {
    return (
      typeof this.toggleElement !== 'undefined' &&
      typeof this.toggleTarget !== 'undefined' &&
      typeof this.modalContent !== 'undefined' &&
      typeof this.modalBackdrop !== 'undefined'
    );
  }

  _assembleAnimationClass(parameter: string): Array<string> {
    const result: Array<string> = [];

    // translate
    modalAnimationClassList.some((item) => {
      if (parameter.includes(item)) {
        result.push('zerolines_' + item);
      }
    });

    return result;
  }

  _assembleFadeClass(parameter: string): Array<string> {
    const result: Array<string> = [];

    modalFadeClassList.some((item) => {
      if (parameter.includes(item)) {
        result.push('zerolines_' + item);
      }
    });
    return result;
  }
}

export default Modal;
