"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6024],{9861:function(e,n,t){t.r(n);var r=t(1151),c=t(7294);function l(e){const n=Object.assign({p:"p",em:"em"},(0,r.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(n.p,null,"cygwin上のxorg上のtermで日本語を表示する\ncygwin版のxorg上のxtermで全角文字が微妙にずれる件との戦い。\n.Xresourceで関連すると思われる項目。\nXTerm",c.createElement(n.em,null,"cjkWidth : true\nXTerm"),"forcePackedFont: false"),"\n",c.createElement(n.p,null,"スクロールが発生した時に全角文字の間にスペースが入る問題\nls等でスクロールが発生した時に表示が乱れる。\nXTerm*jumpScroll: false"),"\n",c.createElement(n.p,null,"で解決したっぽい？\nscreenの中でも同様の問題がw\n$ screen --version\nScreen version 4.02.01 (GNU) 28-Apr-14"),"\n",c.createElement(n.p,null,"どうも根深いらしくxtermを断念。\nurxvtで頑張る\n.Xresource\n#define INCONSOLATA xft:Inconsolata:style=Medium:pixelsize=16,xft:メイリオ:pixelsize=18\nurxvt",c.createElement(n.em,null,"font: INCONSOLATA\nurxvt"),"boldFont: INCONSOLATA"),"\n",c.createElement(n.p,null,"こういう感じで半角用の次に続けて全角用のフォントを指定することでうまくいった。\nurxvtの中からscreenやtmuxしてもスクロール時に文字間隔が開く現象は出なくなった。"))}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?c.createElement(n,e,c.createElement(l,e)):l(e)}},1151:function(e,n,t){t.d(n,{ah:function(){return l}});var r=t(7294);const c=r.createContext({});function l(e){const n=r.useContext(c);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}}}]);
//# sourceMappingURL=component---content-posts-2014-05-22-xterm-cjkwidth-md-bcc6764b448161a06cd1.js.map