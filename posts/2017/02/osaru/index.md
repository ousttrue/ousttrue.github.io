---
title: "Unity向けのJSON Parserを作成中"
date: 2017-02-27
taxonomies: {tags: ["unity"]}
---

いつもJSONUtilやMiniJson+JsonNodeを使うのだけど数値周りのcastで苦しんだので自前でつくることにした。

https://github.com/ousttrue/JsonSan~
https://github.com/ousttrue/Osaru


UnityのJSON
UnityのJsonUtilityみたいなシリアライザ・デシリアライザと不可分のものは使いづらい。例えば、以下のようなjsonでpositionだけをデシリアライズしたい場合。
{
    "action": "hoge",
    "params": {
        "power": 9.8,
        "position": [0, 1, 2]
    }
}

下記のように使いたい。
string json;

var parsed=Json.Parse(json);
var x=(float)parsed["params"]["position"][0];

MiniJson

MiniJson
MiniJsonをちょっと楽にするスクリプト

MiniJsonはパースした時にObjectの入れ物としてDictionary[string, object]、Arrayの入れ物としてList[object]を使っている。ここから値を取り出すにはキャストを使うのだがこれがわりとはまる。
int64 n=1234;
var no=(object)n;
var i=(int)no; // boxingされたint64型の値はobjectから直接intにキャストできない

上記のような、ある数をobject型に代入してそれを違う型として取りだすようなときに面倒すぎだった。
// こうすればできる
var i=(int)(int64)no;

ということで自作してみた。
JsonSan Osaru
JSON, Util, Parse, Reader, Deserializer|Serializerあたりの組み合わせが使い尽くされていたのでリポジトリ名がすごい適当になった。JSONさん。さらにMessagePackと統合してObjectStructure改めOsaruにした

https://github.com/ousttrue/Osaru

JSONの仕様を見ながらごりごりテストドリブンで実装した。

http://www.json.org/json-ja.html

JSONは、ObjectのキーがString限定なのに初めて気づいたり。Stackoverflowで「JavascriptのObjectリテラルとJSONは違うのだよ」というのを見たが、まぁそうですね。コメントとかキーのクォート省略とか。
実装
JSON文字列をパーサーに入力したらパース済みのノードとして結果を得る。
var json="[ \"json\" ]";
var node=Node.Parse(json);

ノードはJSONの定義に沿った型をenumで知っていて、GetNumber(), GetString(), GetBoolean()等が実装してあるので適当に値を取り出せる。MiniJsonでのはまりを反省してNumber型はdouble決め打ちにした。
public enum ValueType
{
    Unknown,

    String,
    Number,
    Object,
    Array,
    Boolean,
}

Debug.Log(node.ValueType); // ValueType.String
node.GetString();

nodeがObjectかArrayの場合がミソでパースした時点では”{“または”[“までしか読まないことにした。IEnumerable[Node]の発動で子要素への要求が来て中に読み進む。使い方によっては軽量。Count()を使ったりすると遅くなるであろう。
foreach(var child in node)
{
    Debug.Log(child.GetString());
}

