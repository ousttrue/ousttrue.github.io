"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[621],{7710:function(e,n,t){t.r(n),t.d(n,{default:function(){return o}});var l=t(1151),c=t(7294);function r(e){const n=Object.assign({p:"p",h2:"h2",pre:"pre",code:"code",h3:"h3"},(0,l.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(n.p,null,"phthon2は使わないのでスルーで。"),"\n",c.createElement(n.h2,null,"vim組み込み"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-python"},"import vim\n")),"\n",c.createElement(n.h3,null,c.createElement(n.code,null,"PLUGIN_ROOT/python3")," パス"),"\n",c.createElement(n.p,null,"モジュールとして自動で ",c.createElement(n.code,null,"import")," されるぽい。\nリロードは？\n開発不便なのでは。"),"\n",c.createElement(n.h3,null,"py3file コマンド"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"so%")," などを経由してリロードできる。"),"\n",c.createElement(n.h3,null,"py3 コマンド"),"\n",c.createElement(n.p,null,"インポート済みの関数呼び出しなど短い処理にとどめた方がよいと思う。"),"\n",c.createElement(n.h2,null,"リモートプラグイン"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"nvim")," の機能で ",c.createElement(n.code,null,"msgpack-rpc")," を通した別プロセスでの実行。"),"\n",c.createElement(n.p,null,"vim8 への移植版。 https://github.com/roxma/nvim-yarp"),"\n",c.createElement(n.h3,null,c.createElement(n.code,null,"PLUGIN_ROOT/rplugin/python3")),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-python"},"import neovim # msgpack-rpc で vim と通信する\n\n\n@neovim.plugin\nclass RemotePlugin:\n\n    def __init__(self, nvim):\n        self.nvim = nvim\n\n    @neovim.command('HogeCommand') # vimのコマンドとして実行可能になる\n    def hogee(self):\n        pass\n")),"\n",c.createElement(n.h2,null,"比べてみると"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"vim")," もしくは ",c.createElement(n.code,null,"neovim")," とやり取りする部分は、単体実行ができないような。\nなるほど。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"GUIやVIM\n+--------+     これを単体で開発する\n|vim     |     +--------------+\n|もしくは|----\x3e|使うモジュール|\n|neovim  |     +--------------+\n|をimport|\n+--------+\n")),"\n",c.createElement(n.h2,null,"リモートプラグイン(GUI)"),"\n",c.createElement(n.p,null,"これは、",c.createElement(n.code,null,"msgpack-rpc")," を使うのだけど ",c.createElement(n.code,null,"GUI")," から ",c.createElement(n.code,null,"nvim")," を特定の作法で起動して ",c.createElement(n.code,null,"GUIイベントを受け取る")," というものでちょっと違う。"))}var m=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?c.createElement(n,e,c.createElement(r,e)):r(e)};t(8678);function a(e){let{data:n,children:t}=e;return c.createElement(c.Fragment,null,c.createElement("h1",null,n.mdx.frontmatter.title),c.createElement(l.Zo,null,t))}function o(e){return c.createElement(a,e,c.createElement(m,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return a},ah:function(){return r}});var l=t(7294);const c=l.createContext({});function r(e){const n=l.useContext(c);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const m={};function a({components:e,children:n,disableParentContext:t}){let a;return a=t?"function"==typeof e?e({}):e||m:r(e),l.createElement(c.Provider,{value:a},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-vim-python-md-3b8b16a24b5eea99f595.js.map