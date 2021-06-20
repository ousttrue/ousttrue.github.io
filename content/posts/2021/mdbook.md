+++
title = "mdBook もやってみる"
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

# github actions

これもわりとはまった。

```yml
name: github pages
on: [push] # <= 書き方変わってた(pushしてもjobが起動しない)
jobs:
  Explore-GitHub-Actions: # <= 書き方変わってた(アクションとして認識されない？)
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup mdBook
        uses: peaceiris/actions-mdbook@v1
        with:
          mdbook-version: "latest"

      - run: mdbook build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./book
```

動かないとき、特に action として認識されていないときは全く手掛かりが無くて難儀した。

# SUMMARY.md

`SUMMARY.md` にページ構成を先に記述して章立てを作ってから中身を記述していくのが面白い。
この仕組みが合うものは、 `zola` より `mdbook` の方がサクサク作れそう。
よく使う Scrapbox 上にあるメモを整理するかもしれない。

* [cmake_book](https://ousttrue.github.io/cmake_book/)
* [rust練習帳](https://ousttrue.github.io/rust_exercise_book/)

作った。
あと、 `blender の addon 作成メモ` とか `Unity のカスタムエディターメモ` とか作るかも。


