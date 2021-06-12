---
title: "WebPackやってみる"
date: 2016-01-23
taxonomies: {tags: []}
---

gulpだけでいっぱいいっぱいだったので敬遠していたwebpackをやってみる。
#ことはじめ

http://webpack.github.io/docs/

http://webpack.github.io/docs/tutorials/getting-started/


webpackをインストールして
> npm install webpack -g

サンプルファイルを用意して
entry.js
document.write("It works.");

webpack実行。
> webpack ./entry.js bundle.js
Hash: ca188ee5789bb780fcec
Version: webpack 1.12.12
Time: 52ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.42 kB       0  [emitted]  main
   [0] ./entry.js 28 bytes {0} [built]

entry.jsを入力し、bundle.jsが出力される。
bundle.js
/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};

/******/    // The require function
/******/    function __webpack_require__(moduleId) {

/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };

/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/        // Flag the module as loaded
/******/        module.loaded = true;

/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }


/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;

/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;

/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";

/******/    // Load entry module and return exports
/******/    return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

    document.write("It works.");

/***/ }
/******/ ]);

ユーティリティと合体したコードが出力された。
使う方は、bundle.jsをscriptタグで読み込むと。
<script type="text/javascript" src="bundle.js" charset="utf-8"></script>

複数ファイルのマージとrequire
複数ファイルの参照にrequire関数が導入される。
module.exports = "It works from content.js.";

document.write(require("./content.js"));

webpackする。
> webpack ./entry.js bundle.js
Hash: 71eea1fe067e73397ebe
Version: webpack 1.12.12
Time: 64ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.55 kB       0  [emitted]  main
   [0] ./entry.js 40 bytes {0} [built]
   [1] ./content.js 45 bytes {0} [built]

bundle.jsが出力される。
bundle.jsの概要
(function(modules) { // webpackBootstrap

// 省略

    // Load entry module and return exports
    return __webpack_require__(0);
})
/************************************************************************/
( /* 無名関数を即実行 */
[
/* 0 */
function(module, exports, __webpack_require__) {

    document.write(__webpack_require__(1));

},
/* 1 */
function(module, exports) {

    // content.jsはここに
    module.exports = "It works from content.js.";

}
]);

なるほど。自身がmodule[0]になって、requireされたファイルがmodule[1]になるのか。
css対応
WebPackは素ではjavascriptしか対応していない。cssに対応するためにloaderを導入する。
> npm install css-loader style-loader

cssを追加して、
style.css
body {
    background: yellow;
}

requireする。
loader経由でrequireするには、特殊な記法を用いるらしい。
entry.js
require("!style!css!./style.css");
document.write(require("./content.js"));

webpack実行
> webpack ./entry.js bundle.js
Hash: c8494a414a3a1d5c8c29
Version: webpack 1.12.12
Time: 716ms
    Asset     Size  Chunks             Chunk Names
bundle.js  11.8 kB       0  [emitted]  main
   [0] ./entry.js 76 bytes {0} [built]
   [5] ./content.js 45 bytes {0} [built]
    + 4 hidden modules

6つモジュールができたと書いてあります。
確かに、最初の無名関数への引数が6要素の配列になっている。
modules[2]にさっきのcssがjavascript化されて入っている。
/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

    exports = module.exports = __webpack_require__(3)();
    // imports


    // module
    exports.push([module.id, "body {\r\n    background: yellow;\r\n}", ""]);

    // exports


/***/ },

webpackは何もかもをjavascript化してrequireするシステムなのか！？
configfile
コマンドライン引数を設定に移動。
webpack.config.js
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};

引数無しで実行できる。
> webpack
Hash: 1141db5208a3ce352fb6
Version: webpack 1.12.12
Time: 669ms
    Asset     Size  Chunks             Chunk Names
bundle.js  11.8 kB       0  [emitted]  main
   [0] ./entry.js 67 bytes {0} [built]
   [5] ./content.js 45 bytes {0} [built]
    + 4 hidden modules

Watchモードとか開発サーバーもあるで
watchモード。
> webpack --progress --colors --watch

dev-serverをインストール。
> npm install webpack-dev-server -g

> webpack-dev-server --progress --colors


http://localhost:8080 で静的なコンパイル結果を表示
http://localhost:8080/webpack-dev-server/bundle で自動リロード付き

gulpでがんばってwatchからbrowser-syncを構築していたのをさくっとできるね。
これはよさげ。
機能的にはブラウザ側(いわゆるフロントエンド)に特化しているぽいな。
サーバーサイドとの連携方法を探る必要がある。
browsery-syncとnodemonの連携みたいにproxyを駆使するのか。
参考

webpack で Node サーバー用のコードを bundle する
https://webpack.github.io/docs/webpack-dev-server.html#proxy
http://stackoverflow.com/questions/26203725/how-to-allow-for-webpack-dev-server-to-allow-entry-points-from-react-router

