---
title: "Three.jsのEditor"
date: 2015-12-09
Tags: []
---

Three.js本家のサイトにeditor (beta)というリンクあるのだけどこれ面白いなぁ。
わりといろんなことができそうだし、いまわしの中で流行り出しているSPAとしてとてもよさげだ。
使っている外部ライブラリ
いろんなものが入っている。
system.js

http://www.javascriptoo.com/System-js
System情報取得ライブラリ

jszip.js

http://stuk.github.io/jszip/
JavascriptでZipを作る。そんなライブラリあるのんか。

codemirror

https://codemirror.net/

acorn

https://marijnhaverbeke.nl/acorn/

ternjs

http://ternjs.net/

sortable

https://github.com/RubaXa/Sortable

js-signals

https://github.com/millermedeiros/js-signals

ui.js

https://jqueryui.com/

app.js

http://code.kik.com/app/3/index.html

という感じでいろんなライブラリが組み合わされている。
最近のJavascriptはこんなことになっているのか・・・
entrypointは・・・
index.htmlで初期化が走っていてuiの構築はたぶんこれ。
var editor = new Editor();

var viewport = new Viewport( editor );
document.body.appendChild( viewport.dom );

var player = new Player( editor );
document.body.appendChild( player.dom );

var script = new Script( editor );
document.body.appendChild( script.dom );

var toolbar = new Toolbar( editor );
document.body.appendChild( toolbar.dom );

var menubar = new Menubar( editor );
document.body.appendChild( menubar.dom );

var sidebar = new Sidebar( editor );
document.body.appendChild( sidebar.dom );

var modal = new UI.Modal();
document.body.appendChild( modal.dom );

UI的には４つの部分に分かれていて
見た目こういう感じ。
menu
viewport | sidebar
toolbar

レイアウトは、position: absoluteな感じでcssに書いてあった。
結構な大作で簡単には把握できない感じだなぁ。
