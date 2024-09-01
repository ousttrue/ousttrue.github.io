---
title: networked-aframe も esmodule 化できるか
date: 2024-05-02
tags: [webxr]
---

https://github.com/networked-aframe/networked-aframe

これも、esmodule 化して一緒に使いたい。
やってみる。

## client

- https://www.crossroad-tech.com/entry/networked-aframe-setup

- https://www.jyuko49.com/entry/2021/12/14/115950#Networked-A-FrameNAF

```html
<a-scene
  networked-scene="
  serverURL: /;
  app: <appId>;
  room: <roomName>;
  connectOnLoad: true;
  onConnect: onConnect;
"
></a-scene>
```

### networked-scene

`src\components\networked-scene.js` に書いてある。

```js
AFRAME.registerComponent("networked-scene", {});
```

### networked

これも必要

## server

### `server\socketio-server.js`

vite から websocket を proxy で飛ばすことで動いた。

https://github.com/ousttrue/aframe/tree/vite

## script で `script type=module` を待つ

`defer` でできた。

## server logic

入室管理だけだった。
