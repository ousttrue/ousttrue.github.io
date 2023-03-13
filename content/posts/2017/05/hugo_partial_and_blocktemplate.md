---
title: "PartialとBlockTemplate"
date: 2017-05-23
tags: ["hugo"]
---

ページを部品に分解する Partial と BlockTemplate について。

PartialTemplate

https://gohugo.io/templates/partials/

layouts/\_default/single.html

```html
<html>
  {{ partial "head.html" . }}
  <body>
    {{ partial "header.html" . }} {{ .Content }} {{ partial "footer.html" . }}
  </body>
</html>
```

のように一部を部品で置き換える。

layouts/partials/head.html
layouts/partials/header.html
layouts/partials/footer.html

BlockTemplate

https://gohugo.io/templates/blocks/

layouts/\_default/single.html

```
{{ define "title" }}
  {{ .Title }} &ndash; {{ .Site.Title }}
{{ end }}

{{ define "main" }}
  {{ .Content }}
{{ end }}
```

のように自分が部品になる。
デフォルトでブロックテンプレート\_default/baseof.html が選択される。

```
<html>
<head>
<title>{{ block "title" . }}
  <!-- Blocks may include default content. -->
  {{ .Site.Title }}
{{ end }}</title>
</head>
<body>
{{ block "main" . }}
<!-- The part of the page that begins to differ between templates -->
{{ end }}
</body>
```

Partial よりも BlockTemplate の方がきれいに分割できる気がするね。実際には両方使う。
