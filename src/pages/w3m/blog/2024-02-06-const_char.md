---
title: const char * との戦い
date: 2024-02-06
tags: [w3m]
---

c++ 化した瞬間からものすごい量の警告が発生していて、
やむをえず `-w` していました。

<!-- truncate -->

```cpp title="c++ では警告"
char* hoge = "const char * desu";
```

地道に, `const char*` 化してある程度目処がついてきたので、
`-w` を外しました。
これで、コンパイラの警告を活用できる。

