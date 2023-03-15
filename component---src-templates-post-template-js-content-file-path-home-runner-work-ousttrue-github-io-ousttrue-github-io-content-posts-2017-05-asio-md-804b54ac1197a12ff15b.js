"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4858],{4064:function(e,n,t){t.r(n),t.d(n,{default:function(){return l}});var o=t(1151),c=t(7294);function r(e){const n=Object.assign({p:"p"},(0,o.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(n.p,null,"vcpkgを眺めていたらnot boostなasioを発見した。"),"\n",c.createElement(n.p,null,"asioをBoostに含まれているオフィシャル感のあるクロスプラットフォームな通信ライブラリととらえていたのだけど、c++11でboostのよく使う部分がc++にかなり取り込まれて肥大化する一方のboostを避ける気持ちが生まれていた。"),"\n",c.createElement(n.p,null,"http://think-async.com/Asio/AsioAndBoostAsio"),"\n",c.createElement(n.p,null,"読んでみるとついにヘッダオンリー化を果たしたらしい。boostの外に出ないとヘッダオンリー化が難しそうではある。たしか、asioはsocket周りじゃなくてerror周りのクラスがコンパイル対象なのに引きずられてasioを使うにはコンパイルを強いられるということがあった。技術的にはだいぶ前からヘッダオンリー化は可能であったのだろうがついにやってくれたか。素晴らしい。解凍するとギガ単位になる最近のboostはいかがなものかと思ってた。\n稀に使われているぽい、拙作のmsgpack-asioもヘッダオンリーのasioを使って近代化したいなぁ。あと、msgpackの実装も\nhttps://github.com/nlohmann/json\nに切り替えたい。\nc++11以降、c++界隈が活性化しているような気がするな。"))}var a=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?c.createElement(n,e,c.createElement(r,e)):r(e)};t(8678);function s(e){let{data:n,children:t}=e;return c.createElement(c.Fragment,null,c.createElement("h1",null,n.mdx.frontmatter.title),c.createElement(o.Zo,null,t))}function l(e){return c.createElement(s,e,c.createElement(a,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return s},ah:function(){return r}});var o=t(7294);const c=o.createContext({});function r(e){const n=o.useContext(c);return o.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function s({components:e,children:n,disableParentContext:t}){let s;return s=t?"function"==typeof e?e({}):e||a:r(e),o.createElement(c.Provider,{value:s},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-05-asio-md-804b54ac1197a12ff15b.js.map