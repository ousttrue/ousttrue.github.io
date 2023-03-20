"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5640],{372:function(e,t,l){l.r(t),l.d(t,{default:function(){return E}});var n=l(1151),a=l(7294);function r(e){const t=Object.assign({h1:"h1",h2:"h2",p:"p",span:"span",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",a:"a",ul:"ul",li:"li"},(0,n.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.h1,null,"term周りの更新"),"\n",a.createElement(t.h2,null,"terminal emulator を選定・・・"),"\n",a.createElement(t.p,null,"主に3つの動作環境、",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Windows</code>'}}),", ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Windows wsl</code>'}}),", ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Ubuntu-20.04</code>'}})," があってtoolや設定をある程度共通にしたいということで試行錯誤していた。\n他に ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">ssh経由</code>'}}),", ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Windows wslg</code>'}})," もあるよ。"),"\n",a.createElement(t.h3,null,"wezterm"),"\n",a.createElement(t.p,null,a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">wezterm</code>'}})," が有望であることがわかった"),"\n",a.createElement(t.table,null,a.createElement(t.thead,null,a.createElement(t.tr,null,a.createElement(t.th),a.createElement(t.th,null,"font fallback"),a.createElement(t.th,null,"multiplexer"),a.createElement(t.th,null,"emoji"),a.createElement(t.th,null,"nerdfnt"),a.createElement(t.th,null,"graphics escape"))),a.createElement(t.tbody,null,a.createElement(t.tr,null,a.createElement(t.td,null,"wezterm windows"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"color"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"conpty issue")),a.createElement(t.tr,null,a.createElement(t.td,null,"wezterm wsl"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"color"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"conpty issue")),a.createElement(t.tr,null,a.createElement(t.td,null,"wezterm ssh"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"color"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"sixel, kitty, iterm2")),a.createElement(t.tr,null,a.createElement(t.td,null,"wezterm linux"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"color"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"sixel, kitty, iterm2")))),"\n",a.createElement(t.p,null,"conpty を通すときに escape sequence が加工されるとかで、",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">sixel</code>'}}),", ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">kitty</code>'}}),", ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">iterm2</code>'}})," いずれのプロトコルもうまくうごかなかった。",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">iterm2</code>'}})," は絵はでるのだけど場所がずれるという惜しい挙動・・・。"),"\n",a.createElement(t.p,null,a.createElement(t.a,{href:"https://github.com/wez/wezterm/issues/1236"},"https://github.com/wez/wezterm/issues/1236")),"\n",a.createElement(t.p,null,"SSH 経由で WSL することで対処する。"),"\n",a.createElement(t.h3,null,"wslg(xtermなど)"),"\n",a.createElement(t.p,null,a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">xterm</code>'}})," は軽快できれいに表示できるので良かった。フォントのフォールバックができないぽいのが弱点。\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">urxvt</code>'}})," は、",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">NerdFonts</code>'}})," がうまくでなかった。\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">st</code>'}})," (simple term) もフォントまわりでつまづきだったかな。"),"\n",a.createElement(t.table,null,a.createElement(t.thead,null,a.createElement(t.tr,null,a.createElement(t.th),a.createElement(t.th,null,"font fallback"),a.createElement(t.th,null,"multiplexer"),a.createElement(t.th,null,"emoji"),a.createElement(t.th,null,"nerdfnt"),a.createElement(t.th,null,"graphics escape"))),a.createElement(t.tbody,null,a.createElement(t.tr,null,a.createElement(t.td,null,"xterm wslg"),a.createElement(t.td),a.createElement(t.td),a.createElement(t.td,null,"mono"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"sixel")),a.createElement(t.tr,null,a.createElement(t.td,null,"mlterm wslg"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"mlterm-con"),a.createElement(t.td,null,"color"),a.createElement(t.td,null,"✅"),a.createElement(t.td,null,"sixel")))),"\n",a.createElement(t.p,null,"mlterm はフォント周りの設定が強力でよかった。\n文字セットごとにフォントを個別に指定できるので、フォントを合成せずともばらのままでよい。"),"\n",a.createElement(t.p,null,a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">mlterm-con</code>'}})," という multiplexer があり sixel support があるらしい。\n自前ビルドが必要そう(apt には含まれていないぽい)。"),"\n",a.createElement(t.p,null,"wslgは、頻繁にキーボードが押しっぱなしになったり不安定なような・・・\n",a.createElement(t.a,{href:"https://github.com/microsoft/wslg/issues/207"},"https://github.com/microsoft/wslg/issues/207"),"\nなおっているけ、リリースに時間がかかりそう？"),"\n",a.createElement(t.h3,null,"libvte"),"\n",a.createElement(t.p,null,a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">libvte</code>'}})," 系のterm。\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">gnome-terminal</code>'}}),", ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">xfce4-term</code>'}})," など。"),"\n",a.createElement(t.h3,null,"gpu rendering"),"\n",a.createElement(t.p,null,"GPUレンダリングで ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">araclitty</code>'}}),", ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">kitty</code>'}})," そして ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">wezterm</code>'}})," がある。\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">wezterm</code>'}})," が ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">Windows</code>'}})," をサポートしていて、フォントのレンダリング、タブのサポートと総合的に良い。"),"\n",a.createElement(t.h3,null,"その他"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"tabby"),"\n",a.createElement(t.li,null,"RLogin"),"\n",a.createElement(t.li,null,"ConEmu"),"\n"),"\n",a.createElement(t.p,null,"など。"),"\n",a.createElement(t.h2,null,"要件"),"\n",a.createElement(t.h3,null,"日本語、中文、絵文字, NerdFonts を同時にいい感じに表示したい"),"\n",a.createElement(t.p,null,"となるとすべてを含むひとつのフォントより、主になるフォントを設定してそれにグリフが含まれなかったら、他のフォントにフォールバックする挙動をしてもらう方が便利。\nいくつかのフォントを試してみたのだけど、 ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">HackGenNerd Console</code>'}})," が良かった。\nで、中文の足りない漢字を ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">更紗ゴシックフォント</code>'}})," にフォールバックするという組み合わせ。\nがんばって完璧な合成フォントを自作すればいいのだけど、よくわからないので、 複数フォントのフォールバック機能が必要。"),"\n",a.createElement(t.p,null,"かつて w3m で表示が乱れることで苦労した ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">ambigous width</code>'}})," 問題はあまり気にならなくなっていた。\nなんか、表示は２カラム使うが、データ上は1カラムと見なすような扱いになっていて、\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">X</code>'}})," につづいて ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text"> </code>'}})," で隙間を開けることで正しく表示できるようだ。\nNerdFonts や 絵文字 はそのようになっている？"),"\n",a.createElement(t.h3,null,"エスケープシーケンスで画像を表示したい"),"\n",a.createElement(t.p,null,a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">sixel</code>'}})," とか ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">kitty</code>'}})," とか ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">iterm2</code>'}})," による画像表示。"),"\n",a.createElement(t.table,null,a.createElement(t.thead,null,a.createElement(t.tr,null,a.createElement(t.th),a.createElement(t.th,null,"graphics"))),a.createElement(t.tbody,null,a.createElement(t.tr,null,a.createElement(t.td,null,"Windows Native(conpty)"),a.createElement(t.td)),a.createElement(t.tr,null,a.createElement(t.td,null,"wsltty"),a.createElement(t.td,null,"sixel")),a.createElement(t.tr,null,a.createElement(t.td,null,"xterm wslg"),a.createElement(t.td,null,"sixel")),a.createElement(t.tr,null,a.createElement(t.td,null,"wezterm linux"),a.createElement(t.td,null,"sixel, kityt ,iterm2")))),"\n",a.createElement(t.p,null,"という感じになった。",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">wsltty</code>'}})," は ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">conpty</code>'}})," ではなくて ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">winpty</code>'}})," なので例外的に ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">sixel</code>'}})," が通過できるらしい。\n動く環境でも ",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">tmux</code>'}})," を挟むと動かなくなる。\n代わりに terminal emulator の方で multiplexer(タブ機能) する必要が発生。"),"\n",a.createElement(t.h2,null,"まとめ"),"\n",a.createElement(t.p,null,"総合力で wezterm が強い。"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,"あまり頑張らなくてもフォントがうまく設定できる(cjk, NerdFonts, 絵文字)"),"\n",a.createElement(t.li,null,"multiplexer 機能あり"),"\n",a.createElement(t.li,null,"sixel, kitty, iterm2 プロトコルで画像を表示できる"),"\n",a.createElement(t.li,null,"Windows でも動く"),"\n"),"\n",a.createElement(t.h2,null,"参考"),"\n",a.createElement(t.ul,null,"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://zenn.dev/yutakatay/articles/wezterm-intro"},"alacritty+tmuxもいいけど、weztermがすごい件")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://wezfurlong.org/wezterm/"},"wezterm")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://sw.kovidgoyal.net/kitty/graphics-protocol/"},"https://sw.kovidgoyal.net/kitty/graphics-protocol/")),"\n",a.createElement(t.li,null,"OSC1337 ",a.createElement(t.a,{href:"https://iterm2.com/documentation-images.html"},"https://iterm2.com/documentation-images.html")),"\n",a.createElement(t.li,null,a.createElement(t.a,{href:"https://unrealman.hatenablog.com/entry/tty-mintty-winpty"},"【Git for Windows】tty/mintty/winptyとは何なのか？【Gitbash】")),"\n"))}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?a.createElement(t,e,a.createElement(r,e)):r(e)},m=l(8678),s=l(1883),u=l(8838);const o={code:e=>{let{children:t,className:l}=e;return l?a.createElement(u.Z,{className:l},t):a.createElement("code",null,t)}};function d(e){let{data:t,children:l}=e;const r=t.mdx.frontmatter;return a.createElement(m.Z,null,a.createElement("h1",null,r.title),a.createElement("div",{className:"tags-index"},r.tags&&r.tags.length>0&&r.tags.map((e=>a.createElement(s.rU,{to:"/tags/"+e+"/",itemProp:"url"},a.createElement("button",null,e))))),a.createElement(n.Zo,{components:o},l))}function E(e){return a.createElement(d,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2022-0331-term-md-9ce78e5aa4d13baeb6f9.js.map