---
title: a-frame の three.js
date: 2024-04-14
tags: [webxr]
---

A-Frame を esmodule 化していたら、
A-Frame の使っている Three.js が fork 版であるという問題が浮上してきた。

## setPoseTarget

`setPoseTarget` という関数の有無で問題がある。

- https://github.com/aframevr/aframe/issues/3672
- https://github.com/mrdoob/three.js/issues/18633
- https://github.com/supermedium/three.js/tree/dev/src/renderers/webxr

```js
this.addEventListener("camera-set-active", function () {
  console.warn(renderer.xr);
  renderer.xr.setPoseTarget(self.camera.el.object3D);
});
```
