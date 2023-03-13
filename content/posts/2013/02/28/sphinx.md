---
title: "sphinxも入れてみる"
date: 2013-02-28
tags: []
---

sphinx も入れてみる
Octopress のサブディレクトリに Sphinx を入れた。
今回のディレクトリ配置

```
work
  + octopress
    + Rakefile
    + _deploy
  + sphinx
    + Makefile
    + source
      + conf.py
    + build
  + sphihnx-to-github
    + setup.py
    + sphinxtogithub
      + __init__.py

octopressをメインにサブディレクトリにsphinxを導入してみる。
octopressの外のディレクトリで、
$ mkdir sphinx
$ cd sphinx
$ sphinx-quickstart

とした。 Makefileに
octopress: html
    rm -rf ../octopress/_deploy/sphinx
    cp -rp build/html ../octopress/_deploy/sphinx

と追記。 さらにoctopress/Rakefileを改造。
{% codeblock lang:ruby %} multitask :push do puts “## Deploying branch
to Github Pages “ (Dir[“#{deploy_dir}/*“]).each { |f| case f when
%r|.*/sphinx\$| # donothing puts “skip #{f}” else rm_rf(f) end } {%
endcodeblock %}
としてsphinxディレクトリをpush前にクリアしないようにした。
これでoctopressと共存できた。
次はsphinxの見た目の問題。
octopressと共存するので.nojekyllは使えないのでsphinx-to-githubを使う。
$ pip install -e git+git://github.com/michaeljones/sphinx-to-github.git#egg=sphinx-to-github

エラー
error import name setup

とかそんな感じのエラー(うろ覚え)。
いったんローカルにcloneして調べてみる。
$ git clone https://github.com/michaeljones/sphinx-to-github.git
$ cd sphinx-to-github
$ sudo python setup.py install

しばらく調べた結果、
python3でモジュールimportの仕様が変わったのが原因と理解。直した。
$ cd sphinx-to-github/sphinxtogithub
$ mv sphinxtogithub.py __init__.py
$ cd ..
$ sudo python setup.py install

sphinx/source/conf.pyに
extensions = ['sphinxtogithub']

と書いて
$ Make octopress
```

でできあがり。
