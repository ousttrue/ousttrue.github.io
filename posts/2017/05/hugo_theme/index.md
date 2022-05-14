---
title: "Hugoのテーマ作り"
date: 2017-05-05
tags: ["hugo"]
---

hugoの仕組みも気になることだし作ってみることにした。


Hugoのテーマを何個か作ったので知見をまとめてみる
https://gohugo.io/tutorials/creating-a-new-theme/

新しくテーマを作る
$ hugo new theme hoge

themes/hogeにテーマのテンプレートが作成される。
３つのテンプレート
layout/index.html
<!DOCTYPE html>
<html>
<body>
  {{- range first 10 .Data.Pages }}
    <h4><a href="{{ .Permalink }}">{{ .Title }}</a></h4>
  {{- end }}
</body>
</html>

layout/_default/single.html
<!DOCTYPE html>
<html>
<head>
  <title>{{ .Title }}</title>
</head>
<body>
  <h1>{{ .Title }}</h1>
  <h6>{{ .Date.Format "Mon, Jan 2, 2006" }}</h6>
  {{ .Content }}
  <h4><a href="{{ .Site.BaseURL }}">Home</a></h4>
</body>
</html>

layout/_default/list.html
<!DOCTYPE html>
<html>
<body>
  <h1>Articles</h1>
  {{- range first 10 .Data.Pages }}
    <h4><a href="{{ .Permalink }}">{{ .Title }}</a></h4>
  {{- end }}
  <h4><a href="{{ .Site.BaseURL }}">Home</a></h4>
</body>
</html>

partial導入
layout/_default/header.html
layout/_default/footer.html
bootstrap

http://getbootstrap.com/

2column
sticky-footer
tags

http://text.baldanders.info/hugo/section/
http://text.baldanders.info/hugo/categories-and-tags-list/

付ける
frontmatterに
tags = ["hugo"]

のように書く。よくわからないがアルファベットの大文字は避けた方がよさげ。マルチバイト文字はOKぽい。
single
.Params.tagsに格納されているので以下のようにして使う
{{ range .Params.tags }}
<a href="/tags/{{ . | urlize }}/">{{ . }}</a>
{{ end }}

list
.Data.Pagesを列挙して中から取り出せる
{{ range .Data.Pages }}
    <hr>
    {{ range .Params.tags }}
    <a href="/tags/{{ . | urlize }}/">{{ . }}</a>
    {{ end }}
{{ end}}

サイトのタグ一覧

Hugoでwebサイト構築(12) タグの列挙
https://gohugo.io/taxonomies/ordering/

{{ range $name, $value := $.Site.Taxonomies.Alphabetical }}
    <li>
        <a href="{{ $.Site.BaseURL }}/tags/{{ $name }}/">
        <div><span class="badge">{{ .Count }}</span>{{ $name }}</div>
        </a>
    </li>
{{ end }}

pagination

http://wdkk.co.jp/note/2015/0915-hugo-pagination/
https://gohugo.io/extras/pagination/

more

https://gohugo.io/content/summaries/

目次

https://gohugo.io/extras/toc/

syntax highlight

https://gohugo.io/extras/highlighting/

prev/next

http://qiita.com/y_hokkey/items/f9d8b66b3770a82d4c1c#%E5%89%8D%E3%81%AE%E8%A8%98%E4%BA%8B%E6%AC%A1%E3%81%AE%E8%A8%98%E4%BA%8B%E3%81%B8%E3%81%AE%E3%83%8A%E3%83%93%E3%82%B2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3

作業中
あまりかっこよくならんね…。
とりあえず読めるようにはなってきた。
まぁ、見易さ優先で。
