"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1002],{2899:function(n,e,t){t.r(e),t.d(e,{default:function(){return o}});var r=t(1151),l=t(7294);function c(n){const e=Object.assign({p:"p"},(0,r.ah)(),n.components);return l.createElement(l.Fragment,null,l.createElement(e.p,null,"Oculusぽちった\n会社で見せてもらったOculusに感銘を受けて本家サイトでぽちった。\n8月発送の見通しとのことなのでそれまでに開発環境を用意しておかねば。\nということで、Irrlicht +\nOculusという方向性で環境を整備することにしようかと思う。\nIrrlichtに関しては数年前からちょくちょく触ってはいてgithubに残骸が残っている。"),"\n",l.createElement(e.p,null,"irrmmd(IrrlichtMMDメッシュ)\nonibi(Irrlichtと一緒に使いそうなライブラリの詰め合わせ)"),"\n",l.createElement(e.p,null,"どっちが新しいのかよくわからないが、両方ともなんか中途半端な状態である。\nしかし、mmdを表示できるようにしてbulletを仕込むという路線にするのでonibiの続きからやるのがよさそうだ。\nまずはmmdがちゃんと動くところまで修復するとしようか。\nあと別プロセスのGUI向けのバックドアとしてmsgpack-rpcを仕込む。\nそんな感じにしよう。\nonibiの方をvc2010でビルドしてみたところ少し手直ししたらビルドできた。そういえばirrlichtとbulletのpythonラッパーを作ろうとしておったことを思い出してきた。\nまぁしかしそれはおいておくとする。\nで、pmdモデルの読み込みサンプルがあるので実行してみたら完全に作業が途中らしくモーションがまったくおかしい。\nさらにbulletのものと思われる開放漏れが報告される。前は、MinGWでやっていたので開放漏れに気付いていなかったか。\nいろいろ手直しが必要そうだ。"),"\n",l.createElement(e.p,null,"mikuさん\nついでなのでirrmmdの方もビルドしてみる。\nこっちはちゃんと物理付でモーション再生に成功した。\nirrmmdの方がちゃんとしているらしい。終了時にbulletを正しく開放しない問題はこちらも同じようだが。\nonibiに合体して整理すれば使えそうだ。"))}var u=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?l.createElement(e,n,l.createElement(c,n)):c(n)};t(8678);function i(n){let{data:e,children:t}=n;return l.createElement(l.Fragment,null,l.createElement("h1",null,e.mdx.frontmatter.title),l.createElement(r.Zo,null,t))}function o(n){return l.createElement(i,n,l.createElement(u,n))}},8678:function(n,e,t){t(7294)},1151:function(n,e,t){t.d(e,{Zo:function(){return i},ah:function(){return c}});var r=t(7294);const l=r.createContext({});function c(n){const e=r.useContext(l);return r.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}const u={};function i({components:n,children:e,disableParentContext:t}){let i;return i=t?"function"==typeof n?n({}):n||u:c(n),r.createElement(l.Provider,{value:i},e)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-06-11-irrlicht-md-7e199ba8daaac0dc01d1.js.map