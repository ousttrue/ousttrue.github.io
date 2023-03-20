"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7214],{9329:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var l=t(1151),r=t(7294);function a(e){const n=Object.assign({p:"p",a:"a",ul:"ul",li:"li",strong:"strong",h1:"h1"},(0,l.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.p,null,"MarkdownできるらしいのでSphinxを入れてみる。"),"\n",r.createElement(n.p,null,"テストページ"),"\n",r.createElement(n.p,null,"Sphinx install\npyenvでpython-3.6.2を導入した。\n$ pyenv global 3.6.2\n$ python -V\nPython 3.6.2\n$ pip install sphinx"),"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"http://www.sphinx-doc.org/en/stable/markdown.html"},"http://www.sphinx-doc.org/en/stable/markdown.html")),"\n",r.createElement(n.p,null,"ドキュメントを作ってみる"),"\n",r.createElement(n.p,null,"project_name\nauthor_name\nversion"),"\n",r.createElement(n.p,null,"は必須で作る時に決めなければならない。\n$ sphinx-quickstart"),"\n",r.createElement(n.p,null,"いろいろ質問が出てくるが面倒なのでリターン連打。\nウイザード方式ではなくコマンドラインで一息に入力する方式だとこんな感じか。\n$ sphinx-quickstart -q -p project_name -a author_name -v 1.0 --sep directory_name\nCreating file directory_name↲/source/conf.py.\nCreating file directory_name↲/source/index.rst.\nCreating file directory_name↲/Makefile.\nCreating file directory_name↲/make.bat."),"\n",r.createElement(n.p,null,"Finished: An initial directory structure has been created."),"\n",r.createElement(n.p,null,'You should now populate your master file directory_name↲/source/index.rst and create other documentation\nsource files. Use the Makefile to build the docs, like so:\nmake builder\nwhere "builder" is one of the supported builders, e.g. html, latex or linkcheck.'),"\n",r.createElement(n.p,null,"ディレクトリ構成はこんな感じに。\ndirectory_name"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"souce","\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"conf.py"),"\n",r.createElement(n.li,null,"index.rst"),"\n"),"\n"),"\n",r.createElement(n.li,null,"Makefile"),"\n",r.createElement(n.li,null,"build","\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"html # make htmlの出力"),"\n"),"\n"),"\n"),"\n",r.createElement(n.p,null,"hugoのサブフォルダにビルド結果をコピーする\nhugoroot"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"sphinxroot","\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"build\n+html"),"\n"),"\n"),"\n",r.createElement(n.li,null,"public\nsphinx # ../sphinxroot/build/html/*をコピーする"),"\n"),"\n",r.createElement(n.p,null,"hugosite$ sphinx-quickstart -q -p project_name -a author_name -v 1.0 --sep sphinxroot\nhugosite$ hugo\nhugosite$ pushd shphinxroot\nhugosite/sphinxroot$ make html\nhugosite/sphinxroot$ rsync -av build/html ../public/sphinx\nsending incremental file list\ncreated directory ../public/sphinx\nhtml/\nhtml/.buildinfo\nhtml/genindex.html\nhtml/index.html\nhtml/objects.inv\nhtml/search.html\nhtml/searchindex.js\nhtml/_sources/\nhtml/_sources/index.rst.txt\nhtml/_static/\nhtml/_static/ajax-loader.gif\nhtml/_static/alabaster.css\nhtml/_static/basic.css\nhtml/_static/comment-bright.png\nhtml/_static/comment-close.png\nhtml/_static/comment.png\nhtml/_static/custom.css\nhtml/_static/doctools.js\nhtml/_static/down-pressed.png\nhtml/_static/down.png\nhtml/_static/file.png\nhtml/_static/jquery-3.1.0.js\nhtml/_static/jquery.js\nhtml/_static/minus.png\nhtml/_static/plus.png\nhtml/_static/pygments.css\nhtml/_static/searchtools.js\nhtml/_static/underscore-1.3.1.js\nhtml/_static/underscore.js\nhtml/_static/up-pressed.png\nhtml/_static/up.png\nhtml/_static/websupport.js\nhugosite/sphinxroot$ popd"),"\n",r.createElement(n.p,null,"rsyncの呼び方変更。ソースの指定の最後を/にすることでディレクトリそのものではなく中身を送る意味になる。\n$ rsync -av build/html/ ../public/sphinx\nsending incremental file list\ncreated directory ../public/sphinx\n./\n.buildinfo\ngenindex.html\nindex.html\nobjects.inv\nsearch.html\nsearchindex.js\n_sources/\n_sources/index.rst.txt\n_static/\n_static/ajax-loader.gif\n_static/alabaster.css\n_static/basic.css\n_static/comment-bright.png\n_static/comment-close.png\n_static/comment.png\n_static/custom.css\n_static/doctools.js\n_static/down-pressed.png\n_static/down.png\n_static/file.png\n_static/jquery-3.1.0.js\n_static/jquery.js\n_static/minus.png\n_static/plus.png\n_static/pygments.css\n_static/searchtools.js\n_static/underscore-1.3.1.js\n_static/underscore.js\n_static/up-pressed.png\n_static/up.png\n_static/websupport.js"),"\n",r.createElement(n.p,null,"hugosite/public$ python -m http.server"),"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"http://localhost:8000/sphinx/"},"http://localhost:8000/sphinx/"),"\nで生成したサイトが表示できた。\nlivereloadで自動更新サーバー"),"\n",r.createElement(n.p,null,"Python Livereload を使って Sphinx でドキュメントを書く\n",r.createElement(n.a,{href:"https://pypi.python.org/pypi/livereload"},"https://pypi.python.org/pypi/livereload")),"\n",r.createElement(n.p,null,"#!/usr/bin/env python\nimport os"),"\n",r.createElement(n.p,null,"os.system('make html')"),"\n",r.createElement(n.p,null,"from livereload import Server, shell"),"\n",r.createElement(n.p,null,"server = Server()\nserver.watch('source/",r.createElement(n.strong,null,"/*.rst', shell('make html'))\nserver.watch('source/"),"/*.md', shell('make html'))\nserver.serve(\nopen_url=False,\nroot='build/html',\nport=8080,\nhost='0.0.0.0'\n)"),"\n",r.createElement(n.p,null,"markdownを使う"),"\n",r.createElement(n.p,null,"Markdownを使う\n",r.createElement(n.a,{href:"http://www.sphinx-doc.org/en/stable/markdown.html"},"http://www.sphinx-doc.org/en/stable/markdown.html")),"\n",r.createElement(n.p,null,"ImportError: cannot import name DocParser"),"\n",r.createElement(n.p,null,"SphinxでMarkdownを使うときに注意すること"),"\n",r.createElement(n.p,null,"バージョン固定\nいろいろエラーが出る。\nTypeError: 'NoneType' object is not callable"),"\n",r.createElement(n.p,null,"documented that 1.6 breaks recommonmark\nSphinx 1.5.x was the last working version for recommonmark 0.4.0"),"\n",r.createElement(n.p,null,"$ pip install recommonmark==0.4.0\n$ pip install sphix==1.5"),"\n",r.createElement(n.p,null,"1.5にすると・・・\nAttributeError: module 'locale' has no attribute 'normalize'"),"\n",r.createElement(n.p,null,"localeがsphinx.localeで置き換えられとる。\n仕方ないので\n強制的に再インポートするコードを入れた。\nsite-packages/sphinx/",r.createElement(n.strong,null,"init"),".py\ndef main(argv=sys.argv):"),"\n",r.createElement(n.h1,null,"reimport locale"),"\n",r.createElement(n.p,null,"if 'locale' in sys.modules:\ndel sys.modules['locale']\nif sys.path[0].find('sphinx')!=-1:↲\nhead=sys.path.pop(0)↲\nimport locale↲"),"\n",r.createElement(n.p,null,"if sys.argv[1:2] == ['-M']:↲\nsys.exit(make_main(argv))↲\nelse:↲\nsys.exit(build_main(argv))↲"),"\n",r.createElement(n.p,null,"とりあえず動くようになった。ぐぬぬ・・・\nTOC\nAutoStructifyでできると書いてあるがバージョンを0.4.0に固定したからかうまく動かぬ。\neval_rstで。\n'''eval_rst\n.. toctree::"),"\n",r.createElement(n.p,null,"item\n'''"),"\n",r.createElement(n.p,null,"エラー\nTOCツリーにこの指定を入れるとエラーになる\n.. toctree::\n:caption: Contents:↲"),"\n",r.createElement(n.p,null,"themeを変える"),"\n",r.createElement(n.p,null,"見やすいテーマを設定する"),"\n",r.createElement(n.p,null,"日本語"),"\n",r.createElement(n.p,null,"日本語セクションにアンカーが貼られるようにする"),"\n",r.createElement(n.p,null,"github\n.nojekyllでいいらしいがうまくいかなかったので。"),"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"https://github.com/michaeljones/sphinx-to-github"},"https://github.com/michaeljones/sphinx-to-github")),"\n",r.createElement(n.p,null,"python3だと修正が要る。python2では試していない。"))}var s=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?r.createElement(n,e,r.createElement(a,e)):a(e)},c=t(8678),i=t(1883),o=t(8838);const m={code:e=>{let{children:n,className:t}=e;return t?r.createElement(o.Z,{className:t},n):r.createElement("code",null,n)}};function p(e){let{data:n,children:t}=e;const a=n.mdx.frontmatter;return r.createElement(c.Z,null,r.createElement("h1",null,a.title),r.createElement("div",{className:"tags-index"},a.tags&&a.tags.length>0&&a.tags.map((e=>r.createElement(i.rU,{to:"/tags/"+e+"/",itemProp:"url"},r.createElement("button",null,e))))),r.createElement(l.Zo,{components:m},t))}function u(e){return r.createElement(p,e,r.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-sphinx-in-hugo-md-2631488b7db3bf0acc45.js.map