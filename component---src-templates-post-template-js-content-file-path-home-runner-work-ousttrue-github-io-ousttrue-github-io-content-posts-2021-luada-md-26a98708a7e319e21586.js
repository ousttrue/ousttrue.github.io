"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5377],{1184:function(n,a,s){s.r(a),s.d(a,{default:function(){return k}});var e=s(1151),t=s(7294);function p(n){const a=Object.assign({p:"p",a:"a",span:"span",h1:"h1",h2:"h2",ul:"ul",li:"li",h3:"h3"},(0,e.ah)(),n.components);return t.createElement(t.Fragment,null,t.createElement(a.p,null,"vscode の lua デバッガーに"),"\n",t.createElement(a.p,null,t.createElement(a.a,{href:"https://marketplace.visualstudio.com/items?itemName=tomblind.local-lua-debugger-vscode"},"https://marketplace.visualstudio.com/items?itemName=tomblind.local-lua-debugger-vscode")," を使っていたのだが、"),"\n",t.createElement(a.p,null,t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">launch.json</code>'}})," の ",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">args</code>'}})," に ",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">\\\\</code>'}})," が入るとエラーで起動できない。\nWindows で作業しているので、稀によくファイルパスの指定に ",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">\\\\</code>'}})," が入る。"),"\n",t.createElement(a.h1,null,"DebugAdapter を作っていたら、直し方がわかった"),"\n",t.createElement(a.p,null,t.createElement(a.a,{href:"https://github.com/ousttrue/local-lua-debugger-vscode/commit/0f3974b73964b2e34f90a21de9757a57d6746eb4"},"https://github.com/ousttrue/local-lua-debugger-vscode/commit/0f3974b73964b2e34f90a21de9757a57d6746eb4")),"\n",t.createElement(a.h2,null,"PR"),"\n",t.createElement(a.p,null,t.createElement(a.a,{href:"https://github.com/tomblind/local-lua-debugger-vscode/pull/37"},"https://github.com/tomblind/local-lua-debugger-vscode/pull/37")),"\n",t.createElement(a.p,null,"Linux では動かんかったらしく、別の方法で修正してくれた。"),"\n",t.createElement(a.p,null,"👍 ",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">0.2.2</code>'}})," ",t.createElement(a.a,{href:"https://github.com/tomblind/local-lua-debugger-vscode/blob/master/CHANGELOG.md"},"https://github.com/tomblind/local-lua-debugger-vscode/blob/master/CHANGELOG.md")),"\n",t.createElement(a.h1,null,"自前で ",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">DebugAdapter</code>'}})," 作ってみることにした。"),"\n",t.createElement(a.p,null,t.createElement(a.a,{href:"https://github.com/ousttrue/luada"},"https://github.com/ousttrue/luada")),"\n",t.createElement(a.p,null,"途中まで実装したのだが、"),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,"luajit.exe + luada.lua"),"\n"),"\n",t.createElement(a.p,null,"という構成よりは、"),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,"luada.exe"),"\n"),"\n",t.createElement(a.p,null,"の方が取り回しがよくて、それなら lua 成分をもっと減らして JSON-RPC 制御も ",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">c++</code>'}})," なり ",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">rust</code>'}})," なりにして\nlua 埋め込み型の exe が作りやすそう。\n元々、 スタンドアロンの lua インタプリタと組み合わせて使う lua スクリプトという方向性で実装していたのだが、\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">luajit-2.1.0-beta3</code>'}})," 一辺倒になりつつあるので気分が変わってきたのであった。\nこれに関しては、今の構成でできるところまでやってみよう。"),"\n",t.createElement(a.h1,null,"VSCode の Extension を作る"),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,t.createElement(a.a,{href:"https://code.visualstudio.com/api/get-started/your-first-extension"},"https://code.visualstudio.com/api/get-started/your-first-extension")),"\n"),"\n",t.createElement(a.p,null,"手順通りに初期化した。npm は最新版に更新したほうがよいぽい。"),"\n",t.createElement(a.h1,null,"MockDebug"),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,t.createElement(a.a,{href:"https://code.visualstudio.com/api/extension-guides/debugger-extension"},"https://code.visualstudio.com/api/extension-guides/debugger-extension")),"\n"),"\n",t.createElement(a.p,null,"を読む。"),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,t.createElement(a.a,{href:"https://github.com/microsoft/vscode-mock-debug"},"https://github.com/microsoft/vscode-mock-debug")),"\n"),"\n",t.createElement(a.p,null,"というサンプルがある。"),"\n",t.createElement(a.p,null,"いくつかの機能をまとめて提供する必要がありそう。"),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,"launch.json の設定"),"\n",t.createElement(a.li,null,"DebugAdapter 本体"),"\n",t.createElement(a.li,null,"DebugAdapter を起動する"),"\n"),"\n",t.createElement(a.h1,null,"実装してみる"),"\n",t.createElement(a.h2,null,"Extension の activate"),"\n",t.createElement(a.p,null,"適当にイベントを登録して"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="json"><pre class="language-json"><code class="language-json">    <span class="token comment">// package.json</span>\n    <span class="token property">"activationEvents"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">"onDebug"</span><span class="token punctuation">,</span>\n        <span class="token string">"onDebugInitialConfigurations"</span><span class="token punctuation">,</span>\n        <span class="token string">"onDebugDynamicConfigurations"</span><span class="token punctuation">,</span>\n        <span class="token string">"onDebugResolve:lua"</span><span class="token punctuation">,</span>\n        <span class="token string">"onLanguage:lua"</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span></code></pre></div>'}}),"\n",t.createElement(a.p,null,t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">activate</code>'}})," されることを確認"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="ts"><pre class="language-ts"><code class="language-ts"><span class="token comment">// src/extension.ts</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">activate</span><span class="token punctuation">(</span>context<span class="token operator">:</span> vscode<span class="token punctuation">.</span>ExtensionContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'activate luada\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",t.createElement(a.h2,null,"Launch"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="json"><pre class="language-json"><code class="language-json">    <span class="token property">"contributes"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">"breakpoints"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n            <span class="token punctuation">{</span>\n                <span class="token property">"language"</span><span class="token operator">:</span> <span class="token string">"lua"</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token property">"debuggers"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n            <span class="token punctuation">{</span>\n                <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"luada"</span><span class="token punctuation">,</span>\n                <span class="token property">"label"</span><span class="token operator">:</span> <span class="token string">"LuaDA"</span><span class="token punctuation">,</span>\n                <span class="token property">"languages"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n                    <span class="token string">"lua"</span>\n                <span class="token punctuation">]</span><span class="token punctuation">,</span>\n                <span class="token comment">// launch.json のテンプレート</span>\n                <span class="token property">"initialConfigurations"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n                    <span class="token punctuation">{</span>\n                        <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"luada"</span><span class="token punctuation">,</span>\n                        <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"launch luada"</span><span class="token punctuation">,</span>\n                        <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>\n                        <span class="token property">"program"</span><span class="token operator">:</span> <span class="token string">"${workspaceFolder}/main.lua"</span><span class="token punctuation">,</span>\n                        <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n                    <span class="token punctuation">}</span>\n                <span class="token punctuation">]</span><span class="token punctuation">,</span>\n                <span class="token comment">// request: launch に対して可能な property の定義</span>\n                <span class="token property">"configurationAttributes"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n                    <span class="token property">"launch"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n                        <span class="token property">"properties"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n                            <span class="token property">"program"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n                                <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"string"</span><span class="token punctuation">,</span>\n                                <span class="token property">"markdownDescription"</span><span class="token operator">:</span> <span class="token string">"Lua program to debug - set this to the path of the script"</span><span class="token punctuation">,</span>\n                                <span class="token property">"default"</span><span class="token operator">:</span> <span class="token string">"${workspaceFolder}/main.lua"</span>\n                            <span class="token punctuation">}</span><span class="token punctuation">,</span>                            \n                            <span class="token property">"arg"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n                                <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"array"</span><span class="token punctuation">,</span>\n                                <span class="token property">"markdownDescription"</span><span class="token operator">:</span> <span class="token string">"Command line argument, arg[1] ... arg[n]"</span><span class="token punctuation">,</span>\n                                <span class="token property">"default"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n                            <span class="token punctuation">}</span>                            \n                        <span class="token punctuation">}</span>\n                    <span class="token punctuation">}</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span></code></pre></div>'}}),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,"activate で DebugAdapterDescriptorFactory を登録"),"\n",t.createElement(a.li,null,"launch で createDebugAdapterDescriptor を実行する"),"\n"),"\n",t.createElement(a.p,null,t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">src/extensions.ts</code>'}})),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="ts"><pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> vscode <span class="token keyword">from</span> <span class="token string">\'vscode\'</span><span class="token punctuation">;</span>\n\n\n<span class="token keyword">function</span> <span class="token function">createDebugAdapterDescriptorFactory</span><span class="token punctuation">(</span>context<span class="token operator">:</span> vscode<span class="token punctuation">.</span>ExtensionContext<span class="token punctuation">)</span><span class="token operator">:</span> vscode<span class="token punctuation">.</span>DebugAdapterDescriptorFactory <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        <span class="token function">createDebugAdapterDescriptor</span><span class="token punctuation">(</span>\n            session<span class="token operator">:</span> vscode<span class="token punctuation">.</span>DebugSession<span class="token punctuation">,</span>\n            executable<span class="token operator">:</span> vscode<span class="token punctuation">.</span>DebugAdapterExecutable <span class="token operator">|</span> <span class="token keyword">undefined</span>\n        <span class="token punctuation">)</span><span class="token operator">:</span> vscode<span class="token punctuation">.</span>ProviderResult<span class="token operator">&lt;</span>vscode<span class="token punctuation">.</span>DebugAdapterDescriptor<span class="token operator">></span> <span class="token punctuation">{</span>\n            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'launch luada\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">const</span> runtime <span class="token operator">=</span> <span class="token string">"exe"</span><span class="token punctuation">;</span>\n            <span class="token keyword">const</span> runtimeArgs<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n            <span class="token comment">//</span>\n            <span class="token comment">// デバッグアダプターを起動する</span>\n            <span class="token comment">// 起動したアダプターと vscode は、標準入出力で JSON-RPC により DebugAdapterProtocol で通信する。</span>\n            <span class="token comment">//</span>\n            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">vscode</span><span class="token punctuation">.</span><span class="token function">DebugAdapterExecutable</span><span class="token punctuation">(</span>runtime<span class="token punctuation">,</span> runtimeArgs<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">activate</span><span class="token punctuation">(</span>context<span class="token operator">:</span> vscode<span class="token punctuation">.</span>ExtensionContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'activate luada\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    context<span class="token punctuation">.</span>subscriptions<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>vscode<span class="token punctuation">.</span>debug<span class="token punctuation">.</span><span class="token function">registerDebugAdapterDescriptorFactory</span><span class="token punctuation">(</span><span class="token string">\'luada\'</span><span class="token punctuation">,</span> <span class="token function">createDebugAdapterDescriptorFactory</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">deactivate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></code></pre></div>'}}),"\n",t.createElement(a.h2,null,"Debug Adapter の実装"),"\n",t.createElement(a.p,null,t.createElement(a.a,{href:"https://microsoft.github.io/debug-adapter-protocol/specification"},"https://microsoft.github.io/debug-adapter-protocol/specification")),"\n",t.createElement(a.p,null,"を見て粛々と実装する。"),"\n",t.createElement(a.h3,null,t.createElement(a.a,{href:"https://microsoft.github.io/debug-adapter-protocol/specification#Events_Output"},"Output Event")),"\n",t.createElement(a.p,null,"vscode の DebugConsole に出力されるので早期に作ると print debug の助けになる。"),"\n",t.createElement(a.h3,null,"Logger"),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,"DebugAdapterProtocol のやりとりすべてを記録する機能をアダプター側で作るべし。無いとデバッグ困難に。"),"\n"),"\n",t.createElement(a.p,null,"例"),"\n",t.createElement(a.p,null,t.createElement(a.a,{href:"https://github.com/Microsoft/vscode-debugadapter-node/blob/main/adapter/src/loggingDebugSession.ts"},"https://github.com/Microsoft/vscode-debugadapter-node/blob/main/adapter/src/loggingDebugSession.ts")),"\n",t.createElement(a.h2,null,"VSIX に出力"),"\n",t.createElement(a.p,null,t.createElement(a.a,{href:"https://code.visualstudio.com/api/working-with-extensions/publishing-extension"},"https://code.visualstudio.com/api/working-with-extensions/publishing-extension")),"\n",t.createElement(a.p,null,"vsce を使う。"),"\n",t.createElement(a.p,null,"package.json に追加。"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="json"><pre class="language-json"><code class="language-json">    <span class="token property">"publisher"</span><span class="token operator">:</span> <span class="token string">"ousttrue"</span><span class="token punctuation">,</span>\n    <span class="token property">"repository"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"git"</span><span class="token punctuation">,</span>\n        <span class="token property">"url"</span><span class="token operator">:</span> <span class="token string">"https://github.com/ousttrue/luada.git"</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span></code></pre></div>'}}),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ npx vsce package</code></pre></div>'}}),"\n",t.createElement(a.h1,null,"参考"),"\n",t.createElement(a.h2,null,t.createElement(a.a,{href:"https://github.com/actboy168/lua-debug"},"https://github.com/actboy168/lua-debug")),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,"vscode.DebugAdapterExecutable"),"\n"),"\n",t.createElement(a.h2,null,t.createElement(a.a,{href:"https://github.com/tomblind/local-lua-debugger-vscode"},"https://github.com/tomblind/local-lua-debugger-vscode")),"\n",t.createElement(a.ul,null,"\n",t.createElement(a.li,null,"vscode.DebugAdapterServer"),"\n",t.createElement(a.li,null,"TypeScript で vscode.DebugAdapterServer を new"),"\n",t.createElement(a.li,null,"vscode と DebugAdapterServer が DAP で通信"),"\n",t.createElement(a.li,null,"DebugAdapterServer が lua を spawn もしている"),"\n"))}var o=function(n){void 0===n&&(n={});const{wrapper:a}=Object.assign({},(0,e.ah)(),n.components);return a?t.createElement(a,n,t.createElement(p,n)):p(n)},l=s(8678),c=s(1883),u=s(8838);const r={code:n=>{let{children:a,className:s}=n;return s?t.createElement(u.Z,{className:s},a):t.createElement("code",null,a)}};function i(n){let{data:a,children:s}=n;const p=a.mdx.frontmatter;return t.createElement(l.Z,null,t.createElement("h1",null,p.title),t.createElement("div",{className:"tags-index"},p.tags&&p.tags.length>0&&p.tags.map((n=>t.createElement(c.rU,{to:"/tags/"+n+"/",itemProp:"url"},t.createElement("button",null,n))))),t.createElement(e.Zo,{components:r},s))}function k(n){return t.createElement(i,n,t.createElement(o,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2021-luada-md-26a98708a7e319e21586.js.map