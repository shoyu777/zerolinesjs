const HIDE_CLASS = 'hidden';

class Modal {
  toggle_element: HTMLElement;
  toggle_target: HTMLElement;

  constructor(toggle_element: HTMLElement, toggle_target: HTMLElement) {
    this.toggle_element = toggle_element;
    this.toggle_target = toggle_target;
    this._init(toggle_element, toggle_target);
  }

  _init(toggle_element: HTMLElement, toggle_target: HTMLElement) {
    // 初期状態でtargetを消した状態
    toggle_target.classList.add(HIDE_CLASS);

    toggle_element.addEventListener('click', function () {
      if (toggle_target) {
        toggle_target.classList.toggle(HIDE_CLASS);
      }
    });

    const modalItems = toggle_target.querySelectorAll('[data-zl]');
    // modal-backdropが存在すればクリック時にdismissするようにする
    toggle_target.addEventListener('click', function (event) {
      if (event && toggle_target === (event.target as HTMLElement)) {
        toggle_target.classList.add(HIDE_CLASS);
      }
    });
  }
}

export default Modal;
