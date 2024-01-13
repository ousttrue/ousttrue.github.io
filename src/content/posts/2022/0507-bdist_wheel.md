---
date: 2022-05-07
tags:
- python
title: bdist_wheel + pep517 ではまる
---

# bdist_wheel + pep517 ではまる

```
setup.py bdist_wheel
```

なら成功するが、

```
pip wheel .
```

だと失敗するという現象に悩まされる。
cmake でビルドしている extension の pyd が含まれないのである。


原因は、 `setup.py` の下記の記述。

```python
class build_ext_cmake(build_ext):

    def run(self):
        for ext in self.extensions:
            self.build_cmake(ext)

    def build_cmake(self, ext):
        # these dirs will be created in build_py, so if you don't have
        # any python sources to bundle, the dirs will be missing
        build_temp = pathlib.Path(self.build_temp)
        build_temp.mkdir(parents=True, exist_ok=True)
        ext_path = pathlib.Path(self.get_ext_fullpath(ext.name)) # <- これ
        ext_path.parent.mkdir(parents=True, exist_ok=True)
```

直した。

```python
        ext_path = pathlib.Path(self.get_ext_fullpath(ext.name)).absolute()
```

たぶん、 `get_ext_fullpath` が相対パスを返していて、変なところに `pyd` が出力されていた。
pip の時だけフォルダの構成や pwd が変わっている様子。

```
pip wheel . -v
```

として、ログと睨めっこしていたら気付いた。
pip が subprocess とか使うので、デバッガがアタッチできなくて、なかなかわからなかった。

