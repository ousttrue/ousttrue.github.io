"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6196],{2017:function(e,t,n){n.r(t),n.d(t,{default:function(){return E}});var l=n(1151),c=n(7294);function a(e){const t=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",ul:"ul",li:"li"},(0,l.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(t.h1,null,"zig その3"),"\n",c.createElement(t.p,null,"ここのところ ",c.createElement(t.code,null,"zig")," の練習を進めているのだが、だいぶ良い。"),"\n",c.createElement(t.p,null,c.createElement(t.a,{href:"https://github.com/ousttrue/yazls"},"zls の改造")," や, ",c.createElement(t.a,{href:"https://github.com/ousttrue/zig-opengl-wasm"},"wasm の実験"),", ",c.createElement(t.a,{href:"https://github.com/ousttrue/microui"},"microui の移植")," あたりをこなして、\nだいぶ慣れた。"),"\n",c.createElement(t.p,null,"C/C++ と連携させる、zig から C を呼ぶ、C から zig を呼ぶ、の双方ともに\nかなり高いレベルの使いやすさがある。"),"\n",c.createElement(t.p,null,c.createElement(t.code,null,"zig-0.10")," の開発状況が SelfHosting コンパイラに注力しているところ。\nこれは重要なのだが、外見えの機能が良くなったりするところではない。\nむしろ、一時的にバグが出たり、機能が後退したり(async が未実装だったり)する。\nその次くらいから、また良くなるんでないか。"),"\n",c.createElement(t.p,null,c.createElement(t.code,null,"std")," にある ",c.createElement(t.code,null,"async")," とか ",c.createElement(t.code,null,"eventloop")," の痕跡を見ると、\nそのうちに標準にライブラリに ",c.createElement(t.code,null,"libuv")," 的なものが入りそうな感じがする。"),"\n",c.createElement(t.p,null,"zig は、型アノテーションを付けた ",c.createElement(t.code,null,"python")," と ",c.createElement(t.code,null,"c++")," の間くらいの記述量でコードを書けるので\n記述する速度と、実行速度のバランスがよい。\n",c.createElement(t.code,null,"wasm")," に関しては使えると判断できた。"),"\n",c.createElement(t.p,null,c.createElement(t.a,{href:"https://qiita.com/ousttrue/items/4802b61ba340dd7d89f3"},"zig で OpenGL、そして wasm")),"\n",c.createElement(t.p,null,"敢えて ",c.createElement(t.a,{href:"https://zellij.dev/"},"zellij")," のプラグインを ",c.createElement(t.code,null,"zig")," で書くスタイルが良いかもしれぬ。"),"\n",c.createElement(t.h2,null,"TODO:"),"\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,"zig 自前ビルド。llvm の準備から。 ",c.createElement(t.code,null,"glibc-2.34")," 縛りを回避できるか知りたい"),"\n",c.createElement(t.li,null,"arm へのクロスコンパイル。 ",c.createElement(t.code,null,"Android NDK")," を zig でやる"),"\n"))}var r=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?c.createElement(t,e,c.createElement(a,e)):a(e)},m=n(8678),u=n(4160),o=n(8736);const i={code:e=>{let{children:t,className:n}=e;return n?c.createElement(o.Z,{className:n},t):c.createElement("code",null,t)}};function s(e){let{data:t,children:n}=e;const a=t.mdx.frontmatter;return c.createElement(m.Z,null,c.createElement("h1",null,a.title),c.createElement("div",{className:"tags-index"},a.tags&&a.tags.length>0&&a.tags.map((e=>c.createElement(u.rU,{to:"/tags/"+e+"/",itemProp:"url"},c.createElement("button",null,e))))),c.createElement(l.Zo,{components:i},n))}function E(e){return c.createElement(s,e,c.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2022-0910-zig-3-md-f5666aa77260dc7e39e2.js.map