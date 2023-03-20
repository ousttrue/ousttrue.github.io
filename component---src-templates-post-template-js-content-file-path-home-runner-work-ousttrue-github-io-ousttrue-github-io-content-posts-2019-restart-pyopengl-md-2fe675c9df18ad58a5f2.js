"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2898],{5656:function(e,t,n){n.r(t),n.d(t,{default:function(){return i}});var l=n(1151),a=n(7294);function r(e){const t=Object.assign({p:"p",h2:"h2",h3:"h3",ul:"ul",li:"li",a:"a",span:"span"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.p,null,"久しぶりのpyopengl"),"\n",a.createElement(t.h2,null,"PyOpenGL"),"\n",a.createElement(t.p,null,"長らく、python で OpenGL してなかったのだけど再開。\n最近のpythonであれば、型Annotationを活用していい感じできるような気がしたやってみる。"),"\n",a.createElement(t.h3,null,"glglue"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://github.com/ousttrue/glglue"},"https://github.com/ousttrue/glglue")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"http://pypi.python.org/pypi/glglue/"},"http://pypi.python.org/pypi/glglue/")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://qiita.com/ousttrue/items/07d2a06ab7e3fedf731a"},"PyOpenGLするGUI選びと描画とGUIの分離")),"\n"),"\n",a.createElement(t.p,null,"ついでなので、glglue をメンテナンスしてみた。\ntwine 使った。なるほど。"),"\n",a.createElement(t.p,null,"CreateWindow と OnMouseDown 等はこれに任せた。"),"\n",a.createElement(t.h3,null,"glBufferDataで躓いた"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://qiita.com/ousttrue/items/e343baabdbdd6b7891c4"},"PyOpenGLで描画。VBO周りの混乱")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"/posts/glbufferdata"},"PyOpenGLのglBufferDataにはどんなデータが渡せるのか")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://qiita.com/ousttrue/items/44a119e62aea1f12c5af"},"pyOpenGLのglBufferData")),"\n"),"\n",a.createElement(t.p,null,"調べ直して、記事をメンテナンスした。\n結局のところ、 ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">bytes</code>'}})," か ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">ctypes</code>'}})," が使える。"))}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?a.createElement(t,e,a.createElement(r,e)):r(e)},u=n(8678),m=n(1883),s=n(8838);const o={code:e=>{let{children:t,className:n}=e;return n?a.createElement(s.Z,{className:n},t):a.createElement("code",null,t)}};function p(e){let{data:t,children:n}=e;const r=t.mdx.frontmatter;return a.createElement(u.Z,null,a.createElement("h1",null,r.title),a.createElement("div",{className:"tags-index"},r.tags&&r.tags.length>0&&r.tags.map((e=>a.createElement(m.rU,{to:"/tags/"+e+"/",itemProp:"url"},a.createElement("button",null,e))))),a.createElement(l.Zo,{components:o},n))}function i(e){return a.createElement(p,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-restart-pyopengl-md-2fe675c9df18ad58a5f2.js.map