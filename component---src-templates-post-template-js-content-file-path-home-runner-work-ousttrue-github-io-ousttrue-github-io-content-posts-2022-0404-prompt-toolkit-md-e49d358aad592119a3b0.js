"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2380],{8471:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var l=n(1151),o=n(7294);function r(e){const t=Object.assign({h1:"h1",h2:"h2",p:"p",code:"code",ul:"ul",li:"li"},(0,l.ah)(),e.components);return o.createElement(o.Fragment,null,o.createElement(t.h1,null,"prompt-toolkit の fullscreen アプリケーション"),"\n",o.createElement(t.h2,null,"Buffer"),"\n",o.createElement(t.p,null,"しばらく試行錯誤していたのだがやっと使い方が分かってきた。\n",o.createElement(t.code,null,"Window")," + ",o.createElement(t.code,null,"BufferControl")," が基本形で edit する場合向け。\n",o.createElement(t.code,null,"Window")," + ",o.createElement(t.code,null,"FormatedTextControl")," が readonly の装飾済みのテキストに向いていそう。"),"\n",o.createElement(t.p,null,"Lexer で基本的な装飾を施して、Preprocess でフォーカスやホバーのUI的な装飾をするという使い分けがよさそう。\n",o.createElement(t.code,null,"FormattedTextControl")," の場合は初期化時にスタイル適用済みのテキストを渡してしまう。"),"\n",o.createElement(t.h2,null,"example"),"\n",o.createElement(t.p,null,"https://github.com/prompt-toolkit の、"),"\n",o.createElement(t.ul,null,"\n",o.createElement(t.li,null,"https://github.com/prompt-toolkit/pyvim"),"\n",o.createElement(t.li,null,"https://github.com/prompt-toolkit/pymux"),"\n",o.createElement(t.li,null,"https://github.com/prompt-toolkit/pyterm"),"\n"),"\n",o.createElement(t.p,null,"が ",o.createElement(t.code,null,"prompt-toolkit2")," のままになっているのだが、\nちょっと手直しすることで、 ",o.createElement(t.code,null,"prompt-toolkit3")," で動作させることができた。"),"\n",o.createElement(t.p,null,o.createElement(t.code,null,"ptterm")," の ",o.createElement(t.code,null,"prompt-toolkit3")," 化に PR を送ってみた。\n主に ",o.createElement(t.code,null,"pipe")," 周りの非同期入力を ",o.createElement(t.code,null,"asyncio")," に適合させてやることで動く。\nhttps://github.com/prompt-toolkit/ptterm/pull/9"),"\n",o.createElement(t.p,null,o.createElement(t.code,null,"pymux")," も ",o.createElement(t.code,null,"fork")," しない ",o.createElement(t.code,null,"standalone")," 引き数付きならば ",o.createElement(t.code,null,"Windows")," + ",o.createElement(t.code,null,"prompt-toolkit3")," でも動かすことができた。"),"\n",o.createElement(t.p,null,"prompt-toolkit3 では積極的に ",o.createElement(t.code,null,"asyncio")," を活用していくのがよさそう。"),"\n",o.createElement(t.h2,null,"prompt-toolkit で任意のエスケープシーケンスを入れる"),"\n",o.createElement(t.p,null,"prompt-toolkit で ",o.createElement(t.code,null,"sixel")," 画像を表示させたい。\nUIControl が UIContent を生成していて、このとき styled text のデータ構造に対して特殊なスタイル ",o.createElement(t.code,null,"[ZeroWidthEscape]")," を指定することでエスケープシーケンスを直接出力できることがわかった。諸々の調整が必要になるが、ここに ",o.createElement(t.code,null,"sixel")," のシーケンスを入れることで表示できる。\n処理順の癖に対応するために、\n画像の高さ分の改行を ",o.createElement(t.code,null,"sixel")," のエスケープシーケンスに先行させる必要があった。\n",o.createElement(t.code,null,"prompt-toolkit")," + ",o.createElement(t.code,null,"wezterm")," 固有の問題かもしれない。"),"\n",o.createElement(t.h2,null,"Windows/Linux 共用で console アプリを動かす"),"\n",o.createElement(t.p,null,o.createElement(t.code,null,"prompt-toolkit3")," でかなりできそう。\nフレームワークの構成を理解するまでとっつきが悪いのだが、\n",o.createElement(t.code,null,"pypager"),", ",o.createElement(t.code,null,"pyvim"),", ",o.createElement(t.code,null,"ptterm"),", ",o.createElement(t.code,null,"pymux")," を研究してやっとわかってきた。"),"\n",o.createElement(t.p,null,o.createElement(t.code,null,"nerdfont")," で賑やかしを入れて、 ",o.createElement(t.code,null,"sixel")," で画像表示ができるおもちゃを企画している。"),"\n",o.createElement(t.ul,null,"\n",o.createElement(t.li,null,"vim ぽい lsp/dap の実験アプリ"),"\n",o.createElement(t.li,null,"w3m ぽい ブラウザ"),"\n",o.createElement(t.li,null,"tmux ぽいやつ"),"\n",o.createElement(t.li,null,"ranger ぽいやつ"),"\n"))}var c=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?o.createElement(t,e,o.createElement(r,e)):r(e)};n(8678);function m(e){let{data:t,children:n}=e;return o.createElement(o.Fragment,null,o.createElement("h1",null,t.mdx.frontmatter.title),o.createElement(l.Zo,null,n))}function u(e){return o.createElement(m,e,o.createElement(c,e))}},8678:function(e,t,n){n(7294)},1151:function(e,t,n){n.d(t,{Zo:function(){return m},ah:function(){return r}});var l=n(7294);const o=l.createContext({});function r(e){const t=l.useContext(o);return l.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const c={};function m({components:e,children:t,disableParentContext:n}){let m;return m=n?"function"==typeof e?e({}):e||c:r(e),l.createElement(o.Provider,{value:m},t)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2022-0404-prompt-toolkit-md-e49d358aad592119a3b0.js.map