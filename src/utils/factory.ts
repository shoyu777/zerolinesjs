import ScrollTop from '../components/scrolltop';

const SCROLL_TOP = 'scroll-top';

class Factory {
  public create(element: HTMLElement) {
    if (element.dataset.zl?.includes(SCROLL_TOP)) {
      new ScrollTop(element);
    }
  }
}

export default Factory;
