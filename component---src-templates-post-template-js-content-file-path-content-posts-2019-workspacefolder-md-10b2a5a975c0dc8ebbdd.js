"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6713],{2515:function(e,n,t){t.r(n),t.d(n,{default:function(){return i}});var a=t(1151),l=t(7294);function s(e){const n=Object.assign({p:"p",ul:"ul",li:"li",code:"code",span:"span",h2:"h2",a:"a"},(0,a.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(n.p,null,"https://github.com/ousttrue/WorkspaceFolder"),"\n",l.createElement(n.p,null,"要件は、"),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"WindowsとLinuxで共用にできる"),"\n",l.createElement(n.li,null,"実行時に、親フォルダを遡って設定(プロジェクトルートに ",l.createElement(n.code,null,"Duck.toml")," を配置する約束`)を探しに行く能力がある"),"\n",l.createElement(n.li,null,"Task間の依存関係が記述できる"),"\n",l.createElement(n.li,null,"コマンド呼び出し時のパスを調整できる"),"\n"),"\n",l.createElement(n.p,null,"こんなもん。"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="vim"><pre class="language-vim"><code class="language-vim">augroup MyAutoCmd\n    <span class="token builtin">autocmd</span> BufWritePost <span class="token operator">*</span><span class="token operator">.</span>md <span class="token punctuation">:</span><span class="token operator">!</span>duck build\naugroup END</code></pre></div>'}}),"\n",l.createElement(n.p,null,"としておいて保存時に呼ぶようにしてみた。"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="toml"><pre class="language-toml"><code class="language-toml"><span class="token comment"># Duck.toml</span>\n<span class="token punctuation">[</span><span class="token table class-name">generate</span><span class="token punctuation">]</span>\n<span class="token key property">cwd</span> <span class="token punctuation">=</span> <span class="token string">\'build\'</span>\n<span class="token key property">command</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">\'cmake\'</span><span class="token punctuation">,</span> <span class="token string">\'..\'</span><span class="token punctuation">,</span> <span class="token string">\'-G\'</span><span class="token punctuation">,</span> <span class="token string">\'Unix Makefiles\'</span><span class="token punctuation">]</span>\n\n<span class="token punctuation">[</span><span class="token table class-name">build</span><span class="token punctuation">]</span>\n<span class="token key property">depends</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">\'generate\'</span><span class="token punctuation">]</span>\n<span class="token key property">cwd</span> <span class="token punctuation">=</span> <span class="token string">\'build\'</span>\n<span class="token key property">command</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">\'make\'</span><span class="token punctuation">]</span></code></pre></div>'}}),"\n",l.createElement(n.p,null,l.createElement(n.code,null,"duck build")),"\n",l.createElement(n.p,null,"のように呼ぶ。"),"\n",l.createElement(n.h2,null,"vimのカレントフォルダ問題"),"\n",l.createElement(n.p,null,"親フォルダを遡って設定を探しに行くというのが重要です。例えば ",l.createElement(n.code,null,"vim")," でサブフォルダのファイルを編集しているときに、親フォルダの ",l.createElement(n.code,null,"Makefile")," でビルドしたい場合がある。このときに、",l.createElement(n.code,null,"vim")," のカレントフォルダを考慮するのが無理なのです。\nそういうわけで ",l.createElement(n.code,null,"vim")," では単純に ",l.createElement(n.code,null,"autocd")," して、カレントフォルダを意識しないことにしました。\n代わりにツール側で親フォルダに遡れるようにして、そのツールがプロジェクトのルートから指定のコマンドを呼び出すのです。"),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"make を呼ぶ"),"\n",l.createElement(n.li,null,"cmake を呼ぶ"),"\n",l.createElement(n.li,null,"dub を呼ぶ"),"\n",l.createElement(n.li,null,"setup.py を呼ぶ"),"\n",l.createElement(n.li,null,"MSBuild を呼ぶ"),"\n"),"\n",l.createElement(n.p,null,"などのように、言語毎に専門のツールを呼ぶ補助的なツールです。"),"\n",l.createElement(n.p,null,"特定の ",l.createElement(n.code,null,"LSP")," (D言語向けの ",l.createElement(n.code,null,"dls")," ) がカレントフォルダをプロジェクトルートに移動してから起動しないといけないなどの癖があるようなので、その辺を吸収させるのも狙っている。"),"\n",l.createElement(n.h2,null,"WindowsでCMakeをどうやって見つけるのか"),"\n",l.createElement(n.p,null,l.createElement(n.code,null,"unix")," 的なシステムでは、",l.createElement(n.code,null,"/usr/bin/cmake")," であろうことが期待できるのだけど、\n",l.createElement(n.code,null,"Windows")," ではそうはいかない。でも最近の ",l.createElement(n.code,null,"VisualStudio")," がインストールされていれば、その中に ",l.createElement(n.code,null,"cmake")," が入っている。だから ",l.createElement(n.code,null,"Program Files")," から決め打ちで探してくるという方法があるのだけど、もう一歩進めて ",l.createElement(n.code,null,"VisualStudio")," のインストールパスを ",l.createElement(n.code,null,"registry")," から取ってくるという手法がある。しかし、たくさんのバージョンとエディションで少しずつ違うのでやってられない。で、これに対応するツールとして ",l.createElement(n.code,null,"vswhere")," というツールがある。たぶん、",l.createElement(n.a,{href:"https://github.com/Microsoft/vcpkg"},"vcpkg"),"のために作られたのだと思うのだけど、これでインストールされている ",l.createElement(n.code,null,"VisualStudio")," の情報を得ることができる。まだ、 ",l.createElement(n.code,null,"vswhere")," をどうやって得るのか問題があるのだが、小さいので自分のプロジェクトに入れておくとか、ダウンロードするとか、 ",l.createElement(n.code,null,"VisualStudio")," に入っているので決め打ちでパスを探すといったことになろうと思う。"),"\n",l.createElement(n.p,null,"要するに ",l.createElement(n.code,null,"vc")," が入っている環境では、9割くらいの確率で ",l.createElement(n.code,null,"cmake")," を発見できます。\n",l.createElement(n.code,null,"duck")," にもこの機能を入れようとしている。"),"\n",l.createElement(n.p,null,"https://github.com/ChaosinaCan/pyvswhere"))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?l.createElement(n,e,l.createElement(s,e)):s(e)},u=t(8678),o=t(4160),p=t(8736);const r={code:e=>{let{children:n,className:t}=e;return t?l.createElement(p.Z,{className:t},n):l.createElement("code",null,n)}};function m(e){let{data:n,children:t}=e;const s=n.mdx.frontmatter;return l.createElement(u.Z,null,l.createElement("h1",null,s.title),l.createElement("div",{className:"tags-index"},s.tags&&s.tags.length>0&&s.tags.map((e=>l.createElement(o.rU,{to:"/tags/"+e+"/",itemProp:"url"},l.createElement("button",null,e))))),l.createElement(a.Zo,{components:r},t))}function i(e){return l.createElement(m,e,l.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2019-workspacefolder-md-10b2a5a975c0dc8ebbdd.js.map