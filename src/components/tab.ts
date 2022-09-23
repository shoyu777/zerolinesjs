const TAB_TOGGLE = 'tab-item';

// regexs
const TARGET_REGEX = /target-\[([^\]]+)\]/; // ex. target-[#aaa] -> #aaa
const SQUARE_BRACKETS = /\[([^\]]+)\]/g;

class Tab {
  tabList: Array<HTMLElement>;

  constructor(tabListElement: HTMLElement) {
    this.tabList = [];
    const elements = tabListElement.querySelectorAll('[data-zl]');
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        if (element.dataset.zl.includes(TAB_TOGGLE)) {
          this.tabList.push(element);
        }
      }
    });

    this._init();
  }

  _init() {
    const clearActiveAll = this._clearActiveAll;
    const tabList = this.tabList;

    // 初期化
    clearActiveAll(tabList);

    this.tabList.forEach((element) => {
      // defaultを含むが[]の中にdefaultが入っていても読まないように、正規表現で[]の中を全て消してから判定する
      if (
        element.dataset.zl.replace(SQUARE_BRACKETS, '').includes(' default ')
      ) {
        // activeにする
        element.classList.add(...activeClassArray(element));
        element.classList.remove(...defaultClassArray(element));

        const matchedTargetSelector = element.dataset.zl.match(TARGET_REGEX);
        if (matchedTargetSelector && matchedTargetSelector[1]) {
          toggleElementByDisplay(matchedTargetSelector[1], 'block');
        }
      }

      element.addEventListener('click', function () {
        // 全てのスタイルをinactive状態に戻す
        clearActiveAll(tabList);

        // activeにする
        element.classList.add(...activeClassArray(element));
        element.classList.remove(...defaultClassArray(element));

        const matchedTargetSelector = this.dataset.zl.match(TARGET_REGEX);
        if (matchedTargetSelector && matchedTargetSelector[1]) {
          toggleElementByDisplay(matchedTargetSelector[1], 'block');
        }
      });
    });
  }

  // タブリストのトグル要素を全てinactiveにリセットし、contentを全て消す
  _clearActiveAll(tabList: Array<HTMLElement>) {
    tabList.forEach((element) => {
      const parameter = element.dataset.zl;

      // active-styleを取り除き、default-styleを付与
      element.classList.remove(...activeClassArray(element));
      element.classList.add(...defaultClassArray(element));

      // 全てのtab-content要素を非表示
      const matchedTargetSelector = parameter.match(TARGET_REGEX);
      if (matchedTargetSelector && matchedTargetSelector[1]) {
        toggleElementByDisplay(matchedTargetSelector[1], 'none');
      }
    });
  }
}

export function activeClassArray(element: HTMLElement): Array<string> {
  // active-classes-[text-red-500 font-bold] -> text-red-500 font-bold
  const ACTIVE_STYLE = /active-style-\[([^\]]+)\]/;
  const parameter = element.dataset.zl;

  let activeClassArray: Array<string> = [];

  // active-styleの取得
  const activeStyleMatch = parameter.match(ACTIVE_STYLE);
  if (activeStyleMatch && activeStyleMatch[1]) {
    activeClassArray = activeStyleMatch[1].split(' ');
  }

  return activeClassArray;
}

export function defaultClassArray(element: HTMLElement): Array<string> {
  // active-classes-[text-red-500 font-bold] -> text-red-500 font-bold
  const DEFAULT_STYLE = /default-style-\[([^\]]+)\]/;
  const parameter = element.dataset.zl;

  let defaultClassArray: Array<string> = [];

  // default-styleの取得
  const defaultStyleMatch = parameter.match(DEFAULT_STYLE);
  if (defaultStyleMatch && defaultStyleMatch[1]) {
    defaultClassArray = defaultStyleMatch[1].split(' ');
  }

  return defaultClassArray;
}

export function toggleElementByDisplay(selector: string, style: string): void {
  const toggleTarget = document.querySelector(selector) as HTMLElement;
  toggleTarget.style.display = style;
}

export default Tab;
