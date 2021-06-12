+++
date = 2019-04-21T18:13:27+09:00
taxonomies.tags = ['vim']
draft = true
+++

# Denite練習

nvim 環境が軌道に乗ってきたので、 `denite` やってみよう。

## source 作る

### リポジトリ

https://github.com/ousttrue/deso

作った

とりあえず `dein.toml` に登録。

```toml
[[plugins]]
repo =  'ousttrue/deso'
```

nvim 再起動して `~/.cache/dein/repose/github.com/ousttrue/deso`

にクローンされるところまで確認。

### deso.py

`rplugin/python3/denite/source/deso.py` を作る

```py
from .base import Base


class Source(Base):
    def __init__(self, vim):
        super().__init__(vim)
        self.name = 'deso'
        self.kind = 'word'

    def gather_candidates(self, context):
        candidates = []
        return candidates
```

`:UpdateRemotePlugin`

して、`Denite deso` で空のリストが返るところまで確認した。

## 中身作る

`help denite-create_-source` を読む。

`gather_candidates` は `dictionary` の `list` を返す。

`dictionary` の様式は、 `help denite-candidate-attributes` を読む。

```py
{
    "word": "hogehoge",  # required
    "abbr": "hoge", # 表示用。無くてもよい
}
```

なるほど。


```py
    def gather_candidates(self, context):
        return [
            {
                "word":  date
            }
        ]
```

しかし、うまくいかず。どうも変更が反映されないなーと悩んでいたのだが、

`~/.cache/dein/.cache/init.vim/.dein/rplugin/python3/denite/source/deso.py`

を見たら最初に作った空の候補を返す状態だった。

`:UpdateRemotePlugin` 
で元のファイルに更新があっても置き換えてくれないように見えた。

dein で `denite` を入れなおしたら更新できた。
もっと楽に更新する方法は無いのかしら。

シンボリックリンクにしてごまかした w

```
ln -s ~/.cache/dein/repos/github.com/ousttrue/deso/rplugin/python3/denite/source/deso.py
~/.cache/dein/.cache/init.vim/.dein/rplugin/python3/denite/source/deso.py
```

これで、 `neovim` を再起動すればリロードできるようになった。
そのうち正しいやり方がわかるだろう・・・

