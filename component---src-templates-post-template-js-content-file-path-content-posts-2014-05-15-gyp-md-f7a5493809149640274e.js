"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3333],{8999:function(e,n,l){l.r(n),l.d(n,{default:function(){return s}});var t=l(1151),r=l(7294);function a(e){const n=Object.assign({p:"p",blockquote:"blockquote",br:"br",ul:"ul",li:"li"},(0,t.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.p,null,"python製のビルドツールgypを使ってみる\ngyp(Generate Your Projects) は、\npythonで記述されたプロジェクト生成ツールで設定からVC向けプロジェクトや、GCC向けMakefileを生成するツールである。\nchromeやnode.jsのビルドツールとして採用されているそうな。\n機能的にはpremake4やcmakeと同じ範囲をカバーするがそれぞれ以下のような問題があった。"),"\n",r.createElement(n.p,null,"premake4はわりと気に入っているのだが布教困難。luaで宣言的に記述するのが分かりづらい\ncmakeはcmake語が解読不能でちょっとしたプロジェクトのカスタマイズが困難すぎる(OpenCVとかのことだ)"),"\n",r.createElement(n.p,null,"そこで、python製のgypを試してみた。\ngyp導入\n環境は、Windows7 + python3。"),"\n",r.createElement(n.blockquote,null,"\n",r.createElement(n.p,null,"python setup.py install\n:\n中略\n:\nSyntaxError: invalid syntax"),"\n"),"\n",r.createElement(n.p,null,'File "c:\\python33\\lib\\site-packages\\gyp-0.1-py3.3.egg\\gyp\\generator\\ninja.py",\nline 475\nprint "Warning: Actions/rules writing object files don\'t work with " ',r.createElement(n.br),"\n","^\nSyntaxError: invalid syntax"),"\n",r.createElement(n.p,null,'File "c:\\python33\\lib\\site-packages\\gyp-0.1-py3.3.egg\\gyp\\generator\\xcode.py",\nline 126\nexcept OSError, e:\n^\nSyntaxError: invalid syntax'),"\n",r.createElement(n.p,null,"python3非対応だった。まぁpython2で。\nとりあえずc++の”hello world”をビルドするところから\nhello_gyp"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"main.cpp"),"\n",r.createElement(n.li,null,"projects.gyp"),"\n"),"\n",r.createElement(n.p,null,"main.cpp\nprojects.gyp\nプロジェクト生成。"),"\n",r.createElement(n.blockquote,null,"\n",r.createElement(n.p,null,"gyp projects.gyp --depth ."),"\n"),"\n",r.createElement(n.p,null,"これで、projects.slnとhello_gyp.vcxprojが生成された。\nhello_gyp"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"main.cpp"),"\n",r.createElement(n.li,null,"projects.gyp"),"\n",r.createElement(n.li,null,"projects.sln(generated)"),"\n",r.createElement(n.li,null,"hello_gyp.vcxproj(generated)"),"\n"),"\n",r.createElement(n.p,null,"vc2010 express editionでprojects.slnを開いてビルドできた。\nhello_gyp"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"main.cpp"),"\n",r.createElement(n.li,null,"projects.gyp"),"\n",r.createElement(n.li,null,"projects.sln"),"\n",r.createElement(n.li,null,"hello_gyp.vcxproj"),"\n",r.createElement(n.li,null,"Default/hello_gyp.exe(build)"),"\n"),"\n",r.createElement(n.p,null,"構成がDebug,\nReleaseではなくDefault一本立てなのでカスタマイズの必要あり。"))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?r.createElement(n,e,r.createElement(a,e)):a(e)},p=l(8678),o=l(4160),u=l(8736);const m={code:e=>{let{children:n,className:l}=e;return l?r.createElement(u.Z,{className:l},n):r.createElement("code",null,n)}};function i(e){let{data:n,children:l}=e;const a=n.mdx.frontmatter;return r.createElement(p.Z,null,r.createElement("h1",null,a.title),r.createElement("div",{className:"tags-index"},a.tags&&a.tags.length>0&&a.tags.map((e=>r.createElement(o.rU,{to:"/tags/"+e+"/",itemProp:"url"},r.createElement("button",null,e))))),r.createElement(t.Zo,{components:m},l))}function s(e){return r.createElement(i,e,r.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2014-05-15-gyp-md-f7a5493809149640274e.js.map