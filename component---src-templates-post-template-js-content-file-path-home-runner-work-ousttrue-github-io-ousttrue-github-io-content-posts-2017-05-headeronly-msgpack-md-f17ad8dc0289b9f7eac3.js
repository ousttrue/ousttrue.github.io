"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9965],{6968:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var a=n(1151),l=n(7294);function c(e){const t=Object.assign({p:"p",span:"span"},(0,a.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(t.p,null,"車輪の再発明的だけどmessagepackのc++実装をまた作った。"),"\n",l.createElement(t.p,null,"https://github.com/ousttrue/msgpackpp"),"\n",l.createElement(t.p,null,l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">refrange</code>'}})," と ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">osaru</code>'}})," の知見を基に実装というか、編集した。\n実装のシンプルさと使いやすさを優先して、パフォーマンスと汎用性にあまり配慮していない。",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">refrange</code>'}})," のAPIがダメダメなのを反省し、",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">osaru</code>'}})," で ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">serializer/deserializer</code>'}})," のレイヤーと ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">formatter/parser</code>'}})," のレイヤーを分けた設計を踏襲。なかなかよいのではないか。で、本家の ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">messagepack</code>'}})," を見たらバージョンが結構進んでいて、",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">c++11</code>'}})," 版ならヘッダーオンリーあるよと書いてあった。あったのかー。知ってたような気もするが、カスタムのオレオレ車輪でいく。\nあと、ついでに ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">msgpackpp-rpc-asio</code>'}})," も更新した。githubで地味に★をいただくので、微妙に需要があるらしい。今回の更新で、この前発見した ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">asio standalone</code>'}})," を組み込んで ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">boost::test</code>'}})," を ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">catch</code>'}})," で置き換えて、 ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">boost::thread</code>'}})," を ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">std::thead</code>'}})," に置き換えるなどして、 ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">boost</code>'}})," への依存を取り除いた。ちょっとした機能ならばヘッダオンリーなのが最近の潮流ですな。もう少し手を入れて"),"\n",l.createElement(t.p,null,l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">msgpack</code>'}})," 部分を ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">msgpackpp</code>'}})," で置き換え\n可変長テンプレート引数\nメッセージを ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">std::cout</code>'}})," じゃなくて ",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">plog</code>'}})," に出力\nヘッダオンリー"),"\n",l.createElement(t.p,null,"という感じにしようか。",l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">websocketpp</code>'}})," と組み合わせて使うのに便利な形にしたい。"))}var s=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?l.createElement(t,e,l.createElement(c,e)):c(e)},r=(n(8678),n(8838));const o={code:e=>{let{children:t,className:n}=e;return n?l.createElement(r.Z,{className:n},t):l.createElement("code",null,t)}};function d(e){let{data:t,children:n}=e;return l.createElement(l.Fragment,null,l.createElement("h1",null,t.mdx.frontmatter.title),l.createElement(a.Zo,{components:o},n))}function g(e){return l.createElement(d,e,l.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-05-headeronly-msgpack-md-f17ad8dc0289b9f7eac3.js.map