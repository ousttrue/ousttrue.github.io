---
title: 非同期タスク
date: 2024-02-14
tags: [w3m]
---

2種類の非同期タスクが必要で、
ひとつは http get、もうひとつは text 入力。

<!-- truncate -->

```c title="prompt から network"
// 例
auto url = co_await inputLineHist(prompt, default_input, IN_URL, hist);
auto buf = co_await loadGeneralFile(url, {}, {.referer = NO_REFERER});
```

libuv を backend にした await 実装を入れたいと考えています。
150個くらいある w3m コマンドを移植する必要があります。

## lua 実装

- https://github.com/ms-jpq/lua-async-await
- [Luaのasync/await実装について](https://it.commutty.com/denx/articles/52f82f2a0f9b4feea4d49ff7c83af052)

読んでも理解できなかったので、
読み直す。

## c++ 実装

c++20 の co_await

- https://github.com/CatalinMihaiGhita/libcouv
- https://github.com/KrystianD/asyncpp

## どっちにするか…

libuv の導入は確定なので進める。

