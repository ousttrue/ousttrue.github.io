---
date: 2013-05-14
tags:
- cpp
- msgpack
title: msgpack-rpcのasio版を作成中
---

msgpack-rpcのasio版を作成中
連休から始めていたmsgpack-rpcのバックエンドをasioに置き換えてWindowsでも動くようにする試みがやっと目処が立った。

https://github.com/ousttrue/msgpack-asiorpc

改め

https://github.com/ousttrue/msgpack-rpc-asio

当初は `msgpack-rpc` のバックエンドの `mpio` に `asio` の `kernel` を追加することで乗り切ろうとしたのだが、わりとすぐに頓挫した。
`mpio` のファイルディスクリプタでIOを管理するAPIがasioと合わないのですな。
次に、 `msgpack-rpc` の `mp::wavy::loop` をasioをラップしたクラスで置き換える作戦で
進めていたのだがだいぶ改造して構造が見えてきたところで、 `asio` との設計の違いをラップするのがめんどくさく
なってまた頓挫した。 http://dev.activebasic.com/egtra/2011/10/27/449/
を見ると簡単そうに見えるのだが功夫が足らないようだ。
で、上記の反省を踏まえて `asio` で `msgpack-rpc` を自由に実装することにした。
バイナリデータと `msgpack-rpc` の変換部分に `msgpack-rpc` のコードを借用して、
ネットワーク通信部分は `asio` で普通に作成した。
だいたいこんな感じのAPIになる予定。 

```c++ 
static int server_method(int a, int b) { return a+b; }

int main(int argc, char **argv) { 
    int port=18080;
    // server
    boost::io_service server_io;
    msgpack::asiorpc::server s(server_io);
    s.add_handler(&server_method, "add");
    s.start(boost::asio::ip::tcp::endpoint(boost::asio::ip::tcp::v4(), port));
    boost::thread server_thread([&server_io](){ server_io.run(); }

    // client
    boost::io_service client_io;
    msgpack::asiorpc::session c(server_io); 
    c.connect(boost::asio::ip::tcp::endpoint(boost::asio::ip::address::from_string("127.0.0.1"), port);
    boost::thread client_thread([&client_io](){ client_io.run(); }

    // request
    auto request=c.call("add", 3, 4);

    // blocking
    int result;
    request.convert(&result);
    std::cout << resut << std::endl;

    // finalize
    client_io.stop();
    client_thread.join();

    server_io.stop();
    server_thread.join();

    return 0;
}
```

原型はだいたいできて `Windows` でも動いたので続きを作りこんで行きたい。
今のうちに `msgpack::asiorpc` のネームスペースを変えたいような気もするがどうしようかね。
`msgpack::rpc::asio` とかか？うぅむ。
あと、クラスを `UpperCamelCase` で、関数を `lowerCamelCase` に変えよう思っていたが
`boost` 、 `msgpack` と一緒に使うときの見栄えを考慮するとスケークケースも一理あるな。
クラス名と同じ変数名(`request`とか)を使いたいときに変数名をreq等に変えることを強いられることがあるのが
気に入らないところではあるのだが。
プロジェクト名を `msgpack-rpc-asio`
に変えてネームスペースも `msgpack::rpc::asio` に変えることに今決めた。

