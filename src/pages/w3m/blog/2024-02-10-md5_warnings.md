---
title: MD5 deprecated warning
date: 2024-02-10
tags: [w3m]
---

MD5 警告が多くてメッセージが埋もれるのがつらいので対処を試みる。

<!-- truncate -->

```c
OSSL_DEPRECATEDIN_3_0 unsigned char *MD5(const unsigned char *d, size_t n,
                                         unsigned char *md);
```

## 情報収集

- [&#39;MD5&#39; is deprecated: Since OpenSSL 3.0 · Issue #4243 · gluster/glusterfs · GitHub](https://github.com/gluster/glusterfs/issues/4243)

よくわからないが、MD5関数を置き換えるとような簡単な修正では済まないようだ。
ヘタに変えると壊れそう。

## RFC2617 の digest 認証の実装

とりあえず局所化するだけにした。
そもそも digest 認証使っていなくて壊れてもわからさそうだし。

```c
Str *AuthDigestCred(struct http_auth *ha, Str *uname, Str *pw, Url *pu,
                    HRequest *hr, FormList *request);
```
