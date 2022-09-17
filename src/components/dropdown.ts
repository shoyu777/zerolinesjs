const HIDE_CLASS = 'zerolines_hidden';
const SHOW_CLASS = 'zerolines_show';

// regexs
const TARGET_REGEX = /(?<=target-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa

class DropDown {
  toggle_element: HTMLElement;
  toggle_target: HTMLElement;

  constructor(toggle_element: HTMLElement, parameter: string) {
    this.toggle_element = toggle_element;

    const matched_target_selector = parameter.match(TARGET_REGEX);
    if (matched_target_selector) {
      const toggle_target = document.querySelector(
        matched_target_selector[0]
      ) as HTMLElement;
      this.toggle_target = toggle_target;
    }

    this._init();
  }

  _init() {
    const toggle_element = this.toggle_element;
    const toggle_target = this.toggle_target;

    // 初期状態でtargetを消した状態
    toggle_target.classList.add('zerolines_transition', HIDE_CLASS);

    toggle_element.addEventListener('click', function () {
      if (toggle_target) {
        toggle_target.classList.toggle(SHOW_CLASS);
        toggle_target.classList.toggle(HIDE_CLASS);
      }
    });

    // 範囲外をクリックされたらtargetを非表示
    window.addEventListener('click', function (event) {
      if (
        event &&
        (toggle_element.contains(event.target as HTMLElement) ||
          toggle_target.contains(event.target as HTMLElement))
      ) {
        return;
      }

      toggle_target.classList.remove(SHOW_CLASS);
      toggle_target.classList.add(HIDE_CLASS);
    });
  }
}

export default DropDown;
