---
title: "hugoでmapを使ってpartialに追加の変数を渡す"
date: 2017-05-14
tags: ["hugo"]
---

hugo の range 内の partial から.Site にアクセスできなくて困ったので、代替する方法を探した。

こんな感じ。
config.toml で Site.Params.tagicons を定義。

```toml
[Params.tagicons]
python = "icon-python"
tinkerer = "icon-python"
gulp = "icon-gulp"
ruby = "icon-ruby"
heroku = "icon-heroku"
```

partial 呼び出し。

```
{{ range .Params.tags }}
    {{ partial "tags.html" (dict "tag" . "icons" $.Site.Params.tagicons) }}
{{ end }}
```

partial で使う。

```
<i class="{{ index .icons .tag }}" aria-hidden="true"></i>
{{ .tag }}
```

http://gohugo.io/templates/functions/#dict
