---
date: 2023-10-21
tags:
  - ssg
title: gatsby 復旧
---

久しぶりに更新しようと思ったら gatsby が動かなくて他の ssg を物色していたのだけど、
最近手に入れた `quest3` で遊ぶべく `A-Frame` を初めており javascript が活性化されたので、
やはり `gatsby` を続けることにした。
以下、修復メモ。

# CommonJS Error

```
$ gatsby develop
```

すると何かエラーになる。

```
 ERROR #10123  API.CONFIG.LOADING

We encountered an error while trying to load your site's gatsby-config. Please fix the error and try again.

  Error: [ERR_REQUIRE_ESM]: require() of ES Module node_modules/remark-gfm/index.js from gatsby-config.js not supported.
  Instead change the require of index.js in gatsby-config.js to a dynamic import() which is available in all CommonJS modules.
```

https://zenn.dev/yodaka/articles/596f441acf1cf3#commonjs%E3%81%AE%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%81%8B%E3%82%89esm%E3%82%92%E5%91%BC%E3%81%B6

> CommonJSのモジュールからESMを呼ぶ

があかんらしい。

`gatsby-config.js` が以下のようになっていて `CommonJs` なのがよくないらしい。

```js
module.exports = {
  siteMetadata: {
  },
}
```
この辺 `A-Frame` やりながら通ったのでだいたいわかる。

# ESModule に書き換え。

https://www.gatsbyjs.com/docs/how-to/custom-configuration/es-modules/

```js
const config = {
  siteMetadata: {
  },
}

export default config
```

```
(node:16343) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)


 ERROR #10123  API.CONFIG.LOADING
```

`conifg-gatsby.js` => `conifg-gatsby.mjs`

なおった。

