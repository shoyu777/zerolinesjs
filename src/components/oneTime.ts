// regexs
const TARGET_REGEX = /(?<=trigger-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa
const EXPIRE_REGEX = /(?<=expire-seconds-\[).*?(?=\])/g;

const STORAGE_KEY = 'zlPopupFlag';
const DEFAULT_EXPIRE_MILLI_SECONDS = 1000 * 60 * 60 * 24 * 365;

class OneTime {
  contentElement: HTMLElement;
  triggerElement: HTMLElement;
  expireMilliSeconds: number;

  constructor(contentElement: HTMLElement, parameter: string) {
    this.contentElement = contentElement;

    const matchedTargetSelector = parameter.match(TARGET_REGEX);
    if (matchedTargetSelector) {
      const triggerElement = contentElement.querySelector(
        matchedTargetSelector[0]
      ) as HTMLElement;
      this.triggerElement = triggerElement;
    }

    // check and set expire parameter
    const matchedExpireSelector = parameter.match(EXPIRE_REGEX);
    if (
      matchedExpireSelector &&
      !Number.isNaN(matchedExpireSelector[0]) &&
      parseInt(matchedExpireSelector[0]) > 0
    ) {
      this.expireMilliSeconds = parseInt(matchedExpireSelector[0]) * 1000;
    } else {
      this.expireMilliSeconds = DEFAULT_EXPIRE_MILLI_SECONDS;
    }

    this._init();
  }

  _init() {
    const contentElement = this.contentElement;
    const expireMilliSeconds = this.expireMilliSeconds;
    const current = new Date();
    const flag = localStorage.getItem(STORAGE_KEY);
    const KEY_NAME = 'expireAt';

    if (flag != null) {
      const flagData = JSON.parse(flag);
      // 期限内かつ期限との差がexpireSeconds内->表示しないで終了
      if (flagData[KEY_NAME] && !Number.isNaN(flagData[KEY_NAME])) {
        const expireAt: number = parseInt(flagData[KEY_NAME]);
        if (
          expireAt > current.getTime() &&
          expireAt - current.getTime() < expireMilliSeconds
        ) {
          this.contentElement.style.display = 'none';
          return;
        }
      }
    }

    // それ以外の場合、targetにイベントをつけて表示
    this.triggerElement.addEventListener('click', function () {
      const expireAt = current.getTime() + expireMilliSeconds;
      const data = JSON.stringify({ [KEY_NAME]: expireAt });
      localStorage.setItem(STORAGE_KEY, data);
      contentElement.style.display = 'none';
    });
  }
}

export default OneTime;
