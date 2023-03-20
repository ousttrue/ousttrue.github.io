"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4634],{9022:function(e,n,l){l.r(n),l.d(n,{default:function(){return f}});var t=l(1151),a=l(7294);function r(e){const n=Object.assign({p:"p",span:"span",blockquote:"blockquote",h2:"h2",h3:"h3",ul:"ul",li:"li",a:"a",h4:"h4"},(0,t.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">buffer list</code>'}})," < ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">buffer</code>'}})," > ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">window</code>'}})," > ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">tab</code>'}})," > ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">vim</code>'}})),"\n",a.createElement(n.p,null,"という感じ"),"\n",a.createElement(n.p,null,a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">:help window</code>'}})),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"Summary:\nA buffer is the in-memory text of a file.\nA window is a viewport on a buffer.\nA tab page is a collection of windows."),"\n"),"\n",a.createElement(n.h2,null,"Tab"),"\n",a.createElement(n.h3,null,"autocmd events"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"TabEnter: after entering another tab page"),"\n",a.createElement(n.li,null,"TabLeave: before leaving a tab page"),"\n",a.createElement(n.li,null,"TabNew: when creating a new tab page"),"\n",a.createElement(n.li,null,"TabNewEntered: after entering a new tab page"),"\n",a.createElement(n.li,null,"TabClosed: after closing a tab page"),"\n"),"\n",a.createElement(n.h2,null,"Window"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,a.createElement(n.a,{href:"https://vim-jp.org/vimdoc-ja/windows.html"},"https://vim-jp.org/vimdoc-ja/windows.html")),"\n"),"\n",a.createElement(n.p,null,"Window番号は、vim によって自動で振られる。\nBufferからWindow番号を手繰る。"),"\n",a.createElement(n.p,null,a.createElement(n.span,{dangerouslySetInnerHTML:{__html:"<code class=\"language-text\">bufwinnr('buf_name')</code>"}})),"\n",a.createElement(n.p,null,"tabにひとつだけ ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">previewwindow</code>'}})," を作れる。"),"\n",a.createElement(n.h3,null,"autocmd events"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"WinNew: after creating a new window"),"\n",a.createElement(n.li,null,"WinEnter: after entering another window"),"\n",a.createElement(n.li,null,"WinLeave: before leaving a window"),"\n"),"\n",a.createElement(n.h3,null,"winnr"),"\n",a.createElement(n.p,null,"Windowの増減で番号が代わる。"),"\n",a.createElement(n.h3,null,"win_getid"),"\n",a.createElement(n.p,null,"vimセッション中不変のユニークなID"),"\n",a.createElement(n.h4,null,"id to nr"),"\n",a.createElement(n.h3,null,"win_id2tabwin"),"\n",a.createElement(n.p,null,"vimセッション中不変のユニークなID"),"\n",a.createElement(n.h3,null,"指定のWindowに移動する"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="vim"><pre class="language-vim"><code class="language-vim"><span class="token punctuation">:</span>exe nr <span class="token operator">.</span> <span class="token string">"wincmd w"</span></code></pre></div>'}}),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="vim"><pre class="language-vim"><code class="language-vim"><span class="token punctuation">:</span><span class="token keyword">call</span> <span class="token function">win_gotoid</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span></code></pre></div>'}}),"\n",a.createElement(n.h3,null,"split"),"\n",a.createElement(n.h3,null,"vsplit"),"\n",a.createElement(n.h3,null,"topleft"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">+---+\n| 1 |\n+-+-+\n| |0|\n+-+-+</code></pre></div>'}}),"\n",a.createElement(n.h3,null,"aboveleft"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">+-+-+\n| |1|\n| +-+\n| |0|\n+-+-+</code></pre></div>'}}),"\n",a.createElement(n.h2,null,"Buffer + Window"),"\n",a.createElement(n.h3,null,"閉じるときの挙動"),"\n",a.createElement(n.p,null,a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">:bdelete</code>'}})),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"最後のWindowでない時"),"\n"),"\n",a.createElement(n.p,null,"そのバッファを表示しているWindowごと取り除かれる"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"最後のWindowの時"),"\n"),"\n",a.createElement(n.p,null,"バッファを取り除いて、 ",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">:bnext</code>'}})," される"),"\n",a.createElement(n.h2,null,"BufferList"),"\n",a.createElement(n.h3,null,"bufferlisted"),"\n",a.createElement(n.h3,null,"new name"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"split"),"\n",a.createElement(n.li,null,"enew"),"\n",a.createElement(n.li,null,"file name"),"\n"),"\n",a.createElement(n.h3,null,"vne[w] name"),"\n",a.createElement(n.p,null,"vertical new"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"vsplit"),"\n",a.createElement(n.li,null,"enew"),"\n"),"\n",a.createElement(n.h3,null,"bd[elete]"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"カレントバッファを閉じる"),"\n",a.createElement(n.li,null,"このバッファを開いているWindowをすべて閉じる。"),"\n",a.createElement(n.li,null,"buffer-listから取り除く"),"\n",a.createElement(n.li,null,"bufferはまだ消えてない"),"\n"),"\n",a.createElement(n.h3,null,"bdwipeout"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"カレントバッファを閉じる"),"\n",a.createElement(n.li,null,"このバッファを開いているWindowをすべて閉じる。"),"\n",a.createElement(n.li,null,"buffer-listから取り除く"),"\n",a.createElement(n.li,null,"bufferを消す"),"\n"),"\n",a.createElement(n.h2,null,"Buffer"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,'"$": last buffer'),"\n",a.createElement(n.li,null,'0, "#": alternate buffer'),"\n",a.createElement(n.li,null,'"%", "": current buffer'),"\n"),"\n",a.createElement(n.h3,null,"autocmd events(Bufferの変化)"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufNewFile: starting to edit a file that doesn't exist"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufReadPre: starting to edit a new buffer, before reading the file"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufRead: starting to edit a new buffer, after reading the file"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufReadPost: starting to edit a new buffer, after reading the file"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufReadCmd: before starting to edit a new buffer |Cmd-event|"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufWrite: starting to write the whole buffer to a file"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufWritePre: starting to write the whole buffer to a file"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufWritePost: after writing the whole buffer to a file"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufWriteCmd: before writing the whole buffer to a file |Cmd-event:"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufAdd: just after adding a buffer to the buffer list"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufCreate: just after adding a buffer to the buffer list"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufDelete: before deleting a buffer from the buffer list"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufWipeout: before completely deleting a buffer"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufFilePre: before changing the name of the current buffer"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufFilePost: after changing the name of the current buffer"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufEnter: after entering a buffer"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufLeave: before leaving to another buffer"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufWinEnter: after a buffer is displayed in a window"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufWinLeave: before a buffer is removed from a window"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufUnload: before unloading a buffer"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufHidden: just after a buffer has become hidden"),"\n"),"\n",a.createElement(n.li,null,"\n",a.createElement(n.p,null,"BufNew: just after creating a new buffer"),"\n"),"\n"),"\n",a.createElement(n.h3,null,"autocmd events(Bufferの中身の変化)"),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"CursorMoved"),"\n"),"\n",a.createElement(n.h3,null,":file"),"\n",a.createElement(n.p,null,"バッファ名(ファイル名)"),"\n",a.createElement(n.h3,null,"bufnr"),"\n",a.createElement(n.p,null,"名前から番号を得る"),"\n",a.createElement(n.h3,null,"bufname"),"\n",a.createElement(n.p,null,"番号から名前を得る"),"\n",a.createElement(n.h3,null,"bufexists"),"\n",a.createElement(n.h3,null,"bufloaded"),"\n",a.createElement(n.p,null,"bufexists and not bufloaded はあり得る"),"\n",a.createElement(n.h3,null,"bnext"),"\n",a.createElement(n.h2,null,"Buffer Variables"),"\n",a.createElement(n.h3,null,"getbufvar"),"\n",a.createElement(n.h3,null,"setbufvar"))}var u=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?a.createElement(n,e,a.createElement(r,e)):r(e)},c=l(8678),i=l(1883),m=l(8838);const s={code:e=>{let{children:n,className:l}=e;return l?a.createElement(m.Z,{className:l},n):a.createElement("code",null,n)}};function o(e){let{data:n,children:l}=e;const r=n.mdx.frontmatter;return a.createElement(c.Z,null,a.createElement("h1",null,r.title),a.createElement("div",{className:"tags-index"},r.tags&&r.tags.length>0&&r.tags.map((e=>a.createElement(i.rU,{to:"/tags/"+e+"/",itemProp:"url"},a.createElement("button",null,e))))),a.createElement(t.Zo,{components:s},l))}function f(e){return a.createElement(o,e,a.createElement(u,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-vim-buffer-md-506b79bd54dfb3eb03df.js.map