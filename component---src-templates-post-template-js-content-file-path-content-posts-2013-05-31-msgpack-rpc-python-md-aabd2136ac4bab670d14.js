"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4443],{7489:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var a=t(1151),r=t(7294);function o(e){const n=Object.assign({span:"span"},(0,a.ah)(),e.components);return r.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">おれおれmsgpack-rpc-pythonを作る\nMsgPackRPCのpythonバインディング(クライアント側)が必要になったのでmsgpack-rpc-pythonを使ってみたのだが、\nGUI(pyqt)に載せて接続制御とエラーハンドリングを細やかに制御したいので俺俺で類似品を作ることにした。\ntonado-msgpackと名付けて取り合えず作業開始。\nhttps://github.com/ousttrue/tornado-msgpack\nmsgpack-rpc-pythonのおかげでtornadoの存在を知ったのだがtornado.ioloopが見れば見るほどboost::asioっぽい。\nということで、c++で作成中のmsgpack-rpc-asioのpython版のような感じのAPIにしてみた。\n以下の点を考慮している。\n\ntornado.ioloopを隠さない\ntornado.ioloopをスレッドに乗せて回しっぱなしにする\ntornado.ioloopひとつで複数の接続を扱う\ndispatcherを乗せ換え易くする。\n接続ステータスの変化をコールバックで受け取る\n非同期リクエストのコールバックを早期にセットする\nTCP以外は考慮しない\n\nプロジェクト作成\ntonado_msgpack/\n    setup.py\n    sample/\n        sample.py\n    tonado_msgpack\n\nsetup.py\nfrom distutils.core import setup\n\nsetup(\n    name=\'tonado_msgpack\',\n    version=\'0.1\',\n    py_modules=[\'tonado_msgpack\'],\n    )\n\n作業開始\n$ python setup.py develop --user\n\nsample/sample.py\n#!/usr/bin/env python\n\nimport tornado_msgpack\nimport tornado\n\nif __name__=="__main__":\n    port=18080\n\n    # dispatcher\n    dispatcher=tornado_msgpack.Dispatcher()\n    def add(a, b):\n        return a+b\n    dispatcher.add_handler("add", add)\n\n    # server\n    server_loop=tornado.ioloop.IOLoop()\n    def on_receive(msg, session):\n        result=dispatcher.dispatch(msg)\n        session.send_async(result)\n    server=tornado_msgpack.Server(server_loop)\n    server.listen("localhost", port)\n    server_thread=threading.Thread(target=lambda : server_loop.start() )\n\n    # clinet\n    client_loop=tornado.ioloop.IOLoop()\n    client=tornado_msgpack.Client(client_loop)\n    def on_status_changed(status):\n        print(status)\n    clinet.attach_status_callback(on_status_changed)\n    client.connect("localhost", port)\n    clinet_thread=threading.Thread(target=lambda : client_loop.start() )\n\n    # request\n    def on_receive(result):\n        print(result)\n\n    future=clinet.call_async_with_callback(on_receive, "add", 1)\n    future.join()\n\n    future=clinet.call_async_with_callback(on_receive, "add", 1, 2)\n    future.join()\n\n    future=clinet.call_async_with_callback(on_receive, "add", 1, 2, 3)\n    future.join()\n\n    print("stop client...")\n    client_loop.stop()\n    clinet_thread.join()\n\n    print("stop server...")\n    server_loop.stop()\n    server_thread.join()\n\n    print("done")\n\nとりあえずこんな感じを予定。\n./sample/sample.pyでシンタックスエラーが出なくなるところまで確認。\ntornado_msgpackを順次実装していく。\nTornado Reference - http://www.tornadoweb.org/en/stable/\nだいたい動くようになった。\n$ ./sample/sample\nconnected\n&lt;_MainThread(MainThread, started 140102020679424)>:send 9 bytes\n&lt;Thread(Thread-1, started 140101931136768)>:on_read\n&lt;Thread(Thread-1, started 140101931136768)>:send 48 bytes\n&lt;Thread(Thread-2, started 140101918488320)>:on_read\non_receive:[1, 1, True, \'add() takes exactly 2 arguments (1 given)\']\n&lt;_MainThread(MainThread, started 140102020679424)>:send 10 bytes\n&lt;Thread(Thread-1, started 140101931136768)>:on_read\n&lt;Thread(Thread-1, started 140101931136768)>:send 5 bytes\n&lt;Thread(Thread-2, started 140101918488320)>:on_read\non_receive:[1, 2, False, 3]\n&lt;_MainThread(MainThread, started 140102020679424)>:send 11 bytes\n&lt;Thread(Thread-1, started 140101931136768)>:on_read\n&lt;Thread(Thread-1, started 140101931136768)>:send 59 bytes\n&lt;Thread(Thread-2, started 140101918488320)>:on_read\non_receive:[1, 3, True, \'add() takes exactly 2 positional arguments (3 given)\']\nstop client...\nstop server...\ndone\n\nサーバースレッドのioloopと、クライアントスレッドのioloopが相互にやり取りしている感じでちゃんと動いている。</code></pre></div>'}})}var s=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?r.createElement(n,e,r.createElement(o,e)):o(e)},d=t(8678),l=t(4160),c=t(8736);const p={code:e=>{let{children:n,className:t}=e;return t?r.createElement(c.Z,{className:t},n):r.createElement("code",null,n)}};function i(e){let{data:n,children:t}=e;const o=n.mdx.frontmatter;return r.createElement(d.Z,null,r.createElement("h1",null,o.title),r.createElement("div",{className:"tags-index"},o.tags&&o.tags.length>0&&o.tags.map((e=>r.createElement(l.rU,{to:"/tags/"+e+"/",itemProp:"url"},r.createElement("button",null,e))))),r.createElement(a.Zo,{components:p},t))}function h(e){return r.createElement(i,e,r.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2013-05-31-msgpack-rpc-python-md-aabd2136ac4bab670d14.js.map