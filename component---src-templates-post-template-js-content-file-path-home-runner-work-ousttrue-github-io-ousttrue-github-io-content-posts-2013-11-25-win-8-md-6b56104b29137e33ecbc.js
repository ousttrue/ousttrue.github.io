"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8151],{3639:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var l=t(1151),r=t(7294);function o(e){const n=Object.assign({p:"p",blockquote:"blockquote"},(0,l.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.p,null,"Windows8導入\nなんとなく去年買ってきてきてLinuxで使っていたマシンに\nSSDを買ってきてWindows8をインストールしてみた。\nUEFIインストール\nUEFIインストールしたほうが起動が早いらしいのでやってみた。"),"\n",r.createElement(n.p,null,"起動してdelボタンを押して設定画面に入る\nその状態でインストールROMを挿入\n起動メニューからUEFIの方のROMを選択\n数秒間 ROMから起動するならなんか押せ と表示が出るのでその間にEnter\nWindowsではなくASUSのロゴが出て起動すればUEFIモードでの起動に成功"),"\n",r.createElement(n.p,null,"あとはロムの指示に従ってインストールする\nインストール後の環境\n最近cygwinからPowerShellに移住しようとしているので、 cuiはPowerShellで。\nまずは、PowerShellの権限変更。 PowerShellを管理者権限で起動して、"),"\n",r.createElement(n.blockquote,null,"\n",r.createElement(n.p,null,"Set-ExecutionPolicy RemoteSigned"),"\n"),"\n",r.createElement(n.p,null,"Chocolatey\nPowerShell版のapt-get的なChocolateyをインストールする。\ndos窓(powershellではない)を起動してサイトに書いてある通りにコピペ。\n@powershell -NoProfile -ExecutionPolicy unrestricted -Command \"iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))\" && SET PATH=%PATH%;%systemdrive%\\chocolatey\\bin"),"\n",r.createElement(n.p,null,"putty\npowershell> cinst putty"),"\n",r.createElement(n.p,null,"vim\npowershell> cinst vim"),"\n",r.createElement(n.p,null,"~/_gvimrc\ncolorscheme desert"),"\n",r.createElement(n.p,null,"set iminsert=0\nset imsearch=-1\nset visualbell t_vb="),"\n",r.createElement(n.p,null,"~/_vimrc\ncolorscheme darkblue"),"\n",r.createElement(n.p,null,"set hidden\nset nobackup"),"\n",r.createElement(n.p,null,"git\npowershell> cinst git"),"\n",r.createElement(n.p,null,"PowerShellの起動スクリプトにパスを追加\npowershell> mkdir $HOME/Documents/WindowsPowerShell\npowershell> gvim $PROFILE"),"\n",r.createElement(n.p,null,'$env:PATH+=";C:\\Program Files (x86)\\Git\\bin"'),"\n",r.createElement(n.p,null,"これでgit付属のssh等にPathが通る。 とりあえずEditorとGitが手に入った。\nまだまだ色々とインストールせねばならんな。"))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?r.createElement(n,e,r.createElement(o,e)):o(e)};t(8678);function i(e){let{data:n,children:t}=e;return r.createElement(r.Fragment,null,r.createElement("h1",null,n.mdx.frontmatter.title),r.createElement(l.Zo,null,t))}function u(e){return r.createElement(i,e,r.createElement(c,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return i},ah:function(){return o}});var l=t(7294);const r=l.createContext({});function o(e){const n=l.useContext(r);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const c={};function i({components:e,children:n,disableParentContext:t}){let i;return i=t?"function"==typeof e?e({}):e||c:o(e),l.createElement(r.Provider,{value:i},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-11-25-win-8-md-6b56104b29137e33ecbc.js.map