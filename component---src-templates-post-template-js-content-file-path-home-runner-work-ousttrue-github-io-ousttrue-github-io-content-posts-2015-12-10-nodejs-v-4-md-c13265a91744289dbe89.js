"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[619],{8520:function(n,e,a){a.r(e),a.d(e,{default:function(){return u}});var t=a(1151),s=a(7294);function o(n){const e=Object.assign({p:"p",span:"span"},(0,t.ah)(),n.components);return s.createElement(s.Fragment,null,s.createElement(e.p,null,"ちょうど組み込まれている v8 エンジンのバージョンが 3 から 4 に上がる直前にインストールしていたようで、\nnode.js のバージョン"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">> node --version\nv0.12.7\n> node -p process.versions.v8\n3.28.71.19</code></pre></div>'}}),"\n",s.createElement(e.p,null,"だった。\n最新版(node-v4.2.3-x64.msi)をインストールしてみる。\nnode.js のバージョン"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">> node --version\nv4.2.3\n> node -p process.versions.v8\n4.5.103.35</code></pre></div>'}}),"\n",s.createElement(e.p,null,"v8 4.5 搭載ということで ES6 の機能がいろいろ使えるぞ。"),"\n",s.createElement(e.p,null,"http://v8project.blogspot.jp/2015/07/v8-45-release.html"),"\n",s.createElement(e.p,null,"exp.js"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> x<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token operator">></span> node exp<span class="token punctuation">.</span>js\n<span class="token operator">></span> SyntaxError<span class="token operator">:</span> Block<span class="token operator">-</span>scoped <span class="token function">declarations</span> <span class="token punctuation">(</span><span class="token keyword">let</span><span class="token punctuation">,</span> <span class="token keyword">const</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">,</span> <span class="token keyword">class</span><span class="token punctuation">)</span> not yet supported outside strict mode</code></pre></div>'}}),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">最近よく見る”use strict”が要るのか。\nexp.js。use strict\n"use strict";\n\nlet x=1;\nconsole.log(x);\n\nとしたらいけた。\nclass 構文も問題なし。typescript 使った後だとちょっと機能的に物足りない・・・\nclass Hoge\n{\n// コンストラクタと\nconstructor(name)\n{\nthis.name=name;\n}\n\n    // メソッドだけ定義できるらしい\n    printName()\n    {\n        console.log(this.name);\n    }\n\n}\n\nlet hoge=new Hoge(\'hoge\');\nhoge.printName();\n\nlet fuga={\nname: \'fuga\',\nprintName: hoge.printName,\n};\n\nfuga.printName();\n\nhoge\nfuga\n\nthis は元の通り。\narrow function も問題なく動いた。\nついでに browser でも実験してみよう。\nresult\n\nsource\nfirefox では、\nSyntaxError: class is a reserved identifier</code></pre></div>'}}),"\n",s.createElement(e.p,null,"になった。\nChrome なら動いた。なるほど。"))}var l=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,t.ah)(),n.components);return e?s.createElement(e,n,s.createElement(o,n)):o(n)},c=(a(8678),a(8838));const p={code:n=>{let{children:e,className:a}=n;return a?s.createElement(c.Z,{className:a},e):s.createElement("code",null,e)}};function r(n){let{data:e,children:a}=n;return s.createElement(s.Fragment,null,s.createElement("h1",null,e.mdx.frontmatter.title),s.createElement(t.Zo,{components:p},a))}function u(n){return s.createElement(r,n,s.createElement(l,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2015-12-10-nodejs-v-4-md-c13265a91744289dbe89.js.map