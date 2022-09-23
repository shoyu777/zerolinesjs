import { HIDDEN_CLASS, SHOW_CLASS, TRANSITION } from '../utils/classList';

// regexs
const TOGGLE_AT_REGEX = /(?<=toggle-at-\[).*?(?=\])/g; // ex. target-[#aaa] -> #aaa
const DFAULT_TOGGLE_AT = 0;

class ScrollTop {
  element: HTMLElement;
  parameter: string;
  toggleAt: number;

  constructor(element: HTMLElement, parameter: string) {
    this.element = element;
    this.parameter = parameter;

    const matchedString = parameter.match(TOGGLE_AT_REGEX);
    if (
      matchedString &&
      !Number.isNaN(matchedString[0]) &&
      parseInt(matchedString[0]) > 0
    ) {
      this.toggleAt = parseInt(matchedString[0]);
    } else {
      this.toggleAt = DFAULT_TOGGLE_AT;
    }
    this._init();
  }

  _init() {
    // show animation

    //スクロール速度
    let animeSpeed = 500;
    if (this.parameter.includes('speedy')) animeSpeed = 200;
    if (this.parameter.includes('slowly')) animeSpeed = 800;

    this.element.addEventListener('click', function (event) {
      event.preventDefault();
      //スクロールイベント重複防止
      if (document.body.classList.contains('is-scroll-busy')) {
        return false;
      }
      document.body.classList.add('is-scroll-busy');

      //移動先取得
      const scrollStopTop = document.body.getBoundingClientRect().top;

      //現在のスクロール量
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      //アニメーション開始時間
      const start = new Date().getTime();
      //スクロールアニメーション関数
      function mainAnime() {
        //イベント発生後の経過時間
        const elapsedTime = new Date().getTime() - start;

        //アニメーション終了処理
        if (elapsedTime > animeSpeed) {
          //実行中class削除
          document.body.classList.remove('is-scroll-busy');

          //処理を終了
          return false;
        }

        //スクロール処理
        window.scrollTo(
          0,
          //「アニメーションの経過時間」,「始点」,「変化量」,「変化にかける時間」
          easing(elapsedTime, scrollTop, scrollStopTop, animeSpeed)
        );
        requestAnimationFrame(mainAnime);
      }

      //アニメーション初回呼び出し
      requestAnimationFrame(mainAnime);
    });

    const scrollElement = this.element;
    const toggleAt = this.toggleAt;

    if (toggleAt !== 0) scrollElement.classList.add(HIDDEN_CLASS);

    window.addEventListener('scroll', function () {
      scrollElement.classList.add(TRANSITION);
      if (window.scrollY >= toggleAt) {
        scrollElement.classList.remove(HIDDEN_CLASS);
      } else {
        scrollElement.classList.add(HIDDEN_CLASS);
      }
    });
  }
}

// easing
// 参考：https://noze.space/archives/432
function easing(t: number, b: number, c: number, d: number): number {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

export default ScrollTop;
