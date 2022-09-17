const HIDE_CLASS = 'zerolines_hidden';
const SHOW_CLASS = 'zerolines_show';

// regexs
const TARGET_REGEX = /(?<=target-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa

class DropDown {
  toggleElement: HTMLElement;
  toggleTarget: HTMLElement;

  constructor(toggleElement: HTMLElement, parameter: string) {
    this.toggleElement = toggleElement;

    const matchedTargetSelector = parameter.match(TARGET_REGEX);
    if (matchedTargetSelector) {
      const toggleTarget = document.querySelector(
        matchedTargetSelector[0]
      ) as HTMLElement;
      this.toggleTarget = toggleTarget;
    }

    this._init();
  }

  _init() {
    const toggleElement = this.toggleElement;
    const toggleTarget = this.toggleTarget;

    // 初期状態でtargetを消した状態
    toggleTarget.classList.add('zerolines_transition', HIDE_CLASS);

    toggleElement.addEventListener('click', function () {
      if (toggleTarget) {
        toggleTarget.classList.toggle(SHOW_CLASS);
        toggleTarget.classList.toggle(HIDE_CLASS);
      }
    });

    // 範囲外をクリックされたらtargetを非表示
    window.addEventListener('click', function (event) {
      if (
        event &&
        (toggleElement.contains(event.target as HTMLElement) ||
          toggleTarget.contains(event.target as HTMLElement))
      ) {
        return;
      }

      toggleTarget.classList.remove(SHOW_CLASS);
      toggleTarget.classList.add(HIDE_CLASS);
    });
  }
}

export default DropDown;
