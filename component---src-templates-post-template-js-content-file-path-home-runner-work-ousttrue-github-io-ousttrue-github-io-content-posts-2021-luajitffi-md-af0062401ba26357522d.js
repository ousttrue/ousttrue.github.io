"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2789],{449:function(e,n,l){l.r(n),l.d(n,{default:function(){return m}});var t=l(1151),c=l(7294);function r(e){const n=Object.assign({p:"p",code:"code",h2:"h2",ul:"ul",li:"li",h3:"h3"},(0,t.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(n.p,null,"lua による imgui 計画の準備として、 ",c.createElement(n.code,null,"libclang")," によるバインディング生成器を ",c.createElement(n.code,null,"luajit")," に移植してみた。"),"\n",c.createElement(n.p,null,"https://github.com/ousttrue/luajitffi"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"libclang")," に対してはだいだい動くようになって、自身で生成した ",c.createElement(n.code,null,"FFI")," で動作するところまでできた。\nまた、 ",c.createElement(n.code,null,"EmmyLua Annotation")," もある程度付与できた。"),"\n",c.createElement(n.p,null,"https://github.com/ousttrue/luajitffi/blob/master/clang/mod.lua"),"\n",c.createElement(n.p,null,"こいつで、 ",c.createElement(n.code,null,"imgui.h")," から luajit FFI を生成する。"),"\n",c.createElement(n.h2,null,"libclang"),"\n",c.createElement(n.p,null,"c(c++)ヘッダーを ",c.createElement(n.code,null,"clang_visitChildren")," により、カーソルのTree としてパースする。\n今回は、 ",c.createElement(n.code,null,"CXChildVisit_Recurse")," で全部のカーソルをパースすることにした。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"同じカーソルが複数個所に現れうる"),"\n",c.createElement(n.li,null,"循環しうる(Link List ？)"),"\n"),"\n",c.createElement(n.p,null,"がありうることを考慮しておく。\n",c.createElement(n.code,null,"clang-c/Index.h")," は 6000 カーソルくらいなので問題ないが、 ",c.createElement(n.code,null,"Windows.h")," とかは 150000 カーソルとか爆発する。"),"\n",c.createElement(n.h2,null,"わりと色んなところで型がネストしていてつらい"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"struct の中は namespace なので何でもあり"),"\n",c.createElement(n.li,null,"anonymous な union や struct のその場定義"),"\n",c.createElement(n.li,null,"typedef struct などのその場定義"),"\n",c.createElement(n.li,null,"関数ポインタのその場定義"),"\n"),"\n",c.createElement(n.p,null,"要するに、Cのコードの書き方によってどのようなカーソル構造になるかのパターンを知っている必要があって、\nパターン毎に分岐して情報を収集する必要がある。\nある型のメンバーの情報を集めていると、ネストした別の型情報が現れる場合があるので切り分ける。"),"\n",c.createElement(n.h2,null,"基本的なパターン"),"\n",c.createElement(n.p,null,"FFI では、対象となる関数を起点にその関数が使用するすべての型の定義を取り込む。\nカーソルはCのTranslationUnitの木構造をあらわしていて、型をあらわしていない。\nカーソルから頑張って型を得る。\n型を得られるカーソルは決まっていて、",c.createElement(n.code,null,"CXCursorType")," が宣言Declの系列となる。"),"\n",c.createElement(n.p,null,"TODO"),"\n",c.createElement(n.h3,null,"カーソル FunctionDecl"),"\n",c.createElement(n.h3,null,"カーソル EnumDecl"),"\n",c.createElement(n.h3,null,"カーソル TypedefDecl"),"\n",c.createElement(n.h3,null,"カーソル StructDecl"),"\n",c.createElement(n.h3,null,"Type Pointer"),"\n",c.createElement(n.h3,null,"Type Array"),"\n",c.createElement(n.h3,null,"Type Elaborated"),"\n",c.createElement(n.h3,null,"Type Record"),"\n",c.createElement(n.h3,null,"Type FunctionProto 関数ポインタ pointer => functionproto"),"\n",c.createElement(n.h3,null,"union"),"\n",c.createElement(n.h3,null,"typedef struct"),"\n",c.createElement(n.h3,null,"c++ name mangling"),"\n",c.createElement(n.h3,null,"マクロとの戦い"),"\n",c.createElement(n.h2,null,"luajit ffi"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"ffi.cdef")," に素直に定義すればいいので、他の言語の FFI に比べて簡単。"),"\n",c.createElement(n.p,null,"はまり。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,c.createElement(n.code,null,"ffi.load")," の返り値が GC されると関数ポインタが死ぬ"),"\n",c.createElement(n.li,null,"pointer は ",c.createElement(n.code,null,"ffi.new('TYPE[1]')")," のようにサイズ１の array で運用する"),"\n",c.createElement(n.li,null,"tostring と ffi.string は違う"),"\n",c.createElement(n.li,null,"nullptr は nil ?"),"\n"),"\n",c.createElement(n.p,null,"だいたいよきに計らってくれるので、 ",c.createElement(n.code,null,"rust")," の FFI に比べて簡単なのであった。"),"\n",c.createElement(n.p,null,"ひとつだけはまりがあって、 ",c.createElement(n.code,null,"struct")," の値渡しができない場合がある。"),"\n",c.createElement(n.p,null,"http://wiki.luajit.org/FFI-Callbacks-with-pass-by-value-structs"),"\n",c.createElement(n.p,null,"そういえば、 ",c.createElement(n.code,null,"rust")," でも ",c.createElement(n.code,null,"struct")," の値渡しではまった記憶が。"),"\n",c.createElement(n.p,null,"https://forum.dlang.org/thread/dkamxcamwttszxwwxttv@forum.dlang.org"),"\n",c.createElement(n.p,null,"rust の場合は、 ",c.createElement(n.code,null,"struct")," の値返しが動かなかった。\nこれ、C の方で pointer 経由で値を返すラッパーを定義する必要があって回避方法はなかった。"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"ImVec2 ImGui::GetContentRegionAvail()")),"\n",c.createElement(n.p,null,"luajit ffi でもできるか注意が必要だな。"),"\n",c.createElement(n.h2,null,"lfs への依存を FFI した Windows API で置き換える"),"\n",c.createElement(n.p,null,"現状、ファイル操作 ",c.createElement(n.code,null,"isExists"),", ",c.createElement(n.code,null,"mkDir")," のために lfs を使っているのだけど、\nFFI で Windows API にアクセスできるようにしたら lfs 無しにできそう。\nとなれば luarocks も無しにできるので、 必要なのは luajit.exe だけになる。"))}var u=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?c.createElement(n,e,c.createElement(r,e)):r(e)};l(8678);function a(e){let{data:n,children:l}=e;return c.createElement(c.Fragment,null,c.createElement("h1",null,n.mdx.frontmatter.title),c.createElement(t.Zo,null,l))}function m(e){return c.createElement(a,e,c.createElement(u,e))}},8678:function(e,n,l){l(7294)},1151:function(e,n,l){l.d(n,{Zo:function(){return a},ah:function(){return r}});var t=l(7294);const c=t.createContext({});function r(e){const n=t.useContext(c);return t.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const u={};function a({components:e,children:n,disableParentContext:l}){let a;return a=l?"function"==typeof e?e({}):e||u:r(e),t.createElement(c.Provider,{value:a},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2021-luajitffi-md-af0062401ba26357522d.js.map