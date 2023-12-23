---
title: "contentlayer 導入(断念)"
date: 2023-12-22
tags: ["ssg"]
---

`minista` に戻して、 [contentlayer](https://contentlayer.dev/) 入れてみた。

```
> npx contentlayer build

Warning: Contentlayer might not work as expected on Windows
Contentlayer (Warning): Importing from `contentlayer/generated` might not work.
```

警告メッセージで暗雲がたれこめたが、なんとなく動いた。

Contentlayer の機能は glob で記事を収集している機能そのものだったので、
ぴたりとはまりました。

import を相対パスで書いた。

```ts
import { allPosts } from '../../.contentlayer/generated';
```

## markdown の改行コードが CRLF

```
failed with YAMLParseError: Unexpected scalar
```

だめらしい。

## vite が css を出さなくなったので断念

わからず。
どこかで例外が出た場合に vite の style tag 出力に到達しないにもかかわらず、
不完全な html を返す動きをしたことがあったのでそういうタイプの問題かも。

```ts
  if (process.env.NODE_ENV === 'production') {
    // import-analysis
    const { getPosts } = await import('./posts'); // dev でもこっちに来る ??
    // 使われないのでダミーを配置した。
  }
  else {
  }
```

