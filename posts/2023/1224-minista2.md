---
title: "minista の fetch がわかってきた"
date: 2023-12-24
tags: ["ssg", "react"]
---

これ。

https://minista.qranoko.jp/docs/fetch

`[placeholder].tsx` のように書いてデータからページを作る仕組みがなんとなく理解できた。

`posts/[slug].tsx` のようにて、`getStaticData` で `paths` をセットする。


```ts
import type { StaticData, PageProps } from "minista"
import { getPosts, PostType } from './myPosts';

// maybe StaticData[] ?
export async function getStaticData(): Promise<StaticData[]> {
  const posts = await getPosts();

  return posts.map((post: PageIssuesTemplateProps) => ({
    props: { post },
    paths: { slug: post.slug }, // 👈 自分で供給する
  }))
}

type PagePostsTemplateProps = PageProps & {
  post: PostType,
}

export default function (props: PagePostsTemplateProps) {
  console.log(props); // 👈 props がはいってくる。paths は来ない。

  return <MyPost post={props.post} />
}
```

わりと思ったように編集できるようになってきた。
CMS じゃなくて local directory から収集している部分が微妙に怪しい のだけど、
動くのでよし。

