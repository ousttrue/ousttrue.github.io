---
title: "SharpDXでHololens"
date: 2017-07-05
taxonomies: {tags: ['csharp', 'd3d', 'hololens']}
---

SharpDXでHololensできないかやってみる。

頓挫した。
VisualStudioのHolographicAppテンプレートをSharpDXに移植できないかやってみる。
C# Universal 空白のテンプレートで始める
以前書いたUWPでSharpDXを見てSharpDXの最低限を作成。
C++ Universal D3D11のテンプレートを移植する
とりあえず練習に素の”uwp directx11 template”を移植してみた。
これは、D2DのFPSテキストが何も描画されないことを除いて動いた。
C++ HolographicApp DirectXのテンプレートを移植する
途中まで移植したのだが以下の部分でクラッシュして、 エラーコード0xc0000409が解決できなくなってしまった。
// Starts the holographic frame and updates the content.
public Windows.Graphics.Holographic.HolographicFrame Update()
{
    // Before doing the timer update, there is some work to do per-frame
    // to maintain holographic rendering. First, we will get information
    // about the current frame.

    // The HolographicFrame has information that the app needs in order
    // to update and render the current frame. The app begins each new
    // frame by calling CreateNextFrame.
    var holographicFrame = m_holographicSpace.CreateNextFrame(); // <-- クラッシュする

    // 省略
}

作業は頓挫した。
