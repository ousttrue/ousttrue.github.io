---
Title: "IPythonことはじめ"
date: 2016-03-12
Tags: []
---

「IPythonデーターサイエンスクックブック」を買ってきたのでやってみる。
洋書の原書も買ってたが家で塩漬けになっていたり・・・
インストール
Windowsでやる。
普通のPythonだとnumpy等のライブラリを揃えるのが大変なので、
付属ライブラリが添付されているAnacondaパッケージを使いましょう。
https://www.continuum.io/downloads
python3.5(64bit)を選んでみた。
起動
> mkdir notebook
> cd notebook
notebook> C:\Anaconda3\Scripts\ipython.exe notebook

カレントディレクトリが作業領域になるのでC:\から実行したりすると404って言われる。
実行
右上の[new]を押して、[python3]を選択。
”‘python
print(‘hello’)
```
と入れて[shift+enter]で実行。
