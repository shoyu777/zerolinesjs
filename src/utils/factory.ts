import DropDown from '../components/dropdown';
import Modal from '../components/model';
import ScrollTop from '../components/scrolltop';

// regexs
const TARGET_REGEX = /(?<=target-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa

const SCROLL_TOP = 'scroll-top';
const DROPDOWN_TOGGLE = 'dropdown-toggle';
const MODAL_TOGGLE = 'modal-toggle';

class Factory {
  public create(element: HTMLElement, parameter: string) {
    // Scroll Top
    if (parameter.includes(SCROLL_TOP)) {
      new ScrollTop(element);
    }
    // DropDown
    if (parameter.includes(DROPDOWN_TOGGLE)) {
      new DropDown(element, parameter);
    }
    // Modal
    if (parameter.includes(MODAL_TOGGLE)) {
      new Modal(element, parameter);
    }
  }
}

export default Factory;
