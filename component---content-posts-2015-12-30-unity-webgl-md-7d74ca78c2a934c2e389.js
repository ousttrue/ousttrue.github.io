"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1708],{5272:function(e,n,t){t.r(n);var l=t(1151),a=t(7294);function r(e){const n=Object.assign({pre:"pre",code:"code",p:"p"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.pre,null,a.createElement(n.code,{className:"language-javascript"},'var Module = {\n  TOTAL_MEMORY: 268435456,\n  errorhandler: null, // arguments: err, url, line. This function must return \'true\' if the error is handled, otherwise \'false\'\n  compatibilitycheck: null,\n  dataUrl: "Release/WebGL.data",\n  codeUrl: "Release/WebGL.js",\n  memUrl: "Release/WebGL.mem",\n};\n')),"\n",a.createElement(n.p,null,"こっちが未加工の index.html。\nUnity5.3 の WebGL を試してみる。"),"\n",a.createElement(n.p,null,"http://blogs.unity3d.com/jp/2015/12/07/unity-5-3-webgl-updates/\nhttp://docs.unity3d.com/530/Documentation/Manual/webgl-gettingstarted.html"),"\n",a.createElement(n.p,null,"とりあえず build して動かしてみた。\n下記のようなディレクトリ構造で出力されていた。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"│  index.html\n│\n├─Release\n│      .htaccess\n│      UnityLoader.js\n│      WebGL.datagz\n│      WebGL.jsgz\n│      WebGL.memgz\n│\n└─TemplateData\n        favicon.ico\n        fullbar.png\n        fullscreen.png\n        loadingbar.png\n        logo.png\n        progresslogo.png\n        style.css\n        UnityProgress.js\n")),"\n",a.createElement(n.p,null,"index.html は下記の通り。\nindex.html"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-html"},'<!DOCTYPE html>\n<html lang="en-us">\n  <head>\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n    <title>Unity WebGL Player | UnityProject</title>\n    <link rel="stylesheet" href="TemplateData/style.css" />\n    <link rel="shortcut icon" href="TemplateData/favicon.ico" />\n    <script src="TemplateData/UnityProgress.js"><\/script>\n  </head>\n  <body class="template">\n    <p class="header"><span>Unity WebGL Player | </span>UnityProject</p>\n    <div class="template-wrap clear">\n      <canvas\n        class="emscripten"\n        id="canvas"\n        oncontextmenu="event.preventDefault()"\n        height="600px"\n        width="960px"\n      ></canvas>\n      <br />\n      <div class="logo"></div>\n      <div class="fullscreen">\n        <img\n          src="TemplateData/fullscreen.png"\n          width="38"\n          height="38"\n          alt="Fullscreen"\n          title="Fullscreen"\n          onclick="SetFullscreen(1);"\n        />\n      </div>\n      <div class="title">UnityProject</div>\n    </div>\n    <p class="footer">\n      &laquo; created with\n      <a href="http://unity3d.com/" title="Go to unity3d.com">Unity</a> &raquo;\n    </p>\n    <script type="text/javascript">\n      var Module = {\n        TOTAL_MEMORY: 268435456,\n        errorhandler: null, // arguments: err, url, line. This function must return \'true\' if the error is handled, otherwise \'false\'\n        compatibilitycheck: null,\n        dataUrl: "Release/WebGL.data",\n        codeUrl: "Release/WebGL.js",\n        memUrl: "Release/WebGL.mem",\n      };\n    <\/script>\n    <script src="Release/UnityLoader.js"><\/script>\n  </body>\n</html>\n')),"\n",a.createElement(n.p,null,"上記から適当に html を切り出して埋め込んでみた。特に問題なく動作。\nちなみに、コンパイル時間は非常に長い。\nIL2CPP で C#を c++化して、emscripten で C++を Javascript(asm.js)化するそうだ。\nシーンだけじゃなくてシステムもすべて都度ビルドしてそうな感じなので今回のような微小なシーンしか含んでいなくてもコンパイルが結構長い。\nうちのマシンではパワー不足。\nあと、github にこのページを push する時に容量制限にひっかかってしまった。\n一回のコミットが大きすぎるという件。\nファイル容量をチェックした結果 WebGL.jsgz が 3M あるのでこれだ。\nWebGL.jsgz とそれ以外にコミットを分けたら push はできた。\n現状、以下の 2 点がネック。"),"\n",a.createElement(n.p,null,"コンパイルが長い\ngithub でホストする場合容量制限にひっかっかって push できない可能性がある"),"\n",a.createElement(n.p,null,"そのうちこの辺りは改善されるだろうけど。\nthree.js のサンプルを乗っける手軽さというわけにはいかない。\nわりとポテンシャルを感じるので、サイトに埋め込んで遊べる方法を模索したいところ。"))}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(r,e)):r(e)}},1151:function(e,n,t){t.d(n,{ah:function(){return r}});var l=t(7294);const a=l.createContext({});function r(e){const n=l.useContext(a);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}}}]);
//# sourceMappingURL=component---content-posts-2015-12-30-unity-webgl-md-7d74ca78c2a934c2e389.js.map