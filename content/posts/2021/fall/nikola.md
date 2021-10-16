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
