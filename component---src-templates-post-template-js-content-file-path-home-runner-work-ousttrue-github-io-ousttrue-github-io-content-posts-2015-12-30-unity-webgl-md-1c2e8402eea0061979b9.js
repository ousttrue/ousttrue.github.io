"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8316],{7275:function(n,a,s){s.r(a),s.d(a,{default:function(){return i}});var t=s(1151),p=s(7294);function e(n){const a=Object.assign({span:"span",p:"p",a:"a"},(0,t.ah)(),n.components);return p.createElement(p.Fragment,null,p.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> Module <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token constant">TOTAL_MEMORY</span><span class="token operator">:</span> <span class="token number">268435456</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">errorhandler</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// arguments: err, url, line. This function must return \'true\' if the error is handled, otherwise \'false\'</span>\n  <span class="token literal-property property">compatibilitycheck</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">dataUrl</span><span class="token operator">:</span> <span class="token string">"Release/WebGL.data"</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">codeUrl</span><span class="token operator">:</span> <span class="token string">"Release/WebGL.js"</span><span class="token punctuation">,</span>\n  <span class="token literal-property property">memUrl</span><span class="token operator">:</span> <span class="token string">"Release/WebGL.mem"</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",p.createElement(a.p,null,"こっちが未加工の index.html。\nUnity5.3 の WebGL を試してみる。"),"\n",p.createElement(a.p,null,p.createElement(a.a,{href:"http://blogs.unity3d.com/jp/2015/12/07/unity-5-3-webgl-updates/"},"http://blogs.unity3d.com/jp/2015/12/07/unity-5-3-webgl-updates/"),"\n",p.createElement(a.a,{href:"http://docs.unity3d.com/530/Documentation/Manual/webgl-gettingstarted.html"},"http://docs.unity3d.com/530/Documentation/Manual/webgl-gettingstarted.html")),"\n",p.createElement(a.p,null,"とりあえず build して動かしてみた。\n下記のようなディレクトリ構造で出力されていた。"),"\n",p.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">│  index.html\n│\n├─Release\n│      .htaccess\n│      UnityLoader.js\n│      WebGL.datagz\n│      WebGL.jsgz\n│      WebGL.memgz\n│\n└─TemplateData\n        favicon.ico\n        fullbar.png\n        fullscreen.png\n        loadingbar.png\n        logo.png\n        progresslogo.png\n        style.css\n        UnityProgress.js</code></pre></div>'}}),"\n",p.createElement(a.p,null,"index.html は下記の通り。\nindex.html"),"\n",p.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="html"><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en-us<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Content-Type<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/html; charset=utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Unity WebGL Player | UnityProject<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>TemplateData/style.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shortcut icon<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>TemplateData/favicon.ico<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>TemplateData/UnityProgress.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>template<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>header<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span>Unity WebGL Player | <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>UnityProject<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>template-wrap clear<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>canvas</span>\n        <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>emscripten<span class="token punctuation">"</span></span>\n        <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>canvas<span class="token punctuation">"</span></span>\n        <span class="token attr-name">oncontextmenu</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>event.preventDefault()<span class="token punctuation">"</span></span>\n        <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>600px<span class="token punctuation">"</span></span>\n        <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>960px<span class="token punctuation">"</span></span>\n      <span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>canvas</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fullscreen<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>\n          <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>TemplateData/fullscreen.png<span class="token punctuation">"</span></span>\n          <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>38<span class="token punctuation">"</span></span>\n          <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>38<span class="token punctuation">"</span></span>\n          <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Fullscreen<span class="token punctuation">"</span></span>\n          <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Fullscreen<span class="token punctuation">"</span></span>\n          <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">SetFullscreen</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span>\n        <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>UnityProject<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token entity named-entity" title="&laquo;">&amp;laquo;</span> created with\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://unity3d.com/<span class="token punctuation">"</span></span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Go to unity3d.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Unity<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span> <span class="token entity named-entity" title="&raquo;">&amp;raquo;</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n      <span class="token keyword">var</span> Module <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token constant">TOTAL_MEMORY</span><span class="token operator">:</span> <span class="token number">268435456</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">errorhandler</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// arguments: err, url, line. This function must return \'true\' if the error is handled, otherwise \'false\'</span>\n        <span class="token literal-property property">compatibilitycheck</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">dataUrl</span><span class="token operator">:</span> <span class="token string">"Release/WebGL.data"</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">codeUrl</span><span class="token operator">:</span> <span class="token string">"Release/WebGL.js"</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">memUrl</span><span class="token operator">:</span> <span class="token string">"Release/WebGL.mem"</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Release/UnityLoader.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span></code></pre></div>'}}),"\n",p.createElement(a.p,null,"上記から適当に html を切り出して埋め込んでみた。特に問題なく動作。\nちなみに、コンパイル時間は非常に長い。\nIL2CPP で C#を c++化して、emscripten で C++を Javascript(asm.js)化するそうだ。\nシーンだけじゃなくてシステムもすべて都度ビルドしてそうな感じなので今回のような微小なシーンしか含んでいなくてもコンパイルが結構長い。\nうちのマシンではパワー不足。\nあと、github にこのページを push する時に容量制限にひっかかってしまった。\n一回のコミットが大きすぎるという件。\nファイル容量をチェックした結果 WebGL.jsgz が 3M あるのでこれだ。\nWebGL.jsgz とそれ以外にコミットを分けたら push はできた。\n現状、以下の 2 点がネック。"),"\n",p.createElement(a.p,null,"コンパイルが長い\ngithub でホストする場合容量制限にひっかっかって push できない可能性がある"),"\n",p.createElement(a.p,null,"そのうちこの辺りは改善されるだろうけど。\nthree.js のサンプルを乗っける手軽さというわけにはいかない。\nわりとポテンシャルを感じるので、サイトに埋め込んで遊べる方法を模索したいところ。"))}var o=function(n){void 0===n&&(n={});const{wrapper:a}=Object.assign({},(0,t.ah)(),n.components);return a?p.createElement(a,n,p.createElement(e,n)):e(n)},c=s(8678),l=s(1883),u=s(8838);const k={code:n=>{let{children:a,className:s}=n;return s?p.createElement(u.Z,{className:s},a):p.createElement("code",null,a)}};function r(n){let{data:a,children:s}=n;const e=a.mdx.frontmatter;return p.createElement(c.Z,null,p.createElement("h1",null,e.title),p.createElement("div",{className:"tags-index"},e.tags&&e.tags.length>0&&e.tags.map((n=>p.createElement(l.rU,{to:"/tags/"+n+"/",itemProp:"url"},p.createElement("button",null,n))))),p.createElement(t.Zo,{components:k},s))}function i(n){return p.createElement(r,n,p.createElement(o,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2015-12-30-unity-webgl-md-1c2e8402eea0061979b9.js.map