---
title: "右辺値の理解"
date: 2013-10-27
taxonomies: {tags: []}
---

右辺値の理解
そろそろ右辺値を抑えておきたい気がしたのでテストコードを書きながら実験してみた(VC2010
Express Edition)。
http://msdn.microsoft.com/ja-jp/library/vstudio/dd293665.aspx
を参考に右辺値実験クラスRightKunを書いた。
コピーコンストラクタと同じくシグニチャは決まったものがあって
右辺値代入演算のオーバーロードとペアになるらしい。
各関数の呼び出しでメッセージを表示するように仕込んだ。
https://gist.github.com/ousttrue/7178535
#include <memory>
#include <iostream>


class RightKun
{
public:
    RightKun()
    {
        std::cout << this << ":default constructor" << std::endl;
    };

    ~RightKun()
    {
        std::cout << this << ":destructor" << std::endl;
    }

    // 左辺値によるコピーコンストラクタ
    RightKun(const RightKun &src)
    {
        std::cout << this << ":copy constructor: ";
        *this=src;
    }

    RightKun &operator=(const RightKun &src)
    {
        std::cout << "left value operator= " << &src << std::endl;
        return *this;
    }

    // 右辺値によるムーブコンストラクタ
    RightKun(RightKun &&src)
    {
        std::cout << this << ":move constructor: ";
        *this=std::move(src);
    }

    RightKun &operator=(RightKun &&src)
    {
        std::cout << "right value operator= " << &src << std::endl;
        return *this;
    }
};

とりあえず使ってみる
{
    // default
    RightKun r1;

    // copy
    RightKun r2=r1;
}

結果
0025FE33:default constructor
0025FE32:copy constructor: left value operator= 0025FE33
0025FE32:destructor
0025FE33:destructor 

問題ない。
通常の値返しの呼び出し
RightKun create()
{
    return RightKun();
}

使う
{
    RightKun r=create();
}

結果
0025FE2E:default constructor
0025FE2E:destructor

おや、コピーコンストラクタが呼ばれない。
RVO
調べてみたらこれはコンパイラのRVO(Return Value Optimization)という機能で
返り値が変数に代入されていない場合(いわゆる右辺値)に代入を無しにできるというものらしい。
なるほど。
よくある
vec3 cross(const vec3 &lhs, const vec3 &rhs)
{
  // x, y, z...
  return vec3(x, y, z);
}

vec3 out=cross(v1, v2);

的なものを
void cross(vec3 *out, const vec3 *lhs, const vec3 *rhs)
{
  // x, y, z...
  out->x=x;
  out->y=y;
  out->z=z;
}

vec3 out;
cross(&out, &v1, &v2);

と書いても別にパフォーマンスが変わらんと言うことですな。
最近のコンパイラなら大丈夫というのは、RVOがたぶん効くということか。
むしろ適切なコンストラクタで初期化できるので前者の方がよろしいな。
後者だとデフォルトコンストラクタが0で初期化しないようにしたくなるし、
いろいろよろしくない。
RVOできないようにする
先ほどの関数をRVOが無効になるように改造してみる。
RightKun createNoRVO()
{
    RightKun r;
    return r;
}

使う
{
    RightKun r=createNoRVO();
}

結果
0025FDFB:default constructor
0025FE31:move constructor: right value operator= 0025FDFB
0025FDFB:destructor
0025FE31:destructor

期せずしてムーブコンストラクタ呼び出しが発生した。
どういう条件で切り替わるんだこれは。
調べてみるとムーブコンストラクタはRVOが効かない時に使われる、という記述を見つけた。
http://msdn.microsoft.com/ja-jp/library/vstudio/dd293668.aspx

コンパイラが戻り値の最適化 (RVO) または名前付き戻り値の最適化 (NRVO)
を使用できない場合に、移動セマンティクスが役立ちます。
このような場合、型が移動コンストラクターを定義していれば、コンパイラはその移動コンストラクターを呼び出します

