import {
  HIDDEN_CLASS,
  HIDDEN_DRAWER_CLASS,
  TRANSITION,
  SHOW_CLASS,
  drawerAnimationClassList,
  speedClassList,
} from '../utils/classList';

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
    const speedClass = this._assembleSpeedClass(drawerContent.dataset.zl);
    const animationClass = this._assembleAnimationClass(
      drawerContent.dataset.zl
    );

    // 初期状態でbackdropとcontentを消した状態
    toggleTarget.classList.add(HIDDEN_DRAWER_CLASS, ...speedClass);
    drawerBackdrop.classList.add(HIDDEN_CLASS, ...speedClass);
    drawerContent.classList.add(
      HIDDEN_DRAWER_CLASS,
      SHOW_CLASS,
      ...animationClass,
      ...speedClass
    );

    toggleElement.addEventListener('click', function () {
      if (toggleTarget) {
        toggleTarget.classList.add(TRANSITION);
        drawerContent.classList.add(TRANSITION);
        drawerBackdrop.classList.add(TRANSITION);
        toggleTarget.classList.remove(HIDDEN_DRAWER_CLASS);
        drawerContent.classList.remove(HIDDEN_DRAWER_CLASS, ...animationClass);
        drawerBackdrop.classList.remove(HIDDEN_CLASS);

        // scroll lock
        document.body.style.overflowY = 'hidden';
      }
    });

    drawerBackdrop.addEventListener('click', function (event) {
      if (event && drawerBackdrop === (event.target as HTMLElement)) {
        // scroll unlock
        document.body.style.overflowY = '';

        drawerContent.classList.add(...animationClass);
        toggleTarget.classList.add(HIDDEN_DRAWER_CLASS);
        drawerContent.classList.add(HIDDEN_DRAWER_CLASS);
        drawerBackdrop.classList.add(HIDDEN_CLASS);
      }
    });

    // drawer-dismissにイベント付与
    this.modalDismissArray.forEach((element) => {
      element.addEventListener('click', function () {
        // scroll unlock
        document.body.style.overflowY = '';

        drawerContent.classList.add(...animationClass);
        toggleTarget.classList.add(HIDDEN_DRAWER_CLASS);
        drawerContent.classList.add(HIDDEN_DRAWER_CLASS);
        drawerBackdrop.classList.add(HIDDEN_CLASS);
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

  _assembleAnimationClass(parameter: string): Array<string> {
    const result: Array<string> = [];

    // translate
    drawerAnimationClassList.some((item) => {
      if (parameter.includes(item)) {
        result.push('zerolines_' + item);
      }
    });

    // default set
    if (result.length === 0) {
      result.push('zerolines_drawer-right');
    }

    return result;
  }

  _assembleSpeedClass(parameter: string): Array<string> {
    const result: Array<string> = [];

    speedClassList.some((item) => {
      if (parameter.includes(item)) {
        result.push('zerolines_' + item);
      }
    });
    return result;
  }
}

export default Drawer;
