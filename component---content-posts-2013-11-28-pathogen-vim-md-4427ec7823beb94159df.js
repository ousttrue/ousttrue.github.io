"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7226],{3348:function(e,n,o){o.r(n);var t=o(1151),l=o(7294);function i(e){const n=Object.assign({p:"p",pre:"pre",code:"code"},(0,t.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(n.p,null,"vim 環境整備"),"\n",l.createElement(n.pre,null,l.createElement(n.code,null,'Windows8でコーディングができるようにvim回りを整備する。\nコマンドライン環境としてPowerShellを採用してそこからvim(gvim)する方向性。\n前の日記を整理して書き直し。\nPowerShellを使えるようにしてvimとgitをインストールする\nPowerShellを管理者権限で実行して以下のように実行する。\npowershell> Set-ExecutionPolicy RemoteSigned\n\nパッケージ管理として Chocolatey\nをインストール。dos窓で以下のように実行する。\ndos> @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString(\'https://chocolatey.org/install.ps1\'))" && SET PATH=%PATH%;%systemdrive%\\chocolatey\\bin\n\npowershellの設定ファイル作成する。shellの.profileに相当するファイル。\n\nC:/Users/_USER_NAME_/Documents/WindowsPowerShell/Microsoft.PowerShell_profile.ps1\n\nとりあえずwhichコマンド的な関数を書いておく\nfunction which([string] $command=$(throw "need command name")){\n    $Env:Path.Split(";") | %{ ls $_  2> $null } | ?{ $_.Name -match "^$command" } | % { $_.FullName }\n}\n\n改めてPowerShellを起動してchocolateyでvimをインストールする\npowershell> cinst vim\n\ngitも入れる。\npowershell> cinst git\n\ncinstの実行直後はいろいろPathが通っていなかったりして使えない場合があるのでその場合はpowershellを再起動。\nvimを整備する\nNerdTreeを入れようと思ったらpathogen.vim使えと書いてあったのでpathogen.vim入れる。\npowershell> cd $HOME\npowershell> mkdir vimfiles\npowershell> cd vimfiles\npowershell> mkdir autoload, bundle\npowershell> git init\n\npathogen.vim\nを入れる。downloadしてvimfiles/autoload/pathogen.vimに保存する。\npowershell> git add .\npowershell> git commit -m init\n\nとりあえずgitに登録した。\n_vimrc\nexecute pathogen#infect()\nsyntax on\nfiletype plugin indent on\n\ncolorscheme darkblue\n\nset hidden\nset nobackup\n\n_gvimrc\ncolorscheme desert\n\nset iminsert=0\nset imsearch=-1\nset visualbell t_vb=\n\nset columns=100\nset lines=56\n\nNerdTree\nNerdTree をgit\nsubmoduleとしてインストールする。\npowershell> cd vimfiles/bundle\npowershell> git submodule add https://github.com/scrooloose/nerdtree.git\n\n以上でvim環境が始動した。\n追記\nWindowsだとNerdTreeの[m]キーのメニューにcopyが出ない問題があったがstackoverflowに\n原因と解決方法が書いてあった。\nhttp://stackoverflow.com/questions/11269926/nerdtree-copy-command-in-windows-7\n')))}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?l.createElement(n,e,l.createElement(i,e)):i(e)}},1151:function(e,n,o){o.d(n,{ah:function(){return i}});var t=o(7294);const l=t.createContext({});function i(e){const n=t.useContext(l);return t.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}}}]);
//# sourceMappingURL=component---content-posts-2013-11-28-pathogen-vim-md-4427ec7823beb94159df.js.map