---
Title: "pythonのmoduleとpackage周り"
date: 2019-05-01T00:47:39+09:00
taxonomies: {tags: ['python']}
---

`ImportError: attempted relative import with no known parent package`

## 相対Importの制限

* [[Python] importの躓きどころ](https://qiita.com/ysk24ok/items/2711295d83218c699276)

わいのやりたいことは実現不可能なのだな。
packageの内部でちょっとしたテストをするコードを、

```python
if __name__ == '__main__':
    sample()
```

という風に書いて実行しようとしていたのだが、
同階層のファイルを、

```python
from . import my_module
```

```
ImportError: attempted relative import with no known parent package
```

で阻まれてしまう。
エントリポイントが、

```
__package__ == None
__name__ == '__main__'
```

となるので、`ImportError` となるのである。
こんちくしょう。

### 無理やり誤魔化すなら・・・

もう一つ外のソースから `import` したかのように偽装する。

```
python -c 'import my_package; my_package.sample()'
```

💩過ぎる。
ライブラリにユーティリティが付属している場合にめちゃくちゃ作りづらい。
前からPytnonのもっとも💩なところだと思っていた。
ライブラリの開発時に部分的に実行する時に邪魔でしかない。

## package

複数のモジュールを束ねたもの。
import したときに `__package__` が `None` 以外になった `module` は `package` に属している。

### エントリポイントは `__package__ = None`

以下のファイル構成で実験してみた。

```
main.py # import mod
mod.py # import mod2
mod2.py # import mod3
mod3
    + __init__.py # from . import mod4
    + mod4.py

# それぞれ以下を記述
print(f'"{__name__}" in "{__package__}"')

python main.py として実行
```

`__package__` が、

* main.py __packag__ = None
* mod.py __packag__ = ""
* mod2.py __packag__ = ""
* mod3/__init__.py __packag__ = "mod3"
* mod3/mod4.py __packag__ = "mod3"

で

* mod3/__init__.py. __packag__ = "mod3"
* mod3/mod4.py. __packag__ = "mod3"

のみが `from . import mod4` 等の相対インポートが可能だった。
他は、

```
ImportError: attempted relative import with no known parent package
```

が出る。
つまり、`__packag__` が None(エントリポイント) もしくは ""(エントリポイントと同じ階層) であると相対インポートができない。

`python mod3/__init__.py` とすると、

* mod3/__init__.py. __packag__ = None
* mod3/mod4.py. __packag__ = ""

と変化して、相対 import ができない。

💩仕様。

