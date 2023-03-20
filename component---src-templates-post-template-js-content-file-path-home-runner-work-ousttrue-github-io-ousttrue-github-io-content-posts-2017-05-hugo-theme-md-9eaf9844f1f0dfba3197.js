"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7769],{2028:function(n,a,t){t.r(a),t.d(a,{default:function(){return k}});var s=t(1151),e=t(7294);function p(n){const a=Object.assign({p:"p",a:"a",span:"span"},(0,s.ah)(),n.components);return e.createElement(e.Fragment,null,e.createElement(a.p,null,"hugo の仕組みも気になることだし作ってみることにした。"),"\n",e.createElement(a.p,null,"Hugo のテーマを何個か作ったので知見をまとめてみる\n",e.createElement(a.a,{href:"https://gohugo.io/tutorials/creating-a-new-theme/"},"https://gohugo.io/tutorials/creating-a-new-theme/")),"\n",e.createElement(a.p,null,"新しくテーマを作る"),"\n",e.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ hugo new theme hoge</code></pre></div>'}}),"\n",e.createElement(a.p,null,"themes/hoge にテーマのテンプレートが作成される。\n３つのテンプレート\nlayout/index.html"),"\n",e.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="html"><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>\n    {{- range first 10 .Data.Pages }}\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ .Permalink }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ .Title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>\n    {{- end }}\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span></code></pre></div>'}}),"\n",e.createElement(a.p,null,"layout/_default/single.html"),"\n",e.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="html"><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>{{ .Title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>{{ .Title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h6</span><span class="token punctuation">></span></span>{{ .Date.Format "Mon, Jan 2, 2006" }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h6</span><span class="token punctuation">></span></span>\n    {{ .Content }}\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ .Site.BaseURL }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span></code></pre></div>'}}),"\n",e.createElement(a.p,null,"layout/_default/list.html"),"\n",e.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="html"><pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Articles<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n    {{- range first 10 .Data.Pages }}\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ .Permalink }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>{{ .Title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>\n    {{- end }}\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>{{ .Site.BaseURL }}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span></code></pre></div>'}}),"\n",e.createElement(a.p,null,"partial 導入\nlayout/_default/header.html\nlayout/_default/footer.html\nbootstrap"),"\n",e.createElement(a.p,null,e.createElement(a.a,{href:"http://getbootstrap.com/"},"http://getbootstrap.com/")),"\n",e.createElement(a.p,null,"2column\nsticky-footer\ntags"),"\n",e.createElement(a.p,null,e.createElement(a.a,{href:"http://text.baldanders.info/hugo/section/"},"http://text.baldanders.info/hugo/section/"),"\n",e.createElement(a.a,{href:"http://text.baldanders.info/hugo/categories-and-tags-list/"},"http://text.baldanders.info/hugo/categories-and-tags-list/")),"\n",e.createElement(a.p,null,'付ける\nfrontmatter に\ntags = ["hugo"]'),"\n",e.createElement(a.p,null,"のように書く。よくわからないがアルファベットの大文字は避けた方がよさげ。マルチバイト文字は OK ぽい。\nsingle\n.Params.tags に格納されているので以下のようにして使う"),"\n",e.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">{{ range .Params.tags }}\n&lt;a href="/tags/{{ . | urlize }}/">{{ . }}&lt;/a>\n{{ end }}</code></pre></div>'}}),"\n",e.createElement(a.p,null,"list\n.Data.Pages を列挙して中から取り出せる"),"\n",e.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">{{ range .Data.Pages }}\n    &lt;hr>\n    {{ range .Params.tags }}\n    &lt;a href="/tags/{{ . | urlize }}/">{{ . }}&lt;/a>\n    {{ end }}\n{{ end}}</code></pre></div>'}}),"\n",e.createElement(a.p,null,"サイトのタグ一覧"),"\n",e.createElement(a.p,null,"Hugo で web サイト構築(12) タグの列挙\n",e.createElement(a.a,{href:"https://gohugo.io/taxonomies/ordering/"},"https://gohugo.io/taxonomies/ordering/")),"\n",e.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">{{ range $name, $value := $.Site.Taxonomies.Alphabetical }}\n    &lt;li>\n        &lt;a href="{{ $.Site.BaseURL }}/tags/{{ $name }}/">\n        &lt;div>&lt;span class="badge">{{ .Count }}&lt;/span>{{ $name }}&lt;/div>\n        &lt;/a>\n    &lt;/li>\n{{ end }}</code></pre></div>'}}),"\n",e.createElement(a.p,null,"pagination"),"\n",e.createElement(a.p,null,e.createElement(a.a,{href:"http://wdkk.co.jp/note/2015/0915-hugo-pagination/"},"http://wdkk.co.jp/note/2015/0915-hugo-pagination/"),"\n",e.createElement(a.a,{href:"https://gohugo.io/extras/pagination/"},"https://gohugo.io/extras/pagination/")),"\n",e.createElement(a.p,null,"more"),"\n",e.createElement(a.p,null,e.createElement(a.a,{href:"https://gohugo.io/content/summaries/"},"https://gohugo.io/content/summaries/")),"\n",e.createElement(a.p,null,"目次"),"\n",e.createElement(a.p,null,e.createElement(a.a,{href:"https://gohugo.io/extras/toc/"},"https://gohugo.io/extras/toc/")),"\n",e.createElement(a.p,null,"syntax highlight"),"\n",e.createElement(a.p,null,e.createElement(a.a,{href:"https://gohugo.io/extras/highlighting/"},"https://gohugo.io/extras/highlighting/")),"\n",e.createElement(a.p,null,"prev/next"),"\n",e.createElement(a.p,null,e.createElement(a.a,{href:"http://qiita.com/y_hokkey/items/f9d8b66b3770a82d4c1c#%E5%89%8D%E3%81%AE%E8%A8%98%E4%BA%8B%E6%AC%A1%E3%81%AE%E8%A8%98%E4%BA%8B%E3%81%B8%E3%81%AE%E3%83%8A%E3%83%93%E3%82%B2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3"},"http://qiita.com/y_hokkey/items/f9d8b66b3770a82d4c1c#%E5%89%8D%E3%81%AE%E8%A8%98%E4%BA%8B%E6%AC%A1%E3%81%AE%E8%A8%98%E4%BA%8B%E3%81%B8%E3%81%AE%E3%83%8A%E3%83%93%E3%82%B2%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3")),"\n",e.createElement(a.p,null,"作業中\nあまりかっこよくならんね…。\nとりあえず読めるようにはなってきた。\nまぁ、見易さ優先で。"))}var l=function(n){void 0===n&&(n={});const{wrapper:a}=Object.assign({},(0,s.ah)(),n.components);return a?e.createElement(a,n,e.createElement(p,n)):p(n)},o=t(8678),c=t(1883),u=t(8838);const g={code:n=>{let{children:a,className:t}=n;return t?e.createElement(u.Z,{className:t},a):e.createElement("code",null,a)}};function i(n){let{data:a,children:t}=n;const p=a.mdx.frontmatter;return e.createElement(o.Z,null,e.createElement("h1",null,p.title),e.createElement("div",{className:"tags-index"},p.tags&&p.tags.length>0&&p.tags.map((n=>e.createElement(c.rU,{to:"/tags/"+n+"/",itemProp:"url"},e.createElement("button",null,n))))),e.createElement(s.Zo,{components:g},t))}function k(n){return e.createElement(i,n,e.createElement(l,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-05-hugo-theme-md-9eaf9844f1f0dfba3197.js.map