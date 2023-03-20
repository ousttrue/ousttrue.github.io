"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3938],{5172:function(n,s,a){a.r(s),a.d(s,{default:function(){return r}});var t=a(1151),p=a(7294);function o(n){const s=Object.assign({p:"p",a:"a",span:"span"},(0,t.ah)(),n.components);return p.createElement(p.Fragment,null,p.createElement(s.p,null,"Python の Version3.4 から始まった asyncio 周りについてのメモ。\n環境は、Windows10 上の python3.6(64bit)。"),"\n",p.createElement(s.p,null,"Version\nPython3.4"),"\n",p.createElement(s.p,null,"asyncio\nyield from"),"\n",p.createElement(s.p,null,"Python3.5"),"\n",p.createElement(s.p,null,"async def\nawait"),"\n",p.createElement(s.p,null,"EventLoop"),"\n",p.createElement(s.p,null,p.createElement(s.a,{href:"https://docs.python.org/3/library/asyncio-eventloop.html"},"https://docs.python.org/3/library/asyncio-eventloop.html")),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">import</span> asyncio\nloop<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">print</span><span class="token punctuation">(</span>loop<span class="token punctuation">)</span>\n<span class="token comment"># &lt;_WindowsSelectorEventLoop running=False closed=False debug=False></span>\n\nloop<span class="token punctuation">.</span>run_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'done\'</span><span class="token punctuation">)</span></code></pre></div>'}}),"\n",p.createElement(s.p,null,"ただし永遠(forever)走り続けるのでプロセスを kill しないと止まらず。\nWindows 向けの loop"),"\n",p.createElement(s.p,null,p.createElement(s.a,{href:"https://docs.python.org/3/library/asyncio-eventloops.html#asyncio.ProactorEventLoop"},"https://docs.python.org/3/library/asyncio-eventloops.html#asyncio.ProactorEventLoop")),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">import</span> asyncio\n<span class="token keyword">import</span> sys\n\n<span class="token keyword">if</span> sys<span class="token punctuation">.</span>platform <span class="token operator">==</span> <span class="token string">\'win32\'</span><span class="token punctuation">:</span>\n    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>ProactorEventLoop<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token comment"># &lt;ProactorEventLoop running=False closed=False debug=False></span>\n    asyncio<span class="token punctuation">.</span>set_event_loop<span class="token punctuation">(</span>loop<span class="token punctuation">)</span>\n<span class="token keyword">else</span><span class="token punctuation">:</span>\n    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span></code></pre></div>'}}),"\n",p.createElement(s.p,null,"以降、loop を得るコードを省略。\nEventLoop に関数を投入する"),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">func</span><span class="token punctuation">(</span>loop<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    loop<span class="token punctuation">.</span>stop<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 停止</span>\n\nloop<span class="token punctuation">.</span>call_soon<span class="token punctuation">(</span>func<span class="token punctuation">,</span> loop<span class="token punctuation">)</span>\nloop<span class="token punctuation">.</span>run_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'done\'</span><span class="token punctuation">)</span></code></pre></div>'}}),"\n",p.createElement(s.p,null,"asyncio.get_event_loop で loop を取得。loop.call_soon で loop に関数を投入できる。\n投入された関数は、loop.run_forever で消化される。\nついでに、loop.stop で run_forever から抜けることができる。\nEventLoop に generator を投入する"),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">gen</span><span class="token punctuation">(</span>loop<span class="token punctuation">,</span> name<span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> loop<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> i<span class="token punctuation">,</span> loop<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token keyword">yield</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">\'done\'</span><span class="token punctuation">)</span>\n    loop<span class="token punctuation">.</span>stop<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\nasyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>gen<span class="token punctuation">(</span>loop<span class="token punctuation">,</span> <span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\nasyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>gen<span class="token punctuation">(</span>loop<span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\nloop<span class="token punctuation">.</span>run_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\na <span class="token number">534341.609</span>\na <span class="token number">0</span> <span class="token number">534341.609</span>\nb <span class="token number">534341.609</span>\nb <span class="token number">0</span> <span class="token number">534341.609</span>\na <span class="token number">1</span> <span class="token number">534341.609</span>\nb <span class="token number">1</span> <span class="token number">534341.609</span>\na <span class="token number">2</span> <span class="token number">534341.609</span>\nb <span class="token number">2</span> <span class="token number">534341.609</span>\na done\nb done</code></pre></div>'}}),"\n",p.createElement(s.p,null,"loop.stop で止まった。\nすべての task が終わるのを待つ"),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">def gen(loop, name, count):\n    print(name, loop.time())\n    for i in range(count):\n        print(name, i, loop.time())\n        yield\n    print(name, \'done\')\n\ntaskA=asyncio.ensure_future(gen(loop, \'a\', 3), loop=loop)\ntaskB=asyncio.ensure_future(gen(loop, \'b\', 5), loop=loop)\nfuture=asyncio.gather(taskA, taskB)\nfuture.add_done_callback(lambda future: loop.stop())\ntask=asyncio.ensure_future(future, loop=loop)\n\nloop.run_forever()\n\na 571911.359\na 0 571911.359\nb 571911.359\nb 0 571911.359\na 1 571911.359\nb 1 571911.359\na 2 571911.359\nb 2 571911.359\na done\nb 3 571911.359\nb 4 571911.359\nb done</code></pre></div>'}}),"\n",p.createElement(s.p,null,"loop.run_until_complete で future が終わるのを待つ"),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">gen</span><span class="token punctuation">(</span>loop<span class="token punctuation">,</span> name<span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> loop<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> i<span class="token punctuation">,</span> loop<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token keyword">yield</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">\'done\'</span><span class="token punctuation">)</span>\nfutureA<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>gen<span class="token punctuation">(</span>loop<span class="token punctuation">,</span> <span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> loop<span class="token operator">=</span>loop<span class="token punctuation">)</span>\nfutureB<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>gen<span class="token punctuation">(</span>loop<span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> loop<span class="token operator">=</span>loop<span class="token punctuation">)</span>\nfuture<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span>futureA<span class="token punctuation">,</span> futureB<span class="token punctuation">)</span>\n\nloop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>future<span class="token punctuation">)</span></code></pre></div>'}}),"\n",p.createElement(s.p,null,"future の終了を待って loop.stop したいなら run_until_complete するのが明瞭。\nPEP492 – Coroutines with async and await syntax(python3.5 09-Apr-2015)"),"\n",p.createElement(s.p,null,"generator を流用した coroutine は紛らわしいので、coroutine に独自のシンタックスを導入するで。native coroutine と呼称する。C で実装しているわけではない。\n関数内で await を使わなくても coroutine として有効"),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">read_data</span><span class="token punctuation">(</span>db<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">pass</span>\n\nEventLoopにnative coroutineを投入する\n<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">gen</span><span class="token punctuation">(</span>loop<span class="token punctuation">,</span> name<span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> loop<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> i<span class="token punctuation">,</span> loop<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token comment">#yield</span>\n        <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">\'done\'</span><span class="token punctuation">)</span>\n\ntaskA<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>gen<span class="token punctuation">(</span>loop<span class="token punctuation">,</span> <span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> loop<span class="token operator">=</span>loop<span class="token punctuation">)</span>\ntaskB<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>gen<span class="token punctuation">(</span>loop<span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> loop<span class="token operator">=</span>loop<span class="token punctuation">)</span>\nfuture<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span>taskA<span class="token punctuation">,</span> taskB<span class="token punctuation">)</span>\n\nloop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>future<span class="token punctuation">)</span></code></pre></div>'}}),"\n",p.createElement(s.p,null,"yield を await asyncio.sleep(0)で置き換えた。\nyield のままだと TypeError になる。"),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">Traceback (most recent call last):\n  File ".\\exp.py", line 18, in &lt;module>\n    taskA=asyncio.ensure_future(gen(loop, \'a\', 3), loop=loop)\n  File "D:\\Python36\\lib\\asyncio\\tasks.py", line 519, in ensure_future\n    raise TypeError(\'A Future, a coroutine or an awaitable is required\')\nTypeError: A Future, a coroutine or an awaitable is required\n\nIt is a TypeError if __await__ returns anything but an iterator.</code></pre></div>'}}),"\n",p.createElement(s.p,null,"実験。"),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">it</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">yield</span>\n\n<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">co_y</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">yield</span>\n\n<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">co</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">pass</span>\n\n<span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token string">\'generator\'</span><span class="token operator">></span>\n<span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token string">\'async_generator\'</span><span class="token operator">></span>\n<span class="token punctuation">.</span>\\exp<span class="token punctuation">.</span>py<span class="token punctuation">:</span><span class="token number">22</span><span class="token punctuation">:</span> RuntimeWarning<span class="token punctuation">:</span> coroutine <span class="token string">\'co\'</span> was never awaited\n  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span>co<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token string">\'coroutine\'</span><span class="token operator">></span></code></pre></div>'}}),"\n",p.createElement(s.p,null,"async_generator…。async def 内で yield すると違うものになるのね。syntax error にはできんな。\n自前のメインループに loop を組み込むとすれば\nloop.once のような関数があると毎フレーム小出しにタスクを消化できるのだが。\nググってみた。"),"\n",p.createElement(s.p,null,p.createElement(s.a,{href:"https://stackoverflow.com/questions/29868372/python-asyncio-run-event-loop-once"},"https://stackoverflow.com/questions/29868372/python-asyncio-run-event-loop-once")),"\n",p.createElement(s.p,null,"loop.stop(); loop.run_forever()"),"\n",p.createElement(s.p,null,"なるほど。"),"\n",p.createElement(s.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">gen</span><span class="token punctuation">(</span>loop<span class="token punctuation">,</span> name<span class="token punctuation">,</span> count<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> loop<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> i<span class="token punctuation">,</span> loop<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">\'done\'</span><span class="token punctuation">)</span>\n\ntaskA<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>gen<span class="token punctuation">(</span>loop<span class="token punctuation">,</span> <span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> loop<span class="token operator">=</span>loop<span class="token punctuation">)</span>\ntaskB<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>gen<span class="token punctuation">(</span>loop<span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> loop<span class="token operator">=</span>loop<span class="token punctuation">)</span>\nfuture<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span>taskA<span class="token punctuation">,</span> taskB<span class="token punctuation">)</span>\n\ncount<span class="token operator">=</span><span class="token number">1</span>\n<span class="token keyword">while</span> <span class="token keyword">not</span> future<span class="token punctuation">.</span>done<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">print</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>\n    count<span class="token operator">+=</span><span class="token number">1</span>\n    <span class="token comment"># loop one step</span>\n    loop<span class="token punctuation">.</span>stop<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    loop<span class="token punctuation">.</span>run_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'done\'</span><span class="token punctuation">)</span>\n\n<span class="token number">1</span>\na <span class="token number">579281.828</span>\na <span class="token number">0</span> <span class="token number">579281.828</span>\nb <span class="token number">579281.828</span>\nb <span class="token number">0</span> <span class="token number">579281.828</span>\n<span class="token number">2</span>\na <span class="token number">1</span> <span class="token number">579281.828</span>\nb <span class="token number">1</span> <span class="token number">579281.828</span>\n<span class="token number">3</span>\na <span class="token number">2</span> <span class="token number">579281.828</span>\nb <span class="token number">2</span> <span class="token number">579281.828</span>\n<span class="token number">4</span>\na done\nb <span class="token number">3</span> <span class="token number">579281.828</span>\n<span class="token number">5</span>\nb <span class="token number">4</span> <span class="token number">579281.828</span>\n<span class="token number">6</span>\nb done\n<span class="token number">7</span>\ndone</code></pre></div>'}}),"\n",p.createElement(s.p,null,"いいかんじになった。これなら付き合っていけそうだ。"))}var e=function(n){void 0===n&&(n={});const{wrapper:s}=Object.assign({},(0,t.ah)(),n.components);return s?p.createElement(s,n,p.createElement(o,n)):o(n)},c=a(8678),l=a(1883),u=a(8838);const k={code:n=>{let{children:s,className:a}=n;return a?p.createElement(u.Z,{className:a},s):p.createElement("code",null,s)}};function i(n){let{data:s,children:a}=n;const o=s.mdx.frontmatter;return p.createElement(c.Z,null,p.createElement("h1",null,o.title),p.createElement("div",{className:"tags-index"},o.tags&&o.tags.length>0&&o.tags.map((n=>p.createElement(l.rU,{to:"/tags/"+n+"/",itemProp:"url"},p.createElement("button",null,n))))),p.createElement(t.Zo,{components:k},a))}function r(n){return p.createElement(i,n,p.createElement(e,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-06-python-asyncio-md-85d46ef7cc56624d6ec8.js.map