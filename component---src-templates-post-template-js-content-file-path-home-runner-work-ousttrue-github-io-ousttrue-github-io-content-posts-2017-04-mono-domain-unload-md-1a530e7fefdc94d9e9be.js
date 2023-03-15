"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6455],{5762:function(e,n,t){t.r(n),t.d(n,{default:function(){return c}});var l=t(1151),r=t(7294);function a(e){const n=Object.assign({p:"p",pre:"pre",code:"code"},(0,l.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.p,null,"何のことか分かりにくいが以下のコードで再現できる。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-csharp"},"public int m_count;\n\nvoid OnRender(int eventID)\n{\n    m_count++;\n}\n\nvoid Update()\n{\n    var p = Marshal.GetFunctionPointerForDelegate(OnRender);\n    GL.IssuePluginEvent(p, 0);\n}\n")),"\n",r.createElement(n.p,null,"SharpDX を Unity 上で使うべく GL.IssuePluginEvent に C#の Delegate を渡す実験をしていた。これをやると、Editor 終了時もしくは次回 play 時に UnityEditor が Freeze する(100%)。Unity5.5.3 と Unity2017.1.0beta1 で再現した。\n調べてみたところ、"),"\n",r.createElement(n.p,null,"https://forum.unity3d.com/threads/problem-with-callbacks.87513/"),"\n",r.createElement(n.p,null,"が該当しそうかと思ったがちょっと違う。新しいスレッドを起こしている訳では無いので。 ただ、条件は下記の通り"),"\n",r.createElement(n.p,null,"C#の delegate を関数ポインタとして C に渡す\nその関数ポインタが異なるスレッドから呼び出される"),"\n",r.createElement(n.p,null,"次に"),"\n",r.createElement(n.p,null,"https://blog.tedd.no/2016/10/09/investigating-unity-hang-on-second-run-multi-threading/"),"\n",r.createElement(n.p,null,"を当たった。ここで紹介している visualstudio の debug - window - 並列スタックで状況を確認する手法を使ってみたところ以下のようになっていた。"),"\n",r.createElement(n.p,null,"mono_domain_unload が固まっているような気がするぞ。"),"\n",r.createElement(n.p,null,"http://stackoverflow.com/questions/10138015/unloading-mono-domains-in-multithreaded-context"),"\n",r.createElement(n.p,null,"mono が delegate から関数ポインタを作るのに使っているらしい invoke wrappers の周りの回収に失敗しているのではないかというような気がする。"),"\n",r.createElement(n.p,null,"http://d.hatena.ne.jp/saiya_moebius/20090319/1237434037"),"\n",r.createElement(n.p,null,"Unity 上で打つ手は見つからなかった・・・"))}var o=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?r.createElement(n,e,r.createElement(a,e)):a(e)};t(8678);function u(e){let{data:n,children:t}=e;return r.createElement(r.Fragment,null,r.createElement("h1",null,n.mdx.frontmatter.title),r.createElement(l.Zo,null,t))}function c(e){return r.createElement(u,e,r.createElement(o,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return u},ah:function(){return a}});var l=t(7294);const r=l.createContext({});function a(e){const n=l.useContext(r);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const o={};function u({components:e,children:n,disableParentContext:t}){let u;return u=t?"function"==typeof e?e({}):e||o:a(e),l.createElement(r.Provider,{value:u},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-04-mono-domain-unload-md-1a530e7fefdc94d9e9be.js.map