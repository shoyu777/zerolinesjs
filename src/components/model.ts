const HIDE_CLASS = 'zerolines_hidden';
const SHOW_CLASS = 'zerolines_show';

// regexs
const TARGET_REGEX = /(?<=target-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa

class Modal {
  toggleElement: HTMLElement | undefined;
  toggleTarget: HTMLElement | undefined;
  modalBackdrop: HTMLElement | undefined;
  modalContent: HTMLElement | undefined;
  modalDismissArray: Array<HTMLElement>;

  constructor(toggleElement: HTMLElement, parameter: string) {
    this.toggleElement = toggleElement;

    const matched_target_selector = parameter.match(TARGET_REGEX);
    if (matched_target_selector) {
      const toggleTarget = document.querySelector(
        matched_target_selector[0]
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

    // 初期状態でtargetとcontentを消した状態
    toggleTarget.classList.add('zerolines_transition', HIDE_CLASS);
    modalContent.classList.add('zerolines_transition', HIDE_CLASS);

    // show modal
    toggleElement.addEventListener('click', function () {
      if (toggleTarget) {
        toggleTarget.classList.remove(HIDE_CLASS);
        toggleTarget.classList.add(SHOW_CLASS);
        modalContent.classList.remove(HIDE_CLASS);
        modalContent.classList.add(SHOW_CLASS);

        // scroll lock
        document.body.style.overflowY = 'hidden';
      }
    });

    // modal-backdropが存在すればクリック時にdismiss
    modalBackdrop.addEventListener('click', function (event) {
      if (event && modalBackdrop === (event.target as HTMLElement)) {
        // scroll unlock
        document.body.style.overflowY = '';

        toggleTarget.classList.remove(SHOW_CLASS);
        toggleTarget.classList.add(HIDE_CLASS);
        modalBackdrop.classList.remove(SHOW_CLASS);
        modalBackdrop.classList.add(HIDE_CLASS);
        modalContent.classList.remove(SHOW_CLASS);
        modalContent.classList.add(HIDE_CLASS);
      }
    });

    // modal-dismissにイベント付与
    this.modalDismissArray.forEach((element) => {
      element.addEventListener('click', function () {
        // scroll unlock
        document.body.style.overflowY = '';

        toggleTarget.classList.remove(SHOW_CLASS);
        toggleTarget.classList.add(HIDE_CLASS);
        modalBackdrop.classList.remove(SHOW_CLASS);
        modalBackdrop.classList.add(HIDE_CLASS);
        modalContent.classList.remove(SHOW_CLASS);
        modalContent.classList.add(HIDE_CLASS);
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
}

export default Modal;
