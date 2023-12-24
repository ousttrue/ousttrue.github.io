---
date: 2021-12-20
tags:
- python
- libclang
- cython
- imgui
title: imgui の python バインディングをまた作る
---

# 名付けて cydeer

https://github.com/ousttrue/cydeer

`python`, `cython`, `dear imgui` の組み合わせで名前を付けようと思ったのだが、既に先人がいっぱいいて名前が被るので適当に決めた。🦌

https://github.com/HankiDesign/awesome-dear-imgui#languages

最初、`DearPyGui` のサイトが強そうだったので試そうと思ったのだけど用途が違いそうだった。
次に、しばらく `pyimgui` を使っていい感じだったので、 `docking` ブランチ対応を見たら開発ブランチならば動いたので、自前ビルドを改造して使っていた。
PR も送ってみたのだが、
どうせなら自分で作ろうという機運が高まったので、作った。
cydeer は pyOpenGL とともに使う `薄い` ImGui ラッパーという路線である。
`ctypes` を併用することでポインタを直接扱う。 `camel case` と `snake case` の変換を含めて何も変えない。

| lib               | binder                                           | imgui                | window & graphincs                       | コメント                                                              |
|-------------------|--------------------------------------------------|----------------------|------------------------------------------|-----------------------------------------------------------------------|
| (python)cydeer    | cython + ctypes(generate using libclang.cindex ) | imgui docking branch | glfw など + pyOpenGL でがんばる          | 可能な限りAPIの改変をしない。ポインタは ctypes で作る                 |
| (python)pyimgui   | cython                                           | imgui                | glfw など + pyOpenGL でがんばる          | ポインタ引数(p_openなど)による返り値を、tuple による複値で表現        |
| (python)DearPyGui | 未確認                                           | 未確認               | DirectX11。python からアクセスできない？ | imgui をラップして独自 API。python で OpenGL するという目的には使えぬ |
| (c)cimgui         | 未確認                                           | 未確認               |                                          | imgui を `extern C` にラップしたもの。他言語バインド向け              |
| (rust)imgui-rs    | 未確認                                           | 未確認               |                                          | builder パターンで Default 引数を代替                                 |

imgui ラップには、 `関数オーバーロード` , `デフォルト引数` , `メンバー関数` という難所がある。
要するに `c++` 要素なのだけど、`c++` 要素含めての imgui の使い勝手なので。各言語バインディングで悩ましいところです。
たとえば、 `rust` は関数オーバーロードやデフォルト引数が無いので API を変えてます。

C# とかでも、 `const ImVec2 pos& = ImVec2(0, 0)` のような引数を解決するのは手間がかかったりする。
DLLImport 定義に対するデフォルト引数では解決できないので、 C# 側で一時変数を作ってポインターを取得する必要がある。

`デフォルト引数` は cython で普通に解決した。
clang.cindex から値を取れれば難しくない。
`メンバー関数` は `ctypes` に `cython` のメソッドを定義して、 `self` を `this pointer` に cast して呼び出すコードを作った(ImGuiFontAtlas)。
`関数オーバーロード` は `cython` でディスパッチするのはつらいので、`MenuItem_2` のような suffix をつけて人間が選ぶようにした。

忘れていたが、もっとも問題になるのが `構造体の値渡し・返し` だった(C++に限らない？)。
`D言語` , `rust` ともにこれができない(vcのコンパイラと互換性がない？)ので注意が必要だった。コンパイルは通るが動作がおかしかったような。
ImGui の ImVec2 を値返しする関数でヒットする。
`cydeer` は、 `cython` を採用したので、`cython` 関数の出口で python 型に入れ替えるだけである。

あと、 `cydeer` は `pyi` 標準装備でいい感じである(一部実際のpython型と齟齬があるが・・・)。

## 実装上の課題

cython の cimport の扱いがやっかいで、`imgui`, `imgui.internal` に分割しようとするとうまくいかなかった。
`cydeer` に関しては巨大な単一のモジュールで行くのが無難かもしれない。
`internal` やノードエディターとか追加するときに分けたいのだけど。

現状、Windows + python-3.10 しか試していない。
Windows11 の wslg + wayland で動くようにしたい。
