+++
title = "SSGをABlogに変更"
date = 2021-12-20
tags = ["python", "ssg", "sphinx"]
+++

# ABlog にシステムを変更

[nikola](https://getnikola.com/) は使いこなせなくて短命に終わってしまった。
[doit](https://pydoit.org/) は面白いと思うのだが。

ということで、 `sphinx` プラグインの [ABlog](https://ablog.readthedocs.io/en/latest/) です。

## はまり1: Sphinx のキャッシュ

`python -m sphinx content build` にデバッガをアタッチして試行錯誤するのだけど、
キャッシュされて処理されなかった。

`python -m sphinx content build -E -v` とする。

* -E: 全処理(キャッシュを使わない)
* -v: 詳細メッセージ

## はまり2: ablog が timezone の有無で日付の比較に失敗する

```
can't compare offset-naive and offset-aware datetimes
```

これは、既存記事の `frontmatter` の日付に `timezone` が付いていると
日付の比較に失敗する。

```python
# site-packages/ablog/blog.py:382
self.date = date = info["date"].replace(tzinfo=None)
```

と対処した。

## はまり3: myst-parser の toml frontmatter 対応

`myst-parser` が `---` による `yaml` 形式の `frontmatter` にしか対応していない様子。
[hugo の frontmatter](https://gohugo.io/content-management/front-matter/) にある `toml` 様式に対応するべく改造したい。

### 切り出し

どこで処理しているのか探索が難航した。

`site-packages/mdit_py_plugins/front_matter/index.py`
で処理している。

### Parse

`site-packages/myst_parser/docutils_renderer.py`

`render_front_matter` で切り出した文字列を `yaml` でパースしている。
`except` 節で `toml` にリトライさせたら動いた。

## モンキーパッチ

とりあえず `conf.py` にて直接修正する。

<https://github.com/ousttrue/ousttrue.github.io/blob/ablog/content/patch.py>

後で PR 送ったりできるかな。

## ABlog は何をしているのか

特定の条件で、記事をブログ記事と見做して `toctree` 無しで辿れるようにする。
記事は、日付やタグでグループ化してくれる。

<https://ablog.readthedocs.io/en/latest/manual/posting-and-listing/#posting-with-page-front-matter>

パス指定。

```python
blog_post_pattern = "posts/**/*.md"
```

条件。

```python
# .venv/lib/python3.9/site-packages/ablog/post.py
        if "blogpost" not in metadata and self.env.docname not in self.config.matched_blog_posts:
            return None
```

`frontmatter` 等から最低限、日付の情報がとれないとトップページから辿る方法が無い状態になる。

あと `sphinx` なのでトップレベルの表題が本文側に必要かも。
`frontmatter` の `title` を反映できると便利そう。

## ToDo

### タグが変
### 日付のフォーマット

### 記事のURL

* https://zenn.dev/attakei/articles/sphinx-make-dirhtml

## 参考

* [Sphinxでブログをしてみよう](https://water2litter.net/pisco/doc/ablog.html)

