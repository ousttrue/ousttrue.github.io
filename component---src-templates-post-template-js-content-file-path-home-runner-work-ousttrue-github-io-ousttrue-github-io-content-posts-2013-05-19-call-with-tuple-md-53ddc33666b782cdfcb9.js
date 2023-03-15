"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2591],{1104:function(e,n,t){t.r(n),t.d(n,{default:function(){return g}});var a=t(1151),s=t(7294);function c(e){const n=Object.assign({p:"p",span:"span"},(0,a.ah)(),e.components);return s.createElement(s.Fragment,null,s.createElement(n.p,null,"msgpack-rpc-asio の関数登録と実行\nmsgpack-rpc のリクエストは、によると"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">[type, msgid, method, params]</code></pre></div>'}}),"\n",s.createElement(n.p,null,"という形式なので method 名を std::string として params を std::tuple として得られる。\nこれをサーバ側で如何に呼び出すかについて。\n単純な実装だと以下のようにメソッド名をキーにして分岐することになる。"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">int and(int, int);\nclass dispatcher { void dispatch(int msgid, const std::string &amp;method,\nconst msgpack::object &amp;params) { if(method==“add”){ // 引数展開\nstd::tuple t; params.convert(&amp;t);\n// 関数実行\nint result=add(std::get&lt;0&gt;(t), std::get&lt;1&gt;(t));\n\n// 結果のパッキング\n// response [type, msgid, error, result]\nmsgpack::sbuffer response;\nmsgpack::packer&lt;msgpack::sbuffer&gt; pk(&amp;response);\npk.pack_array(4)\npk.pack(1);\npk.pack(msgid);\npk.pack_nil();\npk.pack(result);\n\n// responseを送り返す\n\n\n} else{ throw “unknown func”; }\n\n}</code></pre></div>'}}),"\n",s.createElement(n.p,null,"引数展開、関数呼び出し、結果のパッキングと一連の操作を定型処理として括りだすと下記のように書ける。"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">// ２引数展開用 class dispatcher { // 実行 void dispatcher::dispatch(int\nmsgid, const std::string &amp;method, const msgpack::object &amp;params) {\nif(method==“add”){ msgpack::sbuffer response=unpack_exec_pack(msgid,\nadd, params);\n// responseを送り返す\n\n\n} else{ throw “unknown func”; }\n\n}\n// ヘルパー template msgpack::sbuffer unpack_exec_pack(int msgid,\nR(*f)(A1, A2), const msgpack::object &amp;params) { // 引数展開 std::tuple\nt; params.convert(&amp;t);\n// 関数実行\nR result=add(std::get&lt;0&gt;(t), std::get&lt;1&gt;(t));\n\n// 結果のパッキング\n// response [type, msgid, error, result]\nmsgpack::sbuffer response;\nmsgpack::packer&lt;msgpack::sbuffer&gt; pk(&amp;response);\npk.pack_array(4)\npk.pack(1);\npk.pack(msgid);\npk.pack_nil();\npk.pack(result);\n\nreturn response;\n\n}</code></pre></div>'}}),"\n",s.createElement(n.p,null,"１引数関数から９引数くらいまでと返り値 void 版を作ってやればだいたいの関数を登録することができる。\nさらに 関数の登録と実行を分けるべく次のように拡張した。"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">class\ndispatcher { std::map m_map;\n// 実行 void dispatch(int msgid, const std::string &amp;method, const\nmsgpack::object &amp;params) { std::function f=m_map.find(method);\nif(f!=m_map.end()){ // 関数実行 msgpack::sbuffer resonse=f(msgid,\nparams);\n// responseを送り返す\n\n\n} else{ throw “unknown func”; }\n\n}\n// 登録 template void add_handler(const std::string &amp;method, R(*f)(A1,\nA2)) {\nm_map[method]=f-&gt;msgpack::sbuffer{\n// 引数展開\nstd::tuple&lt;A1, A2&gt; t;\nparams.convert(&amp;t);\n\n// 実行\nR result=f(std::get&lt;0&gt;(t), std::get&lt;1&gt;(t));\n\n// 結果のパッキング\n// response [type, msgid, error, result]\nmsgpack::sbuffer response;\nmsgpack::packer&lt;msgpack::sbuffer&gt; pk(&amp;response);\npk.pack_array(4)\npk.pack(1);\npk.pack(msgid);\npk.pack_nil();\npk.pack(result);\n\nreturn response;\n\n\n};\n\n}</code></pre></div>'}}),"\n",s.createElement(n.p,null,s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">msgpack->引数展開->c++関数呼び出し->msgpack</code>'}})," への一連の操作を 同一のシグネチャの ",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">std::function</code>'}})," に封じ込めることができる。\n次にこれを関数ポインタ以外に関数オブジェクトを受け付けるように拡張したい。\nまず、std::function から実装。"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">c++   // std::function用   template&lt;typname R, typename A1, typename A2>   void add_handler(contt std::string &amp;method, std::function&lt;R(A1, A2)> f)   {     // 中身同じ   }</code></pre></div>'}}),"\n",s.createElement(n.p,null,"呼び出し時に std::function を経由するようにすればあらゆる関数呼び出しを登録できる。\n例えば、ラムダ関数も以下のように登録できる。"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">c++ // ラムダ登録 dispatcher d; d.add_handler("add",      std::function&lt;int(int, int)>(       [](int a, int b)->int{          return a+b;        }));</code></pre></div>'}}),"\n",s.createElement(n.p,null,"しかし、どうせなら"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">c++ dispatcher d; d.add_handler("add",      [](int a, int b)->int{        return a+b;      });</code></pre></div>'}}),"\n",s.createElement(n.p,null,"と書きたい。\nとなると下記のような登録関数を書かねばならぬが関数のシグネチャがわからないので中身を記述することができない。"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">// ラムダの登録\ntemplate&lt;typname F&gt;\nvoid add_handler(const std::string &amp;method, F f)   {     // 型がわからぬ   }</code></pre></div>'}}),"\n",s.createElement(n.p,null,"ここで関数オブジェクトの operator()へのポインタを型推論することで F のシグネチャを得ることができる。"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">template void add_handler(const std::string &amp;method, F f,\nR(C::*)(A1, A2)const) { // 中身同じ }\n// ラムダの登録 // std::functionも受けられる // std::bindは無理だった //</code></pre></div>'}}),"\n",s.createElement(n.p,null,"operator()がひとつしかない関数オブジェクトを受け付けられる？"),"\n",s.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">template\nvoid add_handler(const std::string &amp;method, F f) {\n// 上の関数で型推論させる\nadd_handler(method, f, &amp;F::operator()); }</code></pre></div>'}}),"\n",s.createElement(n.p,null,"これでめでたくラムダも直接登録できるようになった。\nただし、operator()のオーバーロードが解決できないらしく std::bind が登録できない。\nstd::bind に関しては、ラムダで代用できるし std::function でラップできるのでおいておくことにした。"))}var l=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?s.createElement(n,e,s.createElement(c,e)):c(e)},r=(t(8678),t(8838));const d={code:e=>{let{children:n,className:t}=e;return t?s.createElement(r.Z,{className:t},n):s.createElement("code",null,n)}};function p(e){let{data:n,children:t}=e;return s.createElement(s.Fragment,null,s.createElement("h1",null,n.mdx.frontmatter.title),s.createElement(a.Zo,{components:d},t))}function g(e){return s.createElement(p,e,s.createElement(l,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-05-19-call-with-tuple-md-53ddc33666b782cdfcb9.js.map