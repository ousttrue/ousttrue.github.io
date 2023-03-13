---
title: "特定のHtmlElementを画面いっぱいにするToggleの実験"
date: 2015-12-17
tags: []
---

```
“W” translate | “E” rotate | “R” scale | “+” increase size | “-” decrease size
Press “Q” to toggle world/local space, keep “Ctrl” down to snap to grid

lose
```

ボタンが押されたら、最前面に position: fixed の板($modal)を表示してそっちに
Three.jsで使っているElement($renderer)の内容を付け替える。

```javascript
let $children = $renderer.children();

$modal.appendTo($("body")).css({
  display: "block",
  position: "fixed",
  left: 0,
  width: "100%",
  top: 0,
  height: "100%",
  "z-index": 100,
});

$children.appendTo($modal);
$(window).trigger("resize");
```

概ねこんな感じ。
スクロールバーを body じゃなくて最大化表示用の div より後ろにまわすなどの細工はしてある。
