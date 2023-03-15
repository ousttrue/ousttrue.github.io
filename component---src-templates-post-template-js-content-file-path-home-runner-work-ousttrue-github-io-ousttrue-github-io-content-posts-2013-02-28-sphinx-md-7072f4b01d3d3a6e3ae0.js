"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5787],{1386:function(n,e,t){t.r(e),t.d(e,{default:function(){return c}});var o=t(1151),i=t(7294);function s(n){const e=Object.assign({p:"p",pre:"pre",code:"code"},(0,o.ah)(),n.components);return i.createElement(i.Fragment,null,i.createElement(e.p,null,"sphinx も入れてみる\nOctopress のサブディレクトリに Sphinx を入れた。\n今回のディレクトリ配置"),"\n",i.createElement(e.pre,null,i.createElement(e.code,null,"work\n  + octopress\n    + Rakefile\n    + _deploy\n  + sphinx\n    + Makefile\n    + source\n      + conf.py\n    + build\n  + sphihnx-to-github\n    + setup.py\n    + sphinxtogithub\n      + __init__.py\n\noctopressをメインにサブディレクトリにsphinxを導入してみる。\noctopressの外のディレクトリで、\n$ mkdir sphinx\n$ cd sphinx\n$ sphinx-quickstart\n\nとした。 Makefileに\noctopress: html\n    rm -rf ../octopress/_deploy/sphinx\n    cp -rp build/html ../octopress/_deploy/sphinx\n\nと追記。 さらにoctopress/Rakefileを改造。\n{% codeblock lang:ruby %} multitask :push do puts “## Deploying branch\nto Github Pages “ (Dir[“#{deploy_dir}/*“]).each { |f| case f when\n%r|.*/sphinx\\$| # donothing puts “skip #{f}” else rm_rf(f) end } {%\nendcodeblock %}\nとしてsphinxディレクトリをpush前にクリアしないようにした。\nこれでoctopressと共存できた。\n次はsphinxの見た目の問題。\noctopressと共存するので.nojekyllは使えないのでsphinx-to-githubを使う。\n$ pip install -e git+git://github.com/michaeljones/sphinx-to-github.git#egg=sphinx-to-github\n\nエラー\nerror import name setup\n\nとかそんな感じのエラー(うろ覚え)。\nいったんローカルにcloneして調べてみる。\n$ git clone https://github.com/michaeljones/sphinx-to-github.git\n$ cd sphinx-to-github\n$ sudo python setup.py install\n\nしばらく調べた結果、\npython3でモジュールimportの仕様が変わったのが原因と理解。直した。\n$ cd sphinx-to-github/sphinxtogithub\n$ mv sphinxtogithub.py __init__.py\n$ cd ..\n$ sudo python setup.py install\n\nsphinx/source/conf.pyに\nextensions = ['sphinxtogithub']\n\nと書いて\n$ Make octopress\n")),"\n",i.createElement(e.p,null,"でできあがり。"))}var p=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?i.createElement(e,n,i.createElement(s,n)):s(n)};t(8678);function r(n){let{data:e,children:t}=n;return i.createElement(i.Fragment,null,i.createElement("h1",null,e.mdx.frontmatter.title),i.createElement(o.Zo,null,t))}function c(n){return i.createElement(r,n,i.createElement(p,n))}},8678:function(n,e,t){t(7294)},1151:function(n,e,t){t.d(e,{Zo:function(){return r},ah:function(){return s}});var o=t(7294);const i=o.createContext({});function s(n){const e=o.useContext(i);return o.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}const p={};function r({components:n,children:e,disableParentContext:t}){let r;return r=t?"function"==typeof n?n({}):n||p:s(n),o.createElement(i.Provider,{value:r},e)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-02-28-sphinx-md-7072f4b01d3d3a6e3ae0.js.map