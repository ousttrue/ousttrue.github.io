"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6385],{6285:function(e,n,t){t.r(n);var l=t(1151),a=t(7294);function u(e){const n=Object.assign({p:"p",h1:"h1",code:"code",pre:"pre",a:"a",h2:"h2",ul:"ul",li:"li"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"https://www.lua.org/docs.html"),"\n",a.createElement(n.h1,null,"Interpreter"),"\n",a.createElement(n.p,null,"とりあえず ",a.createElement(n.code,null,"luajit-2.1.0-beta3")," 推し。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"+---+    +---+    +---+    +---+\n|5.1| -> |5.2| -> |5.3| -> |5.4|\n+---+    +---+    +---+    +---+\n  |        |        |\n  |        |        +- ravi\n  |        |\n  |        +- moonsharp\n  |\n  +- luajit(5.1 base)\n  |   +- moonjit\n  +- luau(5.1 base)\n")),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"lua-5.1")," をベースに分岐したものが多い？"),"\n",a.createElement(n.p,null,"https://www.lua.org/versions.html"),"\n",a.createElement(n.p,null,"|        | url                                                                | memo                                                                    |\n|--------|--------------------------------------------------------------------|-------------------------------------------------------------------------|\n| Lua5.1 |                                                                    | 2012。これより古いものを使う理由は無さそう。                            |\n| Lu15.2 | ",a.createElement(n.a,{href:"https://www.lua.org/manual/5.2/readme.html#changes"},"since Lua5.1")," | 2015。finalizer. 関数の ",a.createElement(n.code,null,"_ENV")," 仕様変更                                 |\n| Lua5.3 | ",a.createElement(n.a,{href:"https://www.lua.org/manual/5.3/readme.html#changes"},"since Lua5.2")," | 2020。integers                                                          |\n| Lua5.4 | ",a.createElement(n.a,{href:"https://www.lua.org/manual/5.4/readme.html#changes"},"since Lua5.3")," | 2021。const, to-be-closed                                               |\n| LuaJIT | https://luajit.org/                                              | Lua5.1base。最終版は ",a.createElement(n.code,null,"2.1.0-beta3"),"。neovimもこれ。",a.createElement(n.code,null,"FFI")," も強力。        |\n| Luau   | https://luau-lang.org/                                           | Lua5.1 の superset。Roblox専用。オープンソースではない。                |\n| Ravi   | http://ravilang.github.io/                                       | Lua5.3base？。limited optional static typing and MIR based JIT compiler |"),"\n",a.createElement(n.h2,null,"変わり種"),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"headeronly"),". include するだけで使える。"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"https://github.com/edubart/minilua"),"\n"),"\n",a.createElement(n.p,null,"LUA に更に埋め込む"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"https://terralang.org/"),"\n"),"\n",a.createElement(n.h1,null,"Translator"),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://moonscript.org/"},"MoonScript")),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://typescripttolua.github.io/"},"TypescriptToLua")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"後で出てくる、",a.createElement(n.code,null,"local-lua-debugger")," はこれで実装されているぽい。"),"\n"),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://ifritjp.github.io/documents/lunescript/"},"LuneScript/")),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://github.com/teal-language/tl"},"Teal")),"\n",a.createElement(n.h1,null,"Language server"),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://github.com/EmmyLua/EmmyLua-LanguageServer"},"EmmyLua")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"Java製"),"\n",a.createElement(n.li,null,a.createElement(n.a,{href:"https://emmylua.github.io/annotation.html"},"EmmyLua Annotation")," に対応。これにより、組み込み型のインテリセンスを動作させることができて使い勝手が向上する"),"\n"),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://github.com/sumneko/lua-language-server"},"lua-language-server")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"⭐ ",a.createElement(n.a,{href:"https://emmylua.github.io/annotation.html"},"EmmyLua Annotation")," に対応。これにより、組み込み型のインテリセンスを動作させることができて使い勝手が向上する"),"\n"),"\n",a.createElement(n.p,null,"設定例"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-json"},'    "Lua.runtime.version": "LuaJIT",\n    "Lua.workspace.preloadFileSize": 10000,\n    "Lua.runtime.path": [\n        "?.lua",\n        "?/init.lua",\n        "?/?.lua",\n    ],\n')),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://github.com/Alloyed/lua-lsp"},"lua-lsp")),"\n",a.createElement(n.h1,null,"Debug adapter"),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://github.com/tomblind/local-lua-debugger-vscode"},"local-lua-debugger-vscode")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"Debugされるスクリプト側に仕込み不要"),"\n",a.createElement(n.li,null,"⭐ luajit 対応"),"\n",a.createElement(n.li,null,"__tostring でエラーが発生すると固まるので、__tostring の実装で例外が起きないように注意"),"\n",a.createElement(n.li,null,"起動時の引数に ",a.createElement(n.code,null,"\\\\")," が含まれているとエラーになる => ",a.createElement(n.code,null,"0.2.2")," で修正"),"\n"),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://github.com/actboy168/lua-debug"},"lua-debug")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"Debugされるスクリプト側に仕込み不要"),"\n",a.createElement(n.li,null,"hook が拡張してある。途中で止めたりとかできるぽい"),"\n",a.createElement(n.li,null,"残念ながら luajit では動作しない"),"\n"),"\n",a.createElement(n.h1,null,"Formatter"),"\n",a.createElement(n.h2,null,a.createElement(n.a,{href:"https://github.com/johnnymorganz/stylua"},"stylua")),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"⭐ rust 製でインストールしやすい"),"\n"),"\n",a.createElement(n.p,null,"stylua.toml"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-toml"},'column_width = 120\nline_endings = "Unix"\nindent_type = "Spaces"\nindent_width = 4\nquote_style = "AutoPreferDouble"\nno_call_parentheses = true\n')),"\n",a.createElement(n.h1,null,"ソース読み"),"\n",a.createElement(n.p,null,"https://ousttrue.github.io/lua/"))}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(u,e)):u(e)}},1151:function(e,n,t){t.d(n,{ah:function(){return u}});var l=t(7294);const a=l.createContext({});function u(e){const n=l.useContext(a);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}}}]);
//# sourceMappingURL=component---content-posts-2021-lua-info-md-679eaa28033509fa77d4.js.map