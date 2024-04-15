---
title: a-frame の esmodule 化
date: 2024-04-13
tags: [webxr]
---

なんとなく A-Frame の esmodule 化をやってみる。
主に require を import に置き換えるだけなのだけど、
class 継承を普通の継承化することもやろうと思う。

## registerXXX

動的クラス生成とクラスのシステム登録をする registerXXX という関数群がある。
`System`, `Component`, `Material`, `Shader`, ` Primitive`, `Geometry`, `PropertyType` など。

たぶん、以下のようにシンプル化できる。
language-server の効きが良くなることが見込まれるのでやってみる。

```js
@registerSystem
class CameraSystem extends System
```

AScne
  systems(scene level の シングルトン)
  同名の component と連携する。

## AScene > AEntity > ANode > HTMLElment

## Component

cube を描画するのに最低限必要な component.

```js
require('./camera');
require('./geometry');
require('./position');
require('./rotation');
require('./scale');
require('./scene/xr-mode-ui');
```

entity.load => initComponent

## 初期化順注意！

```js
class Hoge {
  fuga: undefined;
}

class Fuga extends Hoge {
  fuga(){
    // undefined の代入が後！
  }
}
```

## 初期化順

### AScene.doConnectedCallback

    this.initSystems();

`a-scene` が root.
配架の `a-entity` を集めて初期化する。

### AEntity.updateComponents

```js
  play() {
    // Already playing.
    if (this.isPlaying || (!this.hasLoaded && !this.isLoading)) { return; }
    this.isPlaying = true;

    // Wake up all components.
    for (let key in this.components) { this.components[key].play(); }

    // Tell all child entities to play.
    const entities = this.getChildEntities();
    for (let i = 0; i < entities.length; i++) { entities[i].play(); }

    this.emit('play');
  }
```

各 `a-entity` は 付属する `component` を初期化する。
`a-scene` も entity なので、`a-scene` 専用の `component` を初期化する。


## type = "module"

`examples\test\cube\index.html` あたりから攻めてみる。

まず開発サーバーとして vite を導入する。
次にシンプルなサンプルを改造してみる。

```html
<script src="../../../dist/aframe-master.js"></script>
```

👇

```html
<script type="module" src="../../../src/index.js"></script>
```

```
require is not defined
```

地道に修正していく。

```js
var utils = require('./utils/');
// 👇
import * as utils from './utils/';
```

- src/constants/index.js
- src/constants/keyboardevent.js
- src/index.js
- src/utils/index.js
- src/utils/debug.js
- src/utils/device.js
- src/utils/object-pool.js
- src/utils/coordinates.js
- src/utils/entity.js
- src/utils/split.js
- src/utils/forceCanvasResizeSafariMobile.js
- src/utils/material.js
- src/utils/src-loader.js
- src/utils/styleParser.js
- src/utils/tracked-controls.js


```js
if (process.browser) { 
}

// https://dev.to/dala00/nuxtjsssr-2jda

if (typeof window !== 'undefined') {
}
```

```js
var isWebXRAvailable = module.exports.isWebXRAvailable = navigator.xr !== undefined;
// 👇
export const isWebXRAvailable = navigator.xr !== undefined;
```

```js
function getVRDisplay() { return vrDisplay; }
module.exports.getVRDisplay = getVRDisplay;
// 👇
export function getVRDisplay() { return vrDisplay; }
```

```js
  require('./style/aframe.css');
  require('./style/rStats.css');
// webpack -> vite
```

## registerComponent

- core/scene/a-scene.js
- core/scene/metaTags.js
- core/a-node.js
- core/propertyTypes.js
- core/scheme.js
- core/component.js
- core/a-entity.js

```js
module.exports.registerComponent = function(name, definition) {
}
```

```js
class ANode extends HTMLElement {
}
customElements.define('a-node', ANode);
```

## registerComponent

👇

```js
registerComponent("animation", Animation);
export class Animation extends Component {
  ///
}
```

## registerSystem

シングルトンの登録？

## require の置き換え

a-frame は three.js のラッパーなのだけど
esmodule 化済みの three.js と食い合せが悪くなっている。
例えば、three.js の拡張と、a-frameの参照する three.js が別の実体であるということが起きる。

esmodule 製のライブラリと併用し辛い。

あと開発サーバーに vite を使って快適に作業したい。

## register 関数の改造

a-frame の各種クラスが特殊な継承になっていて、
language-server の恩恵が受けられない。
単純継承への書き直しを試みる。

