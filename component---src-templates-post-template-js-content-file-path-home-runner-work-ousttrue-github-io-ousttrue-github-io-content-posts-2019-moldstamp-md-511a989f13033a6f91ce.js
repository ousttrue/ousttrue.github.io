"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[474],{3601:function(e,n,l){l.r(n),l.d(n,{default:function(){return o}});var t=l(1151),a=l(7294);function r(e){const n=Object.assign({p:"p",span:"span",a:"a",h2:"h2",h3:"h3",ul:"ul",li:"li"},(0,t.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"ディスククラッシュで ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">hugo</code>'}})," の管理リポジトリがロストしたので、\n新しく自分で作ってみることにした。"),"\n",a.createElement(n.p,null,a.createElement(n.a,{href:"https://github.com/ousttrue/moldstamp"},"moldstamp")," と名付ける。"),"\n",a.createElement(n.p,null,"途中まで作ってみた感じだとサイトの構成面に関しては、既存のツールを使うより自作した方がはるかに簡単。ファイルが変換される法則とか、それをカスタマイズする方法をgoogle先生に聞くのではなく自分で作るだけなので。当然、機能は少ないし見た目はしょぼいのだけど、必要最低限を満たすのは難しくなかったり。"),"\n",a.createElement(n.p,null,"以下、開発メモ"),"\n",a.createElement(n.h2,null,"記事"),"\n",a.createElement(n.h3,null,"🤔 フォルダ構成"),"\n",a.createElement(n.p,null,"検討中"),"\n",a.createElement(n.p,null,"src"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"root","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"articles","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"xxx.md: htmlに変換してコピー"),"\n",a.createElement(n.li,null,"xxx.jpg,png: など。そのままコピー"),"\n"),"\n"),"\n",a.createElement(n.li,null,"templates","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"index.html: jinja2 temlate"),"\n",a.createElement(n.li,null,"article.html: jinja2 temlate"),"\n"),"\n"),"\n"),"\n"),"\n"),"\n",a.createElement(n.p,null,"dst"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"github.io","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"/index.html"),"\n",a.createElement(n.li,null,"/post/xxx.html"),"\n"),"\n"),"\n"),"\n",a.createElement(n.h3,null,"🌝 Frontmatter"),"\n",a.createElement(n.p,null,"hugo風にtomlで。"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="toml"><pre class="language-toml"><code class="language-toml">+++\n<span class="token key property">date</span> <span class="token punctuation">=</span> <span class="token string">"2012-04-06"</span>\n<span class="token key property">tags</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">\'nvim\'</span><span class="token punctuation">,</span> <span class="token string">\'python\'</span><span class="token punctuation">]</span>\n+++</code></pre></div>'}}),"\n",a.createElement(n.h3,null,"🔨 draftの扱い"),"\n",a.createElement(n.h3,null,"🔨 各tag毎の記事一覧"),"\n",a.createElement(n.h3,null,"🔨 各記事の同じタグの記事へのリンク"),"\n",a.createElement(n.h3,null,"🔨 next, prev"),"\n",a.createElement(n.h2,null,"markdown"),"\n",a.createElement(n.h3,null,"🔨 ライブラリ入れ替え？"),"\n",a.createElement(n.p,null,a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">makdown2</code>'}})," から ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">markdown</code>'}})," へ。"),"\n",a.createElement(n.h3,null,"🔨 link-pattern"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"https://github.com/trentm/python-markdown2/wiki/link-patterns"),"\n"),"\n",a.createElement(n.p,null,"わりと誤判定する。"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"https://docs.python.org/ja/3/library/html.parser.html"),"\n"),"\n",a.createElement(n.p,null,"で作り直す"),"\n",a.createElement(n.h3,null,"🌝 toc"),"\n",a.createElement(n.h3,null,"🌝 syntax highlight"),"\n",a.createElement(n.p,null,"pygmentsを使う"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"🌝 markdownのコード部分をシンタックスハイライトする"),"\n",a.createElement(n.li,null,"🌝 cssを生成する"),"\n"),"\n",a.createElement(n.h2,null,"jinja2"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"🌝 index"),"\n",a.createElement(n.li,null,"🌝 article"),"\n"),"\n",a.createElement(n.h3,null,"🔨 inheritance"),"\n",a.createElement(n.p,null,"ヘッダとフッタを分離するなど"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"http://jinja.pocoo.org/docs/2.10/templates/#template-inheritance"),"\n"),"\n",a.createElement(n.h2,null,"css"),"\n",a.createElement(n.h3,null,"🔨 h1, h2, h3..."),"\n",a.createElement(n.h3,null,"🔨 引用"),"\n",a.createElement(n.h3,null,"🔨 ul, li"),"\n",a.createElement(n.p,null,"インデントが深すぎる"),"\n",a.createElement(n.h2,null,"local server"),"\n",a.createElement(n.h3,null,"🌝 livereload"),"\n",a.createElement(n.p,null,"ローカル実験用のlivereload server"),"\n",a.createElement(n.h3,null,"🔨 livereload 無変換のファイル(jpgなど)"),"\n",a.createElement(n.h3,null,"🔨 livereload pygmentsの生成ファイル(css)"))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?a.createElement(n,e,a.createElement(r,e)):r(e)},u=(l(8678),l(8838));const m={code:e=>{let{children:n,className:l}=e;return l?a.createElement(u.Z,{className:l},n):a.createElement("code",null,n)}};function s(e){let{data:n,children:l}=e;return a.createElement(a.Fragment,null,a.createElement("h1",null,n.mdx.frontmatter.title),a.createElement(t.Zo,{components:m},l))}function o(e){return a.createElement(s,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-moldstamp-md-511a989f13033a6f91ce.js.map