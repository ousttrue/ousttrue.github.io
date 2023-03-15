"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6002],{5653:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var l=t(1151),c=t(7294);function a(e){const n=Object.assign({p:"p",code:"code",ul:"ul",li:"li",h1:"h1",pre:"pre",blockquote:"blockquote"},(0,l.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(n.p,null,"https://github.com/ousttrue/limgui/blob/master/imgui_ffi/cdef/imgui.lua"),"\n",c.createElement(n.p,null,"Window System は ",c.createElement(n.code,null,"GLFW"),"、3D API は ",c.createElement(n.code,null,"OpenGL3")," を選択。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"SDL2 は、 ",c.createElement(n.code,null,"HWND")," を取得周りが FFI では面倒なことが分かっていたのと、",c.createElement(n.code,null,"SDL-Image")," などの関連ライブラリ無しで行くつもりだった"),"\n",c.createElement(n.li,null,"D3D11 のバインディングを作っているとまた時間がかかる。",c.createElement(n.code,null,"COM")," は C の範囲で実装できるので後でやりたい"),"\n"),"\n",c.createElement(n.p,null,"ということから、楽そうなものを選択したらそうなった。"),"\n",c.createElement(n.h1,null,"メンバー関数呼び出し"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"ImFont"),", ",c.createElement(n.code,null,"ImFontAtlas")," のみ何故か ",c.createElement(n.code,null,"c++")," 色が強く、メンバ関数呼び出しがあったりするのでなんとかしたい。\ncdecl で FFI 記述できるんだっけ？"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-c++"},'//io.Fonts->AddFontDefault();\n//io.Fonts->AddFontFromFileTTF("../../misc/fonts/Roboto-Medium.ttf", 16.0f);\n//io.Fonts->AddFontFromFileTTF("../../misc/fonts/Cousine-Regular.ttf", 15.0f);\n//io.Fonts->AddFontFromFileTTF("../../misc/fonts/DroidSans.ttf", 16.0f);\n//io.Fonts->AddFontFromFileTTF("../../misc/fonts/ProggyTiny.ttf", 10.0f);\n//ImFont* font = io.Fonts->AddFontFromFileTTF("c:\\\\Windows\\\\Fonts\\\\ArialUni.ttf", 18.0f, NULL, io.Fonts->GetGlyphRangesJapanese());\n')),"\n",c.createElement(n.p,null,"第1引数に this に相当する引数を追加してやればいけた。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-lua"},'ffi.cdef[[\n// 適当に名前を付け替える\nstruct ImFont* ImFontAtlas_AddFontFromFileTTF(\n    struct ImFontAtlas* this,\n    const char* filename,\n    float size_pixels,\n    const struct ImFontConfig* font_cfg,\n    ImWchar* glyph_ranges\n) asm("?AddFontFromFileTTF@ImFontAtlas@@QEAAPEAUImFont@@PEBDMPEBUImFontConfig@@PEBG@Z");\n]]\n')),"\n",c.createElement(n.h1,null,"C++ デフォルト引数"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"ImGui")," の ",c.createElement(n.code,null,"API")," は基本的にほぼ C になるように配慮されていて、C++ の機能は限定的にしか使っていない。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"関数オーバーロード"),"\n",c.createElement(n.li,null,"デフォルト引数"),"\n"),"\n",c.createElement(n.p,null,"である。\nで、このデフォルト引数がないと ",c.createElement(n.code,null,"imgui")," の使い勝手が著しく下がる。\nリファレンスを確認して、デフォルト値を当ててやる必要が出るので。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-c++"},"// 例\nIMGUI_API bool Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);\n")),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"NULL")," は ",c.createElement(n.code,null,"nil")," だし、 ",c.createElement(n.code,null,"0")," はそのまま ",c.createElement(n.code,null,"0")," なので、簡単なところだけでも対応する。\n最悪、インテリセンスに出るようにすることで調べる手間は回避できるのだけど\n",c.createElement(n.code,null,"const &ImVec2 v = ImVec2(0, 0)")," とかはめんどくさいです。\nFFI 境界の ",c.createElement(n.code,null,"struct の value 渡し"),", ",c.createElement(n.code,null,"デフォルト引数")," は解決できない場合が多いが、コード生成側で努力する価値はある。"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"rust")," はここができなくて、故にラッパー側で API を builder パターンに変更していたりするのだけど、\n",c.createElement(n.code,null,"rust")," の ",c.createElement(n.code,null,"imgui")," ラッパーの API を使いたいのではなくて、生の ",c.createElement(n.code,null,"imgui")," が使いたいのだ。\n",c.createElement(n.code,null,"luajit")," の FFI はちょっとラップすることで簡単に解決できる(遅くなるかもしれないが)。"),"\n",c.createElement(n.p,null,"ラッパーを自動で生成するようにできた。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-lua"},"    -- lua では nil と false のみが 偽 である\n\n    -- wrapper\n    Begin = function(name, p_open, flags)\n        -- p_open が供給されない場合、デフォルト nil になり、NULL として解釈される\n        flags = flags or 0\n        -- ffi 呼び出し\n        return imgui.Begin(name, p_open, flags)\n    end,\n\n    -- wrapper\n    Button = function(label, size)\n        -- 引数なしの `ffi.new` は zero 詰めする。 `ImVec2(0, 0)` になる。\n        size = size or ffi.new('struct ImVec2')\n        -- ffi 呼び出し\n        return imgui.Button(label, size)\n    end,\n")),"\n",c.createElement(n.h1,null,"可変長引数"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-c++"},"IMGUI_API void Text(const char* fmt, ...)\n")),"\n",c.createElement(n.p,null,"luajit ffi ではそのまま ",c.createElement(n.code,null,"...")," を扱うことができた。"),"\n",c.createElement(n.p,null,"ただし、",c.createElement(n.code,null,"%d")," のときは、\n",c.createElement(n.code,null,"LL")," をつけて ",c.createElement(n.code,null,"integer")," を渡す。\n",c.createElement(n.code,null,"number")," だとうまくいかない。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-lua"},'local count = 1LL -- 64bit int. UL もある\nimgui.Text("counter = %d", counter)\n')),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"LL")," と ",c.createElement(n.code,null,"UL")," は luajit の拡張らしい。\nhttps://luajit.org/ext_ffi_api.html"),"\n",c.createElement(n.blockquote,null,"\n",c.createElement(n.p,null,"Extensions to the Lua Parser"),"\n",c.createElement(n.p,null,"numeric literals with the suffixes LL or ULL as signed or unsigned 64 bit integers"),"\n"),"\n",c.createElement(n.p,null,"だがしかし、この記法使うと ",c.createElement(n.code,null,"stylua")," がエラーになる。そりゃ、そうだ。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-lua"},"local count = ffi.new('long long[1]') -- 32bit だとうまくいかない\nimgui.Text(\"counter = %d\", counter[0])\n")),"\n",c.createElement(n.p,null,"を使うのがよさそう。"),"\n",c.createElement(n.h1,null,"template class のごまかし"),"\n",c.createElement(n.p,null,"T を pointer としてしか使わない場合は、\n",c.createElement(n.code,null,"T*")," を除去して ",c.createElement(n.code,null,"void*")," にすれば動く。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-c++"},"template<typename T>\nstruct ImVector{\n    int Size;\n    int Capacity;\n    T* Data;\n};    \n\n")),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-lua"},"ffi.cdef[[\nstruct ImVector{\n    int Size;\n    int Capacity;\n    void* Data;\n};    \n]]\n")))}var r=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?c.createElement(n,e,c.createElement(a,e)):a(e)};t(8678);function o(e){let{data:n,children:t}=e;return c.createElement(c.Fragment,null,c.createElement("h1",null,n.mdx.frontmatter.title),c.createElement(l.Zo,null,t))}function u(e){return c.createElement(o,e,c.createElement(r,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return o},ah:function(){return a}});var l=t(7294);const c=l.createContext({});function a(e){const n=l.useContext(c);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const r={};function o({components:e,children:n,disableParentContext:t}){let o;return o=t?"function"==typeof e?e({}):e||r:a(e),l.createElement(c.Provider,{value:o},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2021-example-glfw-openg-md-2a913e9f1f0c41c5591a.js.map