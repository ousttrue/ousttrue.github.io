"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2591],{1104:function(n,s,a){a.r(s),a.d(s,{default:function(){return r}});var p=a(1151),t=a(7294);function o(n){const s=Object.assign({p:"p",span:"span"},(0,p.ah)(),n.components);return t.createElement(t.Fragment,null,t.createElement(s.p,null,"(記事復旧のついでに少し修正)"),"\n",t.createElement(s.p,null,"msgpack-rpcのリクエストは、によると"),"\n",t.createElement(s.p,null,t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">[type, msgid, method, params]</code>'}})),"\n",t.createElement(s.p,null,"という形式なのでmethod名をstd::stringとしてparamsをstd::tupleとして得られる。\nこれをサーバ側で如何に呼び出すかについて。"),"\n",t.createElement(s.p,null,"単純な実装だと以下のようにメソッド名をキーにして分岐することになる。"),"\n",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cpp"><pre class="language-cpp"><code class="language-cpp"><span class="token keyword">int</span> <span class="token function">and</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">dispatcher</span> <span class="token punctuation">{</span>\n\n    <span class="token keyword">void</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token keyword">int</span> msgid<span class="token punctuation">,</span> <span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string <span class="token operator">&amp;</span>method<span class="token punctuation">,</span> <span class="token keyword">const</span> msgpack<span class="token double-colon punctuation">::</span>object <span class="token operator">&amp;</span>params<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">if</span><span class="token punctuation">(</span>method<span class="token operator">==</span>“add”<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 引数展開</span>\n            std<span class="token double-colon punctuation">::</span>tuple t<span class="token punctuation">;</span> params<span class="token punctuation">.</span><span class="token function">convert</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token comment">// 関数実行</span>\n            <span class="token keyword">int</span> result<span class="token operator">=</span><span class="token function">add</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token number">0</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token comment">// 結果のパッキング</span>\n            <span class="token comment">// response [type, msgid, error, result]</span>\n            msgpack<span class="token double-colon punctuation">::</span>sbuffer response<span class="token punctuation">;</span>\n            msgpack<span class="token double-colon punctuation">::</span>packer<span class="token operator">&lt;</span>msgpack<span class="token double-colon punctuation">::</span>sbuffer<span class="token operator">></span> <span class="token function">pk</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack_array</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span>msgid<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack_nil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token comment">// responseを送り返す</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">else</span><span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> “unknown func”<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",t.createElement(s.p,null,"引数展開、関数呼び出し、結果のパッキングと一連の操作を定型処理として括りだすと下記のように書ける。"),"\n",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cpp"><pre class="language-cpp"><code class="language-cpp"><span class="token comment">// ２引数展開用</span>\n<span class="token keyword">class</span> <span class="token class-name">dispatcher</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 実行</span>\n    <span class="token keyword">void</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token keyword">int</span> msgid<span class="token punctuation">,</span> <span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string <span class="token operator">&amp;</span>method<span class="token punctuation">,</span> <span class="token keyword">const</span> msgpack<span class="token double-colon punctuation">::</span>object <span class="token operator">&amp;</span>params<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token keyword">if</span><span class="token punctuation">(</span>method<span class="token operator">==</span>“add”<span class="token punctuation">)</span>\n        <span class="token punctuation">{</span>\n            msgpack<span class="token double-colon punctuation">::</span>sbuffer response<span class="token operator">=</span><span class="token function">unpack_exec_pack</span><span class="token punctuation">(</span>msgid<span class="token punctuation">,</span> add<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token comment">// responseを送り返す</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">else</span><span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> “unknown func”<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// ヘルパー</span>\n<span class="token keyword">template</span> msgpack<span class="token double-colon punctuation">::</span>sbuffer <span class="token function">unpack_exec_pack</span><span class="token punctuation">(</span>\n    <span class="token keyword">int</span> msgid<span class="token punctuation">,</span> <span class="token function">R</span><span class="token punctuation">(</span><span class="token operator">*</span>f<span class="token punctuation">)</span><span class="token punctuation">(</span>A1<span class="token punctuation">,</span> A2<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">const</span> msgpack<span class="token double-colon punctuation">::</span>object <span class="token operator">&amp;</span>params<span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">// 引数展開</span>\n    std<span class="token double-colon punctuation">::</span>tuple t<span class="token punctuation">;</span> params<span class="token punctuation">.</span><span class="token function">convert</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// 関数実行</span>\n    R result<span class="token operator">=</span><span class="token function">add</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token number">0</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// 結果のパッキング</span>\n    <span class="token comment">// response [type, msgid, error, result]</span>\n    msgpack<span class="token double-colon punctuation">::</span>sbuffer response<span class="token punctuation">;</span>\n    msgpack<span class="token double-colon punctuation">::</span>packer<span class="token operator">&lt;</span>msgpack<span class="token double-colon punctuation">::</span>sbuffer<span class="token operator">></span> <span class="token function">pk</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    pk<span class="token punctuation">.</span><span class="token function">pack_array</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>\n    pk<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    pk<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span>msgid<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    pk<span class="token punctuation">.</span><span class="token function">pack_nil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    pk<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> response<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",t.createElement(s.p,null,"１引数関数から９引数くらいまでと返り値void版を作ってやればだいたいの関数を登録することができる。"),"\n",t.createElement(s.p,null,"さらに 関数の登録と実行を分けるべく次のように拡張した。"),"\n",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cpp"><pre class="language-cpp"><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">dispatcher</span> <span class="token punctuation">{</span>\n    std<span class="token double-colon punctuation">::</span>map m_map<span class="token punctuation">;</span>\n\n    <span class="token comment">// 実行</span>\n    <span class="token keyword">void</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token keyword">int</span> msgid<span class="token punctuation">,</span> <span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string <span class="token operator">&amp;</span>method<span class="token punctuation">,</span> <span class="token keyword">const</span> msgpack<span class="token double-colon punctuation">::</span>object <span class="token operator">&amp;</span>params<span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        std<span class="token double-colon punctuation">::</span>function f<span class="token operator">=</span>m_map<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span><span class="token punctuation">(</span>f<span class="token operator">!=</span>m_map<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n            <span class="token comment">// 関数実行</span>\n            msgpack<span class="token double-colon punctuation">::</span>sbuffer resonse<span class="token operator">=</span><span class="token function">f</span><span class="token punctuation">(</span>msgid<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token comment">// responseを送り返す</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">else</span><span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> “unknown func”<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// 登録</span>\n    <span class="token keyword">template</span> <span class="token keyword">void</span> <span class="token function">add_handler</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string <span class="token operator">&amp;</span>method<span class="token punctuation">,</span> <span class="token function">R</span><span class="token punctuation">(</span><span class="token operator">*</span>f<span class="token punctuation">)</span><span class="token punctuation">(</span>A1<span class="token punctuation">,</span> A2<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        m_map<span class="token punctuation">[</span>method<span class="token punctuation">]</span><span class="token operator">=</span>f<span class="token operator">-></span>msgpack<span class="token double-colon punctuation">::</span>sbuffer<span class="token punctuation">{</span>\n\n            <span class="token comment">// 引数展開</span>\n            std<span class="token double-colon punctuation">::</span>tuple<span class="token operator">&lt;</span>A1<span class="token punctuation">,</span> A2<span class="token operator">></span> t<span class="token punctuation">;</span>\n            params<span class="token punctuation">.</span><span class="token function">convert</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token comment">// 実行</span>\n            R result<span class="token operator">=</span><span class="token function">f</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token number">0</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token number">1</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token comment">// 結果のパッキング</span>\n            <span class="token comment">// response [type, msgid, error, result]</span>\n            msgpack<span class="token double-colon punctuation">::</span>sbuffer response<span class="token punctuation">;</span>\n            msgpack<span class="token double-colon punctuation">::</span>packer<span class="token operator">&lt;</span>msgpack<span class="token double-colon punctuation">::</span>sbuffer<span class="token operator">></span> <span class="token function">pk</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack_array</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span>msgid<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack_nil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            pk<span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n            <span class="token keyword">return</span> response<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",t.createElement(s.p,null,t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">msgpack->引数展開->cpp関数呼び出し->msgpack</code>'}})," への一連の操作を 同一のシグネチャの",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">std::function</code>'}})," に 封じ込めることができる。"),"\n",t.createElement(s.p,null,"次にこれを関数ポインタ以外に関数オブジェクトを受け付けるように拡張したい。 まず、std::functionから実装。"),"\n",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cpp"><pre class="language-cpp"><code class="language-cpp"><span class="token comment">// std::function用</span>\n<span class="token keyword">template</span><span class="token operator">&lt;</span>typname R<span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">A1</span><span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">A2</span><span class="token operator">></span>\n<span class="token keyword">void</span> <span class="token function">add_handler</span><span class="token punctuation">(</span>contt std<span class="token double-colon punctuation">::</span>string <span class="token operator">&amp;</span>method<span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>function<span class="token operator">&lt;</span><span class="token function">R</span><span class="token punctuation">(</span>A1<span class="token punctuation">,</span> A2<span class="token punctuation">)</span><span class="token operator">></span> f<span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">// 中身同じ</span>\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",t.createElement(s.p,null,"呼び出し時に ",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">std::function</code>'}})," を経由するようにすればあらゆる関数呼び出しを登録できる。 例えば、ラムダ関数も以下のように登録できる。"),"\n",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cpp"><pre class="language-cpp"><code class="language-cpp"><span class="token comment">// ラムダ登録</span>\ndispatcher d<span class="token punctuation">;</span>\nd<span class="token punctuation">.</span><span class="token function">add_handler</span><span class="token punctuation">(</span><span class="token string">"add"</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">function</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>\n    <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token operator">-></span><span class="token keyword">int</span><span class="token punctuation">{</span> <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",t.createElement(s.p,null,"しかし、どうせなら"),"\n",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cpp"><pre class="language-cpp"><code class="language-cpp">dispatcher d<span class="token punctuation">;</span>\nd<span class="token punctuation">.</span><span class="token function">add_handler</span><span class="token punctuation">(</span><span class="token string">"add"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token operator">-></span><span class="token keyword">int</span><span class="token punctuation">{</span> <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",t.createElement(s.p,null,"と書きたい。"),"\n",t.createElement(s.p,null,"となると下記のような登録関数を書かねばならぬが関数のシグネチャがわからないので中身を記述することができない。"),"\n",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cpp"><pre class="language-cpp"><code class="language-cpp"><span class="token comment">// ラムダの登録</span>\n<span class="token keyword">template</span><span class="token operator">&lt;</span>typname F<span class="token operator">></span>\n<span class="token keyword">void</span> <span class="token function">add_handler</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string <span class="token operator">&amp;</span>method<span class="token punctuation">,</span> F f<span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">// 型がわからぬ</span>\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",t.createElement(s.p,null,"ここで関数オブジェクトのoperator()へのポインタを型推論することでFのシグネチャを得ることができる。"),"\n",t.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cpp"><pre class="language-cpp"><code class="language-cpp"> <span class="token keyword">template</span>\n <span class="token keyword">void</span> <span class="token function">add_handler</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string <span class="token operator">&amp;</span>method<span class="token punctuation">,</span> F f<span class="token punctuation">,</span> <span class="token function">R</span><span class="token punctuation">(</span>C<span class="token double-colon punctuation">::</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span>A1<span class="token punctuation">,</span> A2<span class="token punctuation">)</span><span class="token keyword">const</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n     <span class="token comment">// 中身同じ</span>\n <span class="token punctuation">}</span>\n<span class="token comment">// ラムダの登録</span>\n<span class="token comment">// std::functionも受けられる</span>\n<span class="token comment">// std::bindは無理だった</span>\n<span class="token comment">// operator()がひとつしかない関数オブジェクトを受け付けられる？</span>\n\n<span class="token keyword">template</span> <span class="token keyword">void</span> <span class="token function">add_handler</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string <span class="token operator">&amp;</span>method<span class="token punctuation">,</span> F f<span class="token punctuation">)</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">// 上の関数で型推論させる</span>\n    <span class="token function">add_handler</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> f<span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token class-name">F</span><span class="token double-colon punctuation">::</span><span class="token keyword">operator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",t.createElement(s.p,null,"これでめでたくラムダも直接登録できるようになった。\nただし、operator()のオーバーロードが解決できないらしくstd::bindが登録できない。 std::bindに関しては、ラムダで代用できるしstd::functionでラップできるのでおいておくことにした。"))}var c=function(n){void 0===n&&(n={});const{wrapper:s}=Object.assign({},(0,p.ah)(),n.components);return s?t.createElement(s,n,t.createElement(o,n)):o(n)},e=a(8678),l=a(1883),u=a(8838);const k={code:n=>{let{children:s,className:a}=n;return a?t.createElement(u.Z,{className:a},s):t.createElement("code",null,s)}};function i(n){let{data:s,children:a}=n;const o=s.mdx.frontmatter;return t.createElement(e.Z,null,t.createElement("h1",null,o.title),t.createElement("div",{className:"tags-index"},o.tags&&o.tags.length>0&&o.tags.map((n=>t.createElement(l.rU,{to:"/tags/"+n+"/",itemProp:"url"},t.createElement("button",null,n))))),t.createElement(p.Zo,{components:k},a))}function r(n){return t.createElement(i,n,t.createElement(c,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-05-19-call-with-tuple-md-1b9c9f391870202de8cf.js.map