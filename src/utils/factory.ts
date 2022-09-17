import Drawer from '../components/drawer';
import DropDown from '../components/dropdown';
import Modal from '../components/model';
import ScrollTop from '../components/scrolltop';

const SCROLL_TOP = 'scroll-top';
const DROPDOWN_TOGGLE = 'dropdown-toggle';
const MODAL_TOGGLE = 'modal-toggle';
const DRAWER_TOGGLE = 'drawer-toggle';

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
    // Drawer
    if (parameter.includes(DRAWER_TOGGLE)) {
      new Drawer(element, parameter);
    }
  }
}

export default Factory;
