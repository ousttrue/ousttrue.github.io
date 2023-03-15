"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5757],{3652:function(e,n,l){l.r(n),l.d(n,{default:function(){return u}});var t=l(1151),c=l(7294);function r(e){const n=Object.assign({p:"p",code:"code",ul:"ul",li:"li",h2:"h2",h3:"h3",h4:"h4",img:"img",pre:"pre",a:"a"},(0,t.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(n.p,null,"常用エディタをvimに復古するべく環境を整備し始めた。\nせっかくなので ",c.createElement(n.code,null,"neovim")," も試してみる。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"環境はWindows10"),"\n"),"\n",c.createElement(n.h2,null,"neovim"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"neovim本家サイトからダウンロード","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"https://github.com/neovim/neovim/releases"),"\n",c.createElement(n.li,null,"nvim-win32.zip"),"\n"),"\n"),"\n",c.createElement(n.li,null,"python3の環境を作る","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"python36-32を入れた(nvimのバージョンに合わせた)"),"\n",c.createElement(n.li,null,"環境変数PATHに ",c.createElement(n.code,null,"C:/Python36-32")," と ",c.createElement(n.code,null,"C:/Python36-32/Scripts")," を追加"),"\n",c.createElement(n.li,null,c.createElement(n.code,null,"pip install neovim")),"\n"),"\n"),"\n"),"\n",c.createElement(n.h3,null,"nvim-qt.exe (gui)"),"\n",c.createElement(n.p,null,"だいたい動く。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"コピペはクリップボード経由で。",c.createElement(n.code,null,"set clipboard+=unnamed")),"\n",c.createElement(n.li,null,"color emojiは諦める"),"\n"),"\n",c.createElement(n.h3,null,"nvim.exe (cmd.exe)"),"\n",c.createElement(n.p,null,"だいたい動く。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"コピペはクリップボード経由で。",c.createElement(n.code,null,"set clipboard+=unnamed")),"\n",c.createElement(n.li,null,c.createElement(n.code,null,"set termguicolors")," でフルカラー"),"\n"),"\n",c.createElement(n.h3,null,"Oni(Electron製)"),"\n",c.createElement(n.p,null,"意外と良かったが細かいところ(日本語の変換中の表示とか)が使いづらかった。\n",c.createElement(n.code,null,"oni2")," 作っているらしい。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"emoji とか見た目はいい"),"\n"),"\n",c.createElement(n.h3,null,"$HOME/local/bin/nvim (wsl)"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"mintty")," が良くて、なかなか快適。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"Windowsのプロセスを実行する系は諦める(",c.createElement(n.code,null,"!start .")," とか)"),"\n",c.createElement(n.li,null,"git とかさくさく動く"),"\n",c.createElement(n.li,null,"もろもろ、パッケージマネージャーで入れるだけなので楽"),"\n",c.createElement(n.li,null,"無ければ、ソースからビルドするのも楽"),"\n"),"\n",c.createElement(n.p,null,"既にWSLがインストール済みであるところから。\nわいは、"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"https://github.com/yuk7/ArchWSL"),"\n"),"\n",c.createElement(n.p,null,"入れてる。"),"\n",c.createElement(n.h4,null,"wslする端末を整備する"),"\n",c.createElement(n.p,null,"minttyのwsl向けのwslttyを使う。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"https://github.com/mintty/wsltty"),"\n",c.createElement(n.li,null,"Cicaフォント"),"\n",c.createElement(n.li,null,"xterm-256"),"\n"),"\n",c.createElement(n.p,null,"color emoji を設定する。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"https://github.com/mintty/wsltty/issues/93"),"\n",c.createElement(n.li,null,c.createElement(n.code,null,"%USERPROFILE%\\AppData\\Roaming\\wsltty")," フォルダに対して作業する"),"\n"),"\n",c.createElement(n.img,{src:"emoji.jpg",alt:"emoji"}),"\n",c.createElement(n.p,null,"複合文字とか複雑すぎなのでは・・・"),"\n",c.createElement(n.h4,null,"nvimを自前ビルドする"),"\n",c.createElement(n.p,null,"足りないパッケージを適宜追加でインストールしながら。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-sh"},"mkdir -p $HOME/local/src\ncd $HOME/local/src\ngit clone https://github.com/neovim/neovim.git\ncd neovim\nCMAKE_INSTALL_PREFIX=$HOME/local make install # $HOME/local/bin にインストールする\n")),"\n",c.createElement(n.p,null,"環境変数 ",c.createElement(n.code,null,"PATH")," に ",c.createElement(n.code,null,"$HOME/local/bin")," を足した"),"\n",c.createElement(n.h4,null,"python3"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-sh"},"pip install --user neovim\n")),"\n",c.createElement(n.h2,null,"vim8"),"\n",c.createElement(n.h3,null,"gvim"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,c.createElement(n.code,null,"emoji")," など難しいマルチバイト文字の入る文書を編集するときは最善でした"),"\n"),"\n",c.createElement(n.h2,null,"cmd.exe"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,c.createElement(n.a,{href:"https://mridgers.github.io/clink/"},"clink"),"を導入して、cmd.exeの苦しさを軽減する(c-p, c-n, tab)"),"\n",c.createElement(n.li,null,c.createElement(n.code,null,"Cica")," フォントなどを導入することで見た目はいい感じになる"),"\n",c.createElement(n.li,null,"color emojiは諦める(cmd.exeの制約)"),"\n",c.createElement(n.li,null,"一応、 ",c.createElement(n.code,null,"chcp 65001")," してから ",c.createElement(n.code,null,"vim")," で ",c.createElement(n.code,null,"set encoding=utf8")),"\n",c.createElement(n.li,null,"color thema","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"https://github.com/Microsoft/console/tree/master/tools/ColorTool"),"\n"),"\n"),"\n"),"\n",c.createElement(n.p,null,"ptyが入ったらしい。近々いい感じになりそう。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"\n",c.createElement(n.p,null,"https://devblogs.microsoft.com/commandline/windows-command-line-introducing-the-windows-pseudo-console-conpty/"),"\n"),"\n",c.createElement(n.li,null,"\n",c.createElement(n.p,null,"F1-F5は何故か、 ",c.createElement(n.code,null,"A, B, C, D, E")," のキーコードで来る。"),"\n"),"\n"),"\n",c.createElement(n.h2,null,"powershell"),"\n",c.createElement(n.p,null,"普通に、readlineの設定があるのを発見した。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"一度だけ、管理者権限でps1の実行許可を設定する必要あり"),"\n",c.createElement(n.li,null,c.createElement(n.code,null,"%USERPROFILE%\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_profile.ps1")," を自分で作る"),"\n"),"\n",c.createElement(n.p,null,"powershellの設定ファイルに下記のように設定すると、 ",c.createElement(n.code,null,"emacs")," 風コマンドラインになって使いやすくなる。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-ps1"},"Set-PSReadlineKeyHandler -Key 'Ctrl+u' -Function BackwardDeleteLine\nSet-PSReadlineKeyHandler -Key 'Ctrl+b' -Function BackwardChar\nSet-PSReadlineKeyHandler -Key 'Ctrl+f' -Function ForwardChar\nSet-PSReadlineKeyHandler -Key 'Ctrl+d' -Function DeleteChar\nSet-PSReadlineKeyHandler -Key 'Ctrl+h' -Function BackwardDeleteChar\nSet-PSReadlineKeyHandler -Key 'Ctrl+p' -Function HistorySearchBackward\nSet-PSReadlineKeyHandler -Key 'Ctrl+n' -Function HistorySearchForward\nSet-PSReadlineKeyHandler -Key 'Ctrl+a' -Function BeginningOfLine\nSet-PSReadlineKeyHandler -Key 'Ctrl+e' -Function EndOfLine\nSet-PSReadlineKeyHandler -Key 'Ctrl+m' -Function AcceptLine\nSet-PSReadlineKeyHandler -Key 'Ctrl+k' -Function ForwardDeleteLine\n")))}var a=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?c.createElement(n,e,c.createElement(r,e)):r(e)};l(8678);function m(e){let{data:n,children:l}=e;return c.createElement(c.Fragment,null,c.createElement("h1",null,n.mdx.frontmatter.title),c.createElement(t.Zo,null,l))}function u(e){return c.createElement(m,e,c.createElement(a,e))}},8678:function(e,n,l){l(7294)},1151:function(e,n,l){l.d(n,{Zo:function(){return m},ah:function(){return r}});var t=l(7294);const c=t.createContext({});function r(e){const n=t.useContext(c);return t.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function m({components:e,children:n,disableParentContext:l}){let m;return m=l?"function"==typeof e?e({}):e||a:r(e),t.createElement(c.Provider,{value:m},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-vim-on-windows-md-6a7f7513574c40862116.js.map