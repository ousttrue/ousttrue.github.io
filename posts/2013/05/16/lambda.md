---
date: 2013-05-16
tags:
  - cpp
  - msgpack
title: lambdaの引数の型を得たい
---

(記事復旧のついでに少し修正)

msgpack-rpc の関数登録の都合上、 lambda 関数から引数の型を得たい。 下記のような書き方をしたい。


```cpp
template<typename R, typename A1, typename A2>
void register_func (const std::string &func_name, R(*handler)(A1, A2))
{
    // 関数登録
}

static int Add(int a, int b)
{
    return a+b;
}

int main()
{
    // 関数ポインタは受けれる
    register_func(“add”, &Add);

    // lambdaを受けることはできない
    register_func(“add”, [](int a,  int b)->int{ return a+b; });
    return 0;
}

```

上記の書き方では普通の関数ポインタを受けることはできるのだが、

std::function と lambda は受けられない。
std::function を受けるには下記のようにすることでできた。

```cpp
template<typename R, typename A1, typename A2> 
void register_func(const std::string &func_name, std::function<R(A1, A2) handler) {     
// 
}
```

残り、lambda を受けられる記述方法を知りたいのだがどうしたらよいものか。 下記のような手はうまくいかなかった・・・

```cpp
template<typename F, typename R, typename A1, typename A2>
void add_handler(const std::string &method, F handler)
{
    std::function<R(A1, A2)> f(handler);
    //add_handler
}

```

[lambda expression を 関数ポインタ型へと変換する](http://d.hatena.ne.jp/osyo-manga/20121205/1354674180) こちらのサイトから decltype を使ったらなんかできそうな感じがしたので粘っていたのだが、

目的そのものの記事を発見した。 http://stackoverflow.com/questions/6512019/can-we-get-the-type-of-a-lambda-argument

```cpp
// 2019/08 元記事のコードがよくわからなかったので書き直し。

// decltypeから得たメンバ関数へのポインタを触媒にして型を得る
template<typename F, typename R, typename C, typename A1, typename A2>
void _register_func(const std::string &func_name, R(C::*m)(A1 a1, A2 a2)const) // constに注意
{
    // R: 返り値の型
    // A1, A2: 引数の型
    // C: lambdaオブジェクトの型を受ける
}

// まずあらゆる引数を受け付けられるtemplateでlambdaオブジェクトを受ける(functor)
template<typename F>
void register_func(const std::string &func_name, F f)
{
    _register_func(const std::string &func_name, f, decltype(f)::operator());
)
```

F で関数ポインタ、lambda、std::function 等を受けられるようになった。 decltype なんかすごいな。

関連して、[cpp でメンバー関数を、this を第１引数にとる関数ポインタに変換する](https://qiita.com/ousttrue/items/6b207e1d431cf20e04d9)。
メンバ関数へのポインタは意外と使い道がある。

