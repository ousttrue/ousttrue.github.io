+++
title = "サイトジェネレーターを Zola に変更"
date = 2021-06-12
taxonomies.tags = ["zola", "rust"]
+++

最近、 rust を再開したので、
`Static Site Generator` を go 製の hugo から rust 製の zola に変更してみた。

https://www.getzola.org/

## hugo のからの引っ越し手順

### config.toml を hugo 版から zola 版に書き換える。

base_url だけ設定すれば十分。

### プレビューしてみる

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

### テンプレートを用意する

https://www.getzola.org/documentation/getting-started/overview/

に従って基本的なテンプレートを作成。

content のフォルダ構成が

* section
    * _index.md (セクションになる)
    * page1.md
    * page2.md
    * subsection
        * page3.md (orphan page)
        * page4.md (orphan page)

すべてのフォルダに `_index.md` を配置してセクション化するという設計思想のようだ。

zola を改造してみた。

https://github.com/ousttrue/zola/commit/7842d0b2d05eb15400dbe20b20791b57af077de1

これで hugo からの最低限の引っ越しができた。
css とか整備する。

## zola 感想

hugo に比べて template の構成がシンプルですぐに理解できた。
プログラムも git clone してデバッガをアタッチしたら動きがだいたいわかった。
[Tera](https://tera.netlify.app/docs/) も使い方を覚えておけば、
rust でコード生成するときに役立てられそうである。

テンプレートの作り込みに進む。
