"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4009],{9933:function(n,e,t){t.r(e),t.d(e,{default:function(){return m}});var a=t(1151),s=t(7294);function l(n){const e=Object.assign({p:"p",a:"a",span:"span",h2:"h2",h3:"h3",ul:"ul",li:"li",h4:"h4"},(0,a.ah)(),n.components);return s.createElement(s.Fragment,null,s.createElement(e.p,null,s.createElement(e.a,{href:"https://docs.python.org/3/library/subprocess.html"},"https://docs.python.org/3/library/subprocess.html")),"\n",s.createElement(e.p,null,"こういうやつ"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">\n      +-------+\n      | child |\n      |process|\n      +-------+\n   stdin ^ | stdout\n         | v\n      +-------+\n      |process|\n      +-------+\n-> stdin     stdout -></code></pre></div>'}}),"\n",s.createElement(e.h2,null,"subprocess モジュール"),"\n",s.createElement(e.p,null,"subprocess は、"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">os.system\nos.spawn*</code></pre></div>'}}),"\n",s.createElement(e.p,null,"の置き換え。"),"\n",s.createElement(e.h3,null,"subprocess.run"),"\n",s.createElement(e.ul,null,"\n",s.createElement(e.li,null,s.createElement(e.a,{href:"https://docs.python.org/3/library/subprocess.html#subprocess.run"},"https://docs.python.org/3/library/subprocess.html#subprocess.run")),"\n"),"\n",s.createElement(e.p,null,"中でPopenして結果を集めて ",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">CompletedProcess</code>'}})," として返す。"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token comment"># 抜粋</span>\n<span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">with</span> Popen<span class="token punctuation">(</span><span class="token operator">*</span>popenargs<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span> <span class="token keyword">as</span> process<span class="token punctuation">:</span>\n        <span class="token keyword">try</span><span class="token punctuation">:</span>\n            stdout<span class="token punctuation">,</span> stderr <span class="token operator">=</span> process<span class="token punctuation">.</span>communicate<span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">,</span> timeout<span class="token operator">=</span>timeout<span class="token punctuation">)</span> \n\n    <span class="token keyword">return</span> CompletedProcess<span class="token punctuation">(</span>process<span class="token punctuation">.</span>args<span class="token punctuation">,</span> retcode<span class="token punctuation">,</span> stdout<span class="token punctuation">,</span> stderr<span class="token punctuation">)</span></code></pre></div>'}}),"\n",s.createElement(e.p,null,"実行して結果の文字列を得て終わりというタイプの用途向け。\n旧 ",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">os.system</code>'}})," の代替になると思う。"),"\n",s.createElement(e.h3,null,"subprocess.Popen"),"\n",s.createElement(e.ul,null,"\n",s.createElement(e.li,null,s.createElement(e.a,{href:"https://docs.python.org/3/library/subprocess.html#popen-constructor"},"https://docs.python.org/3/library/subprocess.html#popen-constructor")),"\n"),"\n",s.createElement(e.p,null,"標準入力、標準出力を制御するのはこっち。"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python">subprocess<span class="token punctuation">.</span>Popen<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'cmd_name\'</span><span class="token punctuation">,</span> <span class="token string">\'arg0\'</span><span class="token punctuation">,</span> <span class="token string">\'arg1\'</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    stdin<span class="token operator">=</span>subprocess<span class="token punctuation">.</span>PIPE<span class="token punctuation">,</span>\n    stdout<span class="token operator">=</span>subprocess<span class="token punctuation">.</span>PIPE<span class="token punctuation">,</span>\n    stderr<span class="token operator">=</span>subprocess<span class="token punctuation">.</span>PIPE<span class="token punctuation">,</span>\n    cwd<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> env<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span>\n    text<span class="token operator">=</span><span class="token boolean">False</span>\n    <span class="token punctuation">)</span></code></pre></div>'}}),"\n",s.createElement(e.p,null,"Readループが一個しかない時はこれでいいんでないかな。"),"\n",s.createElement(e.h2,null,"今回のテーマ"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">\n      +-------+\n      | child |\n      |process|\n      +-------+\n   stdin ^ | @stdout\n         | v\n      +-------+\n      |process| ここでロギングして通信内容を確認したい\n      +-------+\n  @stdin ^ | stdout\n         | v\n      +-------+\n      | parent|\n      |process|\n      +-------+\n</code></pre></div>'}}),"\n",s.createElement(e.ul,null,"\n",s.createElement(e.li,null,"@のところを常時読み込みにしたい(2つのReadループ)"),"\n",s.createElement(e.li,null,"@stdin をReadするとブロックして固まるのでつらい"),"\n"),"\n",s.createElement(e.p,null,"つらいのだ。"),"\n",s.createElement(e.h2,null,"asyncio"),"\n",s.createElement(e.p,null,"２つのReaderを非同期で制御しようということで 。"),"\n",s.createElement(e.h3,null,"asyncio の基本"),"\n",s.createElement(e.p,null,"loop を露出させる。"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"></code></pre></div>'}}),"\n",s.createElement(e.p,null,"loop は暗黙。\n基本的にこちらでよいと思う。\n必要に応じて取得する。"),"\n",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"></code></pre></div>'}}),"\n",s.createElement(e.h4,null,"asyncio.create_task で新しいスタックを開始する"),"\n",s.createElement(e.p,null,"新しいスタックなのでエラーハンドリングが無いことに注意。"),"\n",s.createElement(e.h4,null,"StreamReaderProtocol と StreamWriterProtocol"),"\n",s.createElement(e.p,null,"コールバックと Stream を結び付ける。"),"\n",s.createElement(e.h3,null,"Windowsの標準入出力はIOCPできない"),"\n",s.createElement(e.p,null,"IOCPできるハンドルは決まっていて、"),"\n",s.createElement(e.ul,null,"\n",s.createElement(e.li,null,"\n",s.createElement(e.p,null,"通常のファイル"),"\n"),"\n",s.createElement(e.li,null,"\n",s.createElement(e.p,null,"Socket"),"\n"),"\n",s.createElement(e.li,null,"\n",s.createElement(e.p,null,"NamedPipe"),"\n"),"\n",s.createElement(e.li,null,"\n",s.createElement(e.p,null,s.createElement(e.a,{href:"https://tim.mcnamara.nz/post/176613307022/iocp-and-stdio"},"https://tim.mcnamara.nz/post/176613307022/iocp-and-stdio")),"\n"),"\n"),"\n",s.createElement(e.h4,null,"python3.7 で ",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">asyncio.create_subprocess</code>'}})," ができた"),"\n",s.createElement(e.p,null,"child process 側はこれで助かった。"),"\n",s.createElement(e.ul,null,"\n",s.createElement(e.li,null,s.createElement(e.a,{href:"https://docs.python.org/3/library/asyncio-subprocess.html"},"https://docs.python.org/3/library/asyncio-subprocess.html")),"\n"),"\n",s.createElement(e.p,null,"なんか、たまに ",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">socket.exception</code>'}})," が出るので、\ntcpのlocalhost接続にリダイレクトするとか謎の技使っているのかもしれぬ。"),"\n",s.createElement(e.p,null,"おかげで、子プロセスの標準入出力から ",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">StreamReader</code>'}})," と ",s.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">StreamWriter</code>'}}),"\nを楽に取得できる。"),"\n",s.createElement(e.h4,null,"重い NativeCoroutine は、ThreadPoolExecutorに逃がす"),"\n",s.createElement(e.p,null,"標準入力側"),"\n",s.createElement(e.p,null,"GILを回避して、別スレッドで待てるのではないか。"),"\n",s.createElement(e.p,null,"どんな処理が、NativeCoroutine なのか。"))}var c=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?s.createElement(e,n,s.createElement(l,n)):l(n)},o=t(8678),p=t(1883),r=t(8838);const u={code:n=>{let{children:e,className:t}=n;return t?s.createElement(r.Z,{className:t},e):s.createElement("code",null,e)}};function i(n){let{data:e,children:t}=n;const l=e.mdx.frontmatter;return s.createElement(o.Z,null,s.createElement("h1",null,l.title),s.createElement("div",{className:"tags-index"},l.tags&&l.tags.length>0&&l.tags.map((n=>s.createElement(p.rU,{to:"/tags/"+n+"/",itemProp:"url"},s.createElement("button",null,n))))),s.createElement(a.Zo,{components:u},t))}function m(n){return s.createElement(i,n,s.createElement(c,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-subprocess-md-85255cab0b7b35a50707.js.map