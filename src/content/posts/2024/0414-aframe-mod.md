---
title: 引き続き AFrame 改造…。
date: 2024-0414
tags: [webxr]
---

registerXXX 回りを素の継承にする実験は動いた。
しかし変更箇所が多くなりすぎるので、
少しずつ進めるようにやりなおし。

## eslit

まず eslint を成敗する。
overrides を空にした。
わたくしは最近の js を使いたいのです。

```json
{
  "extends": ["semistandard", "standard-jsx"],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    , // …
  },
  "overrides": [
    {
      /* Code within /src is restricted to using ES5 JavaScript
        The exception is that ES6 classes are used sparingly - see exceptions below. */
      "files": ["./src/**/*.js"], // 👈
      "parserOptions": {
        "sourceType": "script",
        "ecmaVersion": 5 // 👈
      }
    }
    , // …。例外が続く。
  ]
}
```

`rules` も空にした方がよさそうだが、`var` とか大量に引っかかるので保留。

```js
    "space-before-function-paren": "off"
```

## registerXXX の改造

prototype の元を受けとって継承したクラスを生成して登録するのだけど、
後半のクラス登録を別の関数に分けて、継承済みクラスの直接登録もできるように拡張する。

- registerSystem
- registerComponent

できた。
他に、geometry, primitive, material, shader などの register があるのだけど、
これらは継承した class を登録するという感じではないので見送り。

## esmodule 化

ここまで webpack の dev server を使って作業してきたが、
vite の dev server に変えて、 esmodule 化をやってみる。

```html
<script src="../../../dist/aframe-master.js"></script>
```

👇

```html
<script type="module" src="../../../src/index.js"></script>
```

```
Uncaught ReferenceError: require is not defined
```

## `examples\test\cube\index.html` 動いた

初期化の動きはなんとなく判った。
カスタムタグ、面白い。
メインループは未だ読めていない。

次は、

https://github.com/networked-aframe/networked-aframe

