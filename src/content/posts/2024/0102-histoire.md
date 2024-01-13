---
title: "storybook を histoire に変えてみる"
date: 2024-01-02
tags: ["ssg", "svelte"]
---

`historie` じゃなくて `histoire`。
フランス語で、
ヒストリエじゃなくてヒストワールぽい。
`npm install historie` すると違うパッケージが来ました。

# install

https://histoire.dev/guide/svelte3/getting-started.html

histoire が vite-5 と衝突するので `--legacy-peer-deps` を付けました。
そのうち治るでしょう。

```sh
> npm i -D histoire @histoire/plugin-svelte --legacy-peer-deps
```

```js
import { defineConfig } from 'histoire'
import { HstSvelte } from '@histoire/plugin-svelte'

export default defineConfig({
  plugins: [
    HstSvelte(),
  ],
  tree: {
    file: 'path',
  },
  vite: {
    base: '/histoire/'
  },
})
```

tree を付けるとディレトリ構造そのままで表示される。

```sh
> npx histoire dev
```

動いた。

# .npmrc

```
legacy-peer-deps=true
```

# build

```sh
> npx histoire build
=> .histoire/dist
```

https://histoire.dev/guide/config.html

を見て `vite.base` を足した。

