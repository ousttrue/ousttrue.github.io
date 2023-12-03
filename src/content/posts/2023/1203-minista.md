---
title: "minista へ"
date: 2023-12-03
tags: ["ssg"]
---

まだ astro をあまり使っていないのだが、
さらに minista への移行を試みる。
素の jsx を使いたいのじゃ。

なので、 `svelte` とか `astro` とか独自記法のものはやめておく意向。

- `jsx` + `typescript` => `tsx`
- `vite`

くらいまではやるという線引き。
たぶん、`astro` より `minista` の方が便利ではないがシンプル。

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

## markdown 記事を投入

astro の`contentCollection` に当たる機能が無いのでここだけ手作りで補う。

`contentCollection` は `src/contents` 配下の `*.md` を集めて記事のコレクションで
ブログを作ったりするという機能だ。

minista では、以下の機能で代替できそうだ。

- [fetch](https://minista.qranoko.jp/docs/fetch) 
- [async function](https://minista.qranoko.jp/docs/async-function)

getStaticData で `md` をサーチして、frontmatter を取り出したリストを作れば動いた。

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

