+++
title = "Zola に変更"
date = 2021-06-12
+++

最近、 rust を再開したので、
サイト生成システムを hugo から rust 製の zola に変更してみる。

## hugo のからの引っ越し手順

### config.toml を hugo 版から zola 版に書き換える。

base_url だけ。

### プレビューしてみる

```
$ zola check
```

一部の記事でエラーが出る。

```
Reason: There is a link that is missing a URL
```

どの記事がまずいかはわかるが、何行目とか場所はわからないのかしら。
適当になおす。
いくつかなおしたら、エラーは出なくなった。

### テンプレートを用意する

https://www.getzola.org/documentation/getting-started/overview/

に従って基本的なテンプレートを作成。

記事が

* section
    * page1.md
    * page2.md

ではなく、

* section
    * subsection
        * page1.md
        * page2.md

のように階層があるので、

```html
  {% for page in section.subsections %}
  <li><a href="{{ page.permalink | safe }}">{{ page.title }}</a></li>
  {% endfor %}
```

では列挙できない。調べる。

これは、

```
$ zola check
```

の

```
Orphan page
```

の問題。
正攻法は、すべてのフォルダに `_index.md` を配置してセクション化することのようだが・・・

常に、 `transparent` になるようにすることで subfolder を拾うようにできるようだ。
