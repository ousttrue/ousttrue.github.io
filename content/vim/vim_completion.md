+++
date = 2019-04-22T02:17:20+09:00
tags = ['vim', 'lsp']
draft = true
title = 'vim の Completion について調べる'
+++

`omnicompletion` とかいろいろあるけどどう違うねん。ということで調べる。
`help ins-completion`
`help complete-functions`

## いろいろな補完

## 補完関数を定義

`<C-X><C-U>` を `set completefunc` で、
`<C-X><C-O>` を `set omnifunc` でユーザー定義できる。

```vim
function! s:my_omni_complete(findstart, base)
    if a:findstart
        " 補完の開始列を返す
        return col('.')
    endif

    " 補完候補を返す
    let l:matches =  ["a", "b", "c"]
    return {'words': matches, 'refresh': 'always'}

endfunction

"setlocal complefunc = 
setlocal omnifunc = s:my_omni_complete
" menuone
setlocal completeopt = menu,preview,longest
" default
setlocal previewheight = 3
"setlocal pumheight
setlocal pumwidth = 15
```

のように定義する。

### 最初の実行時

> On the first invocation the arguments are:
>    a:findstart  1
>    a:base	empty

### 候補の取得

> On the second invocation the arguments are:
>    a:findstart  0
>    a:base	the text with which matches should match; the text that was
> 		located in the first call (can be empty)

### 補完候補

単なる文字列か以下のdictionary

```
{
	word		the text that will be inserted, mandatory
	abbr		abbreviation of "word"; when not empty it is used in
			the menu instead of "word"
	menu		extra text for the popup menu, displayed after "word"
			or "abbr"
	info		more information about the item, can be displayed in a
			preview window
	kind		single letter indicating the type of completion

        v	variable
        f	function or method
        m	member of a struct or class
        t	typedef
        d	#define or macro

	icase		when non-zero case is to be ignored when comparing
			items to be equal; when omitted zero is used, thus
			items that only differ in case are added
	dup		when non-zero this match will be added even when an
			item with the same word is already present.
	empty		when non-zero this match will be added even when it is
			an empty string
	user_data 	custom data which is associated with the item and
			available in |v:completed_item|
}
```

### 非同期で更新

### 自動的にsuggest

* deoplete

### 呼び出し例

```vim
inoremap <expr> . MayComplete()
func MayComplete()
    if (can complete)
        return ".\<C-X>\<C-O>"
    endif
    return '.'
endfunc
```

### 実装例
#### vim-lsp

```vim
function! lsp#omni#complete(findstart, base) abort
    if a:findstart
        return col('.')
    else
        " language serverに補完候補ををリクエスト
        call s:send_completion_request(l:info)

        " 空で抜ける
        redraw
        return v:none
    endif
endfunc
```

```vim
" call s:send_completion_request(l:info) のコールバック
call complete(col('.'), l:matches)
```

