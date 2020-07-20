---
Title: "hugoで作ったサイトにSphinxを埋めこむ"
Published: 2017-9-16
Tags: []
---

MarkdownできるらしいのでSphinxを入れてみる。


テストページ

Sphinx install
pyenvでpython-3.6.2を導入した。
$ pyenv global 3.6.2
$ python -V
Python 3.6.2
$ pip install sphinx


http://www.sphinx-doc.org/en/stable/markdown.html

ドキュメントを作ってみる

project_name
author_name
version

は必須で作る時に決めなければならない。
$ sphinx-quickstart

いろいろ質問が出てくるが面倒なのでリターン連打。
ウイザード方式ではなくコマンドラインで一息に入力する方式だとこんな感じか。
$ sphinx-quickstart -q -p project_name -a author_name -v 1.0 --sep directory_name
Creating file directory_name↲/source/conf.py.
Creating file directory_name↲/source/index.rst.
Creating file directory_name↲/Makefile.
Creating file directory_name↲/make.bat.

Finished: An initial directory structure has been created.

You should now populate your master file directory_name↲/source/index.rst and create other documentation
source files. Use the Makefile to build the docs, like so:
   make builder
   where "builder" is one of the supported builders, e.g. html, latex or linkcheck.

ディレクトリ構成はこんな感じに。
directory_name
    + souce
        + conf.py
        + index.rst
    + Makefile
    + build
        + html # make htmlの出力

hugoのサブフォルダにビルド結果をコピーする
hugoroot
    + sphinxroot
        + build
            +html
    + public
        sphinx # ../sphinxroot/build/html/*をコピーする

hugosite$ sphinx-quickstart -q -p project_name -a author_name -v 1.0 --sep sphinxroot
hugosite$ hugo
hugosite$ pushd shphinxroot
hugosite/sphinxroot$ make html
hugosite/sphinxroot$ rsync -av build/html ../public/sphinx
sending incremental file list
created directory ../public/sphinx
html/
html/.buildinfo
html/genindex.html
html/index.html
html/objects.inv
html/search.html
html/searchindex.js
html/_sources/
html/_sources/index.rst.txt
html/_static/
html/_static/ajax-loader.gif
html/_static/alabaster.css
html/_static/basic.css
html/_static/comment-bright.png
html/_static/comment-close.png
html/_static/comment.png
html/_static/custom.css
html/_static/doctools.js
html/_static/down-pressed.png
html/_static/down.png
html/_static/file.png
html/_static/jquery-3.1.0.js
html/_static/jquery.js
html/_static/minus.png
html/_static/plus.png
html/_static/pygments.css
html/_static/searchtools.js
html/_static/underscore-1.3.1.js
html/_static/underscore.js
html/_static/up-pressed.png
html/_static/up.png
html/_static/websupport.js
hugosite/sphinxroot$ popd

rsyncの呼び方変更。ソースの指定の最後を/にすることでディレクトリそのものではなく中身を送る意味になる。
$ rsync -av build/html/ ../public/sphinx
sending incremental file list
created directory ../public/sphinx
./
.buildinfo
genindex.html
index.html
objects.inv
search.html
searchindex.js
_sources/
_sources/index.rst.txt
_static/
_static/ajax-loader.gif
_static/alabaster.css
_static/basic.css
_static/comment-bright.png
_static/comment-close.png
_static/comment.png
_static/custom.css
_static/doctools.js
_static/down-pressed.png
_static/down.png
_static/file.png
_static/jquery-3.1.0.js
_static/jquery.js
_static/minus.png
_static/plus.png
_static/pygments.css
_static/searchtools.js
_static/underscore-1.3.1.js
_static/underscore.js
_static/up-pressed.png
_static/up.png
_static/websupport.js

hugosite/public$ python -m http.server

http://localhost:8000/sphinx/
で生成したサイトが表示できた。
livereloadで自動更新サーバー

Python Livereload を使って Sphinx でドキュメントを書く
https://pypi.python.org/pypi/livereload

#!/usr/bin/env python
import os

os.system('make html')

from livereload import Server, shell

server = Server()
server.watch('source/**/*.rst', shell('make html'))
server.watch('source/**/*.md', shell('make html'))
server.serve(
        open_url=False,
        root='build/html',
        port=8080,
        host='0.0.0.0'
        )

markdownを使う

Markdownを使う
http://www.sphinx-doc.org/en/stable/markdown.html

ImportError: cannot import name DocParser


SphinxでMarkdownを使うときに注意すること

バージョン固定
いろいろエラーが出る。
TypeError: 'NoneType' object is not callable


documented that 1.6 breaks recommonmark
Sphinx 1.5.x was the last working version for recommonmark 0.4.0

$ pip install recommonmark==0.4.0
$ pip install sphix==1.5

1.5にすると・・・
AttributeError: module 'locale' has no attribute 'normalize'

localeがsphinx.localeで置き換えられとる。
仕方ないので
強制的に再インポートするコードを入れた。
site-packages/sphinx/__init__.py
def main(argv=sys.argv):
    # reimport locale
    if 'locale' in sys.modules:
        del sys.modules['locale']
    if sys.path[0].find('sphinx')!=-1:↲
        head=sys.path.pop(0)↲
    import locale↲

    if sys.argv[1:2] == ['-M']:↲
        sys.exit(make_main(argv))↲
    else:↲
        sys.exit(build_main(argv))↲

とりあえず動くようになった。ぐぬぬ・・・
TOC
AutoStructifyでできると書いてあるがバージョンを0.4.0に固定したからかうまく動かぬ。
eval_rstで。
'''eval_rst
.. toctree::

   item
'''

エラー
TOCツリーにこの指定を入れるとエラーになる
.. toctree::
   :caption: Contents:↲

themeを変える

見やすいテーマを設定する

日本語

日本語セクションにアンカーが貼られるようにする

github
.nojekyllでいいらしいがうまくいかなかったので。

https://github.com/michaeljones/sphinx-to-github

python3だと修正が要る。python2では試していない。
