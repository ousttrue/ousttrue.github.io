---
title: typedef struct の除去
date: 2024-01-30
tags: [w3m]
---

これからヘッダーを小分けにしていくのに、
前方宣言を使いたいのだけどその時に typedef に配慮が必要です。

<!-- truncate -->

```c title="C の typedef struct"
typedef struct NodeTag
{
  const char *name;
  struct NodeTag *next; // 👈  
} Node;
// 前方宣言
struct Node; // これはだめ
struct NodeTag; // こっちが必要

// ならば同名にすれば？
typedef struct Node
{
  const char *name;
  struct Node *next; // 👈  
} Node;
// 前方宣言
struct Node; 

// 参照するときに struct が要る
void addLink(struct Node* node, struct Node* next);
```

```cpp title="C++ はこれで OK"
struct Node
{
  const char *name;
  Node *next;
};
// 前方宣言
struct Node; // OK

// 楽
void addLink(Node* node, Node* next);
```

なので struct の typedef を削除します。
ほぼ単純作業です。

## ついでにポインタ型typedefもやめる

```c title="例"
typedef struct _Str {
    char *ptr;
    int length;
    int area_size;
} *Str;
```

わずかに記述量を節約できるのだけど、
前方宣言で疎結合に変えるときに引っかかるのでやめます。

```c
Str a, b; // ささる注意
```

