---
title: "Markdown形式メモ"
date: 2013-03-08
Tags: []
---

Markdown形式メモ
Octopressの記述形式であるMarkDown。
githubのREADME.mdの書式でもあるのでちゃんとマスターすべくメモする。
よく使うものを抜粋。
ローカルでプレビューする
Octopressの場合は付属しているので要らないがgithub向けにローカルのレンダリングサーバを導入する。
https://github.com/metaphysiks/moo
以下のようにインストールした。 \$ pip install flask \$ pip install
misaka \$ pip install pygments \$ pip install moo
$ moo README.md

と起動してでブラウズする。
もとのファイルを更新すると自動リロードされた。
REST apiで停止するスクリプト
#!/usr/bin/env python

import httplib2
http_client = httplib2.Http()
http_client.request("http://localhost:5000", "DELETE")

h1
# h1

もしくは h1 =====
h2
## h2

もしくは h2 —-
pre/codeblock
// 4spaceでインデント
int main()
{
}

link
URL直接 http://host/path/to/url タイトル付き This
link
image
参考

http://blog.2310.net/archives/6

