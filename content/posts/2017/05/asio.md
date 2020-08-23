---
Title: "boostから独立したasio"
date: 2017-05-05
Tags: ['vcpkg', 'cpp', 'asio']
---

vcpkgを眺めていたらnot boostなasioを発見した。

asioをBoostに含まれているオフィシャル感のあるクロスプラットフォームな通信ライブラリととらえていたのだけど、c++11でboostのよく使う部分がc++にかなり取り込まれて肥大化する一方のboostを避ける気持ちが生まれていた。

http://think-async.com/Asio/AsioAndBoostAsio

読んでみるとついにヘッダオンリー化を果たしたらしい。boostの外に出ないとヘッダオンリー化が難しそうではある。たしか、asioはsocket周りじゃなくてerror周りのクラスがコンパイル対象なのに引きずられてasioを使うにはコンパイルを強いられるということがあった。技術的にはだいぶ前からヘッダオンリー化は可能であったのだろうがついにやってくれたか。素晴らしい。解凍するとギガ単位になる最近のboostはいかがなものかと思ってた。
稀に使われているぽい、拙作のmsgpack-asioもヘッダオンリーのasioを使って近代化したいなぁ。あと、msgpackの実装も
https://github.com/nlohmann/json
に切り替えたい。
c++11以降、c++界隈が活性化しているような気がするな。
