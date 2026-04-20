---
title: network 整理
date: 2024-02-09
tags: [w3m]
---

比較的に独立性の高い network 関連を整理する。

<!-- truncate -->

`istream.c` に実装されている `union input_stream` を別ライブラリに整理してみる。

```c
union input_stream {
  struct base_stream base; // file descriptor | socket
  struct file_stream file; // local file
  struct str_stream str; // memory bytes
  struct ssl_stream ssl; // ssl
  struct encoded_stream ens; // gz archie etc
};
```

C の関数ポインタで実装されたポリモーフィズムなので、素直に C++ の継承に置きかえつつ、
関連型を別ディレクトリに移動します。
ftp を事前にカットしているのでシンプルになっています。
(2本のストリームを扱う ftp は専用のインターフェースを余分に持っている)

- input_stream
- Url
- HRequest
- compression 関連
- http auth 関連
- ssl 関連

IO も asio か libuv への置き換えを視野に入れているが、まだどれにするかを決めていない。

## union input_stream から abstract base class へ

```cpp
class input_stream {
protected:
  input_stream(int bufsize);
  virtual ~input_stream();
};

class base_stream : public input_stream {
public:
  base_stream(int des);
};

class file_stream : public input_stream {
public:
  file_stream(FILE *f);
};

class str_stream : public input_stream {
public:
  str_stream(Str *s);
};

class ssl_stream : public input_stream {
public:
  ssl_stream(SSL *ssl, int sock);
};

class encoded_stream : public input_stream {
public:
  encoded_stream(input_stream *is, EncodingType encoding);
};

```

union を利用した擬似的なポリモーフィズムを、
c++ の継承を利用したシンプルなポリモーフィズムへと作り替える。
union で最後に束ねていたところが、
base class で基底に変わるのは面白い。



