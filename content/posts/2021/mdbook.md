+++
title = "mdBook もやってみる"
date = 2021-06-14
taxonomies.tags = ["mdbook", "ssg"]
+++

作ってみた。

* <https://github.com/ousttrue/cmake_book>

gh-pages

* <https://ousttrue.github.io/cmake_book/>

# base_url の設定にはまる

base_url の設定だけ探し回った。
gh-pages の url が `https://ousttrue.github.io/cmake_book/` と root フォルダでは無いので必用。

```book.toml
[output.html]
site-url = "https://ousttrue.github.io/cmake_book/"
```

# github actions

<https://github.com/marketplace/actions/mdbook-action>

を参考にしたのだけど、
ちょっとはまった。

```yml
name: github pages
on: [push] # <= 書き方変わってた(pushしてもjobが起動しない)
jobs:
  Explore-GitHub-Actions: # <= 書き方変わってた？(アクションとして認識されない？)
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
        # if: github.ref == 'refs/heads/main' <= あると動かない
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./book
```

動かないとき、特に action として認識されていないときは全く手掛かりが無くて難儀した。

<https://docs.github.com/ja/actions/quickstart>

は動いたので、これと違うところを見比べて勘でなおした。
よくわかっていない。

# mdbook の SUMMARY.md

`SUMMARY.md` にページ構成を先に記述して章立てを作ってから中身を記述していくのが面白い。
この仕組みが合うものは、 `zola` より `mdbook` の方がサクサク作れそう。
Scrapbox 上にあるメモを整理するかもしれない。

作った。

* [cmake_book](https://ousttrue.github.io/cmake_book/)
* [rust練習帳](https://ousttrue.github.io/rust_exercise_book/)

あと、 `blender の addon 作成メモ` とか `Unity のカスタムエディターメモ` とか作るかも。

# book 初期化手順

github に repository を作って gh-pages に公開するところまで

* new repository `https://github.com/GITHUB_USER_NAME/MDBOOK_REPOSITORY_NAME`
* git clone
* cd,
* mdbook init
* .github/workflows/gh-pages.yml

```yaml
name: github pages
on: [push]
jobs:
  Explore-GitHub-Actions:
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

* git add .
* git commit -m init
* git push
    * action が発動し、mdbook がビルドした book フォルダが gh-pages ブランチに push される
* github の settings - pages から gh-pages branch を選んで root を設定する
    * しばらくすると `https://GITHUB_USER_NAME.github.io/MDBOOK_REPOSITORY_NAME/` が有効になる

