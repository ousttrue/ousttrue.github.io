---
title: tui を zig 化して練習する
date: 2024-08-03
tags: [zig, tui]
---

tui プログラムを zig に移植して練習する。
fork してちょこちょこっと弄ったものが増えてきたのでメモ。

## kilo

https://github.com/ousttrue/kilo

## yaskk

https://github.com/ousttrue/yaskk

## neatvi

https://github.com/ousttrue/neatvi

kilo に vim binding を載せる方法を探して発見。
むしろ、これを `zig` 化する気になった。
かつ `skk` 乗せて
`markdown` 専用の便利エディターとかできないか構想。

## mtm

https://github.com/ousttrue/mtm

## w3m

https://github.com/ousttrue/w3m/tree/master

巨大すぎて `zig` 化するのは大変そう。

[BoehmGC](https://github.com/ivmai/bdwgc) と `zig` の組合せは面白いかもしれない。
BoehmGC に [build.zig](https://github.com/ivmai/bdwgc/blob/master/build.zig) があるし。

## strchr

strchr がわりと頻出する。
`zig` だとこんな感じかなという。
もっと、完全に `C` 互換 `[*c]c_char` も作れる。

```zig
pub fn strchr(str: []u8, ch: u8) ?[]u8 {
    for (str, 0..) |*p, i| {
        if (p.* == ch) {
            return str[i..];
        }
    }
    return null;
}
```

`strtok` とか…

## c++

zig をやる前は c のプログラムを改造する際に
`c++` 化するという手を使っていたのだが、
`c++` 化すると `zig` 化の邪魔になるということがわかった。
`c++` 化すると多の言語との互換性(CのABI)が大きく損なわれてしまう。

## Windows対応

curses を使っていても `termcap / termios` の実装としてしか利用していない場合は、
比較的簡単に `windows console` 対応ができることが多い。
端末の rawmode 化と、 termsize の取得を実装すればとりあえず動くことが多い。
`SIGWINCH` は存在しないがInput から取得可能。
検知したら同じコールバックを呼ぶようにしてやればよさそう。

`select` を入力に使っている場合は剥す必要があり、
`libuv` を導入したくなるのだが `zig-0.13.0` では循環定義かなんかのエラーが出て
`libuv` を `@cImport` できない。
自前で、 `extern fn` 定義をこさえてやる必要がありそう。
`libclang` のから半自動で生成したいと思っている。

## tuibox

https://github.com/ousttrue/tuibox
