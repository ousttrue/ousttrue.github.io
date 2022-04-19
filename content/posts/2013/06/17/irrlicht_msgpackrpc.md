---
title: "IrrlichtにMsgPackRPCを仕込む"
date: 2013-06-17
tags: []
---

IrrlichtにMsgPackRPCを仕込む
Oculusの通販ステータスが早くもProcessingに変わって届くのが楽しみな今日この頃。
レンダリングエンジンにはIrrlichtを選択したのであるが、
そのままだとシーンを構築するとか諸々の作業がC++直叩きになる。
これだとさすがに大変なのでMsgPackRPCでラップして外部のツールから
操作しようと構想しておったのだが始めてみると早速問題に突き当たった。
オブジェクトを生成してそのメソッドをコールするのにどうすればいいのか。
こういう場合だ。
IMesh *mesh=CreateMesh("miku.pmd");
mesh->SetPosition(0, 0, 5);

MsgPackRPC経由だと以下のような感じか。
# pythonとかそういうの
client=msgpac.rpc.client()
mesh=client.call("CreateMesh", "miku.pmd")
client.call("Mesh_SetPosition", mesh, 0, 0, 5)

1つめのCreateMeshはグローバル関数かシングルトン的オブジェクトのメソッド呼び出しになるので特に問題は無い。
2つめはSetPositionのthisとしてmeshを送ってやる必要がある。
ここでmsgpack的にはIMesh*をシリアライズ/デシリアライズすることが必要になる。
案１ ポインタを整数値としてキャストすればいいじゃない
template <typename Stream>
inline packer<Stream>& operator<< (packer<Stream>& o, IMesh *v)
{
    // ポインタをintにキャスト
    o.pack((int)v);
    return o;
}

inline IMesh *v operator>> (object o, IMesh* v)
{
    unsigned int p;
    o.convert(&p):

    // intをポインタにキャスト
    v=(IMesh*)p;

    return v;
}

さすがにワイルドすぎる。というかポインタが既に開放されている場合になすすべが無いので没
案２ 適当にユニークなIDを振る
template <typename Stream>
inline packer<Stream>& operator<< (packer<Stream>& o, IMesh *v)
{
    // ポインタのuid値
    o.pack(v->uid());
    return o;
}

inline IMesh *v operator>> (object o, IMesh* v)
{
    unsigned int uid;
    o.convert(&uid):

    // uid値からポインタを得る
    v=IMesh::get_from_uid(uid);

    return v;
}

Irrlichtだと本体側に改造が要るけどこれでいってみるか。
template<typename T>
class IDGenerator
{
    unsigned int m_uid;

public:
    IDGenerator():m_uid(generate_uid())
    {
        m_uid_map.insert(std::make_pair(m_uid, this));
    }

    unsigned int uid()const 
    {
        return m_uid;
    }

////////////////////
// static
////////////////////
private:
    static unsigned int m_next_uid=1;
    static std::hash_map<unsigned int, T*> m_uid_map;
public:
    static unsigned int generate_uid(){ 
        return m_next_uid++; 
    }

    statc T* get_from_uid(unsigned int uid){
        auto found=m_uid_map.find(uid);
        if(found==m_uid_map.end()){
            return 0;
        }
        return found->second;
    }
};

// 継承階層のIReferenceCountedの下あたりにこんな感じで介入する予定
class IMesh : public virtual IReferenceCounted, public IDGenerator<IMesh>
{
};

うまくいくかやってみるとしよう。
書いてみた
自由に書いてみたらこうなった。templateクラスのスタティックメンバ変数の書き方を学んだ。
http://d.hatena.ne.jp/higepon/20100803/1280834422
template<typename T>
class IDGenerator
{
    struct Deleter{
        unsigned int m_uid;

        Deleter(unsigned int uid): m_uid(uid){}
        ~Deleter(){ remove_from_map(m_uid); }
    };
    Deleter m_deleter;
    unsigned int m_uid;

public:
    IDGenerator():m_uid(generate_uid()), m_deleter(m_uid)
    {
        s_uid_map[m_uid]=this;
    }

    unsigned int uid()const 
    {
        return m_uid;
    }

    ////////////////////
    // static
    ////////////////////
private:
    static core::map<unsigned int, IDGenerator*> s_uid_map;
public:
    static unsigned int generate_uid(){ 
        static unsigned int next_uid=1;
        return next_uid++; 
    }

    static T* get_from_uid(unsigned int uid){
        return s_uid_map.find(uid);
    }

    static void remove_from_map(unsigned int uid){
        s_uid_map.remove(uid);
    }
};
template <typename T> core::map<unsigned int, IDGenerator<T>*> IDGenerator<T>::s_uid_map;

しかし、この設計だとstaticメンバがdll境界を越えて２つ存在してうまくいかない罠があった。没
案3 適当にユニークなIDを振る(非テンプレート)
irr::IReferenceCountedを改造する。
小賢しいtemplateをやめてべたにグローバル変数を隠蔽する方式を導入した。
class IReferenceCounted
{
public:

    //! Constructor.
    IReferenceCounted()
        : DebugName(0), ReferenceCounter(1), UID(get_uid())
    {
        register_uid(UID, this);
    }

    u32 uid(){ return UID; }

    //! Destructor.
    virtual ~IReferenceCounted()
    {
        unregister_uid(UID);
    }


// 省略

};


#include "IDGenerator.h"
#include "IReferenceCounted.h"
#include "irrMap.h"

namespace irr {

    extern "C" IRRLICHT_API u32 get_uid()
    {
        static u32 uid=1;
        return uid++;
    }

    static core::map<u32, IReferenceCounted*> g_map;

    extern "C" IRRLICHT_API void register_uid(u32 uid, IReferenceCounted *p)
    {
        g_map.set(uid, p);
    }

    extern "C" IRRLICHT_API void unregister_uid(u32 uid)
    {
        auto found=g_map.remove(uid);
    }

    extern "C" IRRLICHT_API IReferenceCounted* get_from_uid(u32 uid)
    {
        auto found=g_map.find(uid);
        if(!found){
            return 0;
        }
        return found->getValue();
    }
}

動作確認できた。
ここまでの作業でMsgPackRPCを使ったIrrlichtエクスポートについて見通しを得ることができた。
PythonやLuaから使えるようにするのと同じような作業でリモートから関数をコールできるようになるのでいい感じだ。
呼び出し側にPythonのMsgPackRPCを使えば違う言語からでも呼び出せるので一石二鳥というもの。
ということで引き続き作業を進める。
MsgPackRPCのリモート呼び出しを利用したシーンエディタを作りながら表示できるものを増やしていく。
