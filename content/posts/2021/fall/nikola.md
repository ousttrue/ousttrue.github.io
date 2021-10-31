+++
title = "nikola にしてみる"
date = 2021-10-16
tags = ["ssg"]
+++

また生成システムを変えてみる。

<https://getnikola.com/>

# init

```
> pip install "Nikola[extras]"
> nikola init .
```

<https://github.com/github/gitignore/blob/master/community/Python/Nikola.gitignore>
```.gitignore
# nikola
.doit.db*
*.pyc
/cache/
/output/
```

`conf.py`
```py
# とりあえず 
POSTS = (
    ("content/*.rst", "posts", "post.tmpl"),
    ("content/*.md", "posts", "post.tmpl"),
    ("content/*.txt", "posts", "post.tmpl"),
    ("content/*.html", "posts", "post.tmpl"),
)
```

```
> nikola auto --browser
```

なんとなくプレビューできた。
ええやん。

# zola から記事移植

`POSTS` のパス調整でもうできているのだけど、 `frontmatter` の非互換がある。
それを調べる。

<https://getnikola.com/handbook.html#metadata-fields>

* `taxonomies.tags` を `tags` に書き換える

小文字強制
```py
METADATA_VALUE_MAPPING = {
    "toml": {
        "tags": lambda ls: [x.lower() for x in ls]
     }
}
```
# github action で gh-pages

`.github/workflows/nikola.yml`

こんなもんかな。

```yml
name: Nikola

on:
  push:
    branches:
      - nikola

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      ACTIONS_ALLOW_UNSECURE_COMMANDS: true
    steps:
      - uses: actions/checkout@v1
      - run: pip install "Nikola[extras]"
      - name: build
        run: nikola build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./output

```

## 動作

<https://getnikola.com/internals.html>

## yapsy

<https://getnikola.com/extending.html>

`nikola/plugin_categories.py`

<http://yapsy.sourceforge.net/>

## build

[DoIt](https://pydoit.org/) で駆動されるらしい。

nikola は DoIt の task を生成する。

* <https://schettino72.wordpress.com/2008/04/14/doit-a-build-tool-tale/>
* [タスクランナー Doit を使ってみよう](https://qiita.com/iisaka51/items/052ffbd9ab3b12504228)

## Theme

* <https://getnikola.com/creating-a-theme.html>
* <https://getnikola.com/theming.html>
* [Nikola を windows でやるぞ 2](https://iuk.hateblo.jp/entry/2016/10/28/040908)


* `themes/custom` フォルダを作る
* `conf.py` の `THEME = "custom"`

最低限

| path                   | url | 必須   |                                                             |
|------------------------|-----|--------|-------------------------------------------------------------|
| bundles                |     | 必須   | 空ファイルでもOk。copy from nikola/data/themes/base/bundles |
| assets                 |     | option | copy from nikola/data/themes/base/assets                    |
| templates/index.tmpl   | /   | 必須   | top page                                                    |
| templates/post.tmpl    |     | 必須   | 各記事                                                      |
| templates/page.tmpl    |     | 必須   | 各記事                                                      |
| templates/list.tmpl    |     | 必須   | archive.html                                                |
| templates/archive.tmpl |     | 必須   | {YEARE}/ archive.html から 年別 リンクをたどったところ      |
| templates/tags.tmpl    |     | 必須   | categories/index.html                                       |
| templates/tag.tmpl     |     | 必須   | categories/{TAG_NAME}/index.html                            |
| templates/gallery.tmpl |     | 必須   |                                                             |
| templates/listing.tmpl |     | 必須   |                                                             |
| THEME_NAME.theme       |     | option | Theme meta files                                            |
| templates/base.tmpl    |     | option | すべての tmpl が継承することで一貫した見た目にする          |

### bundles and assets

`lib/python3.9/site-packages/nikola/data/themes/base` からコピーするとよさそう。

### base.tmpl

```html
<html>

<body>
    <h1 id="brand">
        <a href="{{ _link('root', None, lang) }}" title="{{ blog_title|e }}" rel="home">
            <span id="blog-title">{{ blog_title|e }}</span>
        </a>
    </h1>
    <hr>
    <main id="content">
        {% block content %}{% endblock %}
    </main>
</body>

</html>
```

### index.tmpl

```html
{% extends 'base.tmpl' %}

{% block content %}
{% if prevlink %}
<a href="{{ prevlink }}" rel="prev">prev</a>
{% endif %}

{% for post in posts %}
<h1 class="p-name entry-title">
    <a href="{{ post.permalink() }}" class="u-url">{{ post.title()|e }}</a>
</h1>
{% endfor %}

{% if nextlink %}
<a href="{{ nextlink }}" rel="next">next</a>
{% endif %}
{% endblock %}
```

### post.tmpl

```html
{% extends 'base.tmpl' %}

{% block content %}
<h1 class="p-name entry-title" itemprop="headline name">
    <a href="{{ post.permalink() }}" class="u-url">{{ post.title()|e}}</a>
</h1>
{{ post.text() }}
{% endblock %}
```

### THEME_NAME.theme

```
[Theme]
engine = jinja
```

## vscode

`settings.json`

```json
    "files.associations": {
        "*.tmpl": "html",
    },
```

## ToDo

* Theme 調整
* TOC
* syntax highlight
