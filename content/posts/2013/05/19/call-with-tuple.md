---
Title: "msgpack-rpc-asioの関数登録と実行"
date: 2013-05-19
Tags: ['cpp']
---

msgpack-rpc-asioの関数登録と実行
msgpack-rpcのリクエストは、によると
[type, msgid, method, params]

という形式なのでmethod名をstd::stringとしてparamsをstd::tupleとして得られる。
これをサーバ側で如何に呼び出すかについて。
単純な実装だと以下のようにメソッド名をキーにして分岐することになる。
```c++ int and(int, int);
class dispatcher { void dispatch(int msgid, const std::string &method,
const msgpack::object &params) { if(method==“add”){ // 引数展開
std::tuple t; params.convert(&t);
// 関数実行
int result=add(std::get<0>(t), std::get<1>(t));

// 結果のパッキング
// response [type, msgid, error, result]
msgpack::sbuffer response;
msgpack::packer<msgpack::sbuffer> pk(&response);
pk.pack_array(4)
pk.pack(1);
pk.pack(msgid);
pk.pack_nil();
pk.pack(result);

// responseを送り返す


} else{ throw “unknown func”; }

}
引数展開、関数呼び出し、結果のパッキングと一連の操作を定型処理として括りだすと下記のように書ける。c++
// ２引数展開用 class dispatcher { // 実行 void dispatcher::dispatch(int
msgid, const std::string &method, const msgpack::object &params) {
if(method==“add”){ msgpack::sbuffer response=unpack_exec_pack(msgid,
add, params);
// responseを送り返す


} else{ throw “unknown func”; }

}
// ヘルパー template msgpack::sbuffer unpack_exec_pack(int msgid,
R(*f)(A1, A2), const msgpack::object &params) { // 引数展開 std::tuple
t; params.convert(&t);
// 関数実行
R result=add(std::get<0>(t), std::get<1>(t));

// 結果のパッキング
// response [type, msgid, error, result]
msgpack::sbuffer response;
msgpack::packer<msgpack::sbuffer> pk(&response);
pk.pack_array(4)
pk.pack(1);
pk.pack(msgid);
pk.pack_nil();
pk.pack(result);

return response;

}
```
１引数関数から９引数くらいまでと返り値void版を作ってやればだいたいの関数を登録することができる。
さらに 関数の登録と実行を分けるべく次のように拡張した。 ```c++ class
dispatcher { std::map m_map;
// 実行 void dispatch(int msgid, const std::string &method, const
msgpack::object &params) { std::function f=m_map.find(method);
if(f!=m_map.end()){ // 関数実行 msgpack::sbuffer resonse=f(msgid,
params);
// responseを送り返す


} else{ throw “unknown func”; }

}
// 登録 template void add_handler(const std::string &method, R(*f)(A1,
A2)) {
m_map[method]=f->msgpack::sbuffer{
// 引数展開
std::tuple<A1, A2> t;
params.convert(&t);

// 実行
R result=f(std::get<0>(t), std::get<1>(t));

// 結果のパッキング
// response [type, msgid, error, result]
msgpack::sbuffer response;
msgpack::packer<msgpack::sbuffer> pk(&response);
pk.pack_array(4)
pk.pack(1);
pk.pack(msgid);
pk.pack_nil();
pk.pack(result);

return response;


};

}
``msgpack->引数展開->c++関数呼び出し->msgpackへの一連の操作を 同一のシグネチャのstd::function`に
封じ込めることができる。
次にこれを関数ポインタ以外に関数オブジェクトを受け付けるように拡張したい。
まず、std::functionから実装。
c++   // std::function用   template<typname R, typename A1, typename A2>   void add_handler(contt std::string &method, std::function<R(A1, A2)> f)   {     // 中身同じ   }
呼び出し時にstd::functionを経由するようにすればあらゆる関数呼び出しを登録できる。
例えば、ラムダ関数も以下のように登録できる。
c++ // ラムダ登録 dispatcher d; d.add_handler("add",      std::function<int(int, int)>(       [](int a, int b)->int{          return a+b;        }));
しかし、どうせなら
c++ dispatcher d; d.add_handler("add",      [](int a, int b)->int{        return a+b;      });
と書きたい。
となると下記のような登録関数を書かねばならぬが関数のシグネチャがわからないので中身を記述することができない。
c++   // ラムダの登録   template<typname F>   void add_handler(const std::string &method, F f)   {     // 型がわからぬ   }
ここで関数オブジェクトのoperator()へのポインタを型推論することでFのシグネチャを得ることができる。
```c++ template void add_handler(const std::string &method, F f,
R(C::*)(A1, A2)const) { // 中身同じ }
// ラムダの登録 // std::functionも受けられる // std::bindは無理だった //
operator()がひとつしかない関数オブジェクトを受け付けられる？ template
void add_handler(const std::string &method, F f) { //
上の関数で型推論させる add_handler(method, f, &F::operator()); } ```
これでめでたくラムダも直接登録できるようになった。
ただし、operator()のオーバーロードが解決できないらしくstd::bindが登録できない。
std::bindに関しては、ラムダで代用できるしstd::functionでラップできるのでおいておくことにした。
