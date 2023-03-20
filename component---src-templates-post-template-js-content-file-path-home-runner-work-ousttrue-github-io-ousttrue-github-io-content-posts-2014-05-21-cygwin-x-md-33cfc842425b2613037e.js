"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6181],{9179:function(e,n,t){t.r(n),t.d(n,{default:function(){return f}});var c=t(1151),l=t(7294);function a(e){const n=Object.assign({p:"p",a:"a",em:"em"},(0,c.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(n.p,null,"gvimのためにcygwinでxorg導入\n環境をcygwinに変えたらシンボリックリンクを使えるようになった。MSYSの時より綺麗にdotfilesの共有ができるようになったのだが、引きかえにWindows版のvimの設定が読みこめなくなってしまったw。\nということでcygwin版のgvimをインストールすることにしたのだが、こいつはxorgに依存していたのであった。\nxtermの環境設定からだ\nxorgを使うことにしたので勢い余ってtermもxtermにしますかということで設定してみる。\nまずはfont設定から。\ncygwin版のxtermはトゥルータイプフォントを表示できる。使えるようにするには、\n~/.fontsディレクトリにttcファイル等を配置するだけだ。\nMSゴシックの場合こうだ。\n$ cd\n$ mkdir .fonts\n$ cd .fonts\n$ ln -s /cygdrive/C/WINDOWS/Fonts/msgothic.ttc"),"\n",l.createElement(n.p,null,"半角用にInconsolataも用意した。",l.createElement(n.a,{href:"http://levien.com/type/myfonts/inconsolata.html"},"http://levien.com/type/myfonts/inconsolata.html"),'\n$ ls .fonts\nInconsolata.otf msgothic.ttc\n$ fc-match.exe Inconsolata\nInconsolata.otf: "Inconsolata" "Medium"\n$ fc-match.exe gothic\nmsgothic.ttc: "ＭＳ ゴシック" "Regular"'),"\n",l.createElement(n.p,null,'フォントを指定してxtermを起動してみる。\n$ DISPLAY=:0 xterm -fa "ＭＳ ゴシック"'),"\n",l.createElement(n.p,null,'文字の隙間が広すぎでよろしくない。\n半角フォントと全角フォントを別々に指定するべし。\n$ DISPLAY=:0 xterm -fa "ＭＳ ゴシック" -fd Inconsolata'),"\n",l.createElement(n.p,null,"いい感じだ。 これを設定にするには、\n~/.Xresources\nXTerm",l.createElement(n.em,null,"renderFont: true\nXTerm"),"faceName: Inconsolata\nXTerm",l.createElement(n.em,null,"faceNameDoublesize: MS Gothic\nXTerm"),"faceSize: 12"),"\n",l.createElement(n.p,null,"xorg起動時に自動的に読みこまれるようにするには、\n~/.startxwinrc\nxrdb -merge ~/.Xresources"),"\n",l.createElement(n.p,null,"とりあえずフォント設定としては以上。\n日本語入力としてskk.vimを導入\n日本語の表示はできるようになったが依然として入力はできない。kinput2とかを入れるのは辛そうだったのでvim専用になるがskk.vimを使うことにした。\nとりあえずこれをvimで編集できる程度にはなった。"))}var r=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,c.ah)(),e.components);return n?l.createElement(n,e,l.createElement(a,e)):a(e)},m=t(8678),o=t(1883),s=t(8838);const i={code:e=>{let{children:n,className:t}=e;return t?l.createElement(s.Z,{className:t},n):l.createElement("code",null,n)}};function u(e){let{data:n,children:t}=e;const a=n.mdx.frontmatter;return l.createElement(m.Z,null,l.createElement("h1",null,a.title),l.createElement("div",{className:"tags-index"},a.tags&&a.tags.length>0&&a.tags.map((e=>l.createElement(o.rU,{to:"/tags/"+e+"/",itemProp:"url"},l.createElement("button",null,e))))),l.createElement(c.Zo,{components:i},t))}function f(e){return l.createElement(u,e,l.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2014-05-21-cygwin-x-md-33cfc842425b2613037e.js.map