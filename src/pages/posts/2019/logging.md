---
title: python の logger
date: 2019-04-30T23:19:20+09:00
tags: ['python']
---

loggerメモ

https://docs.python.org/3/library/logging.html

## root logger

loggerは木構造になっている

```python
import logging
logger = logging.getLogger()

print(logger)
# <RootLogger root (WARNING)>
```

RootLogger の handler 空なんですけど

```python
print(logging.getLogger().handlers)
# []
```

空の場合に logging モジュールが勝手に設定する、
lastResort に流される！

```python
_defaultLastResort = _StderrHandler(WARNING)
lastResort = _defaultLastResort
```

なので、

```python
logging.lastResort = None

# まだ黙らない
No handlers could be found for logger "root"
```

以下のようにして黙らす。

```python
logging.lastResort = logging.NullHandler()
```

## filter

フィルタは WARNING レベル。

```python
logger.debug('debug') # 出ない
logger.warning('warning') # 出る
```

## default の handler (出力)

```python
print(logger.handlers)
# []
```
