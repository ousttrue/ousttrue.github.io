+++
date = 2019-04-18T00:00:00+09:00
tags = ['python']
title = '静的サイト生成器 MoldStamp'
+++

ディスククラッシュで `hugo` の管理リポジトリがロストしたので、
新しく自分で作ってみることにした。

[moldstamp](https://github.com/ousttrue/moldstamp) と名付ける。

途中まで作ってみた感じだとサイトの構成面に関しては、既存のツールを使うより自作した方がはるかに簡単。ファイルが変換される法則とか、それをカスタマイズする方法をgoogle先生に聞くのではなく自分で作るだけなので。当然、機能は少ないし見た目はしょぼいのだけど、必要最低限を満たすのは難しくなかったり。

以下、開発メモ

## 記事

### 🤔 フォルダ構成

検討中

src

* root
    * articles
        * xxx.md: htmlに変換してコピー
        * xxx.jpg,png: など。そのままコピー
    * templates
        * index.html: jinja2 temlate
        * article.html: jinja2 temlate

dst

* github.io
    * /index.html
    * /post/xxx.html

### 🌝 Frontmatter
hugo風にtomlで。

```toml
+++
date = "2012-04-06"
tags = ['nvim', 'python']
+++
```

### 🔨 draftの扱い

### 🔨 各tag毎の記事一覧

### 🔨 各記事の同じタグの記事へのリンク

### 🔨 next, prev

## markdown

### 🔨 ライブラリ入れ替え？

`makdown2` から `markdown` へ。

### 🔨 link-pattern

* https://github.com/trentm/python-markdown2/wiki/link-patterns

わりと誤判定する。

* https://docs.python.org/ja/3/library/html.parser.html

で作り直す

### 🌝 toc


### 🌝 syntax highlight
pygmentsを使う

* 🌝 markdownのコード部分をシンタックスハイライトする
* 🌝 cssを生成する

## jinja2

* 🌝 index
* 🌝 article

### 🔨 inheritance

ヘッダとフッタを分離するなど

* http://jinja.pocoo.org/docs/2.10/templates/#template-inheritance

## css

### 🔨 h1, h2, h3...

### 🔨 引用

### 🔨 ul, li
インデントが深すぎる

## local server
### 🌝 livereload
ローカル実験用のlivereload server

### 🔨 livereload 無変換のファイル(jpgなど)

### 🔨 livereload pygmentsの生成ファイル(css)