ほぅ。
NRVOというのはRVOの進化型で戻り値が変数に代入(名前付き)されていても有効になるものらしい。上記の例だと単純なのでNRVOできそうな気もするがコンパイルオプションとかですかね。
コンパイラが代入の右側を破棄してもよいと判断した場合にムーブコンストラクタが定義されていれば自動的にそっちを使うという暗黙的な仕組みのようだ。
g++(4.6)ではNRVOされた
右側を破棄できないようにしてみよう
RightKun createCanNotMove(const RightKun &src, bool hoge)
{
    if(hoge){
        return src;
    }
    return RightKun();
}

使う
{
    RightKun r=createCanNotMove(RightKun(), true);
}

結果
0025FE2C:default constructor
0025FE30:copy constructor: left value operator= 0025FE2C
0025FE2C:destructor
0025FE30:destructor

予定通りコピーコンストラクタ呼び出し。問題ない。
引数をRightKun&&にしてみる
ここでsrcの型をRightKun&&にすればムーブコンストラクタ呼び出しできるのではないか。
static RightKun rightValueArg(RightKun &&src, bool hoge)
{
    if(hoge){
        return src;
    }
    return RightKun();
}

使う
{
    RightKun r=rightValueArg(RightKun(), true);
}

結果
0025FE2C:default constructor
0025FE30:copy constructor: left value operator= 0025FE2C
0025FE2C:destructor
0025FE30:destructor

ところがぎっちょん、コピーの方。何故かというとrightValueArg内ではsrcはただの変数、左辺値として
扱われるのだ。RightKun&&は実引数の制限だ。
試しに以下のように呼び出すとエラーになる。
{
  RightKun leftvalue;
  RightKun r=rightValueArg(leftvalue, true);
}

エラー
error C2664: 'rightValueArg' : 1 番目の引数を 'RightKun' から 'RightKun &&' に変換できません。

srcが右辺値であることを明示する
プログラマはsrcが右辺値であることを明示できる。
static RightKun moveExplicit(RightKun &&src, bool hoge)
{
    if(hoge){
        return static_cast<RightKun&&>(src);
    }
    return RightKun();
}

使う
{
    RightKun r=moveExplicit(RightKun(), true);
}

結果
0025FE2B:default constructor
0025FE2F:move constructor: right value operator= 0025FE2B
0025FE2B:destructor
0025FE2F:destructor

意図通りにムーブコンストラクタが呼ばれた。
で、このキャストをラップするのがstd::moveですよと。
ただし、std::moveした変数をその後で使わないのはプログラマの責任と。
ということで右辺値とムーブコンストラクタのなんたるかがなんとなく分かった。
ムーブコンストラクタを呼ぶかどうかはコンパイラが判断するので
使うほうは気にしなくても、知らないうちにムーブコンストラクタが呼ばれてパフォーマンス上の恩恵を受けることができるということですな。
知っていればstd::moveによりムーブコンストラクタの呼び出しを増やせるかもしれない。
unique_ptrでstd::moveを要求されるのはコピーコンストラクタを無効にしつつ、
ムーブコンストラクタを定義している故と類推できた。
だいたい分かった結果、
自分でムーブコンストラクタを定義するクラスを書くことはあまり無さそうな気がした。
だめな書き方
最後に右辺値を返す関数を書こうとして最初にはまった、だめなバージョンを書いておく
RightKun &&moveFail()
{
    return RightKun();
}

使う
{
    RightKun r=moveFail();
}

結果
0025FE07:default constructor
0025FE07:destructor
0025FE2D:move constructor: right value operator= 0025FE07
0025FE2D:destructor

destructorが動いた後のポインタで、ムーブコンストラクタが呼び出される
大変危険なコードになった。 なんじゃこりゃー。
gccでやってみたらわかりやすいエラーメッセージが出た。
警告: 一時オブジェクトへの参照を返そうとしています [デフォルトで有効]

関数返り値の宣言に&&を使ってはいけないということか
