+++
date = 2019-04-28T19:47:41+09:00
tags = ['python']
+++

# python で process を起動して PIPE 通信する

 https://docs.python.org/3/library/subprocess.html

こういうやつ

```

      +-------+
      | child |
      |process|
      +-------+
   stdin ^ | stdout
         | v
      +-------+
      |process|
      +-------+
-> stdin     stdout ->
```

## subprocess モジュール

subprocess は、

 ```
os.system
os.spawn*
```

の置き換え。

 ### subprocess.run

* https://docs.python.org/3/library/subprocess.html#subprocess.run

中でPopenして結果を集めて `CompletedProcess` として返す。

```python
# 抜粋
def run(...):
    with Popen(*popenargs, **kwargs) as process:
        try:
            stdout, stderr = process.communicate(input, timeout=timeout) 

    return CompletedProcess(process.args, retcode, stdout, stderr)
```

実行して結果の文字列を得て終わりというタイプの用途向け。
旧 `os.system` の代替になると思う。

### subprocess.Popen

* https://docs.python.org/3/library/subprocess.html#popen-constructor

標準入力、標準出力を制御するのはこっち。

```python
subprocess.Popen(['cmd_name', 'arg0', 'arg1'...],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    cwd=None, env=None,
    text=False
    )
```

Readループが一個しかない時はこれでいいんでないかな。

## 今回のテーマ

```

      +-------+
      | child |
      |process|
      +-------+
   stdin ^ | @stdout
         | v
      +-------+
      |process| ここでロギングして通信内容を確認したい
      +-------+
  @stdin ^ | stdout
         | v
      +-------+
      | parent|
      |process|
      +-------+

```

* @のところを常時読み込みにしたい(2つのReadループ)
* @stdin をReadするとブロックして固まるのでつらい

つらいのだ。

## asyncio

２つのReaderを非同期で制御しようということで 。


### asyncio の基本

loop を露出させる。

```python
```

loop は暗黙。
基本的にこちらでよいと思う。
必要に応じて取得する。

```python
```

#### asyncio.create_task で新しいスタックを開始する

新しいスタックなのでエラーハンドリングが無いことに注意。

#### StreamReaderProtocol と StreamWriterProtocol

コールバックと Stream を結び付ける。

### Windowsの標準入出力はIOCPできない

IOCPできるハンドルは決まっていて、

* 通常のファイル
* Socket
* NamedPipe

* https://tim.mcnamara.nz/post/176613307022/iocp-and-stdio

#### python3.7 で `asyncio.create_subprocess` ができた

child process 側はこれで助かった。

* https://docs.python.org/3/library/asyncio-subprocess.html

なんか、たまに `socket.exception` が出るので、
tcpのlocalhost接続にリダイレクトするとか謎の技使っているのかもしれぬ。

おかげで、子プロセスの標準入出力から `StreamReader` と `StreamWriter`
を楽に取得できる。

#### 重い NativeCoroutine は、ThreadPoolExecutorに逃がす
標準入力側

GILを回避して、別スレッドで待てるのではないか。

どんな処理が、NativeCoroutine なのか。

