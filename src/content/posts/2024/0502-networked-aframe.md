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

`networked-scene` というコンポーネントが追加されている。

`src\components\networked-scene.js` に書いてある。

```js
AFRAME.registerComponent("networked-scene", {});
```

## server

### `server\socketio-server.js`

vite に載せれるか？

https://github.com/vite-plugin-socket-io/vite-plugin-socket-io

### `server\easyrtc-server.js`
