import DropDownToggle from '../components/dropdown';
import ScrollTop from '../components/scrolltop';

// regexs
const TARGET_REGEX = /(?<=target-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa

const SCROLL_TOP = 'scroll-top';
const DROPDOWN_TOGGLE = 'dropdown-toggle';

class Factory {
  public create(element: HTMLElement) {
    // Scroll Top
    if (element.dataset.zl?.includes(SCROLL_TOP)) {
      new ScrollTop(element);
    }
    // DropDown
    if (element.dataset.zl?.includes(DROPDOWN_TOGGLE)) {
      const matched_target_selector = element.dataset.zl.match(TARGET_REGEX);
      if (matched_target_selector) {
        const toggle_target = document.querySelector(
          matched_target_selector[0]
        ) as HTMLElement;
        new DropDownToggle(element, toggle_target);
      }
    }
  }
}

export default Factory;
