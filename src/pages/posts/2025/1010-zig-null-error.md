---
title: zig の null と error の使い分け
date: 2025-10-10
tags: [zig]
---

中で allocator の error が発生する場合に外に伝搬させていたのだが、
用途によっては、積極的に握りつぶしてよい気がしてきた。

```zig
const buf = allocator.alloc(u8, 1024) catch @panic("OOM");
```

使う側でその error なり nullable なりに対するリアクションするかどうかで、
わずらわしくないようにデザインしていくべきだ。
ハンドリングしない nullable や エラーは伝搬させる必要が無いのである。

## nullable かつ error: 正常かつ null をハンドリングしたいか？

## nullable or error: if, catch, orelse 使いたいか？

## error の種類による分岐が無いなら nullable でよい
