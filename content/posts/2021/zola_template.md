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

## 20210725: 画像を入れれるようにしてみた

`page.assets` や `section.assets` に想定した形で入ってこないので、
無理やりパスを操作したのだが、さすがにこれはちょっと・・・

```html
  {% if page.extra.image %}
  {% set s = page.relative_path | split(pat="/") %}
  {% set len = s | length %}
  {% set sl = s | slice(start=0, end=len-1) %}
  {% set j = sl | join(sep="/") %}
  {% set image_url = resize_image(path=j ~ "/" ~ page.extra.image, width=600, op="fit_width") %}
  <img src="{{ image_url }}"">
  {% endif %}
```

なんか、 `zola` がわりと融通が利かないことが分かってきた。
`resize_image` で明示的に画像を加工するという設計は理解。なるほど。
当方、 `md` ファイルと同じフォルダに `png, jpg` を放り込んでそれを記事内で使いたいのです。
画像を中央の `static` フォルダにまとめて入れておくの嫌なので。
改造して page.assets に放り込んでしまおう。

`hugo` ほど多機能複雑でなく、 `zola` ほど strict でない、そんなほどほどなツールが望まれる。
