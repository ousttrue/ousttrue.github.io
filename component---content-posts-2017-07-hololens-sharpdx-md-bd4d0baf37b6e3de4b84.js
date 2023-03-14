"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7640],{7692:function(e,n,t){t.r(n);var r=t(1151),a=t(7294);function o(e){const n=Object.assign({p:"p",pre:"pre",code:"code"},(0,r.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"SharpDX で Hololens できないかやってみる。"),"\n",a.createElement(n.p,null,"頓挫した。\nVisualStudio の HolographicApp テンプレートを SharpDX に移植できないかやってみる。\nC# Universal 空白のテンプレートで始める\n以前書いた UWP で SharpDX を見て SharpDX の最低限を作成。\nC++ Universal D3D11 のテンプレートを移植する\nとりあえず練習に素の”uwp directx11 template”を移植してみた。\nこれは、D2D の FPS テキストが何も描画されないことを除いて動いた。\nC++ HolographicApp DirectX のテンプレートを移植する\n途中まで移植したのだが以下の部分でクラッシュして、 エラーコード 0xc0000409 が解決できなくなってしまった。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-cpp"},"// Starts the holographic frame and updates the content.\npublic Windows.Graphics.Holographic.HolographicFrame Update()\n{\n// Before doing the timer update, there is some work to do per-frame\n// to maintain holographic rendering. First, we will get information\n// about the current frame.\n\n    // The HolographicFrame has information that the app needs in order\n    // to update and render the current frame. The app begins each new\n    // frame by calling CreateNextFrame.\n    var holographicFrame = m_holographicSpace.CreateNextFrame(); // <-- クラッシュする\n\n    // 省略\n\n}\n")),"\n",a.createElement(n.p,null,"作業は頓挫した。"))}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?a.createElement(n,e,a.createElement(o,e)):o(e)}},1151:function(e,n,t){t.d(n,{ah:function(){return o}});var r=t(7294);const a=r.createContext({});function o(e){const n=r.useContext(a);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}}}]);
//# sourceMappingURL=component---content-posts-2017-07-hololens-sharpdx-md-bd4d0baf37b6e3de4b84.js.map