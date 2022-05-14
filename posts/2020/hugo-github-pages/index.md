---
title: "Github Pages の種類"
date: 2020-07-20T22:50:17+09:00
tags: ["hugo", "ssg"]
---

https://docs.github.com/ja/github/working-with-github-pages/about-github-pages

## プロジェクトサイト (gh-pages)

各プロジェクトに作れる。

URLは、`http(s)://<user>.github.io/<repository>`

各リポジトリの、 `gh-pages` ブランチでサイトをホストする。
hugo で運用するなら、
`master` ブランチに hugo project を commit する。
hugo のビルド結果を `gh-pages` に commit する。
手間を省くために `master` への push をトリガーに `travis-CI` 等で自動でビルドして、結果を gh-pages に push する。

```yml
# .travis.yml
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN  # Set in the settings page of your repository, as a secure variable
  keep_history: true
  target_branch: gh-pages # default
  local-dir: public
  on:
    branch: master # master branch が push されたのをトリガーに public フォルダを gh-pages ブランチに pushする
```

## ユーザーサイト

ユーザー毎にひとつだけ作ることのできるリポジトリ。

URLは、`http(s)://<user>.github.io` 。

これ、`gh-pages` と URL が重複するときがありそうな。

repository `${user_name}.github.io` の場合 `master` が `gh-pages` の役割を果たす。
この名前にすると、サイトをホストする用の特殊なリポジトリになる様子。

hugo で運用するなら `gh-pages` ブランチ運用と逆になる。

```yml
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN  # Set in the settings page of your repository, as a secure variable
  keep_history: true
  target_branch: master
  local_dir: public
  on:
    branch: hugo # hugo branch が push されたのをトリガーに public フォルダを master ブランチにpushする
```

default branch を hugo の方に変えてから、git clone すると作業しやすい。
