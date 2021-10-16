---
title: "Boost.GIL再学習"
date: 2013-03-02
taxonomies: {tags: []}
---

Boost.GIL再学習
Boost.GILを再学習。
{% include_code boost gil practice lang:cpp gil_practice.cpp %}
前半はオレオレImageクラスの記述で画像の読み書きにboost/gil/extension/ioを使うのを避けるために用意した。boost.gilのioはlibpng,
ligjpegとのリンクが必要になるのでWindowsではめんどくさすぎる。実戦では、QImageとかcv::Matrixといった組み込むアプリの持つ画像クラスと組み合わせて使うことが想定されるので既存の画像からviewを作るやり方を使った。
{% img /images/gil_practice.png “ImageA” %}
こんな感じでbitblt的な処理などを簡単に記述できる。
memo

https://sites.google.com/site/twinkleofsilence/japanese-translation-of-gil-tutorial
http://stlab.adobe.com/gil/html/group___image_view_algorithm.html

octopress

http://octopress.org/docs/plugins/image-tag/
http://octopress.org/docs/blogging/code/

