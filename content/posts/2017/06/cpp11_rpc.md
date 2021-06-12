---
title: "C++でMessagePack-RPCを実装する"
date: 2017-06-03
Tags: []
---

最近のC++(-std=c++14)でMessagePack-RPCを再実装してみる。

基本設計
MessagePack-RPCの仕様をおさらいすると以下の通り。
# request
[type, msgid, method, params]
 (0)   (int)  (str)   (array)

# response
[type, msgid, error, result]
 (1)   (int)  (any)  (any)

msgpackのバイト列を受け取って、msgpackのバイト列を返す関数として一般化する。
typedef std::vector<std::uint8_t> bytes;
// msgpackのバイト列を引数にとり、msgpackのバイト列を返す
typedef std::function<bytes(const &bytes)> procedurecall;

任意の関数呼び出しからprocedurecallを作り出せるようにして、MessagePack-RPCシステムの部品として使えるようにする。
簡単な例
例として
static int add(int a, int b){ return a+b; }

をprocedurecallに変換してみる。
procedurecall make_procedurecall(int(*f)(int, int))
{
    // request -> response ではなくparams -> result
    return [f](const bytes& src)->bytes
    {
        // unpack args
        auto parser = msgpackpp::parser(src);
        std::tuple<int, int> args;
        parser >> args;

        // call
        auto r = f(std::get<0>(args), std::get<1>(args));

        // pack result
        msgpackpp::packer packer;
        packer << r;
        return packer.get_payload();
    };
}

int add(int, int)をprocedurecallに変換するというのは、引数のアンパック、関数呼び出し、結果のパックという一連の定型コードの呼び出しになる。
procedurecallの使い方は以下の通り。
// register
auto proc = msgpackpp::rpc::make_procedurecall(&add);

// call
auto packer = msgpackpp::packer();
packer << std::make_tuple(1, 2);
auto result = proc(packer.get_payload());

// result
REQUIRE(3 == msgpackpp::parser(result).get_number<int>());

とりあえず動いたが、関数を増やすたびにこれだけのコードを記述するのはやってられませぬ。
以下のような理想形を目指して作りこんでゆく。
REQUIRE(3 == msgpack_procedurecall([](int a, int b){ return a+b; }, 1, 2));

lambdaが動けば他も動くようにできるので、lambdaを第一に実装する。
実装
ステップ毎に説明しようと思っていたが分かりにくいので、コードにコメントを追加することにした。
make_procedurecall
template<typename F, typename R, typename C, typename ...AS, std::size_t... IS>
procedurecall _make_procedurecall(const F &f
    , R(C::*)(AS...)const // template引数R, C, ASを受け付けるためのダミー
    , std::index_sequence<IS...> // template引数ISを受け付けるためのダミー
)
{
    // request -> response ではなくparams -> result
    return [f](const bytes& src)->bytes
    {
        // unpack args
        auto parser = msgpackpp::parser(src);
        std::tuple<AS...> args;
        parser >> args;

        // call
        auto r = f(std::get<IS>(args)...); // 可変長テンプレート引数を展開できる。ISと...が離れていることに注意

        // pack result
        msgpackpp::packer packer;
        packer << r;
        return packer.get_payload();
    };
}

template<typename F, typename R, typename C, typename ...AS>
procedurecall _make_procedurecall(F f
    , R(C::*)(AS...)const // template引数R, C, ASを受け付けるためのダミー
)
{
    return _make_procedurecall(f
        , &decltype(f)::operator() // lambdaの返り値と引数の型を次のテンプレートに渡す
        , std::index_sequence_for<AS...>{} // std::get呼び出しのためにindex_sequenceを作る。
    );
}

//
// あらゆる型のlambdaを受け付けるようにした
//
template<typename F>
procedurecall make_procedurecall(F f)
{
    return _make_procedurecall(f
        , &decltype(f)::operator() // lambdaの返り値と引数の型を次のテンプレートに渡す
    );
}

msgpack_call
template<typename F, typename R, typename C, typename ...AS>
decltype(auto) _msgpack_call(F f
    , R(C::*)(AS...)const // template引数R, C, ASを受けるためのダミー
    , AS... args)
{
    auto proc = msgpackpp::rpc::make_procedurecall(f);

    // call
    msgpackpp::packer packer;
    packer << std::make_tuple(args...); // 可変長テンプレート引数を展開できる
    auto result = proc(packer.get_payload());

    // unpack result
    R value;
    msgpackpp::parser(result) >> value;
    return value;
}

template<typename F, typename ...AS>
decltype(auto) msgpack_call(F f, AS... args) // 返り値の型はreturnから型推論
{
    return _msgpack_call(f
    , &decltype(f)::operator() // lambdaの返り値と引数の型をテンプレート引数に渡す
    , args...
    );
}

使う。
REQUIRE(3==msgpack_call([](int a, int b) { return a + b; }, 1, 2));
REQUIRE(-1==msgpack_call([](int a, int b) { return a - b; }, 1, 2));

valiadic templateおそるべし。
従来であれば、1引数、２引数・・・と引数の個数ごとに手作業でバージョンを増やさねばならなかったものが、わりとさくっと書けるな。
