class DropDownToggle {
  element: HTMLElement;
  toggle_target: HTMLElement;

  constructor(element: HTMLElement, toggle_target: HTMLElement) {
    this.element = element;
    this.toggle_target = toggle_target;
    this._init(element, toggle_target);
  }

  _init(element: HTMLElement, toggle_target: HTMLElement) {
    // 初期状態でtargetを消した状態
    toggle_target.classList.add('hidden');

    element.addEventListener('click', function () {
      if (toggle_target) {
        toggle_target.classList.toggle('hidden');
      }
    });

    // 範囲外をクリックされたらtargetを非表示
    window.addEventListener('click', function (event) {
      if (
        event &&
        (element.contains(event.target as HTMLElement) ||
          toggle_target.contains(event.target as HTMLElement))
      ) {
        return;
      }

      toggle_target.classList.add('hidden');
    });
  }
}

export default DropDownToggle;
