---
title: "Unity5.3でWebGL"
date: 2015-12-30
tags: ["unity"]
---

```javascript
var Module = {
  TOTAL_MEMORY: 268435456,
  errorhandler: null, // arguments: err, url, line. This function must return 'true' if the error is handled, otherwise 'false'
  compatibilitycheck: null,
  dataUrl: "Release/WebGL.data",
  codeUrl: "Release/WebGL.js",
  memUrl: "Release/WebGL.mem",
};
```

こっちが未加工の index.html。
Unity5.3 の WebGL を試してみる。

http://blogs.unity3d.com/jp/2015/12/07/unity-5-3-webgl-updates/
http://docs.unity3d.com/530/Documentation/Manual/webgl-gettingstarted.html

とりあえず build して動かしてみた。
下記のようなディレクトリ構造で出力されていた。

```
│  index.html
│
├─Release
│      .htaccess
│      UnityLoader.js
│      WebGL.datagz
│      WebGL.jsgz
│      WebGL.memgz
│
└─TemplateData
        favicon.ico
        fullbar.png
        fullscreen.png
        loadingbar.png
        logo.png
        progresslogo.png
        style.css
        UnityProgress.js
```

index.html は下記の通り。
index.html

```html
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Unity WebGL Player | UnityProject</title>
    <link rel="stylesheet" href="TemplateData/style.css" />
    <link rel="shortcut icon" href="TemplateData/favicon.ico" />
    <script src="TemplateData/UnityProgress.js"></script>
  </head>
  <body class="template">
    <p class="header"><span>Unity WebGL Player | </span>UnityProject</p>
    <div class="template-wrap clear">
      <canvas
        class="emscripten"
        id="canvas"
        oncontextmenu="event.preventDefault()"
        height="600px"
        width="960px"
      ></canvas>
      <br />
      <div class="logo"></div>
      <div class="fullscreen">
        <img
          src="TemplateData/fullscreen.png"
          width="38"
          height="38"
          alt="Fullscreen"
          title="Fullscreen"
          onclick="SetFullscreen(1);"
        />
      </div>
      <div class="title">UnityProject</div>
    </div>
    <p class="footer">
      &laquo; created with
      <a href="http://unity3d.com/" title="Go to unity3d.com">Unity</a> &raquo;
    </p>
    <script type="text/javascript">
      var Module = {
        TOTAL_MEMORY: 268435456,
        errorhandler: null, // arguments: err, url, line. This function must return 'true' if the error is handled, otherwise 'false'
        compatibilitycheck: null,
        dataUrl: "Release/WebGL.data",
        codeUrl: "Release/WebGL.js",
        memUrl: "Release/WebGL.mem",
      };
    </script>
    <script src="Release/UnityLoader.js"></script>
  </body>
</html>
```

上記から適当に html を切り出して埋め込んでみた。特に問題なく動作。
ちなみに、コンパイル時間は非常に長い。
IL2CPP で C#を c++化して、emscripten で C++を Javascript(asm.js)化するそうだ。
シーンだけじゃなくてシステムもすべて都度ビルドしてそうな感じなので今回のような微小なシーンしか含んでいなくてもコンパイルが結構長い。
うちのマシンではパワー不足。
あと、github にこのページを push する時に容量制限にひっかかってしまった。
一回のコミットが大きすぎるという件。
ファイル容量をチェックした結果 WebGL.jsgz が 3M あるのでこれだ。
WebGL.jsgz とそれ以外にコミットを分けたら push はできた。
現状、以下の 2 点がネック。

コンパイルが長い
github でホストする場合容量制限にひっかっかって push できない可能性がある

そのうちこの辺りは改善されるだろうけど。
three.js のサンプルを乗っける手軽さというわけにはいかない。
わりとポテンシャルを感じるので、サイトに埋め込んで遊べる方法を模索したいところ。
