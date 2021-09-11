+++
title = "sphinx + MyST よいのでは"
date = 2021-09-11
taxonomies.tags = ["ssg", "sphinx"]
+++

Gizmo を作る過程で GeometryShader からやりなおしていたら、記憶が飛んでいたので
忘れてもいいように記録しておくことにした。

旧 `MinTriangle` リポジトリを作り直し。

<http://ousttrue.github.io/d3d11_samples/>

# MyST なかなかよい

`reStructuredText` わりと苦手なので `sphinx` でも Markdown を使いたい派なのだが、
[MyST](https://myst-parser.readthedocs.io/en/latest/index.html) なる Sphinx 向け markdown 拡張ができていた。

* [Sphinx で使える Markdown 方言 'MyST'](https://qiita.com/Tachy_Pochy/items/53866eea43d0ad93ea1d)

sphinx directive の指定の仕方がシンプルで下のような感じ。markdown のシンタックスハイライトやフォーマッターに乗れるのでよい。

<pre>
```{image} ./basic_pipeline.jpg
:width: 320px
:height: 320px
```

```{toctree}
basic/create_window
basic/create_device
basic/create_swapchain
basic/render_target
basic/compile_shader
basic/basic_pipeline
```
</pre>

`sphinx-autobuild` と github-actions による `gh-pages` デプロイを仕込んだらかなりよくなった。

# memo

* <https://github.com/wpilibsuite/sphinxext-remoteliteralinclude>

git の revision と path 指定して include できないかしら。
サンプルコードにちょこちょこっと解説を書きたいのだが、サンプルコードが進化する場合に `literalinclude` だと場所がずれるのだ。
