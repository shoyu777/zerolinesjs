const HIDE_CLASS = 'zerolines_hidden';
const SHOW_CLASS = 'zerolines_show';

// regexs
const TARGET_REGEX = /(?<=target-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa

class Modal {
  toggle_element: HTMLElement | undefined;
  toggle_target: HTMLElement | undefined;
  modal_backdrop: HTMLElement | undefined;
  modal_content: HTMLElement | undefined;

  constructor(toggle_element: HTMLElement, parameter: string) {
    this.toggle_element = toggle_element;

    const matched_target_selector = parameter.match(TARGET_REGEX);
    if (matched_target_selector) {
      const toggle_target = document.querySelector(
        matched_target_selector[0]
      ) as HTMLElement;
      this.toggle_target = toggle_target;
    }

    // backdrop and content initialize
    if (this.toggle_target) {
      if (
        this.toggle_target.dataset.zl &&
        this.toggle_target.dataset.zl.includes('modal-backdrop')
      ) {
        this.modal_backdrop = this.toggle_target;
      }
      const modalItems = this.toggle_target.querySelectorAll('[data-zl]');
      modalItems.forEach((element) => {
        if (element instanceof HTMLElement) {
          if (element.dataset.zl.includes('modal-backdrop')) {
            this.modal_backdrop = element;
          } else if (element.dataset.zl.includes('modal-content')) {
            this.modal_content = element;
          }
        }
      });
    }

    if (this._isInitializeCompleted()) {
      this._init();
    }
  }

  _init() {
    const toggle_element = this.toggle_element;
    const toggle_target = this.toggle_target;
    const modal_backdrop = this.modal_backdrop;
    const modal_content = this.modal_content;

    // 初期状態でtargetとcontentを消した状態
    toggle_target.classList.add('zerolines_transition', HIDE_CLASS);
    modal_content.classList.add('zerolines_transition', HIDE_CLASS);

    // show modal
    toggle_element.addEventListener('click', function () {
      if (toggle_target) {
        toggle_target.classList.remove(HIDE_CLASS);
        toggle_target.classList.add(SHOW_CLASS);
        modal_content.classList.remove(HIDE_CLASS);
        modal_content.classList.add(SHOW_CLASS);

        // scroll lock
        document.body.style.overflowY = 'hidden';
      }
    });

    // modal-backdropが存在すればクリック時にdismiss
    modal_backdrop.addEventListener('click', function (event) {
      if (event && modal_backdrop === (event.target as HTMLElement)) {
        // scroll unlock
        document.body.style.overflowY = '';

        toggle_target.classList.remove(SHOW_CLASS);
        modal_backdrop.classList.add(HIDE_CLASS);
        modal_content.classList.remove(SHOW_CLASS);
        modal_content.classList.add(HIDE_CLASS);
      }
    });
  }

  _isInitializeCompleted(): boolean {
    return (
      typeof this.toggle_element !== 'undefined' &&
      typeof this.toggle_target !== 'undefined' &&
      typeof this.modal_content !== 'undefined' &&
      typeof this.modal_backdrop !== 'undefined'
    );
  }
}

export default Modal;
