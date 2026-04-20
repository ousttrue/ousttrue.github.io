---
title: HtmlParser
date: 2024-04-06
tags: [w3m, html]
---

html parse 回りの改修が難航。

<!-- truncate -->

単純にコード量が多くて手に負えない感じです。
この際、HtmlをパースしてDOMを構築することにした。
で、DOM を描画の入力にする。
レイアウトする際に line break と table layout のロジックだけ
なるべく w3m を再現させたい。
木ができていると親を辿れるので、
stack を使った flag 管理とかの煩雑な処理が簡単になる。
閉じタグを補う処理は、DOM構築で処理済みになる。 

あと form の input の保持するデータを DOM の方に持たせる。
再レイアウト時に form の内容を持ち越すのに都合が良い。

## HTML parse 仕様

わりと HTML parser を書いている先人がいた。

- [HTML parser を書いてるときに出会った Web 標準仕様の話 | blog.bokken.io ](https://blog.bokken.io/articles/2020-09-30/html-parser-good-story.html)

- https://html.spec.whatwg.org/multipage/parsing.html
- https://triple-underscore.github.io/HTML-parsing-ja.html

に仕様が書いてあって、わかりやすかった。

## 13.2.5 Tokenization

80 個の state があるのだけど、
1 state 1関数になるようにデザインできた。

```cpp
// 13.2.5.1 Data state
HtmlParserState::Result dataState(std::string_view src,
                                  HtmlParserState::Context &c) {
  auto [car, cdr] = consume(src);
  auto ch = src.front();
  if (ch == '&') {
    c.return_state = &dataState;
    return {{}, cdr, {characterReferenceState}};
  } else if (ch == '<') {
    return {{}, cdr, {tagOpenState}};
  } else {
    return {car, cdr, {}};
  }
}

html_token_generator html_tokenize(std::string_view v) {
  HtmlParserState state{dataState};
  HtmlParserState::Context c;
  while (v.size()) {
    auto [token, next, next_state] = state.parse(v, c);
    v = next;
    if (next_state.parse) {
      state = next_state;
    }
    if (token.size()) {
      // emit
      co_yield {Character, token};
    }
  }
}
```

`std::string_view` や `coroutine`を駆使したわりと今風の実装である。
HTML parse 仕様を、ほぼそのままコードに書き下せそう。

## 13.2.6 Tree construction

token から DOM を構築する仕様。

`13.2.6.4.7 The "in body" insertion mode`

が本丸なのだけど tag 別の例外処理が列挙されていて一朝一夕には終わらない感じです。
タグの開閉が釣り合わないとか、中に入っちいけないタグとか、改行コードの例外処理とか
事細かに書いてある。
素直な push/pop で綺麗な HTML では、全部やらなくても問題無さそうである。
w3m の長大な html 処理は、これに対応しようと努力していたのかもしれない…。。

ひとつ `<script>` に入ったときに、tokenizer の state 変更
に逆流するというのを見つけた。
他にも逆流があるかもしれない。

-- [<script>要素の構文](https://zenn.dev/qnighy/articles/4f6c728d452295)
