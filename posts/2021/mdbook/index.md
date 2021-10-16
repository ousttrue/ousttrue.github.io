+++
title = "mdBook もやってみる"
date = 2021-06-14
updated = 2021-08-31
tags = ["mdbook", "ssg"]
+++

* <https://rust-lang.github.io/mdBook/>
* <https://github.com/rust-lang/mdBook>

# 作ってみた

* <https://github.com/ousttrue/cmake_book>

gh-pages

* <https://ousttrue.github.io/cmake_book/>

# config.toml

## base_url の設定にはまる

base_url の設定だけ探し回った。
gh-pages の url が `https://ousttrue.github.io/cmake_book/` と root フォルダでは無いので必用。

`book.toml`
```toml
[output.html]
site-url = "https://ousttrue.github.io/cmake_book/"
```

## github

`book.toml`
```toml
[output.html]
git-repository-url = "https://github.com/rust-lang/mdBook/tree/master/guide"
edit-url-template = "https://github.com/rust-lang/mdBook/edit/master/guide/{path}"
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
`hugo` とかと違って各ページに `frontmatter` が不要なので、
ページを足したり引いたりするする場合はこちらの方が使いやすい。

Scrapbox 上にあるメモを整理するかもしれない。

作った。

* [cmake_book](https://ousttrue.github.io/cmake_book/)
* [rust練習帳](https://ousttrue.github.io/rust_exercise_book/)

あと、 `blender の addon 作成メモ` とか `Unity のカスタムエディターメモ` とか作るかも。

* [blender_book](https://ousttrue.github.io/bldner_book/)
* [unity memo](https://ousttrue.github.io/unity_book/)

# mdbook を gh-pages で初期化する手順

github に repository を作って gh-pages に公開するところまで

* new repository `https://github.com/GITHUB_USER_NAME/MDBOOK_REPOSITORY_NAME`
* git clone GIT_REPOSITORY
* cd GIT_REPOSITORY
* mdbook init

`book.toml`

```toml
[output.html]
site-url = "https://${USER_NAME}.github.io/${REPO_NAME}/"
git-repository-url = "https://github.com/${USER_NAME}/${REPO_NAME}/tree/master"
edit-url-template = "https://github.com/${USER_NAME}/${REPO_NAME}/edit/master/{path}"
```

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

初回にページが表示されるまで何回か push が要るかも。

* repo 作る
* gh-pages branch に push する
* 設定で gh-pages を有効にする
* 再度 push し action を発動させる。この辺でサイトが見れることを確認する

# 参考

<https://o296.com/e/mdbook_as_blog.html>

