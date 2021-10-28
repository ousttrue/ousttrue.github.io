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

```
bundles
templates/archive.tmpl
templates/gallery.tmpl
templates/index.tmpl
templates/list.tmpl
templates/listing.tmpl
templates/page.tmpl
templates/post.tmpl
templates/tag.tmpl
templates/tags.tmpl
```

## ToDo

* Theme 調整
* TOC
