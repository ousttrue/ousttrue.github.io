---
date: 2025-12-09
title: モダンC
tags: [c]
---

https://floooh.github.io/2019/09/27/modern-c-for-cpp-peeps.html

C では、

```c
void hoge();

void hoge(void);
```

の意味が違う。知らなかったー。

`void hoge();` はなんと任意の引数を受けるらしい。 `void hoge(...);` と同じ？

w3m を改造するときとかに、せっせと `(void)` を `()` に起きかえたりしていたよ。
たまに関数の signature が違うのに何の警告も出ないことがあったのは、これかもしれない。
そりゃコンパイルは通る。

`c++` の `void hoge();` は無引数を表す。うーん。
