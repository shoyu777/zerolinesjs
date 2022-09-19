const HIDE_T_CLASS = 'zerolines_hidden_t';
const SHOW_T_CLASS = 'zerolines_show_t';
const HIDE_O_CLASS = 'zerolines_hidden_o';
const SHOW_O_CLASS = 'zerolines_show_o';
const HIDE_CLASS = 'zerolines_hidden';
const SHOW_CLASS = 'zerolines_show';

// regexs
const TARGET_REGEX = /(?<=target-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa

class Drawer {
  toggleElement: HTMLElement;
  toggleTarget: HTMLElement;
  drawerContent: HTMLElement;
  drawerBackdrop: HTMLElement | undefined;
  modalDismissArray: Array<HTMLElement>;

  constructor(toggleElement: HTMLElement, parameter: string) {
    this.toggleElement = toggleElement;

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
        this.drawerBackdrop = this.toggleTarget;
      }
      const modalItems = this.toggleTarget.querySelectorAll('[data-zl]');
      modalItems.forEach((element) => {
        if (element instanceof HTMLElement) {
          if (element.dataset.zl.includes('drawer-backdrop')) {
            this.drawerBackdrop = element;
          } else if (element.dataset.zl.includes('drawer-content')) {
            this.drawerContent = element;
          } else if (element.dataset.zl.includes('drawer-dismiss')) {
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
    const drawerBackdrop = this.drawerBackdrop;
    const drawerContent = this.drawerContent;

    // 初期状態でbackdropとcontentを消した状態
    toggleTarget.classList.add(HIDE_CLASS);
    drawerContent.classList.add(HIDE_T_CLASS);
    drawerBackdrop.classList.add(HIDE_O_CLASS);

    toggleElement.addEventListener('click', function () {
      if (toggleTarget) {
        toggleTarget.classList.remove(HIDE_CLASS);
        drawerContent.classList.remove(HIDE_T_CLASS);
        drawerBackdrop.classList.remove(HIDE_O_CLASS);
        toggleTarget.classList.add('zerolines_transition', SHOW_CLASS);
        drawerContent.classList.add('zerolines_transition', SHOW_T_CLASS);
        drawerBackdrop.classList.add('zerolines_transition', SHOW_O_CLASS);

        // scroll lock
        document.body.style.overflowY = 'hidden';
      }
    });

    drawerBackdrop.addEventListener('click', function (event) {
      if (event && drawerBackdrop === (event.target as HTMLElement)) {
        // scroll unlock
        document.body.style.overflowY = '';

        toggleTarget.classList.remove(SHOW_CLASS);
        toggleTarget.classList.add(HIDE_CLASS);
        drawerContent.classList.remove(SHOW_T_CLASS);
        drawerContent.classList.add(HIDE_T_CLASS);
        drawerBackdrop.classList.remove(SHOW_O_CLASS);
        drawerBackdrop.classList.add(HIDE_O_CLASS);
      }
    });

    // drawer-dismissにイベント付与
    this.modalDismissArray.forEach((element) => {
      element.addEventListener('click', function () {
        // scroll unlock
        document.body.style.overflowY = '';

        toggleTarget.classList.remove(SHOW_CLASS);
        toggleTarget.classList.add(HIDE_CLASS);
        drawerContent.classList.remove(SHOW_T_CLASS);
        drawerContent.classList.add(HIDE_T_CLASS);
        drawerBackdrop.classList.remove(SHOW_O_CLASS);
        drawerBackdrop.classList.add(HIDE_O_CLASS);
      });
    });
  }

  _isInitializeCompleted(): boolean {
    return (
      typeof this.toggleElement !== 'undefined' &&
      typeof this.toggleTarget !== 'undefined' &&
      typeof this.drawerContent !== 'undefined' &&
      typeof this.drawerBackdrop !== 'undefined'
    );
  }
}

export default Drawer;
