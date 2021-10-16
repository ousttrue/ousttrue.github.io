+++
title = "サイトジェネレーターを Zola に変更"
date = 2021-06-12
tags = ["zola", "rust", "ssg"]
+++

最近、 rust を再開したので、
`Static Site Generator` を go 製の hugo から rust 製の zola に変更してみた。

<https://www.getzola.org/>

# hugo のからの引っ越し

## zola インストール

## 初期化

## config.toml を hugo 版から zola 版に書き換える。

最低限 base_url。

## プレビューしてみる

```
$ zola serve
```

一部の記事でエラーが出る。

```
Reason: There is a link that is missing a URL
```

どの記事がまずいかはわかるが、何行目とか場所はわからないのかしら。
適当になおす。

```
$ zola check
```

の方がデバッグ向け。
いくつかなおしたら、エラーは出なくなった。

# テンプレートを用意する

https://www.getzola.org/documentation/getting-started/overview/

に従って基本的なテンプレートを作成。
index.html, section.html, page.html の3種類のテンプレートがサーチされる。
section.html と page.html は、section のフロントマター、 `template`, `page_template` で変更できる。

# zola の content 構成

section(フォルダ) に page が所属するという構成みたい。
section とうのは単なるフォルダではなくて、folder/index.md もしくは folder/_index.md をさす。

* root => index.html
    * section
        * _index.md (セクションになる) => section.html
        * page1.md => page.html
        * page2.md => page.html
        * subsection (_index.md が無いのでセクションでは無い) => レンダリングされない
            * page3.md (orphan page) => page.html
            * page4.md (orphan page) => page.html

セクションに所属しない page は orphan page となり、 `section.pages` のように列挙することができなくなる。
すべてのフォルダに `_index.md` を配置してセクション化するという設計思想のようだ。

セクションが木構造になっていて、page が leaf になる。

* section
    * subsections
    * pages

が再帰的に続く。

## zola を改造してみた。

orphan page が section.pages に入るようになる。
https://github.com/ousttrue/zola/commit/7842d0b2d05eb15400dbe20b20791b57af077de1

# zola 設定 config.toml
https://www.getzola.org/documentation/getting-started/configuration/

# Tera テンプレート
https://tera.netlify.app/docs

## extends
別ファイルを部分的に override する
https://tera.netlify.app/docs/#inheritance

## include
別ファイルの部品を読み込む
https://tera.netlify.app/docs/#include

## date format
https://tera.netlify.app/docs/#include

# とりあえずメンテナンス中・・・

hugo に比べて template の構成がシンプルでわかりやすいような気がする
(hugo に慣れているせいかもしれない)。
そもそも hugo の時点でちゃんと管理してなかったので、
ぼちぼち続きをやる。
