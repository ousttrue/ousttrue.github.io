---
title: "react-three-fiber と storybook"
date: 2023-12-29
tags: ["ssg", "webgl"]
---

three.js やってみるに、せっかくなので react-three-fiber にしてみよう。
ということで、 tsx でサンプルを記述してみた。

[r3f](/gl)

動かないなーと試行錯誤したところ、

https://minista.qranoko.jp/docs/partial-hydration

だった。
これが hydration か。なるほどー。

しかし、build すると

```
Uncaught TypeError: Failed to resolve module specifier "react". Relative references must start with either "/", "./", or "../".
```

そろそろ `minista` そのものを読む頃合いかもしれぬ。

# storybook

さらに、 `storybook` 入れてみる。

すでに `vite + react` にはなっているので下記のコマンドでいけた。

```sh
> npx sb init --builder=vite
```

空のfolder だと `stories` ができるのだけど `src/stories` ができた。
なるほど。

[storybook](/storybook)

basepath の設定。

- [【解決談】React & ViteのstorybookをGitHub PagesにデプロイしたらCanvasが真っ白だった話](https://zenn.dev/tetracalibers/articles/b420f3fa146575)


react-three-fiber が storybook で動いた。

https://ousttrue.github.io/storybook/?path=/story/hello-react-three-fiber--default-hello

# mdx で r3f はうまくいかなかった

mdx に partial-hydration するのができるのかどうかよくわからなかったので、 深入りせず。
とりあえず storybook で。

# Next.js にしようとしたが、やっぱ止めた

わいは、 `vite` が好きなので `turbopack` 推しなのが、またの機会にとなった。

# storybook を読む

https://github.com/pmndrs/drei/tree/master/.storybook
https://github.com/daisyui/react-daisyui/tree/main/.storybook

を読んで学ぶ。

