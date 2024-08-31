---
date: 2021-07-24
tags:
- python
title: python の task runner invoke
---

python でちょっとしたツールを書くときに便利。
`make` みたいにタスクを定義して、コマンドラインから実行する。
task として定義した関数の引数に応じてコマンドライン引数をさばけるので `argparse` せずにすませることができる。

## install

```
$ pip install invoke
```

## tasks.py

```python
from invoke import task

@task
def hello(c, who="hoge"):
    '''
    hello task
    '''
    print(f'hello {hoge}')


@task(hello)
def ver(c):
    '''
    version
    '''
    print(sys.version)
```

使う

```
$ invoke -l           
Available tasks:

  hello   hello task
  ver     version

$ invoke hello --help
Usage: inv[oke] [--core-opts] hello [--options] [other tasks here ...]

Docstring:
  hello task

Options:
  -w STRING, --who=STRING

$ invoke hello fuga  
No idea what 'fuga' is!
$ invoke hello -w fuga
hello fuga
$ invoke ver
hello hoge
3.8.6 (tags/v3.8.6:db45529, Sep 23 2020, 15:52:53) [MSC v.1927 64 bit (AMD64)]
```

## vscode でデバッグ

module に `invoke` を設定してやる

```json
        {
            "name": "task",
            "type": "python",
            "request": "launch",
            "module": "invoke",
            "args": [
                "hello"
            ],
            "console": "integratedTerminal"
        }
```

