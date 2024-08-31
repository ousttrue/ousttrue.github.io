---
title: "wgpu + fsharp 動いた"
date: 2023-12-09
tags: ["wgpu", "fsharp"]
---

fsharp 初めるのにいい題材は無いかと探索していたら、
Desktop版の WGPU の FSharp サンプルを発見。

`Windows11` 上の `.Net8` で動作したので、これでやってみることにした。

https://github.com/ginger-code/WGPU.Native/tree/main/examples/FSharp

改造写経して、fsharp と wgpu を少し理解。

https://github.com/ousttrue/wgpu_fsharp

- Windows11 動いた
- Ubuntu:23.10(wayland) swapchain 作成クラッシュ。code 139
- Ubuntu:22.04(X11) 動いた

# FSharp ではまる

少しずつ慣れていきつつ。

## 関数引数の tuple と () 有無でひっかかる

複数引数は tuple にするべきか否か。
とりあえず、 member は tuple にするという方針した。

## fsproj のソースの順番に意味がある

動く

```xml
  <ItemGroup>
    <Compile Include="GlfwUtil.fs" />
    <Compile Include="Program.fs" />
  </ItemGroup>
```

コンパイルエラー。

```xml
  <ItemGroup>
    <Compile Include="Program.fs" />
    <!-- プログラムからGlfwUtil が見えない! -->
    <Compile Include="GlfwUtil.fs" />
  </ItemGroup>
```

まさかこんなところに罠が・・・

## member呼び出しは括弧で囲む

```fsharp
obj.member()
// じゃなくて
(obj.member())
// が必要な場合がある？
```

## nvim

### `=`, `=` だと indent が壊れる
lsp とか使う。

### Ionide-vim: 文字列中で `]` をタイプすると自動で変な indent になる
よくわからなかった。
Ionide-vim の使用は休止して、lspconfig の `fsautocomplete` が動くようにした。
Sytax Highight がよわよわになった。後で調べる。

# vulkan よりだいぶ楽

WGPU は今年になってから Desktop の chrome で利用可能になったばかりなので、
まだ Android に来るのは少し時間がかかるかもしれないが、
Quest と Apple のVision Pro とかあの辺りから意外と速く動くようになるような気がするので、
仕込みを開始する・・・。

browser 上の wgpu だとOS 毎の Surface...Device...Swapchain の初期化が browser 任せになるのでもっと簡単になる。

