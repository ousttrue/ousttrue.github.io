"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2789],{449:function(e,n,t){t.r(n),t.d(n,{default:function(){return o}});var l=t(1151),a=t(7294);function c(e){const n=Object.assign({p:"p",span:"span",h2:"h2",ul:"ul",li:"li",h3:"h3"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"lua による imgui 計画の準備として、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">libclang</code>'}})," によるバインディング生成器を ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">luajit</code>'}})," に移植してみた。"),"\n",a.createElement(n.p,null,"https://github.com/ousttrue/luajitffi"),"\n",a.createElement(n.p,null,a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">libclang</code>'}})," に対してはだいだい動くようになって、自身で生成した ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">FFI</code>'}})," で動作するところまでできた。\nまた、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">EmmyLua Annotation</code>'}})," もある程度付与できた。"),"\n",a.createElement(n.p,null,"https://github.com/ousttrue/luajitffi/blob/master/clang/mod.lua"),"\n",a.createElement(n.p,null,"こいつで、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">imgui.h</code>'}})," から luajit FFI を生成する。"),"\n",a.createElement(n.h2,null,"libclang"),"\n",a.createElement(n.p,null,"c(c++)ヘッダーを ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">clang_visitChildren</code>'}})," により、カーソルのTree としてパースする。\n今回は、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">CXChildVisit_Recurse</code>'}})," で全部のカーソルをパースすることにした。"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"同じカーソルが複数個所に現れうる"),"\n",a.createElement(n.li,null,"循環しうる(Link List ？)"),"\n"),"\n",a.createElement(n.p,null,"がありうることを考慮しておく。\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">clang-c/Index.h</code>'}})," は 6000 カーソルくらいなので問題ないが、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Windows.h</code>'}})," とかは 150000 カーソルとか爆発する。"),"\n",a.createElement(n.h2,null,"わりと色んなところで型がネストしていてつらい"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"struct の中は namespace なので何でもあり"),"\n",a.createElement(n.li,null,"anonymous な union や struct のその場定義"),"\n",a.createElement(n.li,null,"typedef struct などのその場定義"),"\n",a.createElement(n.li,null,"関数ポインタのその場定義"),"\n"),"\n",a.createElement(n.p,null,"要するに、Cのコードの書き方によってどのようなカーソル構造になるかのパターンを知っている必要があって、\nパターン毎に分岐して情報を収集する必要がある。\nある型のメンバーの情報を集めていると、ネストした別の型情報が現れる場合があるので切り分ける。"),"\n",a.createElement(n.h2,null,"基本的なパターン"),"\n",a.createElement(n.p,null,"FFI では、対象となる関数を起点にその関数が使用するすべての型の定義を取り込む。\nカーソルはCのTranslationUnitの木構造をあらわしていて、型をあらわしていない。\nカーソルから頑張って型を得る。\n型を得られるカーソルは決まっていて、",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">CXCursorType</code>'}})," が宣言Declの系列となる。"),"\n",a.createElement(n.p,null,"TODO"),"\n",a.createElement(n.h3,null,"カーソル FunctionDecl"),"\n",a.createElement(n.h3,null,"カーソル EnumDecl"),"\n",a.createElement(n.h3,null,"カーソル TypedefDecl"),"\n",a.createElement(n.h3,null,"カーソル StructDecl"),"\n",a.createElement(n.h3,null,"Type Pointer"),"\n",a.createElement(n.h3,null,"Type Array"),"\n",a.createElement(n.h3,null,"Type Elaborated"),"\n",a.createElement(n.h3,null,"Type Record"),"\n",a.createElement(n.h3,null,"Type FunctionProto 関数ポインタ pointer => functionproto"),"\n",a.createElement(n.h3,null,"union"),"\n",a.createElement(n.h3,null,"typedef struct"),"\n",a.createElement(n.h3,null,"c++ name mangling"),"\n",a.createElement(n.h3,null,"マクロとの戦い"),"\n",a.createElement(n.h2,null,"luajit ffi"),"\n",a.createElement(n.p,null,a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">ffi.cdef</code>'}})," に素直に定義すればいいので、他の言語の FFI に比べて簡単。"),"\n",a.createElement(n.p,null,"はまり。"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">ffi.load</code>'}})," の返り値が GC されると関数ポインタが死ぬ"),"\n",a.createElement(n.li,null,"pointer は ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:"<code class=\"language-text\">ffi.new('TYPE[1]')</code>"}})," のようにサイズ１の array で運用する"),"\n",a.createElement(n.li,null,"tostring と ffi.string は違う"),"\n",a.createElement(n.li,null,"nullptr は nil ?"),"\n"),"\n",a.createElement(n.p,null,"だいたいよきに計らってくれるので、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">rust</code>'}})," の FFI に比べて簡単なのであった。"),"\n",a.createElement(n.p,null,"ひとつだけはまりがあって、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">struct</code>'}})," の値渡しができない場合がある。"),"\n",a.createElement(n.p,null,"http://wiki.luajit.org/FFI-Callbacks-with-pass-by-value-structs"),"\n",a.createElement(n.p,null,"そういえば、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">rust</code>'}})," でも ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">struct</code>'}})," の値渡しではまった記憶が。"),"\n",a.createElement(n.p,null,"https://forum.dlang.org/thread/dkamxcamwttszxwwxttv@forum.dlang.org"),"\n",a.createElement(n.p,null,"rust の場合は、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">struct</code>'}})," の値返しが動かなかった。\nこれ、C の方で pointer 経由で値を返すラッパーを定義する必要があって回避方法はなかった。"),"\n",a.createElement(n.p,null,a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">ImVec2 ImGui::GetContentRegionAvail()</code>'}})),"\n",a.createElement(n.p,null,"luajit ffi でもできるか注意が必要だな。"),"\n",a.createElement(n.h2,null,"lfs への依存を FFI した Windows API で置き換える"),"\n",a.createElement(n.p,null,"現状、ファイル操作 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">isExists</code>'}}),", ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">mkDir</code>'}})," のために lfs を使っているのだけど、\nFFI で Windows API にアクセスできるようにしたら lfs 無しにできそう。\nとなれば luarocks も無しにできるので、 必要なのは luajit.exe だけになる。"))}var r=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(c,e)):c(e)},u=(t(8678),t(8838));const s={code:e=>{let{children:n,className:t}=e;return t?a.createElement(u.Z,{className:t},n):a.createElement("code",null,n)}};function m(e){let{data:n,children:t}=e;return a.createElement(a.Fragment,null,a.createElement("h1",null,n.mdx.frontmatter.title),a.createElement(l.Zo,{components:s},t))}function o(e){return a.createElement(m,e,a.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2021-luajitffi-md-be0fd3168648b00ae504.js.map