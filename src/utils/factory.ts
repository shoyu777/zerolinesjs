import Drawer from '../components/drawer';
import DropDown from '../components/dropdown';
import Modal from '../components/modal';
import OneTime from '../components/oneTime';
import ScrollTop from '../components/scrolltop';
import Tab from '../components/tab';

const SCROLL_TOP = 'scroll-top';
const DROPDOWN_TOGGLE = 'dropdown-toggle';
const MODAL_TOGGLE = 'modal-toggle';
const DRAWER_TOGGLE = 'drawer-toggle';
const TAB_LIST = 'tab-list';
const ONE_TIME = 'one-time';

class Factory {
  public create(element: HTMLElement, parameter: string) {
    // Scroll Top
    if (parameter.includes(SCROLL_TOP)) {
      new ScrollTop(element, parameter);
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
    // Tab
    if (parameter.includes(TAB_LIST)) {
      new Tab(element);
    }
    // One Time
    if (parameter.includes(ONE_TIME)) {
      new OneTime(element, parameter);
    }
  }
}

export default Factory;
