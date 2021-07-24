+++
title = "zola のテンプレートを整備する"
date = 2021-06-14
taxonomies.tags = ["zola", "css"]
+++

サイト整備のメモ。共通化して部品を少なくした。

* zola 設定
* template 構築
* 場合によっては zola の改造

## Index

## 共通

* [x] title
* [x] 日付
* [x] 見出しの見た目

## Markdown

* [x] url 文字列を自動でリンクにしたい。markdownで `<url>` と記述するべし

## 20210716: masonry 入れてみた

<https://masonry.desandro.com/>

## 20210717: TOC

* [x] 目次
だいたいできた。
github が増えすぎてカオスなので不要なものを整理せねば・・・

## 20210725: 色

作業用に区域ごとに色分けしていたのをやめて、地味な色に変更。

```scss
@mixin MAIN_COLOR {
    color: black;
    background-color white;
}
```

のような方法を試してみた。

## 20210725: TOC 固定

```css
position: fixed;
```
