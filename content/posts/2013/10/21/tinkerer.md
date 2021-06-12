---
title: "Tinkererに引越し"
date: 2013-10-21
Tags: []
---

Tinkererに引越し
Octpressが手に負えなくなってきたので手軽に使えそうな
tinkererに引越しというかシステムを変更することにした。

http://tinkerer.me/index.html

以下作業手順メモ。
tinkererインストール
> python --version
Python 3.3.0
> easy_install tinkerer

サイト生成
> mkdir pages_src
pages_src> tinkerer --setup
pages_src> gvim conf.py

記事生成
pages_src> tinkerer --post "tinkerer"

2013/10/21/tinkerer.rstが生成されるとともにmaster.rstのtoctreeに記事が追加される。
categoriesとtagsの違いが良くわからん。
pages_src> gvim 2013/10/21/tinkerer.rst

html生成
pages_src> tinkerer --build

github転送
既存のgithub-pages(user)があるのでそこれに送ってみる。
> mkdir pages_dst
> cd pages_dst
pages_dst> git init
pages_dst> git remote add origin url
pages_dst> cp -r ../pages_src/blog/html/* .
pages_dst> echo "" > .nogekyll
pages_dst> git add .
pages_dst> git commit -m init

上書き。
pages_dst> git push origin master --force

_ではじまるパスが見えない件
最初sphinxtogithubというので修正したのだけど、
よく見たらtinkerのサイトに書いてあった。
http://tinkerer.me/exts/withgithub.html
extensions = [
'tinkerer.ext.blog', 'tinkerer.ext.disqus', 'withgithub',
]

しかし404になるな・・・
https://help.github.com/articles/files-that-start-with-an-underscore-are-missing
.nogekyllがtypoしとった。-> .nojekyll
生成したファイルをローカルで開くとやたら時間がかかる件

C:/Python33/Lib/site-packages/tinkerer-1.2.1-py3.3.egg/tinkerer/themes/boilerplate/layout.html

の
”//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js” を
“http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js“
に変えた。
smb://ajax.googleapis.comとかにアクセスしてるような気がするw
Octpressの記事を移植する
pythonでpandocを呼び出して*.markdownから*.rstに変換した。
完了
とりあえず移行作業完了。
なんだかんだでoctopressはブラックボックスだったので、
sphinxベースのtinkererの方がわかる(sphinxの方が慣れている)。
octopressではjekyllを良く知らずに使っていたのと、pushするときのタスクがgitをごにょごにょやっているのがよくわからんかった。
いずれにしろ、hatenaの時が日記を一番よく書いていたので自前システムはメンテナンスコストが馬鹿にならんと思った。
中身に入る前にシステムのメンテナンスで力尽きる。
