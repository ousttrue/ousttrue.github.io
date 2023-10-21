"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1479],{4571:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var a=t(1151),l=t(7294);function s(e){const n=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",code:"code",span:"span",h3:"h3",strong:"strong"},(0,a.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(n.h1,null,"Nikola復活"),"\n",l.createElement(n.p,null,l.createElement(n.a,{href:"https://getnikola.com/"},"nikola")," 復活。"),"\n",l.createElement(n.p,null,"https://github.com/ousttrue/dotfiles/blob/master/dodo.py"),"\n",l.createElement(n.p,null,"を作りながら ",l.createElement(n.a,{href:"https://pydoit.org/"},"doit")," を学んだし、 ",l.createElement(n.a,{href:"https://jinja.palletsprojects.com/en/3.1.x/"},"jinja"),"\nも少しやったので、前よりは読めそう。\n使いながら、 nikola のコードを読んで、 doit のカスタムタスクの使い方を眺めてみたい。"),"\n",l.createElement(n.h2,null,"sphinx + ablog + myst との違い"),"\n",l.createElement(n.p,null,"nikola は ",l.createElement(n.code,null,"frontmatter")," で title を決めるが、 sphinx は 本文の先頭の見出しで決めるという違いがある。\nnikola の方も title と 先頭の見出しを同じにする運用にすれば、だいたい同じになると思う。"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">conf.py # nikola の設定\ndocs\n  + conf.py # sphinx の設定\n  + posts # content. nikola と sphinx の ablog 両用\n    + post.md</code></pre></div>'}}),"\n",l.createElement(n.p,null,"みたいな感じにしてもだいたい動く。\n細かく違うところはあると思うが。"),"\n",l.createElement(n.h2,null,"動作"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python">    site <span class="token operator">=</span> Nikola<span class="token punctuation">(</span><span class="token operator">**</span>config<span class="token punctuation">)</span>\n    DN <span class="token operator">=</span> DoitNikola<span class="token punctuation">(</span>site<span class="token punctuation">,</span> quiet<span class="token punctuation">)</span>\n    <span class="token keyword">if</span> _RETURN_DOITNIKOLA<span class="token punctuation">:</span>\n        <span class="token keyword">return</span> DN\n    _ <span class="token operator">=</span> DN<span class="token punctuation">.</span>run<span class="token punctuation">(</span>oargs<span class="token punctuation">)</span></code></pre></div>'}}),"\n",l.createElement(n.h3,null,"DoitNikola(DoitMain)"),"\n",l.createElement(n.p,null,"https://github.com/getnikola/nikola/blob/398d5722d78a27ac5233849e3057f9d787345561/nikola/",l.createElement(n.strong,null,"main"),".py#L301"),"\n",l.createElement(n.p,null,"ここから入っていく。"),"\n",l.createElement(n.p,null,l.createElement(n.code,null,"from doit.cmd_base import TaskLoader2")),"\n",l.createElement(n.p,null,"https://pydoit.org/extending.html?highlight=taskloader#doit.cmd_base.TaskLoader2"),"\n",l.createElement(n.h3,null,"NikolaTaskLoader(TaskLoader2)"),"\n",l.createElement(n.p,null,"https://github.com/getnikola/nikola/blob/398d5722d78a27ac5233849e3057f9d787345561/nikola/",l.createElement(n.strong,null,"main"),".py#L257"))}var o=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?l.createElement(n,e,l.createElement(s,e)):s(e)},c=t(8678),r=t(4160),p=t(8736);const i={code:e=>{let{children:n,className:t}=e;return t?l.createElement(p.Z,{className:t},n):l.createElement("code",null,n)}};function u(e){let{data:n,children:t}=e;const s=n.mdx.frontmatter;return l.createElement(c.Z,null,l.createElement("h1",null,s.title),l.createElement("div",{className:"tags-index"},s.tags&&s.tags.length>0&&s.tags.map((e=>l.createElement(r.rU,{to:"/tags/"+e+"/",itemProp:"url"},l.createElement("button",null,e))))),l.createElement(a.Zo,{components:i},t))}function m(e){return l.createElement(u,e,l.createElement(o,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2022-0514-nikola-revival-md-4deac0e208bd91b4745b.js.map