---
title: "Python3のasyncioについてのメモ"
date: 2017-06-10
tags: []
---

Python の Version3.4 から始まった asyncio 周りについてのメモ。
環境は、Windows10 上の python3.6(64bit)。

Version
Python3.4

asyncio
yield from

Python3.5

async def
await

EventLoop

https://docs.python.org/3/library/asyncio-eventloop.html

```python
import asyncio
loop=asyncio.get_event_loop()
print(loop)
# <_WindowsSelectorEventLoop running=False closed=False debug=False>

loop.run_forever()
print('done')
```

ただし永遠(forever)走り続けるのでプロセスを kill しないと止まらず。
Windows 向けの loop

https://docs.python.org/3/library/asyncio-eventloops.html#asyncio.ProactorEventLoop

```python
import asyncio
import sys

if sys.platform == 'win32':
    loop = asyncio.ProactorEventLoop()
    # <ProactorEventLoop running=False closed=False debug=False>
    asyncio.set_event_loop(loop)
else:
    loop = asyncio.get_event_loop()
```

以降、loop を得るコードを省略。
EventLoop に関数を投入する

```python
def func(loop):
    loop.stop() # 停止

loop.call_soon(func, loop)
loop.run_forever()
print('done')
```

asyncio.get_event_loop で loop を取得。loop.call_soon で loop に関数を投入できる。
投入された関数は、loop.run_forever で消化される。
ついでに、loop.stop で run_forever から抜けることができる。
EventLoop に generator を投入する

```python
def gen(loop, name, count):
    print(name, loop.time())
    for i in range(count):
        print(name, i, loop.time())
        yield
    print(name, 'done')
    loop.stop()

asyncio.ensure_future(gen(loop, 'a', 3))
asyncio.ensure_future(gen(loop, 'b', 3))
loop.run_forever()

a 534341.609
a 0 534341.609
b 534341.609
b 0 534341.609
a 1 534341.609
b 1 534341.609
a 2 534341.609
b 2 534341.609
a done
b done
```

loop.stop で止まった。
すべての task が終わるのを待つ

```
def gen(loop, name, count):
    print(name, loop.time())
    for i in range(count):
        print(name, i, loop.time())
        yield
    print(name, 'done')

taskA=asyncio.ensure_future(gen(loop, 'a', 3), loop=loop)
taskB=asyncio.ensure_future(gen(loop, 'b', 5), loop=loop)
future=asyncio.gather(taskA, taskB)
future.add_done_callback(lambda future: loop.stop())
task=asyncio.ensure_future(future, loop=loop)

loop.run_forever()

a 571911.359
a 0 571911.359
b 571911.359
b 0 571911.359
a 1 571911.359
b 1 571911.359
a 2 571911.359
b 2 571911.359
a done
b 3 571911.359
b 4 571911.359
b done
```

loop.run_until_complete で future が終わるのを待つ

```python
def gen(loop, name, count):
    print(name, loop.time())
    for i in range(count):
        print(name, i, loop.time())
        yield
    print(name, 'done')
futureA=asyncio.ensure_future(gen(loop, 'a', 3), loop=loop)
futureB=asyncio.ensure_future(gen(loop, 'b', 5), loop=loop)
future=asyncio.gather(futureA, futureB)

loop.run_until_complete(future)
```

future の終了を待って loop.stop したいなら run_until_complete するのが明瞭。
PEP492 – Coroutines with async and await syntax(python3.5 09-Apr-2015)

generator を流用した coroutine は紛らわしいので、coroutine に独自のシンタックスを導入するで。native coroutine と呼称する。C で実装しているわけではない。
関数内で await を使わなくても coroutine として有効

```python
async def read_data(db):
    pass

EventLoopにnative coroutineを投入する
async def gen(loop, name, count):
    print(name, loop.time())
    for i in range(count):
        print(name, i, loop.time())
        #yield
        await asyncio.sleep(0)
    print(name, 'done')

taskA=asyncio.ensure_future(gen(loop, 'a', 3), loop=loop)
taskB=asyncio.ensure_future(gen(loop, 'b', 5), loop=loop)
future=asyncio.gather(taskA, taskB)

loop.run_until_complete(future)
```

yield を await asyncio.sleep(0)で置き換えた。
yield のままだと TypeError になる。

```
Traceback (most recent call last):
  File ".\exp.py", line 18, in <module>
    taskA=asyncio.ensure_future(gen(loop, 'a', 3), loop=loop)
  File "D:\Python36\lib\asyncio\tasks.py", line 519, in ensure_future
    raise TypeError('A Future, a coroutine or an awaitable is required')
TypeError: A Future, a coroutine or an awaitable is required

It is a TypeError if __await__ returns anything but an iterator.
```

実験。

```python
def it():
    yield

async def co_y():
    yield

async def co():
    pass

<class 'generator'>
<class 'async_generator'>
.\exp.py:22: RuntimeWarning: coroutine 'co' was never awaited
  print(type(co()))
<class 'coroutine'>
```

async_generator…。async def 内で yield すると違うものになるのね。syntax error にはできんな。
自前のメインループに loop を組み込むとすれば
loop.once のような関数があると毎フレーム小出しにタスクを消化できるのだが。
ググってみた。

https://stackoverflow.com/questions/29868372/python-asyncio-run-event-loop-once

loop.stop(); loop.run_forever()

なるほど。

```python
async def gen(loop, name, count):
    print(name, loop.time())
    for i in range(count):
        print(name, i, loop.time())
        await asyncio.sleep(0)
    print(name, 'done')

taskA=asyncio.ensure_future(gen(loop, 'a', 3), loop=loop)
taskB=asyncio.ensure_future(gen(loop, 'b', 5), loop=loop)
future=asyncio.gather(taskA, taskB)

count=1
while not future.done():
    print(count)
    count+=1
    # loop one step
    loop.stop()
    loop.run_forever()

print('done')

1
a 579281.828
a 0 579281.828
b 579281.828
b 0 579281.828
2
a 1 579281.828
b 1 579281.828
3
a 2 579281.828
b 2 579281.828
4
a done
b 3 579281.828
5
b 4 579281.828
6
b done
7
done
```

いいかんじになった。これなら付き合っていけそうだ。
