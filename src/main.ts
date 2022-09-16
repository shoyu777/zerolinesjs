const elements = document.querySelectorAll('[data-zl]');

elements.forEach((element) => {
  if (
    element instanceof HTMLElement &&
    element.dataset.zl?.includes('scroll-top')
  ) {
    // easing
    // 参考：https://noze.space/archives/432
    function easing(t: number, b: number, c: number, d: number) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    }

    //スクロール速度
    let animeSpeed = 500;
    if (element.dataset.zl?.includes('speedy')) animeSpeed = 200;
    if (element.dataset.zl?.includes('slowly')) animeSpeed = 800;

    element.addEventListener('click', function (event) {
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
        let elapsedTime = new Date().getTime() - start;

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
  }
});
