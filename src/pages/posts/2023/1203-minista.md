---
title: "minista へ"
date: 2023-12-03
tags: ["ssg"]
---

まだ astro をあまり使っていないのだが、
さらに [minista](https://minista.qranoko.jp/) への移行を試みる。
素の jsx を使いたいのじゃ。
なので、 `svelte` とか `astro` とか独自記法のものはやめておく意向。

- `jsx` + `typescript` => `tsx`
- `vite`

くらいまではやるという線引き。
たぶん、`astro` より `minista` の方が便利ではないがシンプルなのではないか。

# minista 移行メモ

## 開始

テンプレートを参考にコピペして動くようにする。

```
> npm create minista@latest my-minista-project -- --template minimal-ts
```

`package.json`
```json
{
  "scripts": {
    "dev": "minista",
    "build": "minista build",
    "preview": "minista preview"
  },
  "devDependencies": {
    "@types/react": "^18.2.16",
    "@types/react-dom": "^18.2.7",
    "minista": "^3.1.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.1.6"
  }
}
```

`index.tsx`
```tsx
import { Head } from "minista"

export default function () {
  return (
    <>
      <Head>
        <title>Hello!</title>
      </Head>
      <h1>Hello!</h1>
    </>
  )
}
```

とりあえず index が起動。

## markdown 記事を投入

astro の`contentCollection` に該当する機能が無いので手作りで補う。

astro の `contentCollection` は `src/contents` 配下の `*.md` を集めて記事のコレクションで
ブログを作ったりするという機能だ。

minista では、以下の機能で代替できそうだ。

- [fetch](https://minista.qranoko.jp/docs/fetch) 
- [async function](https://minista.qranoko.jp/docs/async-function)

getStaticData で `md` を glob して、frontmatter を取り出したリストを作れば動いた。

`index.tsx`
```tsx
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFile } from 'node:fs/promises'
import React from "react";
import type { StaticData, PageProps } from "minista"
import { glob } from "glob"
import fm from 'front-matter'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getStaticData(): Promise<StaticData> {

  const data = {
    props: {
      posts: [],
    },
  }

  const matches = await glob('**/*.md', { cwd: __dirname })

  for (const match of matches) {
    const res = await readFile(path.join(__dirname, match), { encoding: 'utf-8' });
    const post = fm(res).attributes;
    post.path = match.substring(0, match.length - 3).replace(/\\/g, '/');
    console.log(match, post);
    data.props.posts.push(post);
  }

  return data;
}

type PageIssuesProps = PageProps & {
  posts?: {
    title: string;
    path: string;
  }[]
}

export default function(props: PageIssuesProps) {
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {props.posts?.map((item, index) => (
          <li key={index}>
            <a href={`${item.path}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
```

普通に `console.log` で print デバッグできたし。
画期的にシンプルになったのでは。
hugo などの ssg によくある、特定のフォルダに記事を配置する方式よりわかりやすいような気がする。
自分で配置して、自分で列挙する、これじゃよ。

## layout とか

Theme とか Template とかそういう作業。

とりあえず [global](https://minista.qranoko.jp/docs/global) で満足した。

少し React 知識があればさくさくできそうな感じ。
いわゆる HtmlTemplate より JSX(TSX) の方がわかりやすさで勝っている。
基本を覚えれば、なんかやるたびに検索するという頻度は少ない気がする。

## trouble: Unknown language

既存記事の移植でエラーが発生。

```
[plugin:@mdx-js/rollup] Unknown language: `{digraph}` is not registered
```

どうも、`.md` のコードブロックにマイナーな言語とかを書いていると出る。

`minista.config.js` で
```js
    useRehypeHighlight: false,
```
とすることでエラーは出なくなったので `rehype` まわり。
動くように対処する方法・・・。

```js
// node_modules/lowlight/lib/core.js:50
  if (!high.getLanguage(language)) {
    throw fault('Unknown language: `%s` is not registered', language)
  }
```

stacktrace が `node_modules/rehype-highlight/lib/index.js` までしか遡れないのでわからんなー。

`node_modules/minista/dist/server/page.js`
```
export function getPages(): Page[] {
  const PAGES: ImportedPages = import.meta.glob(
    [
      "/src/pages/**/*.{tsx,jsx,mdx,md}",
      "!/src/pages/_global.{tsx,jsx}",
      "!/src/pages/**/*.stories.{js,jsx,ts,tsx,md,mdx}",
    ],
    {
      eager: true,
    }
  )
```

見つけたー。

`https://github.com/rehypejs/rehype-highlight/blob/6.0.0/lib/index.js#L17`

`minista.config.js`
```js
{
  markdown: {
    rehypeHighlightOptions: {
      ignoreMissing: true
    },
  }
}
```

# trouble: build "EventEmitter" is not exported 

node 関数を使ってはいけないらしい。
glob した結果を json に一度書き出して import するようにしたら動いた。
dev は glob で、build は json 経由になるように手を考える。

```js
// import { glob } from "glob"
// import fm from 'front-matter'
// import { fileURLToPath } from "node:url";
// import path from "node:path";
// import { readFile } from 'node:fs/promises'
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
```

