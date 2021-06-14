+++
title = "mdbook もやってみる"
date = 2021-06-14
taxonomies.tags = ["mdbook"]
+++

* https://github.com/ousttrue/cmake_book

gh-pages
* https://ousttrue.github.io/cmake_book/


# base_url の設定にはまる

わりとすんなりできたのだけど、
base_url の設定だけ探し回った。

```book.toml
[output.html]
site-url = "https://ousttrue.github.io/cmake_book/"
```

これで、 `https://ousttrue.github.io/cmake_book/` のような subfolder へのデプロイが動作する。

# SUMMARY.md

`SUMMARY.md` にページ構成を先に記述して章立てを作ってから中身を記述していくのが面白い。
この仕組みが合うものは、 `zola` より `mdbook` の方がサクサク作れそう。
