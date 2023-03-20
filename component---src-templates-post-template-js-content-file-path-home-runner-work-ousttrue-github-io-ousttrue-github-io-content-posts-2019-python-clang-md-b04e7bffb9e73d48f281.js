"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2389],{1885:function(e,t,n){n.r(t),n.d(t,{default:function(){return E}});var l=n(1151),a=n(7294);function r(e){const t=Object.assign({p:"p",span:"span",ul:"ul",li:"li",a:"a",h2:"h2"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.p,null,a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">d3d11.h</code>'}})," を ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">d3d11.d</code>'}})," に変換したいのでやる。"),"\n",a.createElement(t.p,null,"以前、少し手を出したときの記事。"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://qiita.com/ousttrue/items/a4291fc996a063841bd7"},"D言語でD3D11してみる")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://qiita.com/ousttrue/items/26b399a691b5610d2678"},"D言語でComPtr")),"\n"),"\n",a.createElement(t.p,null,"この時は手作業で ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">d3d11.h</code>'}})," をD言語向けに編集していたのだけど、\nプログラムで自動変換します。"),"\n",a.createElement(t.h2,null,"環境整備"),"\n",a.createElement(t.p,null,"Windows10(64bit)"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"llvmインストール(32bit)"),"\n",a.createElement(t.li,null,"python36-32"),"\n",a.createElement(t.li,null,a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">pip install clang</code>'}})),"\n"),"\n",a.createElement(t.h2,null,"TranslationUnit"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"typedef"),"\n",a.createElement(t.li,null,"enum"),"\n",a.createElement(t.li,null,"struct/union"),"\n",a.createElement(t.li,null,"function"),"\n"),"\n",a.createElement(t.h2,null,"プリプロセッサー情報を得る"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"include"),"\n",a.createElement(t.li,null,"define"),"\n"),"\n",a.createElement(t.h2,null,"ComのIIDを得る"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"unexposed"),"\n"),"\n",a.createElement(t.h2,null,"D向けに出力"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"extern ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Windows</code>'}})),"\n",a.createElement(t.li,null,"public import"),"\n",a.createElement(t.li,null,a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">&amp;</code>'}})," を ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">*</code>'}})," に置換"),"\n",a.createElement(t.li,null,"interfaceに対するポインタの ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">*</code>'}}),"をひとつ減らす"),"\n"),"\n",a.createElement(t.p,null,"あとは愚直に粛々と前に進める"),"\n",a.createElement(t.h2,null,"python clang は強力"),"\n",a.createElement(t.p,null,"こいつがあると、C/C++のヘッダから各言語向けのバインディングを作成するなどの作業を半自動化できて便利。\n例えば、"),"\n",a.createElement(t.p,null,a.createElement(t.a,{href:"https://github.com/ousttrue/UnityCairo"},"https://github.com/ousttrue/UnityCairo")),"\n",a.createElement(t.p,null,"元々、"),"\n",a.createElement(t.p,null,a.createElement(t.a,{href:"http://andrestraks.github.io/BulletSharp/"},"http://andrestraks.github.io/BulletSharp/")),"\n",a.createElement(t.p,null,"が clang で bullet のヘッダーを変換しているぽかったので、そこから調べた。"),"\n",a.createElement(t.h2,null,"できたもの"),"\n",a.createElement(t.p,null,"なんとなく動くものができた。"),"\n",a.createElement(t.p,null,a.createElement(t.a,{href:"https://github.com/ousttrue/pycpptool"},"https://github.com/ousttrue/pycpptool")))}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?a.createElement(t,e,a.createElement(r,e)):r(e)},u=n(8678),m=n(1883),s=n(8838);const o={code:e=>{let{children:t,className:n}=e;return n?a.createElement(s.Z,{className:n},t):a.createElement("code",null,t)}};function i(e){let{data:t,children:n}=e;const r=t.mdx.frontmatter;return a.createElement(u.Z,null,a.createElement("h1",null,r.title),a.createElement("div",{className:"tags-index"},r.tags&&r.tags.length>0&&r.tags.map((e=>a.createElement(m.rU,{to:"/tags/"+e+"/",itemProp:"url"},a.createElement("button",null,e))))),a.createElement(l.Zo,{components:o},n))}function E(e){return a.createElement(i,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-python-clang-md-b04e7bffb9e73d48f281.js.map