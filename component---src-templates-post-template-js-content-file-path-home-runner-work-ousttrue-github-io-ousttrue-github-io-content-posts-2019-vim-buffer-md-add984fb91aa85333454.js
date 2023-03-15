"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4634],{9022:function(e,n,l){l.r(n),l.d(n,{default:function(){return i}});var t=l(1151),r=l(7294);function a(e){const n=Object.assign({p:"p",code:"code",blockquote:"blockquote",h2:"h2",h3:"h3",ul:"ul",li:"li",h4:"h4",pre:"pre"},(0,t.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.p,null,r.createElement(n.code,null,"buffer list")," < ",r.createElement(n.code,null,"buffer")," > ",r.createElement(n.code,null,"window")," > ",r.createElement(n.code,null,"tab")," > ",r.createElement(n.code,null,"vim")),"\n",r.createElement(n.p,null,"という感じ"),"\n",r.createElement(n.p,null,r.createElement(n.code,null,":help window")),"\n",r.createElement(n.blockquote,null,"\n",r.createElement(n.p,null,"Summary:\nA buffer is the in-memory text of a file.\nA window is a viewport on a buffer.\nA tab page is a collection of windows."),"\n"),"\n",r.createElement(n.h2,null,"Tab"),"\n",r.createElement(n.h3,null,"autocmd events"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"TabEnter: after entering another tab page"),"\n",r.createElement(n.li,null,"TabLeave: before leaving a tab page"),"\n",r.createElement(n.li,null,"TabNew: when creating a new tab page"),"\n",r.createElement(n.li,null,"TabNewEntered: after entering a new tab page"),"\n",r.createElement(n.li,null,"TabClosed: after closing a tab page"),"\n"),"\n",r.createElement(n.h2,null,"Window"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"https://vim-jp.org/vimdoc-ja/windows.html"),"\n"),"\n",r.createElement(n.p,null,"Window番号は、vim によって自動で振られる。\nBufferからWindow番号を手繰る。"),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"bufwinnr('buf_name')")),"\n",r.createElement(n.p,null,"tabにひとつだけ ",r.createElement(n.code,null,"previewwindow")," を作れる。"),"\n",r.createElement(n.h3,null,"autocmd events"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"WinNew: after creating a new window"),"\n",r.createElement(n.li,null,"WinEnter: after entering another window"),"\n",r.createElement(n.li,null,"WinLeave: before leaving a window"),"\n"),"\n",r.createElement(n.h3,null,"winnr"),"\n",r.createElement(n.p,null,"Windowの増減で番号が代わる。"),"\n",r.createElement(n.h3,null,"win_getid"),"\n",r.createElement(n.p,null,"vimセッション中不変のユニークなID"),"\n",r.createElement(n.h4,null,"id to nr"),"\n",r.createElement(n.h3,null,"win_id2tabwin"),"\n",r.createElement(n.p,null,"vimセッション中不変のユニークなID"),"\n",r.createElement(n.h3,null,"指定のWindowに移動する"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-vim"},':exe nr . "wincmd w"\n')),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-vim"},":call win_gotoid(id)\n")),"\n",r.createElement(n.h3,null,"split"),"\n",r.createElement(n.h3,null,"vsplit"),"\n",r.createElement(n.h3,null,"topleft"),"\n",r.createElement(n.pre,null,r.createElement(n.code,null,"+---+\n| 1 |\n+-+-+\n| |0|\n+-+-+\n")),"\n",r.createElement(n.h3,null,"aboveleft"),"\n",r.createElement(n.pre,null,r.createElement(n.code,null,"+-+-+\n| |1|\n| +-+\n| |0|\n+-+-+\n")),"\n",r.createElement(n.h2,null,"Buffer + Window"),"\n",r.createElement(n.h3,null,"閉じるときの挙動"),"\n",r.createElement(n.p,null,r.createElement(n.code,null,":bdelete")),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"最後のWindowでない時"),"\n"),"\n",r.createElement(n.p,null,"そのバッファを表示しているWindowごと取り除かれる"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"最後のWindowの時"),"\n"),"\n",r.createElement(n.p,null,"バッファを取り除いて、 ",r.createElement(n.code,null,":bnext")," される"),"\n",r.createElement(n.h2,null,"BufferList"),"\n",r.createElement(n.h3,null,"bufferlisted"),"\n",r.createElement(n.h3,null,"new name"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"split"),"\n",r.createElement(n.li,null,"enew"),"\n",r.createElement(n.li,null,"file name"),"\n"),"\n",r.createElement(n.h3,null,"vne[w] name"),"\n",r.createElement(n.p,null,"vertical new"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"vsplit"),"\n",r.createElement(n.li,null,"enew"),"\n"),"\n",r.createElement(n.h3,null,"bd[elete]"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"カレントバッファを閉じる"),"\n",r.createElement(n.li,null,"このバッファを開いているWindowをすべて閉じる。"),"\n",r.createElement(n.li,null,"buffer-listから取り除く"),"\n",r.createElement(n.li,null,"bufferはまだ消えてない"),"\n"),"\n",r.createElement(n.h3,null,"bdwipeout"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"カレントバッファを閉じる"),"\n",r.createElement(n.li,null,"このバッファを開いているWindowをすべて閉じる。"),"\n",r.createElement(n.li,null,"buffer-listから取り除く"),"\n",r.createElement(n.li,null,"bufferを消す"),"\n"),"\n",r.createElement(n.h2,null,"Buffer"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,'"$": last buffer'),"\n",r.createElement(n.li,null,'0, "#": alternate buffer'),"\n",r.createElement(n.li,null,'"%", "": current buffer'),"\n"),"\n",r.createElement(n.h3,null,"autocmd events(Bufferの変化)"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufNewFile: starting to edit a file that doesn't exist"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufReadPre: starting to edit a new buffer, before reading the file"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufRead: starting to edit a new buffer, after reading the file"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufReadPost: starting to edit a new buffer, after reading the file"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufReadCmd: before starting to edit a new buffer |Cmd-event|"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufWrite: starting to write the whole buffer to a file"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufWritePre: starting to write the whole buffer to a file"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufWritePost: after writing the whole buffer to a file"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufWriteCmd: before writing the whole buffer to a file |Cmd-event:"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufAdd: just after adding a buffer to the buffer list"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufCreate: just after adding a buffer to the buffer list"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufDelete: before deleting a buffer from the buffer list"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufWipeout: before completely deleting a buffer"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufFilePre: before changing the name of the current buffer"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufFilePost: after changing the name of the current buffer"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufEnter: after entering a buffer"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufLeave: before leaving to another buffer"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufWinEnter: after a buffer is displayed in a window"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufWinLeave: before a buffer is removed from a window"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufUnload: before unloading a buffer"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufHidden: just after a buffer has become hidden"),"\n"),"\n",r.createElement(n.li,null,"\n",r.createElement(n.p,null,"BufNew: just after creating a new buffer"),"\n"),"\n"),"\n",r.createElement(n.h3,null,"autocmd events(Bufferの中身の変化)"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"CursorMoved"),"\n"),"\n",r.createElement(n.h3,null,":file"),"\n",r.createElement(n.p,null,"バッファ名(ファイル名)"),"\n",r.createElement(n.h3,null,"bufnr"),"\n",r.createElement(n.p,null,"名前から番号を得る"),"\n",r.createElement(n.h3,null,"bufname"),"\n",r.createElement(n.p,null,"番号から名前を得る"),"\n",r.createElement(n.h3,null,"bufexists"),"\n",r.createElement(n.h3,null,"bufloaded"),"\n",r.createElement(n.p,null,"bufexists and not bufloaded はあり得る"),"\n",r.createElement(n.h3,null,"bnext"),"\n",r.createElement(n.h2,null,"Buffer Variables"),"\n",r.createElement(n.h3,null,"getbufvar"),"\n",r.createElement(n.h3,null,"setbufvar"))}var u=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?r.createElement(n,e,r.createElement(a,e)):a(e)};l(8678);function c(e){let{data:n,children:l}=e;return r.createElement(r.Fragment,null,r.createElement("h1",null,n.mdx.frontmatter.title),r.createElement(t.Zo,null,l))}function i(e){return r.createElement(c,e,r.createElement(u,e))}},8678:function(e,n,l){l(7294)},1151:function(e,n,l){l.d(n,{Zo:function(){return c},ah:function(){return a}});var t=l(7294);const r=t.createContext({});function a(e){const n=t.useContext(r);return t.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const u={};function c({components:e,children:n,disableParentContext:l}){let c;return c=l?"function"==typeof e?e({}):e||u:a(e),t.createElement(r.Provider,{value:c},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-vim-buffer-md-add984fb91aa85333454.js.map