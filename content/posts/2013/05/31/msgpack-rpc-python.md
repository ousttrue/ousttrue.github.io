---
title: "おれおれmsgpack-rpc-pythonを作る"
date: 2013-05-31
taxonomies: {tags: ['cpp']}
---

おれおれmsgpack-rpc-pythonを作る
MsgPackRPCのpythonバインディング(クライアント側)が必要になったのでmsgpack-rpc-pythonを使ってみたのだが、
GUI(pyqt)に載せて接続制御とエラーハンドリングを細やかに制御したいので俺俺で類似品を作ることにした。
tonado-msgpackと名付けて取り合えず作業開始。
https://github.com/ousttrue/tornado-msgpack
msgpack-rpc-pythonのおかげでtornadoの存在を知ったのだがtornado.ioloopが見れば見るほどboost::asioっぽい。
ということで、c++で作成中のmsgpack-rpc-asioのpython版のような感じのAPIにしてみた。
以下の点を考慮している。

tornado.ioloopを隠さない
tornado.ioloopをスレッドに乗せて回しっぱなしにする
tornado.ioloopひとつで複数の接続を扱う
dispatcherを乗せ換え易くする。
接続ステータスの変化をコールバックで受け取る
非同期リクエストのコールバックを早期にセットする
TCP以外は考慮しない

プロジェクト作成
tonado_msgpack/
    setup.py
    sample/
        sample.py
    tonado_msgpack

setup.py
from distutils.core import setup

setup(
    name='tonado_msgpack',
    version='0.1',
    py_modules=['tonado_msgpack'],
    )

作業開始
$ python setup.py develop --user

sample/sample.py
#!/usr/bin/env python

import tornado_msgpack
import tornado

if __name__=="__main__":
    port=18080

    # dispatcher
    dispatcher=tornado_msgpack.Dispatcher()
    def add(a, b):
        return a+b
    dispatcher.add_handler("add", add)

    # server
    server_loop=tornado.ioloop.IOLoop()
    def on_receive(msg, session):
        result=dispatcher.dispatch(msg)
        session.send_async(result)
    server=tornado_msgpack.Server(server_loop)
    server.listen("localhost", port)
    server_thread=threading.Thread(target=lambda : server_loop.start() )

    # clinet
    client_loop=tornado.ioloop.IOLoop()
    client=tornado_msgpack.Client(client_loop)
    def on_status_changed(status):
        print(status)
    clinet.attach_status_callback(on_status_changed)
    client.connect("localhost", port)
    clinet_thread=threading.Thread(target=lambda : client_loop.start() )

    # request
    def on_receive(result):
        print(result)

    future=clinet.call_async_with_callback(on_receive, "add", 1)
    future.join()

    future=clinet.call_async_with_callback(on_receive, "add", 1, 2)
    future.join()

    future=clinet.call_async_with_callback(on_receive, "add", 1, 2, 3)
    future.join()

    print("stop client...")
    client_loop.stop()
    clinet_thread.join()

    print("stop server...")
    server_loop.stop()
    server_thread.join()

    print("done")

とりあえずこんな感じを予定。
./sample/sample.pyでシンタックスエラーが出なくなるところまで確認。
tornado_msgpackを順次実装していく。
Tornado Reference - http://www.tornadoweb.org/en/stable/
だいたい動くようになった。
$ ./sample/sample
connected
<_MainThread(MainThread, started 140102020679424)>:send 9 bytes
<Thread(Thread-1, started 140101931136768)>:on_read
<Thread(Thread-1, started 140101931136768)>:send 48 bytes
<Thread(Thread-2, started 140101918488320)>:on_read
on_receive:[1, 1, True, 'add() takes exactly 2 arguments (1 given)']
<_MainThread(MainThread, started 140102020679424)>:send 10 bytes
<Thread(Thread-1, started 140101931136768)>:on_read
<Thread(Thread-1, started 140101931136768)>:send 5 bytes
<Thread(Thread-2, started 140101918488320)>:on_read
on_receive:[1, 2, False, 3]
<_MainThread(MainThread, started 140102020679424)>:send 11 bytes
<Thread(Thread-1, started 140101931136768)>:on_read
<Thread(Thread-1, started 140101931136768)>:send 59 bytes
<Thread(Thread-2, started 140101918488320)>:on_read
on_receive:[1, 3, True, 'add() takes exactly 2 positional arguments (3 given)']
stop client...
stop server...
done

サーバースレッドのioloopと、クライアントスレッドのioloopが相互にやり取りしている感じでちゃんと動いている。
