---
date: 2023-10-28
tags:
  - ssg
title: そして astro へ
---

xterm.js を A-Frame で使うべく TypeScript で
試行錯誤する際に使った `vite` が気に入ったので、
`vite` な SSG にしてみようと思った。
探索した結果、 astro がそれっぽいのでやってみることに。

# Unknown Content Collection Error

https://garden.narze.live/100daysofcode-r3-90-ratchagitja-md-setup-astro/

gatsby の contents/blog を src/content/blog にシンボリックリンクしたのがよくなかった。

# Content entry frontmatter does not match schema

- pubDate を date に変えた
- description が 無くても動くように改造

# わりとあっさり動いた

`gatsby` と比べるとだいぶシンプル。

`gatsby` は `md => GraphQL => html` なのに対して、
`astro` は `md => html` なのでシンプル。

# theme: astro-ink を導入してみる

- https://astro-ink.vercel.app/

よくわからなかったのでコピペでやった。

新規にコピー元になるサイトを作る。
`npm create astro@latest -- --template one-aalam/astro-ink` 
src や各種設定をコピーした。

追加の依存を解決するべく、`npm install` するとエラーになったので、
`npm-check-updates` した。

alias path の解決。
https://docs.astro.build/ja/guides/aliases/

schema 調整。
optional 付けて、date を調整するというので動きそう。

```js
const blogCollection = defineCollection({
    schema: z.object({
        title: z.string().max(100, 'The title length must be less than or equal to 100 chars'),
        description: z.string().optional(), // <= optional
        tags: z.array(z.string()),
        author: z.string().optional(), // <= optional
        authorImage: z.string().optional(), // <= optional
        authorTwitter: z.string().optional(), // <= optional
        date: z.coerce.date(), // <= これ
        image: z.string().optional(), // <= optional
        category: z.string().optional(), // <= optional
    })
})
```

結果、 `svelte` や `tailwind` といった知らないライブラリーが入ったが、
動いた。
のだが gh-pages に deploy したら動いてなかった。
どうも `SSR` 向けの `theme` らしい。

```js
// astron.config.mjs
    output: 'server',
    adapter: vercel(),
```

```
> npm run build

`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.
```

- https://docs.astro.build/ja/guides/server-side-rendering/

https://docs.astro.build/ja/core-concepts/routing/#%E9%9D%99%E7%9A%84ssg%E3%83%A2%E3%83%BC%E3%83%89

なんとなく動いた。

# memo

しかし素の JSX(tsx) を練習したいので、
他のにするかもしぬ。
(astro は `.astro` 形式)

https://vike.dev/

が気になっている。

