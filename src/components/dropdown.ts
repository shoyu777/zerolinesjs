class DropDown {
  toggle_element: HTMLElement;
  toggle_target: HTMLElement;

  constructor(toggle_element: HTMLElement, toggle_target: HTMLElement) {
    this.toggle_element = toggle_element;
    this.toggle_target = toggle_target;
    this._init(toggle_element, toggle_target);
  }

  _init(toggle_element: HTMLElement, toggle_target: HTMLElement) {
    // 初期状態でtargetを消した状態
    toggle_target.classList.add('hidden');

    toggle_element.addEventListener('click', function () {
      if (toggle_target) {
        toggle_target.classList.toggle('hidden');
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

      toggle_target.classList.add('hidden');
    });
  }
}

export default DropDown;
