"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[273],{7959:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var a=n(1151),r=n(7294);function l(e){const t=Object.assign({p:"p",span:"span"},(0,a.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(t.p,null,"可変長テンプレート引数\n引き続きmsgpack-rpc-asioを実装しているのだが、可変長テンプレート引数(valiadic\ntemplate)を使うと関数登録のような場合にうまく書けることがわかった。\n昨日は関数オブジェクトからstd::functionの型を得るのに下記のようにしていたのだけど、"),"\n",r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++// ret template ret helper0(ret (f::*)(rest…));"><pre class="language-c++// ret template ret helper0(ret (f::*)(rest…));"><code class="language-c++// ret template ret helper0(ret (f::*)(rest…));">template Ret helper0(Ret (F::*)(Rest…) const);\n// 1 template A1 helper1(Ret (F::*)(A1, Rest…));\ntemplate A1 helper1(Ret (F::*)(A1, Rest…) const);\n// 2 template A2 helper2(Ret (F::*)(A1, A2, Rest…));\ntemplate A2 helper2(Ret (F::*)(A1, A2, Rest…) const);\ntemplate void add_handler(F handler, const std::string &amp;method) {\ntypedef decltype(handler) functor; typedef\ndecltype(helper0(&amp;functor::operator())) R; typedef\ndecltype(helper1(&amp;functor::operator())) A1; typedef\ndecltype(helper2(&amp;functor::operator())) A2;\n// register function...\nstd::function&lt;R(A1, A2)&gt; func(handler);\n\n} 次のように書けた。c++ template void add_handler(F handler,\nR(C::*)(A1, A2)const) { // register function… std::function\nfunc(handler); }\ntemplate void add_handler(F handler, const std::string &amp;method) {\nadd_handler(handler, &amp;decltype(handler)::operator()); }\n昨日参照させてもらった\nhttp://d.hatena.ne.jp/osyo-manga/20121205/1354674180\nのコードがやっとわかるようになってきた。\n\n上記コードはさらに可変長テンプレート引数で\n\ntemplate void add_handler(F handler, R(C::*)(A…)const) { // register\nfunction… std::function func(handler); }\n``と書けるのですごく便利になる。 msgpack-rpcの関数コールバック登録や、luaのような組み込み言語への関数公開の実装が楽になりそうだ。 上記サイトでも取り上げられているが&amp;decltype(functor)::operator()`を関数テンプレートの型推論に投げることで\n関数オブジェクトから型情報を取れるらしい。\n気をよくして各所を可変長テンプレート引数を使うように書き換えたのだが、\n致命的な問題を発見。\nvc2010はなんと可変長テンプレート引数を未実装だった。\nc++0xの機能がわりと入っているのでできると思っていたのに。\nmsgpack-rpc-asioは、明瞭にvc2010をターゲットにしているので可変長テンプレート引数の使用を断念した。\n２引数関数の操作までしか実装していない時点で気付いて良かった。\nライブラリの不足はboost使えば済むが言語機能が無いのは困るな・・・。\nvc2012に乗り換えたくなった。</code></pre></div>'}}))}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?r.createElement(t,e,r.createElement(l,e)):l(e)},p=(n(8678),n(8838));const d={code:e=>{let{children:t,className:n}=e;return n?r.createElement(p.Z,{className:n},t):r.createElement("code",null,t)}};function o(e){let{data:t,children:n}=e;return r.createElement(r.Fragment,null,r.createElement("h1",null,t.mdx.frontmatter.title),r.createElement(a.Zo,{components:d},n))}function s(e){return r.createElement(o,e,r.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-05-17-valiadic-templates-md-dc4cca2746422a034711.js.map