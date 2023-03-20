"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8250],{1040:function(e,t,l){l.r(t),l.d(t,{default:function(){return p}});var n=l(1151),a=l(7294);function c(e){const t=Object.assign({p:"p",h2:"h2",span:"span",ul:"ul",li:"li",a:"a",h3:"h3"},(0,n.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.p,null,"Windows10。"),"\n",a.createElement(t.h2,null,"vcpkgでCの関連ライブラリをインストール"),"\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ vcpkg install --triplet x64-windows geos gdal</code></pre></div>'}}),"\n",a.createElement(t.p,null,"30分くらいかかった。"),"\n",a.createElement(t.p,null,"環境変数、 ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">GDAL_DATA</code>'}})," に ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">%VCPKG_DIR%\\installed\\x64-windows\\share\\gdal</code>'}})," ビルド先のフォルダを指定する。"),"\n",a.createElement(t.h2,null,"GDAL"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://gdal.org/"},"https://gdal.org/")),"\n"),"\n",a.createElement(t.h3,null,"python"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://pypi.org/project/GDAL/"},"https://pypi.org/project/GDAL/")),"\n"),"\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ pip install gdal\nfatal error C1083: Cannot open include file: \'cpl_port.h\': No such file or directory</code></pre></div>'}}),"\n",a.createElement(t.p,null,"事前にVCPKGでビルドしてある。 ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">INLUCDE</code>'}})," を指し示す。"),"\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ pip install --global-option=build_ext --global-option="-IC:\\vcpkg\\installed\\x64-windows\\include" gdal\n\'GDALGetSpatialRef\': identifier not found</code></pre></div>'}}),"\n",a.createElement(t.p,null,"バージョンをCのGDALに合わせる。vcpkg でインストールしたのは ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">2.4.1</code>'}})," だった。\ngdalの ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">2.4.1</code>'}})," は欠番みたいなので、 ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">2.4.2</code>'}})," にしてみた。"),"\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ pip install --global-option=build_ext --global-option="-IC:\\vcpkg\\installed\\x64-windows\\include" --global-option="-LC:\\vcpkg\\installed\\x64-windows\\lib" \'gdal==2.4.2\'\nLINK : fatal error LNK1181: cannot open input file \'gdal_i.lib\'</code></pre></div>'}}),"\n",a.createElement(t.p,null,a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">gdal_i.lib</code>'}})," inline の static library かな？\n探したら、 ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">vcpkg</code>'}})," のビルドフォルダにあったので lib にコピーする。"),"\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">$ copy C:\\vcpkg\\buildtrees\\gdal\\src-x64-windows-release\\gdal-2.4.1\\gdal_i.lib C:\\vcpkg\\installed\\x64-windows\\lib\\\n$ pip install --global-option=build_ext --global-option="-IC:\\vcpkg\\installed\\x64-windows\\include" --global-option="-LC:\\vcpkg\\installed\\x64-windows\\lib" \'gdal==2.4.2\'\nSuccessfully installed gdal-2.4.2</code></pre></div>'}}),"\n",a.createElement(t.p,null,"OK"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://www.gis-py.com/entry/py-gdal"},"https://www.gis-py.com/entry/py-gdal")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://pcjericks.github.io/py-gdalogr-cookbook/index.html"},"https://pcjericks.github.io/py-gdalogr-cookbook/index.html")),"\n"))}var s=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?a.createElement(t,e,a.createElement(c,e)):c(e)},r=l(8678),g=l(1883),o=l(8838);const i={code:e=>{let{children:t,className:l}=e;return l?a.createElement(o.Z,{className:l},t):a.createElement("code",null,t)}};function d(e){let{data:t,children:l}=e;const c=t.mdx.frontmatter;return a.createElement(r.Z,null,a.createElement("h1",null,c.title),a.createElement("div",{className:"tags-index"},c.tags&&c.tags.length>0&&c.tags.map((e=>a.createElement(g.rU,{to:"/tags/"+e+"/",itemProp:"url"},a.createElement("button",null,e))))),a.createElement(n.Zo,{components:i},l))}function p(e){return a.createElement(d,e,a.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-python-gis-md-e77cc644d21439b2c165.js.map