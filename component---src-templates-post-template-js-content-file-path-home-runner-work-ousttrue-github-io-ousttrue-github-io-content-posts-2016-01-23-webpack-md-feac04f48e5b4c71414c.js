"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2081],{4450:function(e,n,t){t.r(n),t.d(n,{default:function(){return l}});var r=t(1151),s=t(7294);function o(e){const n=Object.assign({p:"p",pre:"pre",code:"code"},(0,r.ah)(),e.components);return s.createElement(s.Fragment,null,s.createElement(n.p,null,"gulp だけでいっぱいいっぱいだったので敬遠していた webpack をやってみる。 #ことはじめ"),"\n",s.createElement(n.p,null,"http://webpack.github.io/docs/"),"\n",s.createElement(n.p,null,"http://webpack.github.io/docs/tutorials/getting-started/"),"\n",s.createElement(n.pre,null,s.createElement(n.code,null,'webpackをインストールして\n> npm install webpack -g\n\nサンプルファイルを用意して\nentry.js\ndocument.write("It works.");\n\nwebpack実行。\n> webpack ./entry.js bundle.js\nHash: ca188ee5789bb780fcec\nVersion: webpack 1.12.12\nTime: 52ms\n    Asset     Size  Chunks             Chunk Names\nbundle.js  1.42 kB       0  [emitted]  main\n   [0] ./entry.js 28 bytes {0} [built]\n\nentry.jsを入力し、bundle.jsが出力される。\nbundle.js\n/******/ (function(modules) { // webpackBootstrap\n/******/    // The module cache\n/******/    var installedModules = {};\n\n/******/    // The require function\n/******/    function __webpack_require__(moduleId) {\n\n/******/        // Check if module is in cache\n/******/        if(installedModules[moduleId])\n/******/            return installedModules[moduleId].exports;\n\n/******/        // Create a new module (and put it into the cache)\n/******/        var module = installedModules[moduleId] = {\n/******/            exports: {},\n/******/            id: moduleId,\n/******/            loaded: false\n/******/        };\n\n/******/        // Execute the module function\n/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n/******/        // Flag the module as loaded\n/******/        module.loaded = true;\n\n/******/        // Return the exports of the module\n/******/        return module.exports;\n/******/    }\n\n\n/******/    // expose the modules object (__webpack_modules__)\n/******/    __webpack_require__.m = modules;\n\n/******/    // expose the module cache\n/******/    __webpack_require__.c = installedModules;\n\n/******/    // __webpack_public_path__\n/******/    __webpack_require__.p = "";\n\n/******/    // Load entry module and return exports\n/******/    return __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ function(module, exports) {\n\n    document.write("It works.");\n\n/***/ }\n/******/ ]);\n\nユーティリティと合体したコードが出力された。\n使う方は、bundle.jsをscriptタグで読み込むと。\n<script type="text/javascript" src="bundle.js" charset="utf-8"><\/script>\n\n複数ファイルのマージとrequire\n複数ファイルの参照にrequire関数が導入される。\nmodule.exports = "It works from content.js.";\n\ndocument.write(require("./content.js"));\n\nwebpackする。\n> webpack ./entry.js bundle.js\nHash: 71eea1fe067e73397ebe\nVersion: webpack 1.12.12\nTime: 64ms\n    Asset     Size  Chunks             Chunk Names\nbundle.js  1.55 kB       0  [emitted]  main\n   [0] ./entry.js 40 bytes {0} [built]\n   [1] ./content.js 45 bytes {0} [built]\n\nbundle.jsが出力される。\nbundle.jsの概要\n(function(modules) { // webpackBootstrap\n\n// 省略\n\n    // Load entry module and return exports\n    return __webpack_require__(0);\n})\n/************************************************************************/\n( /* 無名関数を即実行 */\n[\n/* 0 */\nfunction(module, exports, __webpack_require__) {\n\n    document.write(__webpack_require__(1));\n\n},\n/* 1 */\nfunction(module, exports) {\n\n    // content.jsはここに\n    module.exports = "It works from content.js.";\n\n}\n]);\n\nなるほど。自身がmodule[0]になって、requireされたファイルがmodule[1]になるのか。\ncss対応\nWebPackは素ではjavascriptしか対応していない。cssに対応するためにloaderを導入する。\n> npm install css-loader style-loader\n\ncssを追加して、\nstyle.css\nbody {\n    background: yellow;\n}\n\nrequireする。\nloader経由でrequireするには、特殊な記法を用いるらしい。\nentry.js\nrequire("!style!css!./style.css");\ndocument.write(require("./content.js"));\n\nwebpack実行\n> webpack ./entry.js bundle.js\nHash: c8494a414a3a1d5c8c29\nVersion: webpack 1.12.12\nTime: 716ms\n    Asset     Size  Chunks             Chunk Names\nbundle.js  11.8 kB       0  [emitted]  main\n   [0] ./entry.js 76 bytes {0} [built]\n   [5] ./content.js 45 bytes {0} [built]\n    + 4 hidden modules\n\n6つモジュールができたと書いてあります。\n確かに、最初の無名関数への引数が6要素の配列になっている。\nmodules[2]にさっきのcssがjavascript化されて入っている。\n/***/ },\n/* 2 */\n/***/ function(module, exports, __webpack_require__) {\n\n    exports = module.exports = __webpack_require__(3)();\n    // imports\n\n\n    // module\n    exports.push([module.id, "body {\\r\\n    background: yellow;\\r\\n}", ""]);\n\n    // exports\n\n\n/***/ },\n\nwebpackは何もかもをjavascript化してrequireするシステムなのか！？\nconfigfile\nコマンドライン引数を設定に移動。\nwebpack.config.js\nmodule.exports = {\n    entry: "./entry.js",\n    output: {\n        path: __dirname,\n        filename: "bundle.js"\n    },\n    module: {\n        loaders: [\n            { test: /\\.css$/, loader: "style!css" }\n        ]\n    }\n};\n\n引数無しで実行できる。\n> webpack\nHash: 1141db5208a3ce352fb6\nVersion: webpack 1.12.12\nTime: 669ms\n    Asset     Size  Chunks             Chunk Names\nbundle.js  11.8 kB       0  [emitted]  main\n   [0] ./entry.js 67 bytes {0} [built]\n   [5] ./content.js 45 bytes {0} [built]\n    + 4 hidden modules\n\nWatchモードとか開発サーバーもあるで\nwatchモード。\n> webpack --progress --colors --watch\n\ndev-serverをインストール。\n> npm install webpack-dev-server -g\n\n> webpack-dev-server --progress --colors\n\n\nhttp://localhost:8080 で静的なコンパイル結果を表示\nhttp://localhost:8080/webpack-dev-server/bundle で自動リロード付き\n\ngulpでがんばってwatchからbrowser-syncを構築していたのをさくっとできるね。\nこれはよさげ。\n機能的にはブラウザ側(いわゆるフロントエンド)に特化しているぽいな。\nサーバーサイドとの連携方法を探る必要がある。\nbrowsery-syncとnodemonの連携みたいにproxyを駆使するのか。\n参考\n\nwebpack で Node サーバー用のコードを bundle する\nhttps://webpack.github.io/docs/webpack-dev-server.html#proxy\nhttp://stackoverflow.com/questions/26203725/how-to-allow-for-webpack-dev-server-to-allow-entry-points-from-react-router\n')))}var u=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?s.createElement(n,e,s.createElement(o,e)):o(e)};t(8678);function c(e){let{data:n,children:t}=e;return s.createElement(s.Fragment,null,s.createElement("h1",null,n.mdx.frontmatter.title),s.createElement(r.Zo,null,t))}function l(e){return s.createElement(c,e,s.createElement(u,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return c},ah:function(){return o}});var r=t(7294);const s=r.createContext({});function o(e){const n=r.useContext(s);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const u={};function c({components:e,children:n,disableParentContext:t}){let c;return c=t?"function"==typeof e?e({}):e||u:o(e),r.createElement(s.Provider,{value:c},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2016-01-23-webpack-md-feac04f48e5b4c71414c.js.map