---
Title: "lambdaの引数の型を得たい"
Published: 2013-5-16
Tags: []
---

lambdaの引数の型を得たい
msgpack-rpcの関数登録の都合上、 lambda関数から引数の型を得たい。
下記のような書き方をしたい。 ```c++ template void
register_func(const std::stiring &func_name, R(*handler)(A1, A2)) {
// 関数登録 }
int main() { // errorになる register_func(“add”,
[](int%20a,%20int%20b)->int{ return a+b; });
return 0;

} ```
上記の書き方では普通の関数ポインタを受けることはできるのだが、
std::functionとlambdaは受けられない。
std::functionを受けるには下記のようにすることでできた。
c++ template<typename R, typename A1, typename A2> void register_func(const std::string &func_name, std::function<R(A1, A2) handler) {     // }
残り、lambdaを受けられる記述方法を知りたいのだがどうしたらよいものか。
下記のような手はうまくいかなかった・・・
c++ template<typename F, typename R, typename A1, typename A2> void add_handler(F handler, const std::string &method) {     std::function<R(A1, A2)> f(handler);     //add_handler }
こちらのサイトから
http://d.hatena.ne.jp/osyo-manga/20121205/1354674180
decltypeを使ったらなんかできそうな感じがしたので粘っていたのだが、
目的そのものの記事を発見した。
http://stackoverflow.com/questions/6512019/can-we-get-the-type-of-a-lambda-argument
微妙にそのままではコンパイルが通らなかったので少し工夫したらうまくいった。
```c++ // ret template Ret helper0(Ret (F::*)(Rest…));
template Ret helper0(Ret (F::*)(Rest…) const);
// 1 template A1 helper1(Ret (F::*)(A1, Rest…));
template A1 helper1(Ret (F::*)(A1, Rest…) const);
// 2 template A2 helper2(Ret (F::*)(A1, A2, Rest…));
template A2 helper2(Ret (F::*)(A1, A2, Rest…) const);
template void add_handler(F handler, const std::string &method) {
typedef decltype(handler) functor; typedef
decltype(helper0(&functor::operator())) R; typedef
decltype(helper1(&functor::operator())) A1; typedef
decltype(helper2(&functor::operator())) A2;
// register function...

} ``` F
handlerで関数ポインタ、lambda、std::function等全部受けられるようになったらしくoverloadが不要になった。
decltypeなんかすごいな。
