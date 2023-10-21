"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1873],{6074:function(e,l,n){n.r(l),n.d(l,{default:function(){return d}});var t=n(1151),c=n(7294);function a(e){const l=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",span:"span",ul:"ul",li:"li",h3:"h3"},(0,t.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(l.h1,null,"w3m改造に再突入"),"\n",c.createElement(l.p,null,"なんとなく最初からやり直し。"),"\n",c.createElement(l.h2,null,"マクロカッター"),"\n",c.createElement(l.p,null,"今回は、 ",c.createElement(l.code,null,"python")," でマクロカッターを作って前処理してみた。"),"\n",c.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">#ifdef USE_UNICODE\n// hogehoge\n#endif</code></pre></div>'}}),"\n",c.createElement(l.p,null,"みたいな ",c.createElement(l.code,null,"#ifdef")," 事前に解決しえカットしていくツールである。\nめんどくさいので ",c.createElement(l.code,null,"if defined(HOGE)")," などは実装していない。\n",c.createElement(l.code,null,"true"),", ",c.createElement(l.code,null,"false"),", ",c.createElement(l.code,null,"none")," の3値で判断。\ntrue であれば ",c.createElement(l.code,null,"#if")," を削除。\nfalse であれば ",c.createElement(l.code,null,"#if")," ブロックをコードごと削除し。\n",c.createElement(l.code,null,"none")," であれば保持するというロジック。\nわりとうまくいって、コードがかなり簡単になった。"),"\n",c.createElement(l.h2,null,"いつも通り C++ 化"),"\n",c.createElement(l.p,null,"C++ 化しないとCの暗黙の型変換が緩すぎてコンパイルエラー追うのが難しくなるので、\n次の一手はこれ。"),"\n",c.createElement(l.p,null,c.createElement(l.code,null,"c++")," できたら、 ",c.createElement(l.code,null,"typdef struct Some {} Some;")," を ",c.createElement(l.code,null,"struct Some;")," に書き換える。\nこれでストレスをかなり低減できる。"),"\n",c.createElement(l.p,null,"局所性の高い関数をメンバー関数にする。\nなるべくメンバーを private にして、名前も ",c.createElement(l.code,null,"_")," などの prefix を付ける。\n大きい struct は分割する。\nコンストラクタ、デストラクタ、コピーコンストラクタは避ける。",c.createElement(l.code,null,"GC")," や ",c.createElement(l.code,null,"setmem(0)")," で死ぬ。\n同様に、 std::vector, std::string は慎重に導入する。"),"\n",c.createElement(l.h2,null,"macro 減らす"),"\n",c.createElement(l.p,null,"macro 関数を",c.createElement(l.code,null,"inline 関数")," に置き換えたり、\nmacro 定数を ",c.createElement(l.code,null,"enum")," に置き換える。int, char などを enum に置き換える。\n使えれば ",c.createElement(l.code,null,"bitfield")," とかも駆使。"),"\n",c.createElement(l.h2,null,"fm.h, proto.h, file.c の分配"),"\n",c.createElement(l.ul,null,"\n",c.createElement(l.li,null,c.createElement(l.code,null,".c")," と ",c.createElement(l.code,null,".h")," をペアにして関数を一致させる"),"\n",c.createElement(l.li,null,c.createElement(l.code,null,"struct")," 毎にヘッダを分ける。"),"\n",c.createElement(l.li,null,c.createElement(l.code,null,"global")," 変数を散らす"),"\n",c.createElement(l.li,null,c.createElement(l.code,null,"const char*")," との戦い。順次"),"\n"),"\n",c.createElement(l.p,null,"膨大な global 変数があるので、使わないもの思い切って削除する。"),"\n",c.createElement(l.h3,null,"file.c"),"\n",c.createElement(l.p,null,c.createElement(l.code,null,"file.c")," が 7000 行とかあってすごい。"),"\n",c.createElement(l.ul,null,"\n",c.createElement(l.li,null,"html のロードが 4500 くらい。 ",c.createElement(l.code,null,"table.c"),", ",c.createElement(l.code,null,"frame.c")," も関連？"),"\n",c.createElement(l.li,null,"http を操作が 500 くらい"),"\n"),"\n",c.createElement(l.p,null,"http アクセスや、html パース、ローカルCGI とか Buffer 操作が色々入っている。"),"\n",c.createElement(l.h2,null,"libuv"),"\n",c.createElement(l.h3,null,"mainloop"),"\n",c.createElement(l.p,null,"あっさりできてしまった。"),"\n",c.createElement(l.p,null,c.createElement(l.code,null,"tty input"),", ",c.createElement(l.code,null,"resize signal")," で ",c.createElement(l.code,null,"idle")," のときに描画などという方針でよさそう。\nraw モード切り替えなども ",c.createElement(l.code,null,"libuv")," 移行できそう。"),"\n",c.createElement(l.h3,null,"入力ストリーム"),"\n",c.createElement(l.p,null,"tcp, fd, FILE*, Str と圧縮 decoder のランタイム polymorphism.\nc++ の継承に置き換えて、 ",c.createElement(l.code,null,"void*")," の cast より、型チェックの聞く状態にできる。"),"\n",c.createElement(l.p,null,"TODO: libuv を使う"),"\n",c.createElement(l.h3,null,"linein / readline"),"\n",c.createElement(l.h3,null,"出力"),"\n",c.createElement(l.h3,null,"signal"),"\n",c.createElement(l.p,null,"読み込みを ",c.createElement(l.code,null,"ctrl-c")," で中断するなど。"),"\n",c.createElement(l.h2,null,"使わない機能を削る"),"\n",c.createElement(l.ul,null,"\n",c.createElement(l.li,null,"backend, dump など"),"\n",c.createElement(l.li,null,"pager 系の機能"),"\n",c.createElement(l.li,null,"news, gopher など使わないプロトコル"),"\n",c.createElement(l.li,null,"mouse 系の機能"),"\n",c.createElement(l.li,null,"search_header 系の機能"),"\n"),"\n",c.createElement(l.h2,null,"wtf-8 とは？"),"\n",c.createElement(l.p,null,"謎の文字コード ",c.createElement(l.code,null,"wtf-8")," について、再調査。"),"\n",c.createElement(l.p,null,"https://badsector.pullup.net/?p=70"),"\n",c.createElement(l.p,null,"👇"),"\n",c.createElement(l.p,null,"https://simonsapin.github.io/wtf-8/"),"\n",c.createElement(l.h2,null,"vt100 分離"),"\n",c.createElement(l.p,null,c.createElement(l.code,null,"Buffer = Screen => tty_out")," という流れに統一する。\n各所からローレベルの描画機能を呼ばない。"),"\n",c.createElement(l.p,null,"メッセージ表示も抽象化して、text を push するだけに。"),"\n",c.createElement(l.ul,null,"\n",c.createElement(l.li,null,"カーソル移動"),"\n",c.createElement(l.li,null,"out"),"\n",c.createElement(l.li,null,"flush"),"\n",c.createElement(l.li,null,"カーソル復帰"),"\n"),"\n",c.createElement(l.p,null,"とかしない。"),"\n",c.createElement(l.h2,null,"TODO: logger 導入"),"\n",c.createElement(l.h2,null,"UIとデータ構造の分離"),"\n",c.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">+----+\n|DATA| TabBuffer, Buffer, Anchor, Form, Image...\n+----+\n  A\n  |\n+----+\n| UI | mainloop... tty, key dispatch\n+----+</code></pre></div>'}}),"\n",c.createElement(l.p,null,c.createElement(l.code,null,"TabBuffer, Buffer, Anchor, FormList")," と ",c.createElement(l.code,null,"mainloop keydispatch")," あたりを分離する。\n片方向の参照。"),"\n",c.createElement(l.p,null,"バッファーローダーからグローバル変数を除去して、再入可能にする。\ntab を平行動作可能にする。"),"\n",c.createElement(l.h3,null,"TODO: lua 導入"),"\n",c.createElement(l.p,null,"DEFUN を lua で記述したい。\nrc も？"),"\n",c.createElement(l.h2,null,"TODO: libgc 減らす。止める"),"\n",c.createElement(l.h2,null,"TODO: zig に移植"),"\n",c.createElement(l.p,null,c.createElement(l.code,null,"zig cc")," でビルドはできた。\nじゃなくて、ソースを ",c.createElement(l.code,null,"zig")," にしたい。"),"\n",c.createElement(l.h2,null,"TODO"),"\n",c.createElement(l.p,null,"Windows ネイティブで動くようにしたい。\n",c.createElement(l.code,null,"libuv")," + ",c.createElement(l.code,null,"conpty")," できそうな気がするのだけど、まだまだ。"))}var r=function(e){void 0===e&&(e={});const{wrapper:l}=Object.assign({},(0,t.ah)(),e.components);return l?c.createElement(l,e,c.createElement(a,e)):a(e)},u=n(8678),m=n(4160),E=n(8736);const o={code:e=>{let{children:l,className:n}=e;return n?c.createElement(E.Z,{className:n},l):c.createElement("code",null,l)}};function i(e){let{data:l,children:n}=e;const a=l.mdx.frontmatter;return c.createElement(u.Z,null,c.createElement("h1",null,a.title),c.createElement("div",{className:"tags-index"},a.tags&&a.tags.length>0&&a.tags.map((e=>c.createElement(m.rU,{to:"/tags/"+e+"/",itemProp:"url"},c.createElement("button",null,e))))),c.createElement(t.Zo,{components:o},n))}function d(e){return c.createElement(i,e,c.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2022-0918-w-3-m-mod-md-410ff17fe317d62ba165.js.map