---
Title: "Hugoのレイアウトとコンテントの関係"
date: 2017-05-22
Tags: ["hugo"]
---


概要

hugoコマンド実行時に以下のタスクが実行される
contentのmdファイルをsingle.htmlを使ってhtmlに変換する(1対1)
contentのサブフォルダをsectionと呼ぶ。sectionのサブフォルダはsectionにならない
sectionのindex.htmlをlist.htmlで生成する
topのindex.htmlをindex.htmlまたはlist.htmlで生成する(サイト全体で1)

         +-------+
         |layouts|
         +-------+
             |
             v
content -----+-------> public / (index.html or list.html) -> index.html
  + post                    + post / (list.html) -> index.html
    + 2017                    + 2017
      + 05                      + 05
        + article1.md             + article1 / (single.html) -> index.html
        + article2.md             + article2 / (single.html) -> index.html
        + article3.md             + article3 / (single.html) -> index.html

contentフォルダの構成

https://gohugo.io/overview/source-directory/#content-for-home-page-and-other-list-pages

個別記事(single content)のmdをhtmlに変換する

https://gohugo.io/templates/content/

個々のページをhtmlに変換(render)するときにどのTemplateを選択するのかについての説明が上記にある。
デフォルトは /themes/THEME/layouts/_default/single.htmlが使われる。
セクション毎にセクション内の記事のリスト(list content)のhtmlを生成する

https://gohugo.io/templates/list/

セクションページのhtmlを生成するときにどのTemplateを選択するのかについての説明が上記にある。
デフォルトは/themes/THEME/layouts/_default/list.htmlが使われる。
サイトトップのhtmlを生成する

https://gohugo.io/templates/homepage/

サイトトップのhtmlを生成するときにどのTemplateを選択するのかについての説明が上記にある。
以下の順に選択される。

/themes/THEME/layouts/index.html
/themes/THEME/layouts/_default/list.html
/themes/THEME/layouts/_default/single.html

