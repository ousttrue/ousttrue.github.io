"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[593],{9298:function(e,n,t){t.r(n),t.d(n,{default:function(){return E}});var l=t(1151),c=t(7294);function r(e){const n=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2"},(0,l.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(n.h1,null,"名付けて cydeer"),"\n",c.createElement(n.p,null,"https://github.com/ousttrue/cydeer"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"python"),", ",c.createElement(n.code,null,"cython"),", ",c.createElement(n.code,null,"dear imgui")," の組み合わせで名前を付けようと思ったのだが、既に先人がいっぱいいて名前が被るので適当に決めた。🦌"),"\n",c.createElement(n.p,null,"https://github.com/HankiDesign/awesome-dear-imgui#languages"),"\n",c.createElement(n.p,null,"最初、",c.createElement(n.code,null,"DearPyGui")," のサイトが強そうだったので試そうと思ったのだけど用途が違いそうだった。\n次に、しばらく ",c.createElement(n.code,null,"pyimgui")," を使っていい感じだったので、 ",c.createElement(n.code,null,"docking")," ブランチ対応を見たら開発ブランチならば動いたので、自前ビルドを改造して使っていた。\nPR も送ってみたのだが、\nどうせなら自分で作ろうという機運が高まったので、作った。\ncydeer は pyOpenGL とともに使う ",c.createElement(n.code,null,"薄い")," ImGui ラッパーという路線である。\n",c.createElement(n.code,null,"ctypes")," を併用することでポインタを直接扱う。 ",c.createElement(n.code,null,"camel case")," と ",c.createElement(n.code,null,"snake case")," の変換を含めて何も変えない。"),"\n",c.createElement(n.p,null,"| lib               | binder                                           | imgui                | window & graphincs                       | コメント                                                              |\n|-------------------|--------------------------------------------------|----------------------|------------------------------------------|-----------------------------------------------------------------------|\n| (python)cydeer    | cython + ctypes(generate using libclang.cindex ) | imgui docking branch | glfw など + pyOpenGL でがんばる          | 可能な限りAPIの改変をしない。ポインタは ctypes で作る                 |\n| (python)pyimgui   | cython                                           | imgui                | glfw など + pyOpenGL でがんばる          | ポインタ引数(p_openなど)による返り値を、tuple による複値で表現        |\n| (python)DearPyGui | 未確認                                           | 未確認               | DirectX11。python からアクセスできない？ | imgui をラップして独自 API。python で OpenGL するという目的には使えぬ |\n| (c)cimgui         | 未確認                                           | 未確認               |                                          | imgui を ",c.createElement(n.code,null,"extern C")," にラップしたもの。他言語バインド向け              |\n| (rust)imgui-rs    | 未確認                                           | 未確認               |                                          | builder パターンで Default 引数を代替                                 |"),"\n",c.createElement(n.p,null,"imgui ラップには、 ",c.createElement(n.code,null,"関数オーバーロード")," , ",c.createElement(n.code,null,"デフォルト引数")," , ",c.createElement(n.code,null,"メンバー関数")," という難所がある。\n要するに ",c.createElement(n.code,null,"c++")," 要素なのだけど、",c.createElement(n.code,null,"c++")," 要素含めての imgui の使い勝手なので。各言語バインディングで悩ましいところです。\nたとえば、 ",c.createElement(n.code,null,"rust")," は関数オーバーロードやデフォルト引数が無いので API を変えてます。"),"\n",c.createElement(n.p,null,"C# とかでも、 ",c.createElement(n.code,null,"const ImVec2 pos& = ImVec2(0, 0)")," のような引数を解決するのは手間がかかったりする。\nDLLImport 定義に対するデフォルト引数では解決できないので、 C# 側で一時変数を作ってポインターを取得する必要がある。"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"デフォルト引数")," は cython で普通に解決した。\nclang.cindex から値を取れれば難しくない。\n",c.createElement(n.code,null,"メンバー関数")," は ",c.createElement(n.code,null,"ctypes")," に ",c.createElement(n.code,null,"cython")," のメソッドを定義して、 ",c.createElement(n.code,null,"self")," を ",c.createElement(n.code,null,"this pointer")," に cast して呼び出すコードを作った(ImGuiFontAtlas)。\n",c.createElement(n.code,null,"関数オーバーロード")," は ",c.createElement(n.code,null,"cython")," でディスパッチするのはつらいので、",c.createElement(n.code,null,"MenuItem_2")," のような suffix をつけて人間が選ぶようにした。"),"\n",c.createElement(n.p,null,"忘れていたが、もっとも問題になるのが ",c.createElement(n.code,null,"構造体の値渡し・返し")," だった(C++に限らない？)。\n",c.createElement(n.code,null,"D言語")," , ",c.createElement(n.code,null,"rust")," ともにこれができない(vcのコンパイラと互換性がない？)ので注意が必要だった。コンパイルは通るが動作がおかしかったような。\nImGui の ImVec2 を値返しする関数でヒットする。\n",c.createElement(n.code,null,"cydeer")," は、 ",c.createElement(n.code,null,"cython")," を採用したので、",c.createElement(n.code,null,"cython")," 関数の出口で python 型に入れ替えるだけである。"),"\n",c.createElement(n.p,null,"あと、 ",c.createElement(n.code,null,"cydeer")," は ",c.createElement(n.code,null,"pyi")," 標準装備でいい感じである(一部実際のpython型と齟齬があるが・・・)。"),"\n",c.createElement(n.h2,null,"実装上の課題"),"\n",c.createElement(n.p,null,"cython の cimport の扱いがやっかいで、",c.createElement(n.code,null,"imgui"),", ",c.createElement(n.code,null,"imgui.internal")," に分割しようとするとうまくいかなかった。\n",c.createElement(n.code,null,"cydeer")," に関しては巨大な単一のモジュールで行くのが無難かもしれない。\n",c.createElement(n.code,null,"internal")," やノードエディターとか追加するときに分けたいのだけど。"),"\n",c.createElement(n.p,null,"現状、Windows + python-3.10 しか試していない。\nWindows11 の wslg + wayland で動くようにしたい。"))}var a=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?c.createElement(n,e,c.createElement(r,e)):r(e)},u=t(8678),m=t(4160),o=t(8736);const i={code:e=>{let{children:n,className:t}=e;return t?c.createElement(o.Z,{className:t},n):c.createElement("code",null,n)}};function d(e){let{data:n,children:t}=e;const r=n.mdx.frontmatter;return c.createElement(u.Z,null,c.createElement("h1",null,r.title),c.createElement("div",{className:"tags-index"},r.tags&&r.tags.length>0&&r.tags.map((e=>c.createElement(m.rU,{to:"/tags/"+e+"/",itemProp:"url"},c.createElement("button",null,e))))),c.createElement(l.Zo,{components:i},t))}function E(e){return c.createElement(d,e,c.createElement(a,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2021-winter-python-imgui-md-d776393d50951191f50e.js.map