"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[556],{8019:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var l=n(1151),c=n(7294);function r(e){const t=Object.assign({p:"p",a:"a",blockquote:"blockquote"},(0,l.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(t.p,null,"gypでdebugとrelease設定を分ける\ngypでvc2010向けのプロジェクトが生成できたので、\n実用に向けて設定のテンプレート的なものを準備する。"),"\n",c.createElement(t.p,null,"ビルドオートメーションツールGYPを使おう\n",c.createElement(t.a,{href:"https://code.google.com/p/gyp/source/browse/trunk/test/win/linker-flags/pdb-output.gyp?spec=svn1832&r=1832"},"https://code.google.com/p/gyp/source/browse/trunk/test/win/linker-flags/pdb-output.gyp?spec=svn1832&r=1832")),"\n",c.createElement(t.p,null,"を参考に設定を追加。\nDebug, Release設定の追加\nmain.cpp\nprojects.gyp\ncommon.gypi"),"\n",c.createElement(t.blockquote,null,"\n",c.createElement(t.p,null,"gyp projects.gyp --depth ."),"\n"),"\n",c.createElement(t.p,null,"とりあえずDebugでステップ実行できた。\nこりゃ、よく使うパターンの雛形を揃えるまでは苦しいですな。 premake4,\ncmakeもそうだった。"))}var a=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?c.createElement(t,e,c.createElement(r,e)):r(e)},o=n(8678),s=n(1883),u=n(8838);const p={code:e=>{let{children:t,className:n}=e;return n?c.createElement(u.Z,{className:n},t):c.createElement("code",null,t)}};function m(e){let{data:t,children:n}=e;const r=t.mdx.frontmatter;return c.createElement(o.Z,null,c.createElement("h1",null,r.title),c.createElement("div",{className:"tags-index"},r.tags&&r.tags.length>0&&r.tags.map((e=>c.createElement(s.rU,{to:"/tags/"+e+"/",itemProp:"url"},c.createElement("button",null,e))))),c.createElement(l.Zo,{components:p},n))}function g(e){return c.createElement(m,e,c.createElement(a,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2014-05-16-gyp-debug-release-md-66685fed8657170a9d53.js.map