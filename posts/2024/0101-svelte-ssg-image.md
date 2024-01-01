---
title: "svelte static の画像"
date: 2024-01-01
tags: ["ssg"]
---

とりあえずできた。

![image](./image.jpg)

```
posts/2024/0101-svelte-ssg-image.md
posts/2024/image.jpg
```

のように md 記事と同じフォルダに画像を配置する運用。

# 説明

> 本質的には、SvelteKit アプリは Request を Response に変換するマシンです。

もともと、`+page.server.ts` には画像ファイルに対するリクエストは来ていて、
エラーになっていた。

svelte.config.js
```js
    prerender: {
      handleHttpError: () => {
        return
      }
    },
```

この画像に対するリクエストを捌けるようにした。

`posts/[...slug]` を、
`posts/[...slug=isAsset]` と `posts/[...slug=isNotAsset]` に振りわけて、
`isAsset` の方は、画像の byte 列を含む Resonse を返すようにすることができた。

`posts/[...slug=isAsset]/+server.ts`
```ts
import { getPosts, getAsset } from '$lib/getPosts';
import path from 'node:path';


export async function GET({ params }) {
  const ext = path.extname(params.slug).toLowerCase();
  switch (ext) {
    case '.jpg':
      {
        // { slug: '2021/table.jpg' }
        const { buffer, contentType } = await getAsset(params.slug); // fs.readFile しているだけ。
        const response = new Response(buffer);
        response.headers.set('Content-Type', contentType);
        // response.headers.set('Content-Length', buffer.length);
        return response;
      }
  }
}
```

## routing を match する

https://kit.svelte.jp/docs/advanced-routing#matching

`src/param/isAsset`
```ts
/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return /\.jpg$/.test(param);
}
```

`src/param/isAsset`
```ts
import { match as isAsset } from './isAsset';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return !isAsset(param);
}
```

## +server.ts と +page.server.ts の違い

`+page.server.ts` は stringify できる JsonObject を返すことが期待される。
`+server.ts` は HttpResponse を直接返す。byte 列なども扱える。

