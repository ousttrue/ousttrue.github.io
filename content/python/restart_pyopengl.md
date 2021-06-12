---
Title: "pyopengl"
date: 2019-08-24
taxonomies: {tags: ["python", "opengl"]}
---

久しぶりのpyopengl

## PyOpenGL

長らく、python で OpenGL してなかったのだけど再開。
最近のpythonであれば、型Annotationを活用していい感じできるような気がしたやってみる。

### glglue

* https://github.com/ousttrue/glglue
* http://pypi.python.org/pypi/glglue/
* [PyOpenGLするGUI選びと描画とGUIの分離](https://qiita.com/ousttrue/items/07d2a06ab7e3fedf731a)

ついでなので、glglue をメンテナンスしてみた。
twine 使った。なるほど。

CreateWindow と OnMouseDown 等はこれに任せた。

### glBufferDataで躓いた

* [PyOpenGLで描画。VBO周りの混乱](https://qiita.com/ousttrue/items/e343baabdbdd6b7891c4)
* [PyOpenGLのglBufferDataにはどんなデータが渡せるのか](/posts/glbufferdata)
* [pyOpenGLのglBufferData](https://qiita.com/ousttrue/items/44a119e62aea1f12c5af)

調べ直して、記事をメンテナンスした。
結局のところ、 `bytes` か `ctypes` が使える。
