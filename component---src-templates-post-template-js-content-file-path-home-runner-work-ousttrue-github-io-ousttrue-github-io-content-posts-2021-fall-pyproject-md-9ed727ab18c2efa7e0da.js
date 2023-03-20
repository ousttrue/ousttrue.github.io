"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7440],{1041:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var a=n(1151),l=n(7294);function s(e){const t=Object.assign({h1:"h1",p:"p",span:"span",ul:"ul",li:"li",a:"a",blockquote:"blockquote",h2:"h2",h3:"h3",h4:"h4",h5:"h5"},(0,a.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(t.h1,null,"最近の python ライブラリのパッケージング手法を調査"),"\n",l.createElement(t.p,null,"最近の python package の記述の仕方で、 ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">pyproject.toml</code>'}})," なる作法があるのでメモ。"),"\n",l.createElement(t.p,null,"元々、 ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.py</code>'}})," や ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.cfg</code>'}})," で記述していたのだけどこれに変わるものらしい。\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.py</code>'}})," はともかく ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.cfg</code>'}})," が大変分かりにくいと思っていました。\nというか、何か調べにくい。\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.py</code>'}})," を宣言的に書けるよ、詳しくは ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.py</code>'}})," のリファンンスを見て。みたいになっているのだけど、\n書き方がよくわからんことが多かった。"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"(2016)",l.createElement(t.a,{href:"https://www.yunabe.jp/docs/python_package_management.html"},"Python パッケージ管理技術まとめ (pip, setuptools, easy_install, etc)")),"\n"),"\n",l.createElement(t.blockquote,null,"\n",l.createElement(t.p,null,"2013年に distribute は setuptools にマージされた"),"\n"),"\n",l.createElement(t.h2,null,"pyproject.toml"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"(2019)",l.createElement(t.a,{href:"https://tech.515hikaru.net/post/2019-11-23-pyproject/"},"pyproject.toml とは何か")),"\n"),"\n",l.createElement(t.blockquote,null,"\n",l.createElement(t.p,null,"pyproject.toml は Node.js の package.json などのように、そのプロジェクトに関する様々なことを定義できるファイルとして存在しています"),"\n"),"\n",l.createElement(t.p,null,"なるほど。"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"(2019)",l.createElement(t.a,{href:"https://orolog.hatenablog.jp/entry/2019/03/24/223531"},"pip が 19.02 で pyproject.toml から pip install できるようになった")),"\n"),"\n",l.createElement(t.h2,null,"pyproject の build-system"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"(2019)",l.createElement(t.a,{href:"https://engineer.recruit-lifestyle.co.jp/techblog/2019-12-25-python-packaging-specs/"},"https://engineer.recruit-lifestyle.co.jp/techblog/2019-12-25-python-packaging-specs/")),"\n"),"\n",l.createElement(t.h3,null,"setuptools"),"\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="toml"><pre class="language-toml"><code class="language-toml"><span class="token punctuation">[</span><span class="token table class-name">build-system</span><span class="token punctuation">]</span>\n<span class="token key property">requires</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span>\n    <span class="token string">"setuptools>=42"</span><span class="token punctuation">,</span>\n    <span class="token string">"wheel"</span>\n<span class="token punctuation">]</span>\n<span class="token key property">build-backend</span> <span class="token punctuation">=</span> <span class="token string">"setuptools.build_meta"</span></code></pre></div>'}}),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://packaging.python.org/tutorials/packaging-projects/#creating-pyproject-toml"},"https://packaging.python.org/tutorials/packaging-projects/#creating-pyproject-toml")),"\n",l.createElement(t.li,null,"(2021)",l.createElement(t.a,{href:"https://zenn.dev/detsu/articles/5d74bf72e96a0f"},"PyPIパッケージのリリースもバージョニングもGitHub単独で完結させる")),"\n"),"\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="toml"><pre class="language-toml"><code class="language-toml"><span class="token punctuation">[</span><span class="token table class-name">build-system</span><span class="token punctuation">]</span>\n<span class="token key property">requires</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">"setuptools>=45"</span><span class="token punctuation">,</span> <span class="token string">"wheel"</span><span class="token punctuation">,</span> <span class="token string">"setuptools_scm>=6.2"</span><span class="token punctuation">]</span></code></pre></div>'}}),"\n",l.createElement(t.p,null,"なるほど。\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.cfg</code>'}})," と ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">pyproject.toml</code>'}})," の役割が被っていると思うのだが両方要るのだろうか。"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"(2021)",l.createElement(t.a,{href:"https://hirayarn.hatenablog.com/entry/2021/11/08/214053"},"PyPIにパッケージを公開する手順の整理")),"\n"),"\n",l.createElement(t.p,null,l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">pyproject.toml</code>'}})," には ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">build-backend</code>'}})," の指定だけを記述して、 ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.cfg</code>'}})," と併用するということでよさそう。"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"(2018)",l.createElement(t.a,{href:"https://astropengu.in/posts/23/"},"Python の setup.py の内容を setup.cfg で管理する")),"\n"),"\n",l.createElement(t.h4,null,"setup.py & setup.cfg"),"\n",l.createElement(t.p,null,"setup.py"),"\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">from</span> setuptools <span class="token keyword">import</span> setup\nsetup<span class="token punctuation">(</span><span class="token punctuation">)</span></code></pre></div>'}}),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://packaging.python.org/guides/distributing-packages-using-setuptools/"},"https://packaging.python.org/guides/distributing-packages-using-setuptools/")),"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://github.com/dephell/dephell/blob/master/setup.py"},"https://github.com/dephell/dephell/blob/master/setup.py")),"\n"),"\n",l.createElement(t.h4,null,"setup.cfg: metadata"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://packaging.python.org/specifications/core-metadata/"},"https://packaging.python.org/specifications/core-metadata/")),"\n"),"\n",l.createElement(t.h4,null,"setup.cfg: options"),"\n",l.createElement(t.h5,null,"setup.cfg: options.entry_points"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://setuptools.pypa.io/en/latest/userguide/entry_point.html"},"https://setuptools.pypa.io/en/latest/userguide/entry_point.html")),"\n"),"\n",l.createElement(t.h4,null,"setup.cfg:"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,l.createElement(t.a,{href:"https://setuptools.pypa.io/en/latest/userguide/package_discovery.html"},"Package Discovery and Namespace Package")),"\n"),"\n",l.createElement(t.h3,null,"poetry"),"\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">[build-system]\nrequires = ["poetry>=0.12"]\nbuild-backend = "poetry.masonry.api"</code></pre></div>'}}),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"(2019)",l.createElement(t.a,{href:"https://rcmdnk.com/blog/2019/02/04/computer-python/"},"https://rcmdnk.com/blog/2019/02/04/computer-python/")),"\n",l.createElement(t.li,null,"(2018)",l.createElement(t.a,{href:"https://kk6.hateblo.jp/entry/2018/12/20/124151"},"Poetryを使ったPythonパッケージ開発からPyPI公開まで")),"\n"),"\n",l.createElement(t.h2,null,"練習"),"\n",l.createElement(t.p,null,l.createElement(t.a,{href:"https://github.com/ousttrue/glglue"},"https://github.com/ousttrue/glglue")," に使ってみる。\n結局、 ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.cfg</code>'}})," を使っているのとあまり変わらず。\n",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setuptools_scm</code>'}})," による git tag を ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">version</code>'}})," 化する技を覚えた。\nあと、",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">github actions</code>'}}),"。\nそのうち、 ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">setup.cfg</code>'}})," の内容を ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">pyproject.toml</code>'}})," に書けるようになりそうではある。"))}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?l.createElement(t,e,l.createElement(s,e)):s(e)},p=n(8678),o=n(1883),r=n(8838);const u={code:e=>{let{children:t,className:n}=e;return n?l.createElement(r.Z,{className:n},t):l.createElement("code",null,t)}};function g(e){let{data:t,children:n}=e;const s=t.mdx.frontmatter;return l.createElement(p.Z,null,l.createElement("h1",null,s.title),l.createElement("div",{className:"tags-index"},s.tags&&s.tags.length>0&&s.tags.map((e=>l.createElement(o.rU,{to:"/tags/"+e+"/",itemProp:"url"},l.createElement("button",null,e))))),l.createElement(a.Zo,{components:u},n))}function m(e){return l.createElement(g,e,l.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2021-fall-pyproject-md-9ed727ab18c2efa7e0da.js.map