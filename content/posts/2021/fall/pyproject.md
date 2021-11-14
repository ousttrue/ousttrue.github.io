+++
title = "最近のpythonパッケージングとpyproject.toml"
date = 2021-11-15
tags = ["python"]
+++

# 最近の python ライブラリのパッケージング手法を調査

最近の python package の記述の仕方で、 `pyproject.toml` なる作法があるのでメモ。

元々、 `setup.py` や `setup.cfg` で記述していたのだけどこれに変わるものらしい。
`setup.py` はともかく `setup.cfg` が大変分かりにくいと思っていました。
というか、何か調べにくい。
`setup.py` を宣言的に書けるよ、詳しくは `setup.py` のリファンンスを見て。みたいになっているのだけど、
書き方がよくわからんことが多かった。

## pyproject.toml

* (2019)[pyproject.toml とは何か](https://tech.515hikaru.net/post/2019-11-23-pyproject/)

> pyproject.toml は Node.js の package.json などのように、そのプロジェクトに関する様々なことを定義できるファイルとして存在しています

なるほど。

* (2019)[pip が 19.02 で pyproject.toml から pip install できるようになった](https://orolog.hatenablog.jp/entry/2019/03/24/223531)

## pyproject の build-system

* (2019)<https://engineer.recruit-lifestyle.co.jp/techblog/2019-12-25-python-packaging-specs/>

### setuptools

```toml
[build-system]
requires = [
    "setuptools>=42",
    "wheel"
]
build-backend = "setuptools.build_meta"
```

* <https://packaging.python.org/tutorials/packaging-projects/#creating-pyproject-toml>
* (2021)[PyPIパッケージのリリースもバージョニングもGitHub単独で完結させる](https://zenn.dev/detsu/articles/5d74bf72e96a0f)

```toml
[build-system]
requires = ["setuptools>=45", "wheel", "setuptools_scm>=6.2"]
```

なるほど。
`setup.cfg` と `pyproject.toml` の役割が被っていると思うのだが両方要るのだろうか。

* (2021)[PyPIにパッケージを公開する手順の整理](https://hirayarn.hatenablog.com/entry/2021/11/08/214053)

`pyproject.toml` には `build-backend` の指定だけを記述して、 `setup.cfg` と併用するということでよさそう。

### poetry

```
[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"
```

* (2019)<https://rcmdnk.com/blog/2019/02/04/computer-python/>
* (2018)[Poetryを使ったPythonパッケージ開発からPyPI公開まで](https://kk6.hateblo.jp/entry/2018/12/20/124151)

## 練習

<https://github.com/ousttrue/glglue> に使ってみる。
結局、 `setup.cfg` を使っているのとあまり変わらず。
`setuptools_scm` による git tag を `version` 化する技を覚えた。
あと、`github actions`。
そのうち、 `setup.cfg` の内容を `pyproject.toml` に書けるようになりそうではある。

