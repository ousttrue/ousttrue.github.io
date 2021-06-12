---
title: "BrowserSyncのws設定を知らなかったせいでWebSocketのUpgradeがうまくいかなくてはまる"
date: 2015-11-15
Tags: []
---

前から写経しながら読んでいる
「シングルページWebアプリケーション」がようやく終盤に差し掛かってきた。
Socket.IOで接続するところがあるのだけど、独自にgulpからbrowserSyncを使っていてWebSocketがupgradeできずにはまる。
Firefoxのconsoleにエラーが出て気になる気になる。
gulpfile.js
gulp.task('server', ['nodemon'], function () {
    browser.init(null, {
        proxy: 'http://localhost:7000',
        port: 3000,
        ws: true // <- これが無いとTransportがpollingからupgradeできない
    });
});

なかなか気付けなかった。
その前に、socket.ioのnamespaceの指定でもはまってたのだが・・・。
しかし、この本は実にいい本だ。自分のWebの知識レベルにちょうどあっていて、昨今の技術をキャッチアップして行く足がかりに
すごく役にたった。
この本が提唱する、
mongodb -> node.js + express + socket.IO -> JQuery
な構成をベースにgulpによる開発環境と、typescript、mithril、bootstrapなんかを盛って行く路線で
寄り道しながら修行中。
