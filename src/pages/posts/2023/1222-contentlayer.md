---
title: "contentlayer 導入"
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

