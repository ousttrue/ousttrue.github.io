+++
date = 2022-11-21
tags = ["buildtool"]
title = "PREFIX の構築 (meson など)"
+++

GStreamer をビルドする過程で `meson` を調べたら、存外に良かった。
python なので、CMake と比べてデバッガをアタッチできるのが圧倒的に楽。
CMake はステップ実行とかできないからね。

成り行きで GStreamer に続いて、 Gtk4,  PyGObject とかをビルドしていたら、
Gtk4 もわりと面白そうなことがわかった。
昔、Windows では扱いが面倒だった GLArea がさくっと動いた。
さらに Gtk4 で新しくできた Gsk 層が 2D の SceneGraph ぽくて、
PyOpenGL と連携して遊べるかもしれない。
NodeEditor とか Timeline(KeyFrame) Editor 作れないかなぁ。
PyGObject まわりは、gir(xml) から Python の型ヒント(pyi stub) を生成することで、
LanguageServer のインテリセンスをそれなりに効かせることができた。
最近の python では、 `Qt` とか `bpy` といった `native extension` の方が、
素の python モジュールより型情報が無くなるという逆転現象が起きているのだが、
PyGObject はほぼ gir(xml) そのままなので、わりといい感じになる。

Gtk のビルドが短時間でできることがわかったので、
GUI 層は自前ビルドでいけそうな気がしてきた。
つまり、Linux と Windows 両方を gtk4 でなるべく同じツールを使ってみる。
Gentoo をクリーンインストールして下の層だけ  `emerge` で入れた。
Gentoo は USE フラグで `-gtk -glib -qt` などとすることで、依存が連鎖することを止めることができる。

ついでに `wayland` に手を出したところ、`wayland` 界隈もビルドツールに
`meson` が導入されているのを発見。
`download/clone` => `meson` を自動化する python スクリプトの作成に着手した。

<https://github.com/ousttrue/toprefix>

プロトタイプとしてはまぁまぁの使い勝手。
`gentoo` と `Windows` 共用で `gtk4` などをさくっと展開できるようになる。予定。

さらに `dotfiles` の管理でやっている `neovim` のビルドも合流。
go 系の `ghq`, `fzf` などの展開や、
rust 系の `wezterm`, `stylua`, `ripgrep` の展開もこっちに移そうかなと。
わりと処理のパターンは決まっていて次のうちのどれかになる事が多い。

```
download => extract => build => install: tar ball
download => extract          => install: ビルド済み tar ball
              clone => build => install: repository
```

これにパッチ当てが追加になることがある。

ついでに、
以前作った `blender` の `bpy` モジュール生成スクリプトなんかも合流することを画策。
`svn` なしで `blender` ビルドできんかね。
となると `pixar usd` も `llvm` もビルドしたいわね。
`pyxar usd` は `boost` の除去したいけどね。
TUI と Desktop のツール系は自前ビルドで遊べるようにしていく。
