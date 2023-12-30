---
title: "svelte も"
date: 2023-12-30
tags: ["ssg"]
---

React をかじった後で `svelte` を見てみるとわかりみがある。
やってみる。

# totorial

`Part1 Basic Svelte` にさらっと目を通す。

`vite` の `svelete` 初期化。
markdown の posts を収集して表示する方法が解らぬ。
`adapter-static` が関係しそうだという感じがする。

`Part3 Basic Svelte Kit` も見る。
こっちの先に読んだほうがいいかも。重要。
まさに blog の例も書いてあった。

# nvim

- language-server
- tree-sitter

入れた。

# 作業

```sh
> mv src src.bak # 退避
> npm init svelte # current に展開

# src, vite.config.ts, svelte.config.ts あたりが出現
```

## 原型

5つ作った。
普通に `async load` 関数で動くようなので中身作れば動きそう。


```
+ src/
  + lib/
    + getPosts.ts
  + routes/
    + posts/
      +page.svelte
      +page.server.ts
      [slut]/
        +page.svelte
        +page.server.ts
+ posts/ # getPosts でここを glob する
  + **/*.md
  + **/*.jpg # 未解決
```

- `src/lib/getPosts.ts` : dummy のロジック
```ts
export type PostType = {
  slug: string;
  title: string;
}

const posts: PostType[] = [
  {
    slug: "hoge",
    title: "Hoge",
  },
  {
    slug: "fuga",
    title: "Fuga",
  },
]

export async function getPosts(): Promise<PostType[]> {
  return Promise.resolve(posts);
}

export async function getContent(slug: string): Promise<string> {
  return Promise.resolve(`Hello "${slug}" !`);
}
```

- `src/routes/posts/page.svelte` : 投稿一覧

```html
<script>
  export let data;
</script>

<h1>blog</h1>

<ul>
  {#each data.summaries as { slug, title }}
    <li><a href="/posts/{slug}">{title}</a></li>
  {/each}
</ul>
```

- `src/routes/posts/page.server.ts` : 投稿一覧の`async load` 関数
```ts
```

- `src/routes/posts/[slug]/page.svelte` : 投稿
```html
```

- `src/routes/posts/[slug]/page.server.ts` : 投稿の`async load` 関数
```ts
```

## local directory から getPosts する実装

素直に書いたら動いた。

```sh
> npm i -D glob front-matter
```

```ts
import path from "node:path";
import fs from 'node:fs/promises';
import * as glob from "glob";
import fm from 'front-matter';


export type PostType = {
  title: string;
  slug: string;
  ext: string;
  date: Date;
  tags?: string[];
}

export async function getPosts(): Promise<PostType[]> {
  const dir = '.';
  const pattern = 'posts/**/*.{md,mdx}';
  const posts: PostType[] = [];
  const matches = await glob.glob(pattern, { cwd: dir })

  for (const m of matches) {
    const res = await fs.readFile(path.join(dir, m), { encoding: 'utf-8' });
    const post = fm(res).attributes as PostType;

    const matched = m.match(/^posts[\\\/](.*)(\.mdx?)$/);
    if (!matched) {
      throw new Error("not match: md|mdx");
    }

    post.slug = matched[1].replace(/\\/g, '/');
    post.ext = matched[2]; //match.substring(6, match.length - 3);
    if (post.tags) {
      post.tags = post.tags.map((tag) => tag.toLowerCase());
    }
    posts.push(post);
  }
  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return posts;
}
```

で、`slug` が `20XX/hoge` とか `20XX/01/hoge` とかが混在しているのに対処。

https://qiita.com/jwnr/items/8932978ca2f50f102e3d#ex-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0404

`[...slug]` という記法があるらしい。

## markdown の rendering

`src/lib/getPosts.ts`

```ts
export async function getContent(slug: string): Promise<string> {
  const path = `posts/${slug}.md`
  console.log(path);
  const content = await fs.readFile(path, 'utf8')
  return content;
}
```

https://ssssota.github.io/svelte-exmarkdown/

```html
<script>
  import Markdown from "svelte-exmarkdown";
  export let data;
</script>

<h1>{data.post.title}</h1>
<Markdown md={data.post.content} />
```

Gfm と rehype-highlight はドキュメント通りでさくっとできた。

## SSG build

https://kit.svelte.dev/docs/adapter-static

markdown からの内部リンクと画像リンクにエラーが出るが、
後回しにして握りつぶした。

https://github.com/sveltejs/kit/discussions/9723

```markdown
![image](./image.jpg)
```
という記法を解決する必要がある。

