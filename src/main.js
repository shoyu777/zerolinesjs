"use strict";
const elements = document.querySelectorAll('[data-zl]');
elements.forEach((element) => {
    var _a, _b, _c;
    if (element instanceof HTMLElement &&
        ((_a = element.dataset.zl) === null || _a === void 0 ? void 0 : _a.includes('scroll-top'))) {
        // easing
        // 参考：https://noze.space/archives/432
        function easing(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
        //スクロール速度
        let animeSpeed = 500;
        if ((_b = element.dataset.zl) === null || _b === void 0 ? void 0 : _b.includes('speedy'))
            animeSpeed = 200;
        if ((_c = element.dataset.zl) === null || _c === void 0 ? void 0 : _c.includes('slowly'))
            animeSpeed = 800;
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
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
                window.scrollTo(0, 
                //「アニメーションの経過時間」,「始点」,「変化量」,「変化にかける時間」
                easing(elapsedTime, scrollTop, scrollStopTop, animeSpeed));
                requestAnimationFrame(mainAnime);
            }
            //アニメーション初回呼び出し
            requestAnimationFrame(mainAnime);
        });
    }
});
