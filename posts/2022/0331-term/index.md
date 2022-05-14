+++
date = 2022-03-31
tags = ["term"]
+++

# term周りの更新

## terminal emulator を選定・・・

主に3つの動作環境、`Windows`, `Windows wsl`, `Ubuntu-20.04` があってtoolや設定をある程度共通にしたいということで試行錯誤していた。
他に `ssh経由`, `Windows wslg` もあるよ。

### wezterm 

`wezterm` が有望であることがわかった

|                 | font fallback | multiplexer | emoji | nerdfnt | graphics escape      |
|-----------------|---------------|-------------|-------|---------|----------------------|
| wezterm windows | ✅            | ✅          | color | ✅      | conpty issue         |
| wezterm wsl     | ✅            | ✅          | color | ✅      | conpty issue         |
| wezterm ssh     | ✅            | ✅          | color | ✅      | sixel, kitty, iterm2 |
| wezterm linux   | ✅            | ✅          | color | ✅      | sixel, kitty, iterm2 |

conpty を通すときに escape sequence が加工されるとかで、`sixel`, `kitty`, `iterm2` いずれのプロトコルもうまくうごかなかった。`iterm2` は絵はでるのだけど場所がずれるという惜しい挙動・・・。

<https://github.com/wez/wezterm/issues/1236>

SSH 経由で WSL することで対処する。

### wslg(xtermなど)

`xterm` は軽快できれいに表示できるので良かった。フォントのフォールバックができないぽいのが弱点。
`urxvt` は、`NerdFonts` がうまくでなかった。
`st` (simple term) もフォントまわりでつまづきだったかな。

|             | font fallback | multiplexer | emoji | nerdfnt | graphics escape |
|-------------|---------------|-------------|-------|---------|-----------------|
| xterm wslg  |               |             | mono  | ✅      | sixel           |
| mlterm wslg | ✅            | mlterm-con  | color | ✅      | sixel           |

mlterm はフォント周りの設定が強力でよかった。
文字セットごとにフォントを個別に指定できるので、フォントを合成せずともばらのままでよい。

`mlterm-con` という multiplexer があり sixel support があるらしい。
自前ビルドが必要そう(apt には含まれていないぽい)。

wslgは、頻繁にキーボードが押しっぱなしになったり不安定なような・・・
<https://github.com/microsoft/wslg/issues/207>
なおっているけ、リリースに時間がかかりそう？

### libvte

`libvte` 系のterm。
`gnome-terminal`, `xfce4-term` など。

### gpu rendering

GPUレンダリングで `araclitty`, `kitty` そして `wezterm` がある。
`wezterm` が `Windows` をサポートしていて、フォントのレンダリング、タブのサポートと総合的に良い。

### その他

* tabby
* RLogin
* ConEmu

など。

## 要件

### 日本語、中文、絵文字, NerdFonts を同時にいい感じに表示したい

となるとすべてを含むひとつのフォントより、主になるフォントを設定してそれにグリフが含まれなかったら、他のフォントにフォールバックする挙動をしてもらう方が便利。
いくつかのフォントを試してみたのだけど、 `HackGenNerd Console` が良かった。
で、中文の足りない漢字を `更紗ゴシックフォント` にフォールバックするという組み合わせ。
がんばって完璧な合成フォントを自作すればいいのだけど、よくわからないので、 複数フォントのフォールバック機能が必要。

かつて w3m で表示が乱れることで苦労した `ambigous width` 問題はあまり気にならなくなっていた。
なんか、表示は２カラム使うが、データ上は1カラムと見なすような扱いになっていて、
`X` につづいて ` ` で隙間を開けることで正しく表示できるようだ。
NerdFonts や 絵文字 はそのようになっている？

### エスケープシーケンスで画像を表示したい

`sixel` とか `kitty` とか `iterm2` による画像表示。

|                        | graphics            |
|------------------------|---------------------|
| Windows Native(conpty) |                     |
| wsltty                 | sixel               |
| xterm wslg             | sixel               |
| wezterm linux          | sixel, kityt ,iterm2 |

という感じになった。`wsltty` は `conpty` ではなくて `winpty` なので例外的に `sixel` が通過できるらしい。
動く環境でも `tmux` を挟むと動かなくなる。
代わりに terminal emulator の方で multiplexer(タブ機能) する必要が発生。

## まとめ

総合力で wezterm が強い。

* あまり頑張らなくてもフォントがうまく設定できる(cjk, NerdFonts, 絵文字)
* multiplexer 機能あり
* sixel, kitty, iterm2 プロトコルで画像を表示できる
* Windows でも動く
 
## 参考

* [alacritty+tmuxもいいけど、weztermがすごい件](https://zenn.dev/yutakatay/articles/wezterm-intro)
* [wezterm](https://wezfurlong.org/wezterm/)
* <https://sw.kovidgoyal.net/kitty/graphics-protocol/>
* OSC1337 <https://iterm2.com/documentation-images.html>
* [【Git for Windows】tty/mintty/winptyとは何なのか？【Gitbash】](https://unrealman.hatenablog.com/entry/tty-mintty-winpty)

