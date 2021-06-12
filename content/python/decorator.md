---
Title: pythonのdecorator
date: 2019-05-06T13:14:23+09:00
taxonomies: {tags: ['python']}
---

引数付きのdecorator

```python
def decorator(func):
    def wrapper(name):
        return func(name + 'さん')
    return wrapper

@decorator
def hello(name):
    print(f'hello {name}')
```

```python
def witharg(suffix):
    def decorator(func):
        def wrapper(name):
            return func(name + suffix)
        return wrapper
    return decorator

@witharg('殿')
def hello(name):
    print(f'hello {name}')
```

みたいなことができる。

```python
# デフォルト引数で兼用したいのだが・・・
def witharg(suffix = None):
    def decorator(func):
        def wrapper(name):
            return func(name + suffix)
        return wrapper
    return decorator

@witharg() # カッコが要るのに注意
def hello(name):
    print(f'hello {name}')
```

デフォルト引数で省略すると嵌るので注意。
外側を `func` 引数で呼び出してしまう。
decorator に引数が定義されていると挙動が変わるのではなく、
使う時 `@` にカッコがあるときに挙動が変わる。
