"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5674],{3633:function(e,n,t){t.r(n),t.d(n,{default:function(){return c}});var r=t(1151),l=t(7294);function s(e){const n=Object.assign({p:"p",blockquote:"blockquote"},(0,r.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(n.p,null,"Tinkererに引越し\nOctpressが手に負えなくなってきたので手軽に使えそうな\ntinkererに引越しというかシステムを変更することにした。"),"\n",l.createElement(n.p,null,"http://tinkerer.me/index.html"),"\n",l.createElement(n.p,null,"以下作業手順メモ。\ntinkererインストール"),"\n",l.createElement(n.blockquote,null,"\n",l.createElement(n.p,null,"python --version\nPython 3.3.0\neasy_install tinkerer"),"\n"),"\n",l.createElement(n.p,null,"サイト生成"),"\n",l.createElement(n.blockquote,null,"\n",l.createElement(n.p,null,"mkdir pages_src\npages_src> tinkerer --setup\npages_src> gvim conf.py"),"\n"),"\n",l.createElement(n.p,null,'記事生成\npages_src> tinkerer --post "tinkerer"'),"\n",l.createElement(n.p,null,"2013/10/21/tinkerer.rstが生成されるとともにmaster.rstのtoctreeに記事が追加される。\ncategoriesとtagsの違いが良くわからん。\npages_src> gvim 2013/10/21/tinkerer.rst"),"\n",l.createElement(n.p,null,"html生成\npages_src> tinkerer --build"),"\n",l.createElement(n.p,null,"github転送\n既存のgithub-pages(user)があるのでそこれに送ってみる。"),"\n",l.createElement(n.blockquote,null,"\n",l.createElement(n.p,null,'mkdir pages_dst\ncd pages_dst\npages_dst> git init\npages_dst> git remote add origin url\npages_dst> cp -r ../pages_src/blog/html/* .\npages_dst> echo "" > .nogekyll\npages_dst> git add .\npages_dst> git commit -m init'),"\n"),"\n",l.createElement(n.p,null,"上書き。\npages_dst> git push origin master --force"),"\n",l.createElement(n.p,null,"_ではじまるパスが見えない件\n最初sphinxtogithubというので修正したのだけど、\nよく見たらtinkerのサイトに書いてあった。\nhttp://tinkerer.me/exts/withgithub.html\nextensions = [\n'tinkerer.ext.blog', 'tinkerer.ext.disqus', 'withgithub',\n]"),"\n",l.createElement(n.p,null,"しかし404になるな・・・\nhttps://help.github.com/articles/files-that-start-with-an-underscore-are-missing\n.nogekyllがtypoしとった。-> .nojekyll\n生成したファイルをローカルで開くとやたら時間がかかる件"),"\n",l.createElement(n.p,null,"C:/Python33/Lib/site-packages/tinkerer-1.2.1-py3.3.egg/tinkerer/themes/boilerplate/layout.html"),"\n",l.createElement(n.p,null,"の\n”//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js” を\n“http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js“\nに変えた。\nsmb://ajax.googleapis.comとかにアクセスしてるような気がするw\nOctpressの記事を移植する\npythonでpandocを呼び出して*.markdownから*.rstに変換した。\n完了\nとりあえず移行作業完了。\nなんだかんだでoctopressはブラックボックスだったので、\nsphinxベースのtinkererの方がわかる(sphinxの方が慣れている)。\noctopressではjekyllを良く知らずに使っていたのと、pushするときのタスクがgitをごにょごにょやっているのがよくわからんかった。\nいずれにしろ、hatenaの時が日記を一番よく書いていたので自前システムはメンテナンスコストが馬鹿にならんと思った。\n中身に入る前にシステムのメンテナンスで力尽きる。"))}var a=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?l.createElement(n,e,l.createElement(s,e)):s(e)};t(8678);function i(e){let{data:n,children:t}=e;return l.createElement(l.Fragment,null,l.createElement("h1",null,n.mdx.frontmatter.title),l.createElement(r.Zo,null,t))}function c(e){return l.createElement(i,e,l.createElement(a,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return i},ah:function(){return s}});var r=t(7294);const l=r.createContext({});function s(e){const n=r.useContext(l);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function i({components:e,children:n,disableParentContext:t}){let i;return i=t?"function"==typeof e?e({}):e||a:s(e),r.createElement(l.Provider,{value:i},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-10-21-tinkerer-md-278c324470e375cb2ac9.js.map