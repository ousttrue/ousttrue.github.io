---
title: "W3M HISTORY"
date: 2001-11-08
tags: ["w3m"]
---

```
2001/3/23 ==============================================================
From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01807] Re: w3m-0.2.0
* url.c が USE_NNTP や __EMX__ でコンパイルできない。
* EWS4800 用の patch (間に合いませんでしたね。坂根さん)
* ssl_forbid_method がらみで #define USE_SSL で #undef USE_SSL_VERIFY
  の場合の処理。(rc.c と url.c)
  # hsaka24 でアナウンスせずに修正を入れてしまったのが問題でしたね。
  # すみません。
* rc.c に一部 ISO-2022-JP があるものを修正。
  # 添付の patch であたるかどうか…
* saveBufferDelNum で del==TRUE の時、":" 以前が２回削除される。
* main.c の URL履歴を保存する位置の修正。
  # これも hsaka24 でアナウンスせずに修正を入れてました。

From: TSUCHIYA Masatoshi <tsuchiya@pine.kuee.kyoto-u.ac.jp>
Subject: [w3m-dev 01810] deflate (was: w3m-0.2.0)
0.2.0 には Content-encoding: deflate に対応するためのパッチ [w3m-dev 01684]
も含まれているようですが、これだけでは http://cvs.m17n.org/~akr/diary/ 
は閲覧できませんでした。

From: Fumitoshi UKAI <ukai@debian.or.jp>
Subject: [w3m-dev 01808] Re: w3m-0.2.0
GNU/Linux で glibc 2.2系だと sin.ss_len がないので
IPv6 でコンパイルできません。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev-en 00399] Re: w3m-0.2.0
 >> From: Dan Fandrich <dan@coneharvesters.com>
 >> Version 0.2.0 still contains the following bugs which I fixed two months
 >> ago and sent patches for to this list, namely:
 >> - core dumps on startup if given a URL requiring a needsterminal mailcap
 >>   handler
 >> - destroys most of an existing ~/.mailcap file without warning when editing
 >> - mailcap handling is still wrong as MIME type should be case insensitive
 >> - private mailcap extension has an illegal name

From: SATO Seichi <seichi@as.airnet.ne.jp>
Subject: w3mの正規表現検索におけるバグ
検索文字列として $* を渡すと Segmentation fault が
発生するようです。(全然無意味な文字列なんですが)

2001/3/22 ==============================================================

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01664] Re: Patch for anonymizer.com
HTTP(HTTPS)の場合に URL が
　http://<host>/<scheme>: ...
となっていれば cleanupName() を呼ばない様にしてみました。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01670] Re: w3m-0.1.11-pre-kokb24-test1
Str.c の strcpy/strncpy を bcopy or memcpy にする件ですが、
bcopy 系と memcpy 系を統一するのは後にするとしても、とりあえず全て
bcopy に置き換えた方がいいと思います。
ついでに、saveBufferDelNum で一部 '\0' が扱えなくなっているバグの修正です。

From: TSUCHIYA Masatoshi <tsuchiya@pine.kuee.kyoto-u.ac.jp>
Subject: [w3m-dev 01618] backend patch
Subject: [w3m-dev 01671] backend patch for w3m-0.1.11-pre-kokb24-test1
w3m を対話的なクライアントとして働く機能を追加するパッチです。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01673] SEGV in append_frame_info()
>w3m/0.1.11-pre-kokb23-m17n-0.8 を使っていますが、Der Angriff のトップページ (
>http://i.am/goebbels/)で、ページの情報を見ようと「=」キーを押したら、
>Segmentation Fault してしまいました。
との指摘がありました。m17n 版に限らないので、とりあえず対処しておきます。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01674] image map
> AREAで作ったクライアントサイドイメージマップのhrefが"#test"のような場合に、
> ジャンプ出来ません。
> Image map links の画面では、URLだけでなく、altやtitleも表示した方が良いと
> 思います。
との指摘がありましたので修正/対応してみました。ただし、
* #undef MENU_MAP の場合、#label のみであっても reload になる。 
  別のバッファからの呼び出しなので、こうしないとちょっと難しいです。
  なお、内部で作成したバッファからの呼び出しは全てそうなる様にしました。
  バッファを作らない #define MENU_MAP の方がいいかと思います。
* 追加した属性は alt のみ (title って何？)
  MapList 構造体を変えた方が良いようにも思いましたが、面倒なので止めました。
となってます。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01675] goto label
GOTO や #define MENU_MAP の場合のイメージマップ
で #label のみの URL が指定された場合に reload しない様にしました。
それから、[w3m-dev 01101] space in URL で追加された処理を goURL() に移し
ました。ただし、inputLineHist() で URL を入力する場合、空白文字は ^V を
使わないと入力できないので必要ないとも思います。そういうこともあって
後ろの空白の処理は外しました。

From: Tsutomu Okada <okada@furuno.co.jp>
Subject: [w3m-dev 01676] Re: w3m-0.1.11-pre-kokb24-test1
Subject: [w3m-dev 01678] Re: w3m-0.1.11-pre-kokb24-test1
須藤さんの [w3m-dev 01627] のパッチのうち、GC_warn 関連と細かなソース
の修正は当てておいたほうがいいように思います。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01680] Re: w3m-0.1.11-pre-kokb24-test1
 >> 岡田です。
 >> 私の環境では、-pedantic によって
 >> warning: ANSI forbids assignment between function pointer and `void *'
 >> warning: pointer targets in initialization differ in signedness
う、ごめんなさい。私ですね。墓穴を掘ってしまった...
 >> warning: overflow in implicit constant conmplicit con version
 >> warning: pointer targets in passing arg 2 of `Strcat_charp_n' differ in signedness
 >> という警告が出ましたが、これらも修正すべきでしょうか？
修正するにこしたことはないので patch を出します。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01684] Re: http://cvs.m17n.org/~akr/diary/
application/x-deflate 対応．

From: Moritz Barsnick <barsnick@gmx.net>
Subject: [w3m-dev-en 00318] Information about current page
Subject: [w3m-dev-en 00320] Re: Information about current page
Subject: [w3m-dev-en 00322] Re: Information about current page
Subject: [w3m-dev-en 00323] Buglet (Was: Re: Information about current page)
Changes 'URL of the current anchor' on the info page into
'full' URL. When the cursor is on a form element, 
`Method/type of current form' will be displayed.

From: c603273@vus069.trl.telstra.com.au (Brian Keck)
Subject: [w3m-dev-en 00343] patch for proxy user:passwd on command line
Subject: [w3m-dev-en 00351] Re: patch for proxy user:passwd on command line
This patch to w3m-0.1.11-pre-kokb23 adds the lynx-like option

        -pauth username:password

so I don't have to retype username & password every time I run w3m,
which is often.  It's so simple I wonder whether it's against policy,
but it would be nice for me & some others if it was in the official
0.1.11.

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01772] Re: visited anchor
Subject: [w3m-dev 01773] Re: visited anchor
 * visited anhor color。
 * textlist ベースの history。hash 化された (URL) history。
 * #undef KANJI_SYMBOLS の場合の rule の実装の変更。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01786] Re: w3m-0.1.11-pre-hsaka24
Subject: [w3m-dev 01787] Re: w3m-0.1.11-pre-hsaka24
 >> 1. http://www.tomoya.com/ で、<FRAMESET> の文書を表示させ(フレームの自
 >> 動表示が ON なら、F を押す)、MAIN のフレームを表示させようとすると、
 >> main.c:2082 の Sprintf で落ちる(gotoLabel を label=0x0 で呼びだしてい
 >> る)。
[w3m-dev 01675] の致命的なバグ。すみません。
 >> 2. 掲示板α http://133.5.222.232/keijiban/index.htm を表示させようとす
 >> ると、frame.c:668 の strcasecmp で落ちる
こっちは前々から。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01788] Re: w3m-0.1.11-pre-hsaka24
w3m-0.1.11-pre-hsaka24 のバグ修正です。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01792] Re: w3m-0.1.11-pre-hsaka24
 >> 全然別件なのですが、useVisitedColor が TRUE のとき
 >> http://www.kusastro.kyoto-u.ac.jp/%7Ebaba/wais/other-system.html にお
 >> いて、最後の画面の表示が 1～2 秒ほど待たされます。具体的には、goLineL
retrieveAnchor() が linear search だったのが原因でした。
binary search に変えてみました。どうでしょう。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01793] <li type="..">
<li> タグの type 属性ですが、その <li> にのみ有効なのではなくて、
<ol> や <ul> での指定を上書きする(以降の <li> にも有効となる)様
ですので修正しました。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01801] some fixes.
frame を表示していて、２重に出力されている部分がありました。
その修正です。

Subject: IPv6 support for w3m's ftp
From: Hajimu UMEMOTO <ume@imasy.or.jp>
  w3m の HTTP は IPv6 対応されているのですが、残念ながら FTP 機能の方
は IPv6 対応していません。FTP 機能に対する IPv6 対応パッチを作成しまし
たので、非公式パッチに含めて頂けないでしょうか？

2001/3/16 ==================================================================
From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01711] Authorization
・http://user:pass@hostname/ に対応．

From: hsaka@mth.biglobe.ne.jp
Subject: [w3m-dev 01724] buf->type when mailcap is used.
mailcap を使った場合(copiousoutput, htmloutput) にも、
buf->type を設定する様にしました。
'v', 'E' を使いたいのと、m17n の方でバッファが text/html だという
情報が必要な箇所があるので。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01726] anchor jump too slow by TAB-key on STDIN.
標準入力からHTMLを読んでいる場合，
リンク先の URL が相対 path 指定だったりすると、常に、currentdir() が
呼ばれているために速度が低下していました．
そこで立ち上げた時点で一度 カレントディレクトリを設定する様にしました。
ついでに標準入力からの場合の変な URL "file:///-" を "-" だけにしました。

From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
Subject: [w3m-dev 01727] C-z when stdin
% cat main.c | w3m
して、C-z した際にシェルプロンプトに戻らない件に対するパッチ
です。

From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>
Subject: [w3m-dev 01729] ignore_null_img_alt
ignore_null_img_alt が OFF だと、<img src="file"> という ALT 属性が
無い場合でも何も表示しなくなっていたので修正しました。
それから、<img width=300 height=1 src="bar.gif"> の様な指定の場合に、
<hr> で置き換えると、width 属性が無視され改行が入ってしまうのが
いまいちなので <hr> と同様の処理を入れる様にしました。

From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>
Subject: [w3m-dev 01730] Re: <hr> in a table
<hr>の改良．

From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>
Subject: [w3m-dev 01731] completion list
最下行入力でのファイル名の補完時に

----- Completion list -----
X11R6/    compat/   include/  libdata/  local/    nfs/      ports/    share/
bin/      games/    lib/      libexec/  mdec/     obj/      sbin/     src/
(Load)Filename? /usr/

の様に表示させるための patch です。

From: Kiyokazu SUTO <suto@ks-and-ks.ne.jp>
Subject: [w3m-dev 01733] A patch concerning SSL
SSLを使う時に
1. 使わないメソッドを指定するオプション「ssl_forbid_method」を追加する、
2. 接続確立に失敗したときにエラーメッセージを表示する、

From: Kiyokazu SUTO <suto@ks-and-ks.ne.jp>
Subject: [w3m-dev 01735] Re: A patch concerning SSL
Subject: [w3m-dev 01737] Re: A patch concerning SSL
1. ssl_forbid_methodの「データ型」をP_STRINGからP_SSLPATHに変えて、起
   動後のオプション設定パネルによる変更でもSSL接続に使われるメソッドの
   選択に反映されるようにした、
2. 各種エラーメッセージをある程度取っておいて後で見れるようにした(mule
   2.3 base on emacs 19.34の機能のパクリ、他のemacsenにあるかは知らず)、

From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
Subject: [w3m-dev 01738] [w3m-doc] w3m document maintenance
w3m連絡帳(http://mi.med.tohoku.ac.jp/~satodai/w3m/bbs/spool/log.html)
にも書きましたが、懸案であったw3mのドキュメント整備を始めた
いと思います。

From: kiwamu <kiwamu@debian.or.jp>
Subject: [w3m-dev 01739] ホイールマウス対応 patch
w3mをホイールマウス対応させてみました。
rxvtとxtermで使用できます。
ktermだとホイールの上下が同じコントロールコードを返してしまうので
実現不可能みたいです。

From: Fumitoshi UKAI <ukai@debian.or.jp>
Subject: [w3m-dev 01742] w3mmee 0.1.11p16-6 segfault
w3mmee 0.1.11p16-6 ですが、mime.types の内容によっては segfault します。
# 空行があるとダメ

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01752] SEGV in search_param()
 > >> ・w3m -o 1 等で SEGV します。
 >  search_param() で size_t が unsigned のため i = 0 のとき
 >  e = 4294967295 になってしまっているようです。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01753] empty <select>
<select>～</select> に <option> が無い場合、

<form action=A>
<select name=B></select>
<input type=submit>
</form>

の様な場合に、SUBMIT で落ちますので修正 patch です。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01754] A search does not stop.
標準入力から大きなファイルを読んでいる時に折り返し検索が ON だと
検索がヒットしない場合に無限ループになるバグを修正しました。

また、[w3m-dev 01617] の抜かりですが検索時のカーソル位置の動作も
他と合わせました。

From: WATANABE Katsuyuki <katsuyuki_1.watanabe@toppan.co.jp>
Subject: [w3m-dev 01755] relative path with -bookmark option
* -bookmark オプションでブックマークファイルを指定したとき、
  相対パスでファイル名を与えると、ブックマークの追加ができません。
* -bookmark で指定されたファイルが相対パスの場合には、絶対パスに
  直して保持するようにしてみました。


2001/2/7
From: aito
Subject: [w3m-dev 01722] <hr> in a table
表の中の<hr>が枠をつき抜けるバグの修正．

2001/2/6
From: aito
Local CGI の認証用に，Local cookie というしくみを実装しました．
Local cookie の動作は次のようなものです．
・w3m は，プロセスに固有な "Local cookie" を自動生成する．
・Local CGI の呼び出しでは，環境変数 LOCAL_COOKIE を経由してスクリプト
  に Local cookie が渡される．
・スクリプトは，次回の呼び出し用のformやurl の中に local cookie を埋め
  こむ．
・スクリプトの2回目以降の呼び出しでは，CGIパラメータ経由のcookie と
  環境変数経由の cookie が同じかどうかチェックし，同じでなかったら
  危険な動作をしない．

w3mbookmark, w3mhelperpanel に Local cookie 認証を入れました．

ついでに，Linux で gc library が /usr/local/lib 等にインストールされて
いた場合に gcmain.c がコンパイルできなくなっていたので，修正してみました．


2001/1/25

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01667] Re: mailer %s
  Editor が "vi %s" などの場合に "vi file +10" などと展開されてしまい、
  問題があったので、Editor の展開を、
  ・%s がある場合
    * %d があれば、
      Sprintf(Editor, linenum, file)	# 順番は固定
    * そうでなければ
      Sprintf(Editor, file)
  ・%s がない場合
    * %d があれば、
      Sprintf(Editor, linenum)  file
    * "vi" という文字列があれば、
      Sprintf("%s +%d", Editor, linenum)  file
    * そうでなければ
      Editor  file
  としてみました。


2001/1/24

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01661] Re: <head>
From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01662] Re: <head>
  security fix.


2001/1/23

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・属性値の中の ", <, > & 等がクォートされているかどうかチェックする
    ようにした.
  ・属性を持てないタグの, 属性のチェックが抜けていた問題の修正.

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01652] mailer %s
Subject: [w3m-dev 01663] replace addUniqHist with addHist in loadHistory()
  
2001/1/22

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01617] Re: first body with -m (Re: w3m-m17n-0.7)
  端末をリサイズした場合の動作も同じにしました(単に忘れていただけ)。
  ついでに、多段のフレームで構成されているページの時、INFO('=') での
  フレーム情報の表示がおかしかったのでその修正です。

From: Tsutomu Okada <okada@furuno.co.jp>
Subject: [w3m-dev 01621] NEXT_LINK and GOTO_LINE problem
  NEXT_LINK と GOTO_LINE ですが、次のページの最初の行に移動したときだけ、
  1 ページ分スクロールしてしまいます。

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
Subject: [w3m-dev 01623] Re: (frame) http://www.securityfocus.com/
Subject: [w3m-dev 01632] Re: (frame) http://www.securityfocus.com/
  frame fix.

From: Tsutomu Okada <okada@furuno.co.jp>
Subject: [w3m-dev 01624] Re: first body with -m
From: Hironori Sakamoto <h-saka@udlew10.uldev.lsi.nec.co.jp>
Subject: [w3m-dev 01625] Re: first body with -m
  pgFore, pgBack で、currentLine が画面外となり、かつ、一画面分
  スクロールできなかったときに、今まで表示されていた部分と新しく表示され
  た部分の間に currentLine を持ってくるようなパッチを書いてみました。

From: Hironori Sakamoto <h-saka@udlew10.uldev.lsi.nec.co.jp>
Subject: [w3m-dev 01635] Directory list
  local.c の directory list を作成する部分にバグがありました。

From: Hironori Sakamoto <h-saka@udlew10.uldev.lsi.nec.co.jp>
Subject: [w3m-dev 01643] buffername
Subject: [w3m-dev 01650] Re: buffername
  buffername (title) に関する改良(?)と修正です。
  ・displayLink が ON の場合に長い URL を表示する時は buffername の方を
    切りつめる様にしてみました。
  ・ついでに displayBuffer() のコードの整理。
  ・HTML 中から title を取る場合に末尾の空白文字は削除する様にしました。
  ・[w3m-dev 01503], [w3m-dev 01504] の件の修正
    buffername は常に cleaup_str されて保持されています。
    なお、現時点では、SJIS のファイル名を持つファイルを読むと、
    buffername や URL が SJIS になって悪さをすることがあるかもしれません。

From: Hironori Sakamoto <h-saka@udlew10.uldev.lsi.nec.co.jp>
Subject: [w3m-dev 01646] putAnchor
  HTML のサイズと速度のベンチマークをしてみようと思って、いろいろ
  やってると、あるサイズから急激に速度が低下することがありました。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01647] Re: first body with -m
  坂根さんから #label つきの URL を持つバッファを reload すると、
  カーソル位置がずれてしまう場合があるとの指摘がありましたので、
  修正 patch です。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01651] display column position with LINE_INFO
  LINE_INFO(Ctrl-g) でカラム位置も出力する様にしてみました。
  

2001/1/5

From: Ryoji Kato <ryoji.kato@nrj.ericsson.se>
Subject: [w3m-dev 01582] rfc2732 patch
  RFC2732 に記述されているような URL 中の '[' と ']' でくくられた
  literal IPv6 address を解釈する。

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
Subject: [w3m-dev 01594] first body with -m (Re: w3m-m17n-0.7)
  "-m" オプションをつけて動かしたときに、メールのヘッダと本文の間の
  空行の処理がおかしいです。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01602] Re: first body with -m (Re: w3m-m17n-0.7)
  ...
  どこかに、
    buf->lastLine->linenumber - buf->topLine->linenumber < LASTLINE - 1
  という縛りを加えるといいのかな。
  というわけで patch を作ってみたのですが、ちょっと自信無しです。
  なお、pgFore, pgBack のカーソル位置の設定を、スクロール('J', 'K')
  と同じ動作にしています。すなわち 『数 SPC』と『数 J』 は同じ。
  vi の動作とはこっちが合ってるはずですが、どうでしょう。
  ついでに、reload, edit 時にカーソル位置を保存する実装を改良しています。


2001/1/1

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
Subject: [w3m-dev 01584] Re: attribute replacing in frames. (Re: some fixes)
  もう一度。frame内のtag書き換えを単純にしたpatchを送ります。


2000/12/27

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ファイルの終わりに空行が余分に追加される問題の修正.


2000/12/26

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01560] Re: long URL
   >> 岡田です。
   >> PEEK や PEEK_LINK で画面幅より長い URL を見られるように、prefix を利用
   >> して実装してみました。
   >> 本当は一度に全部表示したかったのですが、画面制御まわりがよくわからなかっ
   >> たので、とりあえず表示したい部分を指定する方法をとっています。2c や 3u 
   >> と入力すると、指定された部分に対応する、URL の一部が表示されます。
   >> 御意見、御感想お待ちしております。
  こういうのはどうでしょう。
  連続した 'u' や 'c' で URL が一文字ずつスクロールします。

From: Tsutomu Okada <okada@furuno.co.jp>
Subject: [w3m-dev 01570] Re: long URL
  坂本さん> # 岡田さんの案も入れてもいいかもしれません。

  坂本さんの [w3m-dev 1560] からの差分を添付します。非常に長い URL の場
  合は有効かと思います(あまり需要はなさそうですが)。

From: Tsutomu Okada <okada@furuno.co.jp>
Subject: [w3m-dev 01506] compile option of gc.a
  NO_DEBUGGING を付けて gc.a をコンパイルすると、gc.a や w3m のバイ
  ナリサイズが多少ですが小さくなります。

From: Fumitoshi UKAI <ukai@debian.or.jp>
Subject: [w3m-dev 01509] Forward: Bug#79689: No way to view information on SSL certificates
  現ドキュメントの情報を表示('=')で見ても SSLに関する証明書情報を
  みられないのは確かに悲しいなぁ と思っていたので 適当なパッチ
  つくってみました。(かなりいいかげん)

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01556] Re: ANSI color support (was Re:  w3m-m17n-0.4)
  ANSI color support.

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
Subject: [w3m-dev 01535] how to check wait3 in configure.
From: Tsutomu Okada <okada@furuno.co.jp>
Subject: [w3m-dev 01537] Re: how to check wait3 in configure.
  BSD/OS 3.1, SunOS 4.1.3 で, configure が wait3() を検出できない問
  題への対処.

 
2000/12/25

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01568] <plaintext> bug
  <plaintext> がまともに動いていなかった問題の修正.


2000/12/22

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01555] Re: some fixes for <select>
  <option> なしの <select> があると落ちる様にしてしまっていましたの
  で修正です。


2000/12/21

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・feed_table のトークン分割処理を HTMLlineproc0 で行なうように変更
    した.
  ・HTMLlineproc0 のフォームの処理もメインループで行なうように変更し
    た.
  ・table で <xmp> と </xmp> の間にあるタグが消える事がある問題の修
    正.
  ・フォームのデータに内部コードが含まれる事があるので, 修正.

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
Subject: [w3m-dev 01536] Re: <P> in <DL>
Subject: [w3m-dev 01544] Re: <P> in <DL>
  問題のある HTML で, 異常終了する事がある問題への対処.

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  <a>, <img_alt>, <b>, <u> 等のタグが閉じていないとき, 終了タグを補
   完するようにした.


2000/12/20

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  以下のバグをフィクスした.
  ・feed_table_tag の <dt> タグの処理が少しおかしかった.
  ・table 中でタグが閉じていない場合, 異常終了する事があった.
  また, <dt> タグ直後の <p> は無視するようにした.

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
Subject: [w3m-dev 01530] returned at a morment.
  read_token の " で囲まれた属性値の処理で改行をスキップしていなかっ
  たバグの修正.
Subject: [w3m-dev 01531] coocie check in header from stdin.
  cat めーる | w3m -m
  とすると落ちます。


2000/12/17

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01513] Re: w3m-0.1.11-pre-kokb23
  frame.c にバグと思われる箇所がありました。
Subject: [w3m-dev 01515] some fixes for <select>
Subject: [w3m-dev 01516] Re: some fixes for <select>
  <select>～<option> に関して幾つかの改良を行いました。
  ・multiple 属性が定義されている場合や #undef MENU_SELECT の場合に
    <option> の value 属性が指定されていないと form としての
    値が送られないバグの修正。
  ・<option> の label 属性への対応。
  ・デフォルトの name 属性の値が "default" であるのを <input> などに
    合わせて "" に。
  ・<option> の label が "" である場合 "???" になるのを止めた。
    # 空白であって欲しい場合も考えられる。
  ・n_select >= MAX_SELECT となった場合、#undef MENU_SELECT のコードを
    使える様にした。
    # MAX_SELECT = 100 なのでまず無意味


2000/12/14

From: Tsutomu Okada <okada@furuno.co.jp>
Subject: [w3m-dev 01501] Re: w3m-0.1.11-pre-kokb23
  no menu のときにひとつだけコンパイルエラーが出ましたので、その修正
  パッチです。


2000/12/13

From: sekita-n@hera.im.uec.ac.jp (Nobutaka SEKITANI)
Subject: [w3m-dev 01483] Patch to show image URL includes anchor
  リンク付き画像のURLを見るとき、`u'ではリンクのURLしか見られません
  でしたが、このパッチを使えば`i'で画像そのもののURLが見られるように
  なります。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01500] fix risky code in url.c
  url.c にあった危険性のあるコードを修正しました。
  local.c はおまけの修正です。


2000/12/12

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01491] bug ?
  file.c の以下の部分ですが、たぶんこうだと思いますが。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ヌル文字を含む文字列に対する検索ができるようにした.

From: Tsutomu Okada <okada@furuno.co.jp>
Subject: [w3m-dev 01498] Re: null character
  無限ループにはまってしまいました。


2000/12/11

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・StrmyISgets で, 単独の '\r' が改行と認識されないバグの修正.
    また, 改行コードやナル文字の変換を cleanup_line に分離した.
  ・ページャモードで, ナル文字を扱えるようにした.
  ・base64 や quoted printable のデコード処理を convertline から
    istream.c に移動.

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01487] A string in <textarea> is broken after editing
  w3m-0.1.11-pre-kokb21 の頃からですが、<textarea> の中の文字列を編
  集すると文字列中に ^` の様な文字が入ることがあります。
Subject: [w3m-dev 01488] buffer overflow bugs
  バッファーオーバーフローを引き起こす恐れのある以下の問題点を修正しました。
  * file.c の select_option[MAX_SELECT] の添字のチェックが無かった。
    → n_select と MAX_SELECT を比較
  * file.c の textarea_str[MAX_TEXTAREA] の添字のチェックが不完全だった。
    → n_textarea と MAX_TEXTAREA を比較
  * file.c の form_stack[FORMSTACK_SIZE] の添字のチェックが無かった。
    → forms に合わせて form_stack もポインタとし自動伸張する様にした。
  * doFileCopy(), doFileSave() の sprintf を使った msg[LINELEN] への代入。
    → Str msg と Sprintf() に置き換え。
  * local.c の dirBuffer() の sprintf を使った fbuf[1024] への代入。
    → Str fbuf に置き換え。


2000/12/9

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  maximum_table_width で td, th タグの width 属性値を考慮するように
  変更.


2000/12/8

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01473] Re: internal tag and attribute check
  以前、[w3m-dev 01446] で、
   >> frame 時に追加される属性 framename, referer, charset などは
   >> 問題ないのでしょうか。効果的に悪用する例は思い付きませんが、
  と書きましたが、<form charset=e> 等で w3m が終了してしまいます。
  accept-charset も同様ですので修正しました。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・table タグの hborder 属性は通常でも受け付けるように変更.
  ・table タグの border 属性に値が与えられていないときの扱いを元に戻
    した.

From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
Subject: [w3m-dev 01478] Option Setting Panel
  横長のウィンドウで Option Setting Panel を開くと、間延びして
  左右の対応が取りづらいので、間を詰めるパッチです。


2000/12/7

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・parse_tag に gethtmlcmd の機能も持たせるようにした.
  ・最初の parse_tag で内部タグや属性を受け付けないようにした.
    また, 内部属性が含まれる場合は, その内部属性を含まないようにタグ
    を作り直すようにした.
  ・visible_length では不要なタグの解析を止めた.

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01456] linein.c
  m17n からの feed back ですが、linein.c を calcPosition() ベースに
  書き直しました。処理は display.c とほぼ同様です。
  長い文字列中にタブやコントロール文字があっても正しくカーソルが
  動くようになっていると思います。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01457] cursor position on sumbit form
  TABキーで<input type="submit" ～ value="OK">の上にカーソルを移動さ
  せたときの位置がずれていた問題への対処.


2000/12/3

From: Kiyokazu SUTO <suto@ks-and-ks.ne.jp>
Subject: [w3m-dev 01449] Re: Directory of private header of gc library.
  popText (rpopText) で最後の要素を取り出した後にこのリストにアクセ
  スしようとすると異常終了してしまう事がある問題に対する修正.


2000/12/2

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  まだ, image map が使えない問題が残っていたので修正.

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  内部テーブル (MYCTYPE_MAP) によって, 文字を分類するように変更.
  漢字, latin1, ascii, internal character の判別には INTCTYPE_MAP を
  使うように変更.
  # 結果として必要無くなった CTYPE_MAP は削除した.


2000/12/1

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: Security hole in w3m (<input_alt type=file>)
  ・HTMLlineproc1, HTMLtagproc1 等の引数にフラグを持たせて、
    外部から内部タグを使えない様にした。
  ・map.c で `<', `>' 等がクォートされていなかった所の修正。
Subject: [w3m-dev 01432] Re: w3m-0.1.11-pre-kokb22 patch
  まだ、修正の抜かりがありました。patch を付けます。
  ([w3m-dev 01431] での岡田さんの指摘への修正も入ってます)
Subject: [w3m-dev 01437] Re: w3m-0.1.11-pre-kokb22 patch
  セキュリティ関連の修正で image map が使えなくなる問題への対処.

From: sekita-n@hera.im.uec.ac.jp (Nobutaka SEKITANI)
Subject: [w3m-dev 01415] Lineedit patch for kokb21
  Subject:  [w3m-dev 00976] move & delete until /, &, or ?
  で投稿したURL等入力機能を拡張するパッチをw3m-0.1.11-pre-kokb21用に
  書き直しました。kokb20でもパッチは正常に当てられます。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  岡田さんのパッチ [w3m-dev 01427] を参考に, HTML バッファの文末の空
  白を削除するコンパイルオプション (ENABLE_REMOVE_TRAILINGSPACES) を
  追加した.

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev-en 00301] Re: "w3m -h" outputs to stderr
  w3m -h の出力先を stderr から stdout に変更.

From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
Subject: [w3m-dev 01430] Re: w3m-0.1.11-pre-kokb22 patch
  EWS4800(/usr/abiccs/bin/cc) のコンパイルエラーへの対処.

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・dumm_table タグの id 属性の範囲チェックを加えた.
  ・form_int タグの fid 属性の範囲チェックを加えた.
  ・table スタックのオーバフローのチェックを加えた.

  
2000/11/29

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01422] bpcmp in anchor.c
From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01423] Re: bpcmp in anchor.c
  高速化のための幾つかの修正.

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・checkType のバグフィクスおよび若干の高速化.
  ・漢字を 2 バイト単位で扱うように変更.


2000/11/28

From: Takenobu Sugiyama <sugiyama@ae.advantest.co.jp>
Subject: patch for cygwin
  cygwin での ftpサイトからの download ですが, 以下の patchで対処で
  きました.  cygwin では, ファイルの open/closeを binary モードにし
  ておかないと, いろいろと問題があるようです.


2000/11/27

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01401] Re: bugfix of display of control chars, merge of easy UTF-8 patch, etc.
  この修正の追加ですが、一行の最後にコントロール文字があると画面シフ
  ト量が足らなくなって、その文字を表示できないバグの修正です。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  table のレンダリングの高速化.


2000/11/25

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  table のカラム幅が width 属性で指定したものより小さくなる事がある
  問題の修正.

  
2000/11/24
From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  まだファイルを読み込んでないときは, プログレスパーに転送速度を表示
  しないように変更した.

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 01385] Re: w3m-0.1.11-pre-kokb20 patch
  w3m-0111-utf8-kokb20 ですが、conv.c で一箇所間違いと思われるところ
  がありましたので、パッチを添付します。ついでに、インデントやコンパ
  イル時の warning の修正も一部してあります。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・コマンドラインでオプション設定を変更したとき, proxy や cookie 等
    変更が反映されない部分があった問題に対する修正.
  ・ローカルファイルをセーブするとき, 元のファイルを上書きしてしまう
    事がある問題に対する修正.


2000/11/23

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・StrStream に対しては, 元の Str をそのままバッファとして利用するよ
    うに変更.
  ・get_ctype をマクロ化し, テーブルを使って判断するようにした.
  ・menu.c に返り値が宣言と一致していない所があったので修正.


2000/11/22

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  主に高速化のための変更です.
  ・ファイル読み込み時に自前でバッファリングを行なうようにした.
  ・conv.c の関数を Str ベースに変更.
    可能な限り文字列のコピーを行なわないようにした.
  ・checkType の高速化.
  ・カーソル上に文字が無いとき cursorRight の動作に問題があったので,
    修正した.
    また一行が LINELEN を越えたときに, calcPosition で配列の外をアク
    セスする可能性があるのでサイズを変更.

From: Fumitoshi UKAI <ukai@debian.or.jp>
Subject: [w3m-dev 01372] w3m sometimes uses the wrong mailcap entry
  http://bugs.debian.org/77679
  ですが、mime type の判断が substring match になってるからだと
  思います。これで直るんじゃないでしょうか

    
2000/11/20

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  中身の無い table が table の中にあるときに, 外の table が崩れる問
  題への対処.


2000/11/19

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  gc6 対応.


2000/11/18

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・バッファ内部の空白文字を 0x80-0x9f に割当てるように変更した.
  ・日本語版でも, バッファ内では &nbsp; は 0xa0 で表わすにした.
  ・坂本さんの簡易 UTF-8 版の UTF-8 とは関係無い部分のコードをマージ
    した.
    またデバッグのときに便利なので, 内部コードを文書コードに指定する
    事ができるようにした.
  ・表示不可能領域 (0x80-0xa0) にある文字は \xxx の形で表示するよう
    にした.
    関連して, 画面シフト時に, コントロール文字が含まれていると表示が
    乱れるバグがあったので修正した.

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 01354] minimize when #undef USE_GOPHER or USE_NNTP
  #undef USE_GOPHER や #undef USE_NNTP としたときに、関連するコードがで
  きるだけ少なくなるように変更してみました。


2000/11/16

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  異常な実体参照で getescapechar が変は値を返す事がある問題への対処.


2000/11/15

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・table の枠が崩れる事があるバグの修正.
  ・DEL 文字を折り返し可能な空白文字として扱うように変更し, バッファ
    内部の空白文字を &nbsp; から DEL に変更.

From: Kiyokazu SUTO <suto@ks-and-ks.ne.jp>
Subject: [w3m-dev 01338] Re: Lynx patch for character encoding in form
Subject: [w3m-dev 01342] Re: Lynx patch for character encoding in form
  form タグの accept-charset 属性を受け付けるようになった.


2000/11/14

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・クォートするのを忘れていると思われる部分を修正.
  ・cleanup_str, htmlquote_str は, もし (アン) クォートする必要が無
    ければ, 元の文字列をそのまま返すようにした.


2000/11/10

From: 渡邉勝之 <katsuyuki_1.watanabe@toppan.co.jp>
Subject: [w3m-dev 01336] patch for Cygwin 1.1.x
  Cygwin 1.1.x (おそらく 1.1.3 以降) 向けのパッチを作成しました。
  Cygwin 1.x 以降の環境において、
  ・標準のインストールパスを /cygnus/cygwin-b20/H-i586-cygwin32
    以下へ変更しない
  ・T_as,T_ae,T_ac を空にするのをやめた


2000/11/8

From: Jan Nieuwenhuizen <janneke@gnu.org>
Subject: [w3m-dev-en 00189] [PATCH] w3m menu <select> search
  Enable to search within popup menu.


2000/11/7

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01331] Re: form TEXT:
  検索文字列とフォーム入力文字列のヒストリの一本化.


2000/11/4
From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  セル幅が画面幅を越えるとき, セルの中身は画面幅で整形するようにした.


2000/11/2

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 01313] Re: SCM_NNTP
  MARK_URL で nntp: もマッチするようにしてみました。正規表現は gopher: 
  のものをコピーしただけです。


2000/10/31

From: Kiyokazu SUTO <suto@ks-and-ks.ne.jp>
Subject: [w3m-dev 01310] Re: option select (Re:  w3mmee-0.1.11p10)
  gcライブラリのエラーメッセージをdisp_message_nsecを通して出力する
  ようにした.


2000/10/30

From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
Subject: [w3m-dev 01294] mouse no effect on blank page.
  mouseありのw3m でblankなペイジを表示している時、mouseボタン
  が効かない(中ボタンで戻れないのがツライ)ので修正してみました。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01295] Re: mouse no effect on blank page.
  実際に落ちたわけではないのですが、こうしておく方が安全ですね。

From: SASAKI Takeshi <sasaki@ct.sakura.ne.jp>
Subject: [w3m-dev 01297] Re: backword search bug report
  [w3m-dev 01296] で報告されている, 次の問題に対する対処.
  > 報告だけなんですが、"aaaa" や "ああああ" のような同じ文字が連続してい
  > るときに "a" や "あ" で backword search すると、カーソル位置が 1 文字
  > 飛んでしまうようです。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01298] Re: backword search bug report
  backword search で wrapped search が有効の時、現在の行の後方を検索
  できないバグを直しました。
Subject: [w3m-dev 01299] Re: backword search bug report
  日本語を検索するときに 2byte目と次の文字の 1byte目とでマッチする問
  題と、 little endian では正規表現 [あ-ん] が正しく機能しない問題、
  英語版では latin1 が上手く検索できなかった(であろう)問題を直しました。


2000/10/29

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・LESSOPEN を使用するかどうかを Option Setting Panel で選択するよ
    うにした (default は使用しない).
  ・圧縮ファイル伸張後のテンポラリファイルを作るときの拡張子を, 元の
    ファイルの拡張子 (.Z, .gz, .bz2) を除いた部分から決めるように変
    更した.
  ・gunzip_stream, save2tmp, visible_length の高速化.


2000/10/28

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  コンパイル時, ファイル名補完中のキー割当てを Emacs-like にできるよ
  うにした.
  (config.h で #define EMACS_LIKE_LINEEDIT にします)
  また, 補完候補一覧時にバックスクロールを可能にした.

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01284] Re: improvement of filename input
  ・URL入力時(U)では file:/ から始める場合のみファイル名補完を有効
    にしました。
    (URL 解析の仕様上これ以外では確実に local-file にならないため)
  ・岡部さんのアドバイスにより CTRL-D での一覧表示は、
    文字列の最後にカーソルがある場合に限定しました。

From: Kiyokazu SUTO <suto@ks-and-ks.ne.jp>
Subject: [w3m-dev 01280] Stop to prepend rc_dir to full path.
  rcFile()を、フルパスにはrc_dirを付けないようするパッチです。


2000/10/27

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 01269] Re: SCM_NNTP
  [w3m-dev 1258] で坂本さんが指摘されていたところを修正してみました。パッ
  チを添付します。私の環境では、この修正をしないと news:<Message-ID> が
  動きませんでした。
Subject: [w3m-dev 01273] Re: SCM_NNTP
  url.c を修正して、#undef USE_GOPHER や #undef USE_NNTP のときには 
  gopther: や news: が動作しないようにしました。また、nntp: も動作しない
  ようにしました。
  加えて、GOTO URL で mailto: を入力したときに動作するように変更してみま
  した。ついでに、コメントの間違いも直してあります。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01258] improvement of filename input
  最下行でファイル名を入力する時の強化を行いました。
  ・Ctrl-D で補完候補の一覧を表示するようにしました。
    画面に入り切らない時は連続した Ctrl-D で次の候補の一覧が出ます。
    # 文字の削除は BackSpace か Del を使ってください。
  ・URL 入力時(GOTO)で文字列が file:/, file:/// や file://localhost/ から
    始まっている場合は、ファイル名を補完する様にしました。(下津さんからの要望)
    # http: や ftp: は何もしません。ヒストリからの補完でも面白いけど。
  ・URL をヒストリに保存する場合に password 部分は削除する様に修正しました。
  なお、以前からある undocument な機能ですが、検索文字の入力などの場合でも、
  Ctrl-X で TAB(Ctrl-I) での ファイル名補完が有効になります。

From: Fumitoshi UKAI <ukai@debian.or.jp>
Subject: [w3m-dev 01277] Accept-Encoding: gzip (Re:  some wishlists)
  Accept-Encoding: gzip, compress
  をリクエストヘッダに付けるようにした.
Subject: [w3m-dev 01275] Re: squeeze multiple blank lines option ( http://bugs.debian.org/75527 )
  とりあえず #ifdef DEBIAN で
  squeeze multiple blank line は -s
  端末文字コード指定の -s/-e/-j はナシ。かわりに -o kanjicode={S,E,J} を使う
  ことにしておきます。
Subject: [w3m-dev 01274] Re: SCM_NNTP
  せっかくなので nntp: をサポートしてみました
Subject: [w3m-dev 01276] URL in w3m -v
  LANG=EN (というか undef JP_CHARSET)の時の visual mode で使われてる URL
  が正しくないようです。


2000/10/26

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  mailcap と mime.type ファイルの場所を Option Setting Panel で設定
  可能にした.


2000/10/25

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01247] Re: buffer selection menu
  メニュー関連の patch および仕様変更 [w3m-dev 01227], [w3m-dev 01228],
  [w3m-dev 01229], [w3m-dev 01237], [w3m-dev 01238] をまとめました。
  ・Select メニューでの消去(キーは 'D')
  ・Select メニューでのコメントの表示
    ┃--- SPC for select / D for delete buffer ---┃
    ┗━━━━━━━━━━━━━━━━━━━━━━┛
  ・メニューからのコマンド実行を許可。


2000/10/24

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・ クッキーの設定で, `.' は全てのドメインを表わすようにした.
  ・ bm2menu.pl を CVS に add するのを忘れていたので, 追加.

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 01240] Re: w3m-0.1.11-pre-kokb17 patch
  とりあえずコンパイル時に incompatible pointer type といわれたとこ
  ろの修正パッチを添付します。


2000/10/23

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・ オプション設定パネルで, クッキーを受け付ける (受け付けない) ド
     メインを設定できるようにした.
     また, クッキー設定を一つのセクションとして分離した.
  ・ frame の reload の際, プロクシのキャッシュが更新されていなかっ
     た問題への対処.

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01211] Re: a small change to linein.c
Subject: [w3m-dev 01214] Re: a small change to linein.c
  長い文字列を編集する際, 全ての文字列が表示されない事がある問題への
  対処.

From: Fumitoshi UKAI <ukai@debian.or.jp>
Subject: [w3m-dev 01216] error message for invalid keymap
From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01220] Re: error message for invalid keymap
  keymap に問題があったときに, エラーメッセージを出すように修正.

From: Fumitoshi UKAI <ukai@debian.or.jp>
Subject: [w3m-dev 01217] keymap.lynx example could be better.
  keymap.lynx の更新.


2000/10/20
From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  cookie の取り扱いに関して幾つかの修正を加えた.
  ・ version 1 cookie に対する扱いを 
       http://www.ics.uci.edu/pub/ietf/http/draft-ietf-http-state-man-mec-12.txt
     に準拠するように変更.
     Netscape-style cookie のリクエストヘッダに, Cookie2 を追加.
  ・ [w3m-dev-en 00190] patch に対する幾つかの変更.
  

2000/10/19

From: "Ambrose Li [EDP]" <acli@mingpaoxpress.com>
Subject: [w3m-dev-en 00136] version 0 cookies and some odds and ends
Subject: [w3m-dev-en 00191] sorry, the last patch was not made properly
Subject: [w3m-dev-en 00190] w3m-0.1.10 patch (mostly version 0 cookie handling)
  I've hacked up a big mess (patch) against w3m-0.1.9 primarily
  involving version 0 cookies. To my dismay, it seems that most
  servers out there still want version 0 cookies and version 0
  cookie handling behaviour, and w3m's cookie handling is too
  strict for version 0, causing some sites (notably my.yahoo.co.jp)
  not to work.

2000/10/18

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  文字幅を設定可能にした.

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01208] '#', '?' in ftp:/....
  ftp:/ でファイル名に '#' が入っているとアクセスできない問題への対
  処.

From: Kiyokazu SUTO <suto@ks-and-ks.ne.jp>
Subject: [w3m-dev 01209] http_response_code and ``Location:'' header
  「Location:」ヘッダがあると、無条件にそれに従うようになってますが、
  http_response_codeを見て301～303の時だけ従うようにしてみました。


2000/10/17

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  local CGI で, ゾンビができる問題への対処.


2000/10/16

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  table 中で <textarea> が閉じてない時, 終了できなくなる問題への対処.
  ([w3m-dev 00959] の代替案).
  <select> の扱いに準じるようにした. 

From: maeda@tokyo.pm.org
Subject: [w3m-dev 00990] auth password input
  何に対するパスワードなのかわからないので、以下のような
  パッチを当てました。sleep(2)は長すぎるかも。

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 01193] Re: frame bug?
  フレームのあるページを往来しているとき, 落ちる事がある問題への対処.


2000/10/13

From: SASAKI Takeshi <sasaki@ct.sakura.ne.jp>
Subject: [w3m-dev 00928] misdetection of IPv6 support on CYGWIN 1.1.2
  CYGWIN 1.1.2以降で, 誤って IPv6 サポートを検出してしまう問題への対
  処.

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01170] Re: cursor position after RELOAD, EDIT
  ・cache ファイルが残ることがあるバグの修正.
  その他
  ・ディレクトリリストの URL が /$LIB/dirlis.cgi… と格好悪かったので、
    元のディレクトリそのものになるようにしました。
    dirlist.in を変更していますので、configure を再実行するか、
    cp dirlist.in dirlist.cgi として @PERL@ と @CYGWIN@ を書き換えてください。
  ・keymap で引数を記述できる拡張を以下の関数に適用しました。
    LOAD … ファイル名
    EXTERN, EXTERN_LINK … 外部ブラウザ名
      (w3m-control: からは使えません)
    EXEC_SHELL, READ_SHELL, PIPE_SHELL … shellコマンド
      (w3m-control: からは使えません)
    SAVE, SAVE_IMAGE, SAVE_LINK, SAVE_SCREEN … ファイル名(pipe コマンド)
      (w3m-control: からは使えません)


2000/10/11

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・標準入力からのバッファに読み込むとき, MAN_PN を見てバッファ名を決め
    るようにした.

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 01156] Re: w3m-0.1.11-pre-kokb15
  ・mydirname のバグ修正と関数宣言の追加
  ・SERVER_NAME を設定するように変更
  ・[w3m-dev-en 00234] を参考に GATEWAY_INTERFACE を設定するように変更
  ・current working directory を変更して popen する、よりまともな実装

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01158] some bugs fix when RELOAD, EDIT
Subject: [w3m-dev 01164] cursor position after RELOAD, EDIT
  ・local CGI として呼び出した file:... を EDIT できるバグを修正しました。
    # currentURL.scheme ではなく real_scheme を使うようにしました。
  ・HTML をソース表示状態から RELOAD, EDIT した後には
    ソース表示状態になるようにしました(一部不具合がありました)。
  ・逆に plain text ファイルを HTML 表示している状態から RELOAD, EDIT
    した後には HTML 表示状態になるようにしました。
  ・RELOAD, EDIT 後のカーソル位置を RELOAD, EDIT 前と同じになるように
    しました。


2000/10/10

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01166] Re: cell width in table
  table 関係のバグフィクスです.
  ・ 画面幅が十分あるにも関わらず, 文が途中で折り返されてしまう問題の修正.
  ・ table で <wbr> が効かない事がある問題の修正.
  ・ feed_table_tag() の処理の共通化.

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01155] history of data for <input type=text>
  ふと思い出して <input type=text> で入力したデータもヒストリを
  辿れる様にしてみました。
  検索サービスを渡り歩く時などに便利と思います。


2000/10/9

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01150] Some bug fixes
  [w3m-dev 00956] unknown scheme in frame
  [w3m-dev 00975] goto link from frame page
  で報告された問題の修正.

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01145] buffer overflow in linein.c
  inputLineHist(linein.c) でデフォルト文字列が 256 文字以上の場合に
  strProp が領域外アクセスすることがありましたので、その修正 patch です。
  また文字列長の制限値を 1024 にしました。


2000/10/8

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01136] function argument in keymap
Subject: [w3m-dev 01139] Re: function argument in keymap
  長らく宿題になってた ~/.w3m/keymap での関数の引数指定を可能にしました。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 01143] image map with popup menu
  image map を popup menu を使って <option> の様に表示するようにしてみました。
  config.h で #define MENU_MAP としてコンパイルしてみてください。

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 00971] Re: segmentation fault with http:
  URL として http: や http:/ を入力すると落ちてしまうので修正しました。


2000/10/07

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01134] w3m in xterm horribly confused by Japanese in title (fr
  http://bugs.debian.org/w3m で報告されている, 英語版で日本語タイトルの
  あるページを見たときに, w3m が発狂する事がある問題に対するバグフィクス
  です.

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01127] SIGINT signal in ftp session (Re:  my w3m support page)
  ftp の際に SIGINT が発生すると落ちるバグの修正.


2000/10/06

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  ・ table の recalc_width() の wmin の最大値を 0.05 に変更.
  ・ 外部コマンドの出力バッファの filename, basename, type を変更.
  ・ http と local file 以外の圧縮データを伸長するのに, 一旦テンポラリ
     ファイルに落とすようにした.
  ・ テンポラリファイル名を生成する方法の変更.
  ・ mailcap の edit= を解釈するようにした.
  ・ URLFile の初期化が不完全だった問題の修正.
  ・ 残っていた非公式パッチのゴミの削除.


2000/10/05

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  -dump, -source_dump オプションの改善, frame 中の <meta> タグを無視
  するようにた.

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 00930] HTML-quote in w3mbookmark.c
  "ブックマークの登録" で URL や Title が HTML-quote されていないのを
  修正しました。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
Subject: [w3m-dev 00972] better display of progress bar ?
  2Mb のファイルを読んでいる時に、ずっと 0/2Mb になって悲しかったので、
  プログレスバーの表示を %.0f (%.1f) から %.3g にしてみたんですが、
  どんなもんでしょう。


2000/10/05

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
  textlist に対する null pointer チェックを加えた.

From: Fumitoshi UKAI <ukai@debian.or.jp>
Subject: [w3m-dev 01100] space in URL

  * http://bugs.debian.org/60825 と http://bugs.debian.org/67466

    form を submit する時に value しか form_quote() してませんが
    name の方も form_quote() する必要があります。

  * http://bugs.debian.org/66887

    Goto URL: で先頭に space が入ると currentからの相対扱いになるのを
    やめてほしいという報告。たしかに cut & paste するときになりがちなので
    (ついでなので後ろの空白も削除)

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01111] bug of conv.c
  UTF-8 なページ(Shift_JIS と誤認される)で w3m の表示が乱れる
  (コントロールシーケンスが漏れる)ことがあったので調べてみたところ、
  conv.c がバグってました。単純ミスです。すみませんm(_o_)m

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01113] bug fix (content charset)
  content charset の設定部でバグってましたので、修正 patch です。


2000/10/02

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01112] Re: mailcap test= directive
  mailcap の扱いを拡張しました.
  ・ %s 以外に, %t (content-type name) を使えるようにしました.
  ・ nametemplate オプションが有効になりました.
  ・ %s が無い場合は, 標準入力を %s にリダイレクトしてコマンドを実行す
     るようにしました.
     シェルの構文としてボーンシェルを仮定しているので, OS/2 等ではこの
     ままでは駄目かもしれません.
  ・ needsterminal が指定されている場合は, フォアグランドでコマンドを実
     行するようにしました.
  ・ copiousoutput が指定されている場合は, コマンドの実行結果をバッファ
     に読み込むようにしました.
  ・ RFC 1524 には無いのですが, コマンドの実行結果を text/html として
     バッファに読み込むためのオプション htmloutput を追加しました.
     これは, 坂本さんが [w3m-dev 01079] で提案されていたものの代替案の
     つもりです.
     まだテストしてませんが, ちゃんと動いていれば

     application/excel; xlHtml %s | lv -Iu8 -Oej; htmloutput

     とすれば, lv の実行結果が html として w3m のバッファに表示される
     はずです.
     同じ content-type のエントリが複数ある場合, htmloutput オプション
     があるものを優先するようにしてあるので, 他のプログラムと mailcap
     を共有しても問題無いと思います.
     しかし, RFC 1524 に準拠してないのは確かなので, 御意見お待ちしてま
     す.
  ・ (gunzip_stream() による) 圧縮ファイルの閲覧が ftp に対しても使え
     るようにしました.
     多分 [w3m-dev 01078] のバグだと思いますが, http に対して, 圧縮し
     たテキストデータの閲覧ができなくなってたので, 修正しました.


2000/09/28

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01097] gunzip_stream problem
  圧縮ファイルを読み込んでる途中で, INT シグナルが発生したときの動作
  が変なので, 修正しました.

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01092] CONFIG_FILE
  config.h の CONFIG_FILE を変更しても反映されないなと思ったら、
  いつのまにかハードコーディングに戻ってました。
  その修正です。


2000/09/17

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01078] treatment of content type
  document type の扱いの改良を行ないました.
  ・ examineFile における, lessopen_stream と gunzip_stream の優先順位
     を変更しました.
  ・ lessopen_stream の処理後は, plain text として扱うようにしました.
  ・ lessopen_stream は, document type が text/* であるか, 外部ビューア
     が設定されていない場合のみ使うようにしました.
     また, text/html 以外の, text/* 型は w3m 内部で処理するようにしま
     した.
  ・ page_info_panel で表示される document type は, examineFile で処理
     される前の値を使うようにしました.
  ・ 外部ビューアをバックグランドで動かすとき, コマンドラインに 
     ">/dev/null 2>&1 &" を付けてみました.


2000/09/13

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 01053] Re: Location: in local cgi.
  [w3m-dev 01051] のパッチでは、w3m -m で Location: のヘッダのある文章を
  見ると飛んでいってしまうので、local CGI のときのみ Location: を参照す
  るように変更しました。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01065] map key '0'
  keymap がらみの修正です。
  ・単独の '0' をキーマップ可能にしました。
    『10 j』とかは以前通りです。
  ・『ESC あ』など ESC の後に 0x80-0xff の文字を入力すると
    配列外アクセスをする可能性があったものを修正。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 01066] 104japan
  frame 中の form の文字コードの変換が上手く処理できていないよう
  ですので、修正しました。


2000/09/07

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01058] <dt>, <dd>, <blockquote> (Re:  <ol> etc.)
  ・ <blockquote> の前後の空行は常に入るようにした.
  ・ <dt>, <dd> タグ直後の <p> タグを無視しないようにした.


2000/09/04

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01052] cellpadding, cellspacing, vspace, etc.
  空白や空行に関する, 次のようないくつかの変更を行ないました.
  ・ 余分なセルが出来るのを防ぐために, <tr> や <td> の外にある
     <a name="..."></a> や, <font> 等は次のセルに入るようにした.
  ・ <table> の cellspacing 属性の解釈を間違っていたので, 修正した.
     vspace 属性も解釈できるようにした.
  ・ 空行の判定条件を変更した.
  ・ </p> タグで空行が入るようにした.


2000/08/17

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
Subject: [w3m-dev 01018] sqrt DOMAIN error in table.c
From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01019] Re: sqrt DOMAIN error in table.c
  根号の中身が負になる場合がある問題の修正.


2000/08/15

From: satodai@dog.intcul.tohoku.ac.jp (Dai Sato)
Subject: [w3m-dev 01017] value of input tag in option panel
  aito 連絡帳（http://ei5nazha.yz.yamagata-u.ac.jp/BBS/spool/log.html）
  に出てた問題です。option 画面の外部 editor などに '"' が含まれる
  コマンドが指定されると，再度 option 画面を呼び出した時に '"' 以降が
  表示されなくなると言う問題。


2000/08/06

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01016] Table geometry calculation
  table のジオメトリー計算で実数を整数に丸める手順を変更して, table 幅の
  指定値と本当の幅の差が可能な限り小さくなるようにしてみました.


2000/07/26

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01006] initialize PRNG of openssl 0.9.5 or later
  バージョン 0.9.5 以降の openssl ライブラリで, ランダムデバイス
  (/dev/urandom) が存在しない環境でも SSL が使えるようにしてみました.


2000/07/21

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01004] unused socket is not closed.
  C-c (SIGINT) でファイルの読み込みを中断したとき, socket がクローズされ
  ていない場合があるようです.

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01005] table caption problem
  </caption> を忘れていたときに w3m が終了しなくなる問題の問題の修正.


2000/07/19

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 00966] ssl and proxy authorization
  authorization を必要とする場合の HTTP proxy サーバの SSL トンネリ
  ングに問題があったので修正.

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 01003] Some bug fixes for table
  table のジオメトリ計算のいくつかの問題に対する修正.


2000/07/16

From: SASAKI Takeshi <sasaki@ct.sakura.ne.jp>
Subject: [w3m-dev 00999] Re: bookmark
  ブックマークが登録できない場合がある問題の修正.


2000/06/18

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
Subject: [w3m-dev 00934] clear_buffer bug
  clear_buffer が TRUE のとき, selBuf() で画面が消えてしまう問題に対する
  バグフィクスです.


2000/06/17

From: SASAKI Takeshi <sasaki@ct.sakura.ne.jp>
Subject: [w3m-dev 00929] ftp.c patch
  USER コマンドに対して 230 が返ってきた場合には成功したものと
  みなす patch を作成しました。以下に添付します。


2000/06/16

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 00923] some bug fixes
  ・ #undef JP_CHARSET の場合に file.c が make できなくなっていた
     バグ(私のミスでした_o_)の修正と、
  ・ buffer.c の '=' が '==' になっていたものの修正です。

From: Kazuhiko Izawa <izawa@nucef.tokai.jaeri.go.jp>
Subject: [w3m-dev 00924] Re: w3m-0.1.11pre
From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Subject: [w3m-dev 00925] Re: w3m-0.1.11pre
  file://localhost/foo の形式の URL にアクセスしようとしたとき異常終
  了してしまう問題の修正.

2000.6.14
From: aito
・ ~/.w3m が開けなかったときには、cookie と config を保存しないようにした。
・<isindex prompt="..." action="...">に対応。
・<tag/>が解析できるように変更。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
・[w3m-dev 00846] doc-jp/w3m.1 の形式を mandoc から man に変換。
・[w3m-dev 00861] 標準入力からデータを読んでいるときに、'G' の
  挙動がおかしいバグの修正。
・[w3m-dev 00874] FTP_proxy == "" の場合に落ちるバグの修正。
・[w3m-dev 00875] uncompress, gunzip 部分のコードで気になった部分を修正
  しました。
・[w3m-dev 00876] バッファに圧縮ファイルを表示しているとき、そのバッファを
  再表示すると文字が化けるバグの修正。
・[w3m-dev 00887] getNextPage() がらみの修正/改良をしました。
  ・-m オプション使用時に quoted-printable をデコード可能にした。
  ・showProgress を getNextPage() 内で呼ぶ様にした。
    これにより、Transferred byte(buf->trbyte) に正しく値が入るようになった。
  ・変数名を loadBuffer 等とだいたい合わせた。
  また、getNextPage とは関係無い部分でも
  ・showProgress を呼ぶ位置を正しいと思われる位置に変更
  しています。


From: satodai@dog.intcul.tohoku.ac.jp (Dai Sato)
・[w3m-dev 00848] NEWS-OS 4 対応。

From: Hiroshi Kawashima <kei@arch.sony.co.jp>
・[w3m-dev 00849][w3m-dev 00863] mipsel patch の修正。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp> and many others
・[w3m-dev 00851] #ifdef JP_CHARSET の付け忘れの修正。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
・[w3m-dev 00859] caption が折り返されないバグの修正。
・[w3m-dev 00872] <LI> で空行が入るバグの修正。
・[w3m-dev 00891]次のような問題に対するバグフィクスです.
  1. table 中の <pre><nobr>, <xmp>, <listing> で table が崩れる.
  2. <xmp>, <listing> の直後から改行までが無視されている.
  3. table 中の <textarea>, <xmp>, <listing> 等の中に含まれるタグも処
     理してしまっていた.
  4. feed_select() のタグマッチングで <option> は始めの 7 文字だけしか
     見てなかったため, <optionxxx> 等のタグにもマッチしてた.
     逆に, </option> は > の前の空白が許されてなかった.
  5. <table> 中で </script> (</style>?) を忘れたときに, 無限ループにな
     る.
  さらに次のような変更をしました.
  6. goLine でカーソルが行頭に行くようにした.
・[w3m-dev 00914] 見えていないバッファのメモりを解放するときに、
  その内容をキャッシュとしてファイルに格納するよう改良。


From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
・[w3m-dev 00853] dirlist.in の修正。

From: Altair <NBG01720@nifty.ne.jp>
・[w3m-dev 00885][w3m-dev 00892] for OS/2
      ・NetscapeやLynxのブックマークから、ローカル・ファイルにアクセスて
        せなかったのを修正(沢田石 順さんのパッチ)。file:///D|path/file形
        式(Dはドライブレター)をサポート。
      ・作業域として“/tmp”ディレクトリを決め打ちしていたのを、環境変数
        TMPの設定を優先。(これも沢田石 順さんのパッチ)。
      ・DOSやOS/2のコンソールで広く使われているIBM codepage 850文字集合
        に、ISO latin-1からの変換を行い、英語版w3mでの文字化けをなくしま
        した。
      ・Insertキーによるメニュー呼び出しを、OS/2環境でも可能に。
      ・xtermやkterm、rxvtなどで、画面にゴミが表示されてしまうのを対策。
        (XFree86/OS2で、ターミナルのIEXTENフラグのインプリメントがLinux
        などと違うのが原因)。
      ・キー入力処理周りのパッチが、いかにもパッチでございますと言った雰
        囲気だったのを、オリジナルのプログラムに似せた。

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
・[w3m-dev 00898][w3m-dev 00899] close_effect0 と close_anchor0のバグ修正。

From: sekita-n@hera.im.uec.ac.jp (Nobutaka SEKITANI)
・[w3m-dev 00908] case-sensitive searchの実装。


2000.6.6
From: aito
・[w3m-dev 00826] 
  ・CGI の POST メソッドで取得したヘッダに Location: があった場合、そこで
    redirect されたページを reload すると失敗するバグの修正。
  ・URL中の空白文字を消す処理を追加。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
・[w3m-dev 00827] onA() が効いていないバグの修正。

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
・[w3m-dev 00835] frame内のラベルへの移動動作の改良。

2000.6.5
From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
・[w3m-dev 00789] かなり古いバグですが, <li> タグの幅計算が狂ってるようです.
・[w3m-dev 00801] &nbsp;で改行されることがあるバグの修正。
・[w3m-dev 00813] 文書中の > がうまく解析できない問題の修正。
・[w3m-dev 00818][w3m-dev 00819] <textarea>内の<xmp>,<listing>等がうまく
  動いていないバグの修正。
・[w3m-dev 00820] 漢字で行が終っているとき, 行の長さが画面幅 + 1 である場合
  等で, スクリーンシフトしない事があるようです.

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
・[w3m-dev 00807] table中に<select>のない<option>が出現すると落ちる
  バグの修正。
・[w3m-dev 00816] <textarea>～</textarea> 内の改行が空白に置き換わって
  しまうようです。

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
・[w3m-dev 00814] 'V' コマンドでtextでないファイルを指定すると、その後
  落ちるバグの修正。

2000.6.1
From: Tsutomu Okada (岡田 勉)  <okada@furuno.co.jp>
・[w3m-dev 00578] HTTP_HOME 等と w3m -v の判定の順序を入れ
  替えるパッチです。
・[w3m-dev 00581] BUFINFO関連のバグ修正。
・[w3m-dev 00641] config 中の extbrowser の設定が反映されないバグの修正。
・[w3m-dev 00660] 外部プログラムに渡すパス名が、/home/okada/.w3m//w3mv6244-0..pdf 
  のようになっていました。そのままでも動作に問題はないですが、修正してみました。
・[w3m-dev 00672] configure 中で BUFINFO を定義。
・[w3m-dev 00701] [w3m-dev 00684]の改良。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
・[w3m-dev 00582] 
  ・w3m -T a -B 等でセーブ(キャンセル)後 SEGV します。
  ・w3m -o 1 等で SEGV します。
  ・リンクがアクティブにならなくありませんか？
  ・kterm でマウスが効きません。
・[w3m-dev 00584]
  ・show_params() で sections[j].name の方も conv() すべきと思います。
・[w3m-dev 00586]
  ・define CLEAR_BUF の場合にバッファ選択画面で、
    Currentbuf 以外のバッファが [0 line] と表示されてしまいます。
・[w3m-dev 00605] 
  ・show_params() の表示の改良。
  ・define CLEAR_BUF の場合に HTML 以外の local ファイルが
    reload されると source ファイルがテンポラリファイルに
    変わってしまいます。さらに 2 度目に reload されると、
    読みだし口と同じファイルに上書きしてしまいます。
・[w3m-dev 00606] textarea に最初からあった文章を変更せずに送信すると、改行コード
  が CR のまま送信してしまうバグの修正。
・[w3m-dev 00630] マウスをドラッグしてスクロールさせる時、斜めにスクロールさせると
  動作がおかしかったので修正しました。
・[w3m-dev 00654] [w3m-dev 00666] CLEAR_BUF 定義時に、FORMのあるページにBACKで戻ると
  FORMの内容が消えるバグの修正。
・[w3m-dev 00677] [w3m-dev 00704] 日本語コード判定の改良。
・[w3m-dev 00684] コマンドライン引数のチェックを少し強化しました。
・[w3m-dev 00687] save 時の動作について以下の修正と改良をしました。
  ・ftp のとき Content-Type: application/? 等で download になる時、
    パイプへの出力を許さない様にした。
  ・save するファイル名を URL から取る時、query 部分は使わない様にした。
  ・URL からファイル名が取れなかった場合は、index.html を使うようにした。
・[w3m-dev 00696]
  ・PIPE_SHELL('#') で読んだ時にパイプが閉じられなくなってしまっていた
  ・READ_SHELL('@') や PIPE_SHELL('#') から読み込んだバッファを
    VIEW('v') で HTML 表示できなかった
  ・mouse 使用時に EXEC_SHELL('!') の結果が流れてしまっていた
・[w3m-dev 00706] CLEAR_BUF 時に、一度 : でアンカー化したバッファを再び
  表示するとアンカーが消えているバグの修正。
・[w3m-dev 00720] dirlist.cgi を修正して、ツリー構造の場合に
  選択したディレクトリの位置に飛ぶ様にしました。
・[w3m-dev 00721] CLEAR_BUF を ~/.w3m/config で変更できる様にしてみました。
・[w3m-dev 00724] -m オプション使用時に一つのヘッダが複数行に渡ると
  上手く扱えていないバグの修正。
・[w3m-dev 00728]  HTTPヘッダに日本語が入っていた場合の対処。

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
・[w3m-dev 00589] w3m -T a -B 等でセーブ(キャンセル)後 SEGV するバグの修正
・[w3m-dev 00595] frameset 関連バグ修正
・[w3m-dev 00610] frameset 関連バグ修正
・[w3m-dev 00631][w3m-dev 00633] ID_EXT関連バグ修正
・[w3m-dev 00632] <META HTTP-EQUIV="Refresh">のURL中にcharacter entity が
  あった場合の扱いの変更。
・[w3m-dev 00646] クリッカブルフォームイメージのちょぃと斜め下をクリックするのと、
  table化frameにframe nameをIDタグとして埋め込むpatchをつけます。
・[w3m-dev 00680] 
・[w3m-dev 00683] frame 中で <STRONG> がコメントになってしまうバグの修正。
・[w3m-dev 00707] frame関連のバグ修正
・[w3m-dev 00774] file の close 漏れがあり、fileが新たにopenできなくなるバグの
  修正。

From: SASAKI Takeshi <sasaki@sysrap.cs.fujitsu.co.jp>
・[w3m-dev 00598] ID_EXT関連バグ修正
・[w3m-dev 00700] 'o' でオプション設定画面に行くと「表示用漢字コード」が常に 
  EUC-JP になってしまうようです。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
・[w3m-dev 00602] <title>...</title>の処理時に画面に改行が入るバグの修正。
・[w3m-dev 00617] <table> 中の <blockquote>(または <ul>, <ol>, <dl>) 中にある
  <table> の表示がおかしくなるバグの修正。
・[w3m-dev 00675] &nbsp; (0xa0) が表示できない端末への対応。
・[w3m-dev 00732] <!--comment --\n> の形のコメントがうまく扱えていなかった
  バグの修正。
・[w3m-dev 00750] [w3m-dev 00772] Win95のtelnet等で、EUCの2バイト目にカーソル
  がくると文字化けするバグの修正。

From: Fumitoshi UKAI <ukai@debian.or.jp>
・[w3m-dev 00679] USE_SSL_VERIFY しているbinaryで option を save すると SSL が使え
  なくなるバグを fix するパッチです。
・[w3m-dev 00686] w3mhelperpanel.c の修正。

From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
・[w3m-dev 00692] w3m-0.1.10-pre+666 を EWS4800 の /usr/abiccs/bin/cc でmake時
  にfile.cがコンパイルエラーとなりました。

From: Hiroshi Kawashima <kei@arch.sony.co.jp>
・[w3m-dev 00742] w3m-0.1.9 を mipsel アーキテクチャで動作させるための
  パッチを作成しましたので、ポストさせていただきます。(変更点は gc 回り
  です。)

2000.5.17
From: Hiroaki Shimotsu <shim@d5.bs1.fc.nec.co.jp>
・[w3m-dev 00543] personal_document_rootが効かなくなっているバグの修正。
・[w3m-dev 00544] local で <a href="foo/">foo/</a> のような anchor を辿るとき
  foo に index.html のような file が存在したら、
  dirlist の代わりにそちらを表示する patch を作成しました。
  option でその file 名を指定します。(一個だけ)
  あと document_root を展開するようにしました。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
・[w3m-dev 00545] w3m -num < file の様に -num オプションを標準入力(パイプ)と
  共に使った時に 'v'(view HTML) で行番号までも整形されて
  しまうバグを修正しました。
・[w3m-dev 00557] -dump 指定時に一時ファイルが消えないバグの修正。

From: Okabe Katsuya <okabek@guitar.ocn.ne.jp>
・[w3m-dev 00568] <table>中で、<tr>..</tr>の外に<blockquote>があると
  表が崩れる問題の修正。

2000.5.16
From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
・[w3m-dev 00487] termcapにsrが無いばあいに正常に動くよう改良。
・[w3m-dev 00512][w3m-dev 00514][w3m-dev 00515] 漢字コード判定の改良。
・[w3m-dev 00530]  w3mが <ISINDEX> を使ったcgiをうまく処理できないのを
  何とかするpatchです。
・[w3m-dev 00537] URL中の改行を除くように改良。
・[w3m-dev 00542] 「HTMLの中の多重framesetの一部の、他のHTMLのframesetによ
  る上書き」に対応。

From: SASAKI Takeshi <sasaki@ct.sakura.ne.jp>
・[w3m-dev 00488] id属性のサポートが不完全であった問題の修正。
・[w3m-dev 00497] configure で IPv6の環境を自動検出するように改良。

From: Kiyokazu SUTO <suto@ks-and-ks.ne.jp>
・[w3m-dev 00489] 
 ・ USE_GPMもUSE_SYSMOUSEも定義されない環境だと、 USE_MOUSEが定義され
    ていてかつ{k,x}term上でも、マウスが使えない。
 ・ SSLのクライアント認証を要求するページが、まったく表示されない。
 ・ -o オプションのパラメータ一覧を表示させるオプションを追加。
・[w3m-dev 00519] I コマンドに関するセキュリティホールの修正。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
・[w3m-dev 00498] ファイル名補完で、 / (root)からの場合に補間できなくなって
  いたバグの修正。
・[w3m-dev 00508] 色の指定が出来なくなっていたバグの修正。
・[w3m-dev 00518] I コマンドに関するセキュリティホールの修正。
・[w3m-dev 00535] マウスのGPM/SYSMOUSE対応のバグ修正。

From: Kazuhiro Nishiyama <nishiyama@mx1.tiki.ne.jp>
・[w3m-dev 00503] cygwinで$extensionがちゃんと設定されていなかったので
  なおしてみました。ついでにいちいちWho are you?って聞かれるのも修正し
  てみました。

From: Hiroaki Shimotsu <shim@nw.bs1.fc.nec.co.jp>
・[w3m-dev 00516] formに文字列を送信するときに、safeな文字をエスケープ
  しないようにした。

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
・[w3m-dev 00471] 画面の最初にリンクがあるページを表示させたときに、リン
  クがアクティブにならないことがあるのを修正するパッチです。

From: Fumitoshi UKAI <ukai@debian.or.jp>
・[w3m-dev 00539] proxyの初期設定のバグ修正。



2000.4.24
From: aito
・見えていないバッファはメモりから削除するようにしてみた。
・file:// 形式でローカルファイルにアクセスして失敗した場合、
  http:// を補わないようにした。
・GPMまたはSYSMOUSEを使っていないと、xterm/kterm上でマウスが
  効かないバグの修正。

From: rubikitch <rubikitch@ruby-lang.org>
・Buffer の URL をファイルにセーブする機能追加。

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
・FTP proxyが効かなくなっていたバグの修正。
・C comment cleanup.
・画面サイズを変更すると、１回のキー入力ごとに reshapeBuffer()
  が呼ばれていたバグの修正。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
・gc が /usr/local 以下にあると configure で
  found -> dones't seem to work となる場合があります。
・w3m -v として W3M HomePage に飛ぼうとするとこけました。
・ISO-8859-1 の『×』と『÷』のコードが間違っていました。
  ＃ LANG == EN の時 0x80-0x9F を表示しない様になっていますが
  ＃ ISO-8859-* 以外の CP??? や Big5 で使っている人が困るかも。
・file://host の形式の時 file:/ をアクセスしていたのを、
  file://host/ と同様に ftp://host/ をアクセスする様に修正。
  (場合分けの抜かりでした)。
  なお、file://user@host/hoge は file:/hoge をアクセスするのですが、
  何故わざわざこうしたか自分でも思い出せないのでそのままにしておきます。
  (1999/08/31 版への patch だった)


2000.4.21
From: Kiyokazu SUTO <suto@ks-and-ks.ne.jp>
 ・ 匿名FTPログイン用パスワードが文字「@」で終わっている場合、 FTPサーバと
    の接続に使われるソケットからFQDNを求めて、パスワードに追加する。
 ・ オプションの設定を、「--オプション名=値」という形で、コマンドラインから
    可能にする。
 ・ news URIで記事を取得する際に、環境変数NNTPMODEの値が空文字列ではないと
    き、その値を引数として「mode」コマンドを投入する。
 ・ SSL関連の以下のオプションを追加。
    ssl_verify_server ON/OFF
        SSLのサーバ認証を行う(デフォルトはOFF)。
    ssl_cert_file ファイル名
        SSLのクライアント用PEM形式証明書ファイル(デフォルトは<NULL>)。
    ssl_key_file ファイル名
        SSLのクライアント用PEM形式秘密鍵ファイル(デフォルトは<NULL>)。
    ssl_ca_path ディレクトリ名
        SSLの認証局のPEM形式証明書群のあるディレクトリへのパス(デフォルトは<NULL>)
        。
    ssl_ca_file ファイル名
        SSLの認証局のPEM形式証明書群のファイル(デフォルトは<NULL>)。
    ただし「SSLEAY_VERSION_NUMBER >= 0x0800」な環境でないと無駄なコードが増
    えるだけなので、 configure時にdisableしておいたほうがよいでしょう。

    また実際に認証を行う場合、 ssl_ca_pathまたはssl_ca_fileで、サーバの鍵に
    署名している認証局の証明書を (ssl_verify_serverのON/OFFに関係無く) 指定
    しないと認証が成功しないようです。

From: aito
・幅の相対指定されている表が入れ子になり、COLSPANが2以上の
  場合にCOLSPAN指定が効かないバグの修正。
・configureにオプションを追加。
・local fileからのリンク参照に Referer: が付いていたバグの修正。

From: Rogue Metal - Jake Moorman <roguemtl@stampede.org>
- All T/NILs are replaced with TRUE/FALSE.
- Messages are added for FTP connection.

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
・一行入力中にDELを押すと落ちるバグの修正。
・コメント処理のバグ修正。

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
・FTP_proxy 設定時に、proxyが認証を要求する場合の対処。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
・<input_alt fid=0>でw3mが落ちるバグの修正。


2000.4.7
From: aito
・<select>に対して</select>が無いとコアダンプするバグの修正。
・#ifdef USE_GPM, #ifdef USE_SYSMOUSE が #ifdef MOUSE で
  囲まれていなかったバグの修正。

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
・ローカルファイルへのリンクをたどるとコアダンプするバグの
  修正。
・行編集でDELを使うと落ちるバグの修正。

From: Shin HATTORI <mituzi@he.mirai.ne.jp>
・bzip2 サポートのバグ修正。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
・-dump, -dump_head, -dump_source オプションが競合している
  バグの修正。
・-oオプションを追加。
・-dump オプションを使うとコアダンプするバグの修正。
・メッセージの表示中にマウスがきかなくなるバグの修正。
・ウィンドウサイズ変更がうまくいかなかったバグの修正。
・終了時の確認のデフォルトを n に変更。
・term.c での ScreenImage の確保を動的にした。

From: Sven Mascheck <mascheck@faw.uni-ulm.de>
* There are websites using (unprintable) special characters (eg '0x96')
  to 'feature' microsoft browsers.  At least in the western configuration
  (the only one i know), w3m doesn't check if characters are printable,
  thus they confuse particularly the /xfree/ xterm (knowing more special
  characters than other xterms). 
  Something like the attached patch could prevent this
  (also only affects western version).
  Instead of (superfluously) using isprint() with the locale,
  it now just checks the range (pointed out by Christian Weisgerber).

From: naddy@mips.rhein-neckar.de (Christian Weisgerber)
* C++ style comments are changed into C style.

2000.4.6
From: lars brinkhoff <lars@nocrew.org>
ARM linux patch.

From: Hiroaki Shimotsu <shim@nw.bs1.fc.nec.co.jp>
'u'コマンドで、formの種類が表示されるように改良。

From: patakuti
o Cygwin では snprintf がなくてコンパイルできなかったので修正
o text/html 以外のドキュメントを -dump しようとした場合の
  挙動がおかしかったので修正
o ローカルファイルのファイルの拡張子と mime-type の対応を
  ファイルに記述できるようにした (多分 ftp でも 同様)


2000.4.5
From: 坂本 <hsaka@mth.biglobe.ne.jp>
・'U'コマンドで、現在のバッファのURLがヒストリの先頭に来るようにした。
・table 中に <h1>～<h1> があると幅がおかしくなります。
  実際には frame でおかしくなることがありそうです。
・table 中に開始タグのない </ol>,</ul>,</dl>,</blockquote> があると、
  table が崩れます。(こんな HTML を書く方が悪いのですが) 

From: "Shin'ya Kumabuchi" <kumabu@t3.rim.or.jp>
・通常のロード時に Pragma: no-cache を出すことがあるバグの修正。

From: Tomoyuki Kosimizu <greentea@fa2.so-net.ne.jp>
w3m-0.1.6のrc.cで些細な問題を見つけましたので報告いたします。

2000.3.29
From: Altair☆ <NBG01720@nifty.ne.jp>

OS/2対応強化。
・ローカル・ファイルのオープンに失敗した時、http://を仮定してリト
  ライさせることで、それがディレクトリだった時にdirlist.cgiが呼び
  出して貰えないことがあるのを対策。(url.cの後半)
・非XのOS/2環境でも矢印キーを効くようにする
・外部プログラムがうまく呼び出されなかったのを修正
・ファイル・アクセスでドライブ・レターを有効にする

From: David Leonard <leonard@csee.uq.edu.au>
after filling in a simple form
 <form action="https://internal.csee.uq.edu.au/cgi-bin/login.cgi" method=POST>
a cookie is received and then w3m dumps core.

From: Ken Yap <ken@nlc.net.au>
I have made w3m work on DJGPP (protected mode 32-bit programs running
from DOS/Win). The resulting binary after compression is only 220kB,
which means it's possible to give a floppy for a 386 with 4-8 MB memory
for browsing the web!

From: "SHIROYAMA Takayuki" <psi@stellar.co.jp>
From: Jeroen Scheerder <J.Scheerder@cwi.nl>
MacOS X Server patch.

2000.2.25 
From: Ambrose Li
I found a bug in <img alt="">
handling. If alt="" is not suppressed, the line containing the img
element is not wrapped. I have verified that the bug exists in w3m
0.1.6; the bug seems to still exist in w3m 0.1.7, but I have not
finished compiling it.

From: aito
<select> なしで <option> が出現すると core dump するバグの修正．
ドキュメントの先頭に <blockquote> が来ると，先頭行がインデント
されないバグの修正．
application/x-bzip に対応．
mktable, w3mbookmark, w3mhelperpanel で GC の初期化ができない
ことがあるバグの修正．
マウスのドラッグ動作が上下と左右で一貫性がなかったバグの修正．

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
正規のタグでない <...>を使うと挙動がおかしいことがあるバグの修正．
quoteShell() のセキュリティホールの修正．
set_environ() の中でcore dump することがあるバグの修正．
<table width="xxx%"> の表示がうまくいかなかったバグの修正．
'!' でコマンドを実行したときに画面が乱れるバグの修正．

From: Fumitoshi UKAI <ukai@debian.or.jp>
各種一時ファイルのパスに // が含まれるバグの修正．
0.1.7 で https が使えなくなっているバグの修正．

From: Hiroaki Shimotsu <shim@nw.bs1.fc.nec.co.jp>
proxy を設定していて，そこに接続できなかった場合はエラーになる
ように修正．
w3m に直接引数として与えた URL が， 'U' コマンドの履歴に入らない
バグの修正．

From: sasaki@ct.sakura.ne.jp
HTML4.0 の ID 属性をリンクで辿れるようにしてみました。

From: Okabe Katsuya <okabe@fphy.hep.okayama-u.ac.jp>
table の中に <input type=hidden> などがあると表が崩れるバグの
修正．

2000.2.12
From: Rogue Metal - Jake Moorman <roguemtl@stampede.org>
- added GNU-style comments for all #ifdef/#else/#endif
  modified: almost all files
- renamed w3mhelp_en and w3mhelp_ja to w3mhelp-w3m_en and w3mhelp-w3m_ja
  (to aid in handling of additional keybindings in the future)
  modified: XMakefile, XMakefile.dist, config.h, configure, help files
- corrected error in w3mhelp-lynx_en ('Japanese' link was pointing to
  Japanese language help file for the w3m keybinding, not the lynx
  keybinding)
  modified: w3mhelp-lynx_en.html
- replaced 'Loading {URL}' message with more specific messages about
  current status ('Performing hostname lookup on {hostname}' and
  'Connecting to {hostname}')
  modified: main.c, url.c

2000.2.10
From: Rogue Metal - Jake Moorman <roguemtl@stampede.org>
- added support for PageUp and PageDown in list boxes (popups)
  modified: menu.c
  (this patch was sent to you previously)

2000.1.28
From: aito
mySystem() を変更．自前で fork/execvp するのではなくて，shellの
特殊文字をエスケープしてから system() を使うようにしてみた．

From: SASAKI Takeshi <sasaki@ct.sakura.ne.jp>
w3mbookmark の改良．
1. 正常に登録できた場合は今の動作
2. 登録できない場合は登録パネルに戻る

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
    frame表示bufferからbufferを作らない(ダウンロードまたはプログラム起
  動)場合に、"Can't なんとか"というframeのあるbufferができる。reloadす
  ると、もう一度ダウンロードしてくる
を直しました。framesetは、今のところ8重目きめうちで切っています。
あいかわらずw3m-0.1.6からのパッチです。今のところ、下の不具合があるこ
とがわかっています。
    "q" で正常終了しても一部のキャッシュファイルが残ることがある
    もしかしたらtarget以外のframeも上書きするかもしれない
    frame内のmetaのhttp-equiv="refresh"を表示しないので、稀に困るペー
  ジがある

From: aito
GlobalKeymap[] 他のキーマップを，w3mFuncList[] の添字の配列に変更．
gopher:, news: へのアクセスをオプションにした．
searchForward, searchBackward のバグ修正．
system()を利用するように mySystem() を変更．
FORMAT_NICE をデフォルトで off とするよう変更．

From: IIMURA Takuji <uirou@din.or.jp>
  ・background image 以外に、
        APPLET ARCHIVE=""
        EMBED SRC=""
    の二つへも link を作るようにしました。
    なので、#ifdef BACKGROUND_IMAGE_DISPLAY から、
    #ifdef VIEW_UNSEENOBJECTS へ名前を変えました。
  ・'o' で開くオプションメニューで
    「現在選択されているリンクの色を指定する」を使って ON/OFF 出来るようにしました。
  cookie 関係で、
  「クッキーを使用する」 ON/OFF の他に、
  「クッキーを受け付ける」 ON/OFF もつけました。
  これで、既に受け付けた cookie を送るだけで、
  新しい cookie は食べない mode に出来ます。

From: Christian Weisgerber <w3m-dev-en@mips.rhein-neckar.de>
FreeBSD sysmouse support.

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
-B -dump などで落ちるバグの修正と関連動作の整理です。
・入力
  引数に URL(ファイル名)が無い場合、リダイレクト(< file)かパイプ
  → -B(ブックマーク) → HTTP_HOME → WWW_HOME → -v オプション
  の順に試して何もなければ usage() で終了。
  何かあれば、それを -dump やフレーム表示等も URL と同等に扱います。
  ＃ ソースコードも共通化しています。
・出力
  リダイレクト(> file )やパイプの場合、-halfdump, -dump_source,
  -dump_head でなければ、-dump を仮定する様にしました。
  w3m file.html > file.txt でフォーマッタになります。
  ＃ コード変換ツールともするため i18n でもこうしてます。

2000.1.27
From: aito
* FORMAT_NICEを定義した場合，<UL><LI>...</UL>の表示がおかしくなる
  バグの修正．
* pq.c, pq.h を削除．PQ_xxx のかわりに全て qsort を使うようにした．
* ディレクトリリストが表示できないバグの修正．

2000.1.25
From: Fumitoshi UKAI <ukai@debian.or.jp>
mailto: で、mailを出す途中に C-c で intr かけると segfaultすると
いうバグです。このパッチでなおりましたが…

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
        * fm.h, frame.c, map.c, buffer.c, file.c, main.c: framesetの変
        更履歴のbackができるように、Bufferの内部でframesetをスタックに
        して持つように変更。Buffer selectのように任意の時点を指定する
        のは難しいっぽいです

        * rc.c, main.c, frame.c: default targetを_selfに変更。伴って、
        bufferA(targetを追わない。今かいたばかりで未試験)を追加したけ
        ど、keybindには登録せず

        * main.c (reload): frameでのreloadの動作を、frameset中未読
        frameのみreloadに変更。frameの丸ごとreloadはF->R->Fでできる、
        はず

        * frame.c (newFrameSet): frameからtableの横幅をつくる部分で、
        カウンタと総和を勘違いしていたのを修正

        * frame.c (createFrameFile): frame中でtable stackのunder flow
        を捕まえて、table、td、th、trあたりを必要に応じ表示しないよう
        に変更。ついでにoverflowのときには、ファイルの最後に必要な数だ
        け/tableが入るようになっているはず

        * html.h, url.c, file.c, menu.c, frame.c: オブジェクトの捕まえ
        方 (retrieve schemeだろうか)の流れを、char *url -> parse?URL()
        -> parsedURL.scheme -> openURL() -> URLFile.scheme ->
        loadGeneralFile() -> Buffer.real_scheme と仮定して、openURL()
        にてurlがlocal_cgiだったときにはURLFile.schemeにSCM_LOCAL_CGI
        をいれて、cache file付きで返すように変更。つまり、frameでディ
        レクトリを見れるようになってます。SCM_EXECは……見逃してくださ
        い


2000.1.21
From: naddy@mips.rhein-neckar.de (Christian Weisgerber)
1. conn.eventMask is set to 0 which disables reception of all types
   of events. Effectively, this disables GPM support altogether.
   Probably "~0" was intended, to enable reception of all types of
   events.
2. conn.maxMod is set to ~0, which means that events with a modifier
   key (shift, control, etc.) set are also sent to w3m. Since w3m
   doesn't do anything with these events, they should rather be
   passed on to other clients. Changing this to "conn.maxMod = 0"
   will for example allow the use of the mouse in w3m *and* mouse
   clicks with shift held down for console cut-and-paste.

From: naddy@mips.rhein-neckar.de (Christian Weisgerber)
I would like to suggest a small change to w3m's GPM support:
Rather than explicitly drawing the mouse pointer, this could be left to
the server, i.e.
- remove GPM_DRAWPOINTER() calls,
- set conn.defaultMask to GPM_MOVE|GPM_HARD.


From: aito
'<' の次にタグ名以外のものが来たときに，'<'をそのまま表示するよう
に改良．

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
画面描画のバグ修正．

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
w3m 0.1.4 に対して, 以下の修正を行ないました.
  ・Set-Cookie2 の discard 属性を受け入れるようにした.
    以前の版では, expires 属性と discard 属性は排他的であると勘違いし
    て無視していました.
  ・<dl> タグの前の空行の有無と, </dl> タグの後の空行の有無がバランス
    していなかったので, </dl> タグの後には必ず空行が入るようにした.
さらに <p>, <[duo]l> などのタグが続いた時に空行が 2 つ入るのを防ぐため
に, いくつかの変更を行なってますが, 何か問題があるかもしれません.
例えばもし <p><p> で 2行空いた方が良ければ, 元のままにしておいてください.

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
table の geometry 計算にちょっとしたバグがありました.
以下, その修正です.

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
table で width=0 の場合に対応．

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
inputLineHist() のバグ修正．

2000.1.14
From: ChiDeok Hwang <cdhwang@sr.hei.co.kr>
When I browse http://i.am/orangeland and press 'v' to see document
info, w3m got seg. fault.
Reason was above site had the very strange frameset with only one frame.
<frameset rows="100%,*" ... >
Simple following fix was enough for me.

From: aito
URL の scheme が無いものを読みこむときに，local で開けなかった場合は
http:// を仮定するようにしてみた．

configure を変更．mkdir -p を使うようにした．

ldHelp() を変更．HELP_DIR から常に読みこむようにした．

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
RFC 882のheaderのentryが2行のときのmulti byteの扱いミス退治
frameからのframeset htmlの参照でもtargetを追跡するよう変更
target="_parent"
frame内のformで、稀に不思議なURIができるのを修正
一部変数・関数の方と初期値の定義を追加その他
  ただし、_parentの実装は、navigatorと解釈が違うっぽいです。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
progress bar に graphic 文字を使う
必然性もそれほどないので、反転の '|' で代用してみました。

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
今度は, 画面の右端の文字が消えてしまう事があるという問題です.
以下のパッチで対処しました.

2000.1.12
From: aito
word fillを実装してみた．
(ドキュメントなし： config.h の中でコッソリ #define FORMAT_NICE
とやると動く．)

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
 >> w3m -halfdump の時、$HOME/.w3m 配下のw3m* で始まるファイルが
 >> 残るようです。
これ自体は以下の patch でいいと思います。

From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
"w3m ."とかw3mhelperpanel が動作しなくなってました。
以下、configure へのパッチです。

2000.1.11
From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
  readHeader()でのheaderの表示と処理の切り分けと、base targetの指定な
しでもtargetを使いたいのと、MIME encoded-word間の空白の処理を好みに変
えた結果のパッチです。

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
freshmeat (http://freshmeat.net/appindex/1999/06/09/928951047.html) で, 
Yahoo! で cookie がうまく使えないとあったので調べてみました.
どうやら, path エントリー '/' の後に空白が引っついているのが問題のよう
です.

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
table のジオメトリー計算に以下の問題の修正を行ないました.
  1. 次のような table の 1 カラム目に空白が残ってしまう問題.
--------------------------------------------------------------------------
<table border width="600">
<tr>
<td>fo oo oo oo bo
<td COLSPAN=2>fooo booo fooo booo fooo booo fooo booo fooo booo fooo booo
</table>
--------------------------------------------------------------------------
  2. <dt> タグがあるとき, カラム幅の計算を間違っていた.
  3. HTML 4.0 で追加された table タグ (<thead>, <tbody> など) をスキッ
    プするようにした.
その他 w3m 0.1.1 の修正で漏れていた, 
  <sa6zouvxzg0.fsf@okaibm.hep.okayama-u.ac.jp> (Article 84) および, 
  <sa6iu1pzou7.fsf@okaibm.hep.okayama-u.ac.jp> (Article 59)
のパッチ．

From: aito
'!'コマンドによるshellの実行と，textareaへの入力でのエディタ起動を
system() に戻す．

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
『-- 空白文字 >』のタイプのコメントの処理にまだ問題がありました。
patch をつけます。

2000.1.7
From: Fumitoshi UKAI <ukai@debian.or.jp>
deb をつくった時の patch です。
 * XMakefile
  - dependency には $(GCLIB) じゃなくて $(GCTARGET) だと思うのですが。
  - help file (architecture independent)を /usr/share/w3m == $(HELP_DIR)
    bookmark (architecture dependent)を /usr/lib/w3m == $(LIB_DIR)
    にわけてます (まぁ全部 /usr/lib/w3m でもいいのかも)
 * file.c 
  @@ -386,8 +386,8 @@
    content-encoding: の後のspaceなくてもよいように
  @@ -3504,6 +3504,7 @@
    http://haskell.org/hugs/ みたいな html で 無限loop におちいるのを fix
 * main.c
  @@ -66,7 +66,11 @@
    libgc5-dev package用に変更
  @@ -1092,7 +1100,11 @@
    LIB_DIR と HELP_DIR を分離したので
 * proto.h, rc.c
    これも LIB_DIR と HELP_DIR を分離したので
 * terms.c
   こうしないと SIGWINCH に対応しない

2000.1.5
From: やま
  以前投稿しました田フレームのパッチの補足です。991203のまま
だと、colもrowも指定のないフレームセットの生成に失敗する点に
ついて、手元のsourceは修正しておいて、その部分のパッチを公開
するのを忘れていました。
  原因は、frameset.split_directionの定義を行わず、正気check
に失敗するからです。実のところ、colもrowも両方同時使用O.K.に
した時点で、split_directionは無用になったので、消してしまい
ました。

From: aito
C-c で読みこみを中止したときに，バックグラウンドで動いている外部ビューア
が終了するバグの修正．

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
また、標準入力やパイプから読み込んだ時の -m オプションが
壊れていたみたいです。
＃ 何が原因か分からないのですが最近よく SEGV します。
＃ ....と、危ない箇所を見つけたので追加 patch です。
＃ 一般に foo->bar->hoge は危ないですね。

From: (の)の人 <sekita-n@hera.im.uec.ac.jp>
Subject: Referer: の抑制オプションを追加するパッチ
タイトルのとおりです。
どこから飛んできたのかを隠したい場合は`o'でオプション画面に飛んで
「Referer: を送らないようにする」をONにしてください。

From: (の)の人 <sekita-n@hera.im.uec.ac.jp>
Subject: `q'について
「Do you want to exit w3m? (y or n)」
で何も入力せずに改行するとw3mが終わってしまうので、それを修正するパッ
チです(991206用)。

From: aito
直接コマンドラインで指定したURLをダウンロードする際に，入力した
ファイル名の最後に改行文字が付いてしまうバグの修正．

2000.1.4
From: Sven Oliver Moll <smol0999@rz.uni-hildesheim.de>
There was one thing that's been anoying me, so I got it fixed: the
behaviour of mouse dragging. The push of the mousebutton is
interpreted of dragging the text behind the window. My intuition in
dragging is that I drag the window over the text. So I added a config
option called 'reverse mouse'.

From: aito
Lynx-like keymapに `M' (外部ブラウザ呼びだし)を追加．

From: SUMIKAWA Munechika <sumikawa@ebina.hitachi.co.jp>
KAME on FreeBSD-3.3 で
	#define INET6
として、w3m-19991203をmakeしたところ、makeが通りませんでした。
これは、etc.c:FQDN()で使われているPF_UNSPECやSOCK_STREAMがsys/socket.h 
で定義されているためです。

From: kjm@rins.ryukoku.ac.jp (KOJIMA Hajime / 小島肇)
NEWS-OS 6.x サポート．

From: aito
メニュー表示時にマウスがアクティブになっていなかったバグの修正．
gcc -Wall で警告が出ないように調整．
configureで IPv6 を自動判定するようにした．
(Thanks to sumikawa@ebina.hitachi.co.jp)

1999.12.28
From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
tmpPropBuf に保存しておいてカーソルが外れたら戻す部分にバグ
(複数行の場合)があり、その方式で修正するのは大変そうだったので、
以下の様にしてみました。
・選択されているリンクの色が指定さている場合は、
  『+ その色 + 下線』で表示
・選択されているリンクの色が指定されていない場合は、
  『+ 下線』で表示
・白黒の場合は、『+ ボールド』で表示
  (下線だと意味がないので変更してみました)
方式は、カーソルのあるアンカーに PE_ACTIVE を設定し、
他の効果(mode)の後で効果(mode)を上書きするようにしています。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
日本語を表示できる(#define JP_CHARSET)状態で、
#undef KANJI_SYMBOLS の場合にテーブルやメニューの枠
に graph 文字を使える様にする patch です。
非常にすっきりした表示になります。

From: Fumitoshi UKAI <ukai@debian.or.jp>
えーと ALT="" の時に表示するのはバグだとうるさい人がいる:<
のでオプションにしてみました。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
・frame で構成されるペイジの場合、reload 時には frame表示/非frame表示
  にかかわらず両方とも削除され、frame表示だった場合には、
  さらに frame表示のバッファが作成されます。
・edit 時(非frame表示のみ可能)にも frame表示のバッファがある場合には
  それも削除されます。
  (非frame表示バッファをなくした frame表示バッファは
   ほとんど無意味なので削除でいいと思います。)
※) 多段のフレームには対応できていません(rFrame 自体対応していない)。

From: aito
HTTP の response code が 200 の場合でも， WWW-Authenticate: ヘッダ
があるとユーザ認証をしていたバグの修正．

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
 >> 日本語を表示できる(#define JP_CHARSET)状態で、
 >> #undef KANJI_SYMBOLS の場合にテーブルやメニューの枠
 >> に graph 文字を使える様にする patch です。
progress 表示の部分の不具合を修正しました。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
ISO-2022-JP の時に半角カナの一部が全角に変換されない
不具合の修正です。

From: aito
nameが未定義の textarea に default という名前が勝手に
定義されてしまっていた．

From: Yamate Keiichirou <yamate@ebina.hitachi.co.jp>
Location: で指定されたURLに飛ぶときに，最後の改行を落とし
忘れていたバグの修正．

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
・<TD>,<TH>に相対幅指定があった場合の挙動の大幅な改良．
・w3m 991203 版では, コードが 0x80 以上の escape 文字がそのまま表示され
  てしまうようです.

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
コメントで <!-- .... --   > のように -- と > の後に
スペースを許すよう変更．

1999.12.27
From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
dirlist.cgiの改良．

From: aito
'!' コマンドで最後に & を付けたときにバックグラウンドにならない
バグの修正．

1999.12.14
From: Christian Weisgerber <naddy@unix-ag.uni-kl.de>
- I have appended a small patch to add support for the Home/End/
  PgUp/PgDn keys at the FreeBSD "syscons" console.
  (It would be much preferable if w3m read the key sequences from
  the termcap entry rather than having them hardcoded, but this
  would require a substantial rewrite.)

From: aito
・w3m-control: で，GOTO url を与えると，そのurl に行くようにした．
・<meta http-equiv="Refresh" content="0; url=URL"> があった場合，
  ただちにそのページを読みこむようにした．
・'M', 'ESC M' で外部ブラウザを立ちあげるときに，外部ブラウザが
  定義されていなかった場合には，コマンドラインからコマンドを入力
  するようにしてみた．

1999.12.8
From: aito
Proxy-Authorization に対応．

1999.12.3
From: aito
ディレクトリ表示に外部コマンドを使うことができるようにした．
デフォルトは坂本さんの dirlist.cgi．

1999.12.2
From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
メニュー，バッファ選択画面で，カーソルが選択項目のところ
に来るように変更．

From: aito
TERM={xterm|kterm}の場合には GPM を使わないよう変更．
xterm でマウスを使う場合，キー入力のときだけマウスが有効
になるように変更．

1999.12.1
From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
HTTP_HOMEを設定して立ちあげると止まるバグの修正．

From: Fumitoshi UKAI <ukai@debian.or.jp>
ある種のFormを読むとsegmentation fault を起こすバグの修正．
tableの項目数を増やす部分のバグ修正．

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
<tr> タグの align 属性に対応しました。
また、<th> タグの場合のデフォルトの align は center にしました。

From: Tsutomu Okada (岡田 勉) <okada@furuno.co.jp>
・再び JP_CHARSET を定義したときに、latin1 の文字が表示されないように
  なっていたのを修正
・JP_CHARSET の定義が、fm.h, conv.c, terms.c にあったのを fm.h にまと
  めた
・README.func に合わせて、func.c の COOKIES を COOKIE に変更

From: aito
HTTP header の : の後に空白がなくても良いように変更．

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
TABでアンカーを移動するとき，TABLEの中のアンカーの順番が狂う
バグの修正．

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
-v オプションに限らず、コマンドラインから URL を指定した場合の
処理がなんか怪しいので、少し本腰をいれて直してみました、
以下の様な patch でどうでしょう。以前に報告した
  w3m フレーム.html フレーム.html ...
にも対応しています。
-v オプションに関しては、表示するバッファが無い場合に -v が指定
されていると初期画面が表示されます。


1999.11.26
From: Fumitoshi UKAI <ukai@debian.or.jp>
mailcap等に記述するコマンドの引数を ' ' で囲むとうまく実行
されないバグの修正．

1999.11.20
From: SASAKI Takeshi <sasaki@isoternet.org>
「現在選択されているリンクに色を付ける」オプションをONにして
いる場合にコアダンプするバグの修正．

1999.11.19
From: aito
XMakefile の記述を修正．
local file が2回ロードされるバグの修正．
<UL>などがネストした時に，</ul>直後に日本語がくるとインデント
が狂うバグの修正．
GPM対応．

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
プログレスバー表示をさらに改良．

1999.11.18
From: Ben Winslow <rain@insane.loonybin.net>
プログレスバーの表示の改良．

From: patakuti
<input type=button>に name が定義されていなかった場合に，勝手に
name がつけられてしまうバグの修正．

From: やま
フレームで row と col を両方指定した場合に対処．

From: aito
bookmarkコマンドをw3m本体から分離．w3mbookmarkというコマンドにする．
それに伴ない，CGIからw3mを遠隔操作できるようにする．

C-s で画面表示が止まっていたバグの修正．

文字入力時に C-g で中止できるようにした．

From: hovav@cs.stanford.edu
外部ビューアのないタイプのファイルをダウンロードするときに，
保存先として存在しないディレクトリを指定するとコアダンプ
するバグの修正．

From: minoura@netbsd.org
&#x1234; のような character entity を使うと segmentation
fault が起きることがあるバグの修正．

From: Christi Alice Scarborough <christi@chiark.greenend.org.uk>
現在選択されているリンクに色を付けられるようにした．

1999.11.17
From: aito
<OL>,<UL>等のリストで，それが最初のレベルである時だけ前後に空行を
空けるようにした．
-bookmarkオプションで，bookmarkファイルが指定できるようにした．

From: Hiroaki Shimotsu <shim@nw.bs1.fc.nec.co.jp>
検索の件ですが、C-r C-r は皆さん無反応なのと N が空いてたの
で、vi の N と同様の機能を作成してみました。
o srchnxt(), srchprv() 共に内部関数 srch_nxtprv() を呼ぶ。
o srch_nxtprv() で引数 1 で読んだ場合は、現状の
  searchRoutine でない方を呼ぶ。


1999.11.16
From: Kiyohiro Kobayashi <k-kobaya@mxh.mesh.ne.jp>
wu-ftpdが2.6.0になってから、NLSTに対してディレクトリ名を返さなくなった
ために、w3mでアクセスするとディレクトリがみえなくなってしまっています。
それで、NLSTではなくLISTを使用するように、改造してみました。
ついでに、ファイルの日付、サイズも表示するようにしてみました。
991028版に対するpatchを添付します。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
checkContentType() にバグが入り込んでました。
＃ また、-m が壊れてたわけです+_+

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
メニューの動作を少し拡張/変更しました。
拡張内容
・C-f, C-v で次ページの項目を表示する
・C-b, M-v で前ページの項目を表示する
・INS キーとして ^[[L(コンソール)、^[[E(PocketBSD) を追加
・DEL(C-?) で親のメニューに戻る … BS(C-h) と同じ動作です
・#define MENU_THIN_FRAME でコンパイルすると細い罫線を使う
  デフォルトは #undef。
変更内容
・長いメニューの場合、マウスで上下の "：" をクリックすると
  次/前ページの項目を表示する様に変更
  (これまでは次/前の項目だったので面倒だった)
・階層型(sub-menu)の場合、マウスで枠外をクリックすると
  親のメニューに戻る様に変更
  (これまでは全て消去だったためマウスだけで戻ることが出来なかった)
・<, >, +, - へのバインドをやめた
  (??-like でもないし、異様に使いづらいので誰も使ってないと思います)

From: おかだ <okada@furuno.co.jp>
lynx の動作を真似しただけなんですが、<SELECT>の選択時やメニュー表示の
ときに、最初や最後の候補をすぐに選ぶことができるようにしてみました。
C-a と C-e にバインドしてあります。

From: "OMAE, jun" <jun-o@osb.att.ne.jp>
From: Fumitoshi UKAI <ukai@debian.or.jp>
FTP の Multiline reply に対応していなかったバグの修正．

From: "OMAE, jun" <jun-o@osb.att.ne.jp>
w3m-991028-2 を使用していて,
* buffer 数がちょうど LASTLINE と同じ値のとき
  selectBuffer() で最後の buffer から更に下へスクロールでき
  てしまい, その後に移動しようとする core dump します.
* buffer が LASTLINE + 1 以上あるときに selectBuffer() を行
  い, LASTLINE + 1 個目(1 origin で)の buffer を選択します.
  直後に selectBuffer() をすると現在の buffer 位置が表示され
  ません. 特に buffer 数がちょうど LASTLINE + 1 と同じ値のと
  き, 下へ移動しようとすると core dump します.
* cygwin-b20.1 のみ. cd / && w3m . をすると usage が表示され
  てしまいます.

1999.11.15
From: aito
HTTP で読んできた文書に <BASE> タグがあり，それが現在の URL と
違っていた場合，Referer: の値が狂うバグの修正．
&#xnnn; でコントロールコードを送ってきた時にちゃんとデコード
できなかったバグの修正．
local-CGIを使う場合に，CGIスクリプトが file:///cgi-bin/ か
file:///usr/local/lib/w3m/ にある場合以外は CGI として扱わ
ないようにした．
system() をできるだけ使わないよう改良．

1999.11.11
From: aito
feed_table() の中のタグ解析部分を分離．gethtmlcmd() のタグ検索を
線形探索からハッシュ表に改良．

1999.11.5
From: aito
table表示の際に，アルファベットに latin-1 を表す character entity
が混ざっていると，表の最小幅の計算が狂うバグの修正．

1999.11.1
From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
 >> w3m-991028 + patch1 ですが、no menu でコンパイルしようとすると
 >> main.c で
 >>   main.c:1645: `FormSelectOptionItem' undeclared (first use this function)
 >>     :
 >> となりますね。
 >> #ifdef MENU_SELECT～#endif で囲めばいいのでしょうか。
 >> ・file.c に S_IFDIR が残ってしまっているので後で patch を送ります。
 >>   ＃ local.h で S_ISDIR などを定義する様に整理する予定
両方の patch です。
＃ Symblic link は readlink() でチェックする様にしました。
＃ Symblic link のない OS で w3m って make できるのだろうか？
 >> ・dirlist.cgi も、ちょっと強化しました。

From: ukai@debian.or.jp  
Strcat_char()のバグ修正．

1999.10.28
From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
 file?var=value/#label
の時に label がラベルとして認識されないものの修正です。
＃ file?var=value#label は問題ありませんでした。

From: aito
デバッグコードが含まれていたものを削除．

1999.10.27
From: おかだ <okada@furuno.co.jp>
以前に、w3m で JP_CHARSET を定義した状態で ISO8859-1 の文字(&cent; 等)
が表示されないと投稿したのですが、原因がわかりましたのでパッチを添付し
ます。

From: やま
あるWEBを使ったアプリケーションが動かないので、調べてみたところ、
cookieにパスがない場合の動作がNavigator等々と少々異なるためとわかりま
した。下にパッチをつけます。

From: "OMAE, jun" <jun-o@osb.att.ne.jp>
CGI のページを reload するときに，元が POST だったものを 
GET で reload しようとするバグの修正．

From: aito
frameの中からリンクを辿ったときに，Referer: の値が現在のframe
ではなく，元の frameset の URL になっていたものを修正．

configure を変更．モデルを設ける．

FTP で，RETR,NLST の成功に対して応答コード 150 を期待していたが，
それ以外でも良いようなので修正．

<select multiple>...</select> の場合，メニューにしないよう修正．

From: Takashi Nishimoto <g96p0935@mse.waseda.ac.jp>
getshell, getpipe, execdict 関数において、
バッファ名に今実行しているコマンド名(調べている単語)も含めるようなパッ
チを書きました。

From: Colin Phipps <cph@crp22.trin.cam.ac.uk>
When a load of cookies expire w3m SEGVs on startup.

From: pmaydell@chiark.greenend.org.uk
I was looking through the w3m source, and noticed that it defines the
following macro:
#define IS_SPACE(x) (isspace(x) && !(x&0x80))
Now this won't work as expected if x is an expression with side effects
(it will be evaluated twice). A quick grep of the sources reveals
several places where the macro is used like this:
file.c: if (IS_SPACE(*++p))
which is almost certainly a bug... (although I haven't tried to actually
work out what the effects of it would be).

1999.10.21
From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
source/HTML 表示時の buffername の修正です。
また、<input type=hidden> の場合には、nitems をインクリメント
しないようにしました。

1999.10.20

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
<dt> と <dd> の間に <p>(..</p>) や <h3>..<h3> などがあると
それ以降全て bold になってしまうバグの修正．

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
自動フレーム表示の時に 'B'(backBf) で元の HTML も消す様にするための
機構を元の HTML のバッファへのポインタを覚えておく様にしてみました。
そして、その機構を使うと、'F'(rFrame), 'v'(vwSrc), '='(pginfo) が
トグル動作可能になることに気づきました。その patch です。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
-dump オプション使用時の以下の動作を修正しました。
・w3m -dump < file だと最後に \377 が入る。
・w3m -dump -s < file などがコード変換されない。
  -num, -S なども効かない。
・w3m -dump -T text/plain < file が何も出力されない。

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
・menu.c: graphic char 関係の修正(Cygwin がらみは terms.c へ)
・terms.c: Cygwin の場合には T_as = T_as = T_ac = ""
           graph_ok() に T_ac != '\0' を追加
・LINES - 1 となってしまっていた箇所を LASTLINE にしました。
  (これで、LINES が terms.c 以外から消えました)
・bookmark.c: KANJI_SYMBOL -> LANG == JA 

From: "OMAE, jun" <jun-o@osb.att.ne.jp>
./configure で
    #define LANG JA
    #undef KANJI_SYMBOLS
になるように答えて make した w3m で popup menu を出そうとする
と core dump します.

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
・frame に日本語が含まれていない場合にコード変換に失敗するバグの修正．
・mouse_init() を安全側に。
・doc/menu.submenu に日本語が入っていました(_o_)

From: SASAKI Takeshi <sasaki@isoternet.org>
1. Location: ヘッダで移動するときに，もとの URI にラベルが
ついていたらそのラベルを新しい URI の末尾に付けるようにした。
2. local CGI の REMOTE_ADDR がなぜか 128.0.0.1 になっていた (^^;)
ので，127.0.0.1 にした。

1999.10.15
From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
  1. cookie で name の比較を case sensitive で行なっている部分が残って
     いたのを修正.
  2. terminal の状態によって, sleep_till_anykey() でキーを押しても直に
     元の状態に戻らないことがある問題の修正.
     また, このときのキー入力は捨てるようにした (連続した disp_message() 
     の動作がおかしいので).
     また, 最大の sleep 時間を指定できるようにした.
  3. HTTPRequest の引数を整理した.
     間違ってたらごめんなさい.

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
configureで lib*.a と lib*.so が両方ある場合に -l* が
2つ付いてしまう問題の修正．

From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
・内部で HTML を生成する場合に URL 等を HTML-quote していなかったのを修正
・frame の各ソースの <base href=... target=...> を読むようにした。
・file://host/… を ftp://host/… に切替えるとき、
  port の指定が無い場合は ftp のデフォルトの port(21) を使う様にした。
・BASE となる URL から補完する場合は、scheme が同じ場合のみにした。

From: Takashi Nishimoto <g96p0935@mse.waseda.ac.jp>
From: hsaka@mth.biglobe.ne.jp (Hironori Sakamoto)
バッファのリンク関係の整理．

From: SASAKI Takeshi <sasaki@isoternet.org>
domain, path ともに同一で name だけが異なる cookie が
複数送られた場合に，以前の cookie が残ってしまうことが
あるようです。

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
(cookie修正関連)
name は case insensitive で比較しなければならないようなので, 
次の修正も追加してください.

From: aito
・~/.w3m/cookie がない場合に C-k を実行するとコアダンプ
  する場合があった．
・-dump でクッキーを送るサイトの内容をダンプしたときに，
  ~/.w3m/cookie が更新されなかった．
・&xxx;で Latin-1 の文字を出しているときに，その文字の場所で
  linebreak されていたバグの修正．

From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
  o "w3m http://foo.co.jp/foo.jpg"実行後、
    "Hit any key to quit w3m:" とメッセージを出し、終了を待
    ち合わせるようにした
  o "w3m http://foo.co.jp/foo.tar.gz"で実行し、download後、
    w3m終了時 usage が出ないようにした(上記と同じ)
  o ftp プロトコルでdownload中、経過を表示するようにした
  o ftp プロトコルでdownload中、中断を可能とした
  o download時の経過表示をshowProgress()で行うように変更
  o FTP_proxy が設定されている時、no_proxyなftpサーバからの
    転送が正常に行われていなかったことを修正
  o 一部パッチの適用が漏れていた部分を復活
  o conv.c:cConvJS()に対して行ったパッチの一部に誤り(実質的
    には問題無いが)があったので、それを修正

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
proxy server で SSL が使えるように改良．

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
<form enctype="multipart/form-data"> <input type=file> 
対応のための patch です。

From: "OMAE, jun" <jun-o@osb.att.ne.jp>
w3m-991008 を cygwin で使用していて
    1. / を参照すると Directory list が表示されない.
    2. ローカルディレクトリを参照すると, ファイルへの link が
       file://///foo のようになる.
    3. file:///windows が load できない.
というのがありましたので, patch を作ってみました.

From: Fumitoshi UKAI <ukai@debian.or.jp>
 % http_proxy=http://foo/bar w3m http:
などとしたときに segmentation fault します。


1999.10.8
From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
ISO-2022-jp 風の文書で，異なるキャラクタセットへの指示が
混在している場合の対処．

From: aito
table 中に <pre>... <p>... </pre><p> というタグ列があると，
<pre>の外側で文の追いこみがされなくなるというバグの修正．
文書内の anchor の数を数えるカウンタを short から int に変更．
<b><u>hoge</u></b> moge のような記述で，`hoge 'の部分に下線が
引かれてしまうバグの修正．

1999.10.7
From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
Cookie, SSL のサポート．

From: aito
configure で，lib*.a だけでなく lib*.so も探すようにした．ダイナミック
ライブラリしか持っていないシステムへの配慮．

From: HIROSE Masaaki <hirose31@t3.rim.or.jp>
From: Anthony Baxter <anthony@ekorp.com>
Host: ヘッダにポート番号を付けていなかった．

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
リリース早々申し訳ないのですが、ラベルに移動した時に URL が変わらなく
なっていましたので、その修正 patch です。
＃ http://www.ntk.net/ 見ていて気づきました。
また、ラベルに移動した時にはまだバグがあって copyBuffer() を使っているために、
sourcefile も同じになり Buffer を消した時に元の Buffer の sourcefile
も消されてしまいます。他にも、pagerSource や frameset もまずいようです。
そこで、カウンタ(int のポインタ)を設けておいて、それが 0 になったら消すように
してみました。

From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>
<ul> 等のネストが 20 を越えると落ちていたものの修正です。
・MAX_ENV_LEVEL(=20) を越えたネストは無視します。
  MAX_ENV_LEVEL を越えた場合の表示は保証できません。
  ＃ <dl><li> とか <ul><dt> とかが平気で出てくる;_;
・MAX_INDENT_LEVEL(=10) を越えたネストはそれ以上インデントしません。
としています。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
Content-Transfer-Encoding: quoted-printable の場合のバグ修正です。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
・最下行で最後の文字が漢字の１バイト目だとメニューがおかしくなって
  いたのにとりあえず対応。(terms.c で対応すべき？)
・ファイル名をマルチカラム表示する時のカラム数の計算を修正
  (岡部さんの table になってからと思っていて忘れてました)

From:aito
<frameset > の中に COLS= と
ROWS= が両方指定してあると，フレームがうまくレンダリング
できなくなるようです．

From: sakane@d4.bsd.nes.nec.co.jp (Yoshinobu Sakane)
Mime-Version: 1.0
Content-Type: text/plain; charset=ISO-2022-JP
X-Mailer: mnews [version 1.21PL5] 1999-04/04(Sun)

坂根です。
w3m-990928 のgziped 廻りの(一部)改善をしました。
    o "w3m /tmp/hoge.Z"を見られるようにした
    o ～.gz などのアンカーで"Return"だけの場合、text/plainで
      あればgunzipして表示、それ以外であれば downloadするよ
      うにした
    o mouseありw3m で"w3m /tmp/hoge.gz"すると、w3m終了後、
      mouse が効かなくなることの修正
    o ～.gzをw3m で表示した時、ゾンビが残ることの修正
      (鵜飼さんのパッチをマージ)
    o download中、download byte数を表示するようにした(512バ
      イト毎)
    o download中、SIGINTを有効にした(DELキーなどでdownloadを
      中断できる)

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
○ B-encode のデコード時のバグ修正です(発見者は坂根さん)。
○ Currentbuf == NULL の場合に、disp_message() を使用した場合、
   ちょっと危険でしたので修正しました。

From: Hironori Sakamoto <h-saka@lsi.nec.co.jp>
 >> リリース早々申し訳ないのですが、ラベルに移動した時に URL が変わらなく
 >> なっていましたので、その修正 patch です。
この修正が間違っていましたので、その修正と
vwSrc 時にも似たような現象になっていましたのでその修正です。
また、フレーム表示で target 属性のあるアンカーを ESC RET で download 
しようとすると異常になっていましたので、その修正です。

1999.9.28

From: SASAKI Takeshi <sasaki@isoternet.org>
wrap search を行なうための
patch を作ってみました。次のことが可能になっています。

1. forward/backward search での wrap search(文章の終端/先頭まで
到達したら先頭/終端から search を続ける)
2. オプションで search のデフォルトの振舞を変更する。
3. コマンドライン上でデフォルトの設定を逆にする(-W というオプションで
割り当ててあります)。
4. キーによる search の振舞の切替え(通常では C-w, lynx 風バインドでは
w にしてあります。)

From: SASAKI Takeshi <sasaki@isoternet.org>
今の w3m は &#xnnnn(n は16進数字)の解釈がおかしいようなので
patch を作ってみました。

Change default character color to 'terminal' (do nothing). [aito]

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
linux コンソールで BG_COLOR を define した w3m を使うと, 終了した後 
w3m の画面がそのまま残ってしまうようです.

From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>
以前に報告した、フレーム内の <pre> の直後の改行がおかしくなる件の
修正をしました。

From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>
 >> 最下行より下でマウスをクリックすると、アンカーの位置と
 >> カーソルの位置がずれるので気がついたのですが、
以下の patch でどうでしょう。

From: Takashi Nishimoto <g96p0935@mse.waseda.ac.jp>
マウスの右ボタンでポップアップメニューが開きますが、
カーソルを移動してから開いた方が自然だと思います。
From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>
 >> 西本さんの patch だと、アンカー上のカーソルの上で右クリックすると
 >> リンク先へ飛んでしまいませんか？
 >> やはり、右ボタンと左ボタンとで処理は分けた方がいいと思います。
修正した patch です。



1999.9.16

Fix a bug that renders &lt;...&gt; in form button as <...> tag.

  先程、config.h で #define DICT した時に有効になる機能で、
SIGSEGV してしまう bug をみつけたので fix する patch を書きました。
次回の update の時に入れて頂けると嬉しいです。
(飯村さん uirou@din.or.jp)

w3m から <BODY BACKGROUND="...">
といった形式の background image を観る事が出来ないようでしたので、
なんとなく patch を作ってみましたので contribute します。
(飯村さん uirou@din.or.jp)

From: Doug Kaufman <dkaufman@rahul.net>
I just downloaded and compiled the 19990902 version of w3m with cygwin
(b20 with 19990115 cygwin1.dll). The following patch takes care of the
compilation problems.


NEXTSTEP 3.3Jにて、w3m(beta-990901)をmakeしたのですが、
local.cにて、定義されずに使われている変数がありましたので
パッチを送らせて頂きます。
(早瀬@大阪大学さん)

From: おき
Subject: リスト環境内の HR
リスト環境中に HR が存在している場合，Netscape ではインデント位置から
開始されます．これと同じことができないかとやってみました．正しいかはわ
かりませんが，動作しているようです．

From: おかだ
Subject: latin1_tbl
HTML中に &#12450; のような表記があると、Segmentation fault で落ちるとき
があるので、以下のようにしてしのいでいますが、これでいいのでしょうか？

CGI の場合のファイル名解析のバグ(_o_)とかもあったので、
local CGI を試してみました。
すると、
・ソースファイルが消去される(discardBuffer)
・ヘッダ部分を読みにいかない(loadGeneralFile, openURL)
・セグメントエラーで落ちる(loadGeneralFile)
・現 URL が :///filename とおかしくなる(parsedURL2Str)
と、かなりバグってましたT_T
修正の方針は、scheme を SCM_LOCALCGI に設定するのを止めて、
(SCM_LOCAL のままにしておいて) is_cgi フラグを使う様にしています。
理由は、scheme として SCM_LOCALCGI があることを考慮していない部分が、
かなりあったためです。(坂本さん)

一行入力で ^V + 漢字 の場合にうまく動作しないものを修正しました。
ついでに無駄な変数を整理しました(gcc -Wall で怒られるので)。
(坂本さん)

以下の問題を修正しました:

  1. 英語版を Linux コンソールで実行したとき, グラフィクス文字が化ける.
  2. いくつかの kterm のカラー表示の不具合.
     EWS4800 等の kterm では, termcap の me でカラーがリセットされない
     ようです.
     それで termcap に op= があれば, op を使ってカラーをリセットするよ
     うにしてみました.
  3. その他もろもろ.
(岡部さん)

どうも二つのバグが原因のようです.
一つはかなり大きなバグで, なんと相対幅指定が無効になっていました.
もう一つはバグというよりは仕様ですが, 浮動小数を整数に丸めるときに, 中
身が同じセルの幅が最悪2文字差が出る事があるという問題です.
(岡部さん)

w3m で download する時や gunzip の扱いに幾つか不具合がありました。
・フレームを含む画面から download しようとすると異常になる
(坂本さん)

次の修正を行ないました:
  1. <td> の相対幅指定が有効になった結果, <table> 幅指定が存在しない場
     合に table の実際の幅が <td> の相対幅指定値に依存するという不具合
     が生じたのでマトリックス計算の重みを変更しました.
  2. 1 行スクロールの速度を改善.
(岡部さん)


1999.9.3
CGI使用時のURL解析のバグ修正．(坂本さん)

 1. 画面の描画の際の文字種の判定方法の誤りの修正.
 2. 画面再描画の必要性の判断方法の誤りの修正.
 3. no_clrtoeol の削除. 
(岡部さん)

w3m 英語版の挙動がおかしいバグの修正．
・T_eA が '\0' の場合でも graphic モードを使う。
  # 幾つかの端末では eA が必要ないので。
・menu.c で graphic モードが使えない場合により安全にした。
(坂本さん)

1999.9.2
英語版でコンパイルする場合の不具合を修正． (坂本さん)

英語版のフォームで Latin-1 文字をコントロール文字と判断している
バグの修正．(岡部さん)

<pre>..</pre>の中の改行が無視されるバグの修正．(岡部さん)

&quot; がシングルクオートになっていたバグの修正．(くろきげんさん)

file://localhost/... が使えなくなっていたバグの修正．(坂本さん)



1999.8.31

オプション画面で多数の物を選択する部分を<select>にしてみた．

From: hsaka@mth.biglobe.ne.jp
w3m-990820 への patch(その１) です。

一行入力(linein.c)での動作を修正/改良しました。
・ファイル名やコマンドの入力の場合は、先頭のスペースを削除してから
  返す様にしました。(変なファイル名が出来てしまうことがあったため)
・補完の動作を整理しました。
  (1) LOAD(V), SAVE_LINK(a, ESC RET)
      常にファイル名を補完 (CPL_ALWAYS)
      補完キーは、TAB と SPACE
      flag = IN_FILENAME
  (2) SAVE(ESC s), SAVE_SREEEN(S)  … "|" で始まるとパイプとみなされる
      SHELL(!), PIPE_SHELL(#), READ_SHELL(@)
      C-x で補完機能をトグル。最初は有効 (CPL_ON)
      補完キーは、TAB のみ
      flag = IN_COMMAND
      ※ シェルのようなコマンドの補完は出来ません
  (3) GOTO(U), SEARCH(/), フォームの入力など通常の入力
      C-x で補完機能をトグル。最初は無効 (CPL_OFF)
      補完キーは、TAB のみ
      flag = 無し
  (4) パスワードの入力
      常に補完しない (CPL_NEVER)
      flag = IN_PASSWORD

From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>

local ファイル名の展開を改良しました。
・doc-jp/README.local で NG となっていたファイル名のほとんどを
  適当なものに展開します。doc-jp/README.local  は削除してください。
・foo/../bar や foo/./bar などは常に短縮します。
  FTP の場合も短縮します。HTTP は短縮しません。
・# で始まる local ファイル名の場合は常にファイル名とみなします。
  (これまで、directory/#1 の形は扱えていませんでした。)
・file://FOO/bar の形の場合は、Cygwin では FOO をドライブ名としてみなし
  それ以外のシステムでは ftp://FOO/bar と FOO をホスト名とみなして
  FTP を試します。

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
表の幅が狂うバグの修正．

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>

岡部です.

Hironori Sakamoto <hsaka@mth.biglobe.ne.jp> writes:

>  >> とこで、pipei(`@'や`#') を調べている時に、
>  >> `@' を３回使うと固まってしまう現象に出くわしたのですが、
>  >> 再現する方いらしゃいますか？
>  >> OS は EWS4800 です。ゾンビが出来てたりします。
> 
> FreeBSD でも再現しました。原因はまだ分かりません。

ちょっと時間ができたので, 調べてみました.
shell を起動する前に, それまでの shell の output を deleteBuffer で消して
いる所があるのですが, その buffer が Currentbuf のときでも消してし
まいます.
その後 pushBuffer によって新しい shell output を Currentbuf の前に
追加しようとして, 前と後がリンクした Buffer list ができてしまいます.
そのため, 3 回目に実行したときに pushBuffer の中で無限ループになってし
まうようです.

それで, buffer == Currentbuf なら Currentbuf を Currentbuf->nextBuffer 
に変更してから buffer を消すようにしてみました.
ついでに共有できそうなコードはまとめてみました.

From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>
坂本です。

背景の色を使えるようにした時(#define BG_COLOR)の雑多な修正と、
ついでに kterm などの端末の foreground, background を使える
様にしてみました。(リクエストを囁かれたので^^;)
あと、細かい修正とかです。

コードについて、
・clrtobotx, clrtoeolx の意味を変えています。
  clrtobot, clrtoeol を term.c 以外で使うことはまずないので
  むしろ、clrtobotx を clrtobot を名付けた方がいいかも。
・term.c の l_prop を int にしてしまったのでちょっと
  メモリを食うかもしれません。

From: Okabe Katsuya <okabe@okaibm.hep.okayama-u.ac.jp>
岡部です.

端末の foreground を黒と仮定している部分があるので, 修正しました.

From: Hironori Sakamoto <hsaka@mth.biglobe.ne.jp>
・990820-hsaka7.patch
  検索(`/', `?')で検索文字列が \0 の場合は前回の検索文字列を使用し、
  NULL(C-c) の場合は検索しないようにした(vim や less 等と同じ動作)。
  また、'/' 等を押した場合のデフォルト値は空とした。
  前回の検索文字列はヒストリを使って C-p(↑) で取り出すことができる
  (lynx, vim 等と同じ)。

・990820-hsaka8.patch
  etc.c の checkType() で \b の扱いを厳密にして less と同様になる
  ように修正。"あ\bあ" でも bold の "あ" となる。

・990820-hsaka9.patch
  一行入力で Shift-JIS の場合に日本語の表示が出来なくなっていた問題の修正。
  原因は checkType() が InnerCode(EUC) を前提にしていたため。
  内部では常に InnerCode を使う様にし、また checkType() は使わない様にした
  (\b を解析する必要がない ＆ 高速化)。

・990820-hsaka10.patch
  term.c の l_prop を short に戻した。
  小細工のため、ややコードが読みにくくなっているかも。
  また、端末の色(kterm の foreground, background など)を使った場合に
  need_redraw() がうまく働かなかったため、判定条件をきつくしている。



1999.8.19
-S オプション(less の -s と同じ)を追加．< 坂根さん
sakane@d4.bsd.nes.nec.co.jp THANKS!

入れ子になった表のセンタリングがうまくできないバグの
修正．

ftp のコネクションの close し忘れの修正．

':' でアンカーを追加した場合に，TABでのアンカー移動の
順番がおかしいバグの修正．< 
岡部さん okabe@fphy.hep.okayama-u.ac.jp THANKS!

1999.8.17
環境変数LESSOPENを見るようにした． < てんこうさん
tnh@aurora.dti.ne.jp THANKS!

form でうまく日本語が送れない場合があるバグの修正．
< 坂本さん hsaka@mth.biglobe.ne.jp THANKS!

<title>...</title>に複数行が入っていたときに，その一部が
contents として表示されてしまうバグの修正．< 
岡部さん okabe@fphy.hep.okayama-u.ac.jp THANKS!

ISO-8859-1 表示時に，罫線をグラフィックキャラクタで出す
ようにした．

IPv6対応で，URLにport が指定してあった場合にうまく動作しなかった
バグの修正．< 鵜飼さん ukai@debian.or.jp THANKS!

<table width="">のような指定の場合に，幅指定を無視するようにした．

1999.8.15
ISO-8859-1 対応．

<PRE>の後に 改行が連続する時に、それがすべて無視されていたバグの
修正。

坂本さん hsaka@mth.biglobe.ne.jp による以下の修正。THANKS!!!
w3m (990814) の修正と改良です。

[表示]
・<ol> タグの type(="1","i","I","a","A"), start 属性に対応。
  <ul> タグの type(="disc","circle","square") 属性に対応(KANJI_SYMBOLS のみ)。
  <li> タグの type, value 属性に対応。
・Overwrite のスペルミス
・SELECT(selBuf) や Selectメニューでの表示で localファイル以外は URL で
  表示する様にした。
・size 属性が width 属性と同じになっていたのを修正。
・最下行や SELECT(selBuf) などでのタイトルの表示で &amp; などを変換して
  表示する様に修正(cleanup_str を使用)

[動作]
・数 pgBack(), 数 pgFore() の動作を less や more と同じに戻した。
  例えば、3 SPC で 3 行進む(3 J と同じ)。
  vi-like にするためには VI_PREC_NUM を #defile してください。
・Save 時に(-dump の場合にも) ~/ や ~user/ を展開する様にした。
・デフォルトの拡張子属性に .png, .PNG, .lzh, .LZH を追加
・label が漢字な URL の場合に内部コードに変換してから label を探索する
  ようにした

[バッファ]
・フレーム表示、ソース表示画面や内部ページの扱いを統一的にするため、
  Buffer 構造体の bufferprop に BP_FRAME(フレーム), BP_SOURCE(ソース表示)
  BP_INTERNAL(内部ページ), BP_NO_URL(基準URLなし) を設定するようにした。
・自動フレーム表示の場合は、LOAD(ldfile) でもフレーム表示をするように修正。
・フレーム表示状態で RELOAD(reload) した場合にはフレーム表示をするように修正。
・ソース表示画面で EDIT(eidtBf) した後、通常の HTML 画面になってしまうのを修正。
・ソース表示画面でも RELOAD(reload) できる様にした。
・オプション表示画面等の内部ページを表示している時に GOTO(goURL) を
  使うとアボートすることがあったのを修正
・オプション表示画面等の内部ページを表示している時に外部ブラウザを
  立ち上げると以上異常なページを表示することがある修正
・フレームのあるページを表示している時、ウィンドウの幅が変わった場合に
  ~/.w3m/w3mframe* の一時ファイルが残ってしまうことのあるバグ修正。
・editBf() で gotoLine() にの位置がおかしく、行位置が保存されないものの修正。
  また、直後に arrangeCursor() に追加。
・editSrc() に arrangeCursor() を追加。

[その他]
・func.h、doc-jp/README.func, doc-jp/README.keymap, doc-jp/menu.*,
  doc-jp/keymap.* が３倍になっていた。
・demo のソースが混入していた。
・マニュアル類に、サスペンド(中断)にあたる C-z を追加。
  文書の読み込みの中断(中止)は C-c (正確には stty で設定する intr に
  あたるキー、キーバインド変更不可) です。
・Strupper() が Strlower() になっていた。
・キーマップファイル、メニュー定義ファイル、mailcap を config.h で
  マクロ定義にした。
  #define KEYMAP_FILE  "~/.w3m/keymap"
  #define MENU_FILE    "~/.w3m/menu"
  #define USER_MAILCAP "~/.mailcap"
  #define SYS_MAILCAP  "/etc/mailcap"

1999.8.14
岡部さん(okabe@fphy.hep.okayama-u.ac.jp)の非公式パッチを全面採用．
変更が多くて書ききれない．THANKS!!!

gzip で圧縮された文書が読めるようにした．IPv6に対応．
< 鵜飼さん ukai@debian.or.jp THANKS!

lynx風キーバインドのhelpを作成．< 佐藤大さん satodai@dog.intcul.tohoku.ac.jp
THANKS!

frame の中に form があったときに，そのformに送信する漢字コードが
常にEUCになっていた不具合の修正．< てんこうさん tnh@aurora.dti.ne.jp
THANKS!

1999.7.29
タイトルが * で始まるHTML文書を 'E' で編集できないバグの修正．
< 下津さん shim@nw.bs1.fc.nec.co.jp THANKS!

表の幅が2pixel以下の場合に，関数 log_like が 0 を返し，列の
幅がなくなってしまうバグの修正．< 坂本さん hsaka@mth.biglobe.ne.jp
THANKS!

   □ <ul>のネストが 10を越える場合の修正が不完全だった。 
   □ メニューの項目の長さが画面幅を越える場合にメニューが崩れるバグの修正 
   □ フォームの入力時に、C-cを押した場合デフォルト値を返すようにした。 
   □ func.h、doc-jp/README.func, doc-jp/README.keymap, doc-jp/menu.*, doc-jp
      /keymap.*が３倍になっていた。 
   □ demoのソースが混入していた。 
   □ マニュアル類に、サスペンド(中断)にあたる C-zを追加。 
      文書の読み込みの中断(中止)は C-c (正確には sttyで設定する intrにあたる
      キー、キーバインド変更不可)です。 
   □ doc/FAQ.htmlで href= ftpと '"'が抜けていたのを修正 
< 坂本さん hsaka@mth.biglobe.ne.jp THANKS!

1999.7.16
http://location/#label の形のURLでは #label をラベルとして，
file:///#file の場合には特別に #file をファイル名とみなすように
URLの解釈を変更した．< 佐々木さん sasaki@isoternet.org THANKS!

'E'でソースを編集したときに無限ループに陥ることがあるバグの修正．
< 坂本さん hsaka@mth.biglobe.ne.jp THANKS!

local CGI で，環境変数 CONTENT_TYPE に渡すタイプが間違っていた．
(application/x-www-form-urlencoded にすべきところを，
x-www-form-urlencoded にしていた)

画面をリサイズすると，バッファの総行数と現在行がずれてしまうバグ
の修正．< 坂本さん hsaka@mth.biglobe.ne.jp THANKS!

'w' で前方移動するときに，最後の行で実行すると無限ループに陥る
バグの修正．

MANUAL_lynx.html を更新．< 大' さん satodai@dog.intcul.tohoku.ac.jp
THANKS!

1999.7.13
linein.cでのJIS入力がうまくいかないバグの修正．(一旦直したつもりが，
SJISでの入力がうまくいかないバグが混入していた．)

form の RESETボタンを押すと，HIDDEN属性の値までクリアされていた
バグの修正．
中身のないファイルの情報を'='コマンドで見ようとするとコアダンプ
するバグの修正．
US_ASCIIだけのファイルの情報を見ると，document_code のところで
中身が切れてしまうバグの修正．
内容がないファイルをreloadできないバグの修正．
< 牧野さん m-yoshi@jaist.ac.jp  THANKS!

1999.7.2
<pre>と<nobr>を入れ子にすると<nobr>が勝手に改行を入れるバグ
の修正．

存在するファイルに上書きするときに確認メッセージを出すよう改良．
localファイルを同じファイルにSaveすると内容が消えるバグの修正．
ディレクトリ表示の改良．
~/.w3m/keymap によりキーバインドを定義できるようにした．
~/.w3m/menu によリメニューを定義できるようにした．
メニューのキーバインドの変更．
バッファオーバーフローの修正．
< 以上，坂本さん hsaka@mth.biglobe.ne.jp THANKS!

table で，rowspan と colspan が重なるセルがあると枠が崩れるバグ
の修正．< 岡部さん okabe@okaibm.hep.okayama-u.ac.jp THANKS!

ファイルでないものを見ているときに reload すると SEGV が
起きることがあるバグの修正．

1999.6.30
<select>..</select>をメニューでレンダリングするように改良．

1999.6.25
'w' を使うときに，その行の最後の文字が2バイト文字だと無限ループ
になるバグの修正．

-no-mouse オプションの指定順序によって挙動が違う問題の解決．
横長の端末の際、画面右端にアンカーがある場合、マウスによ
るカーソル移動ができない場合がある問題の解決．
c や u で URLを表示している間は、mouseを無効にする．
 < 坂根さん sakane@d4.bsd.nes.nec.co.jp THANKS!

<u><b>が入れ子になっている場合に正常に表示ができないバグの
修正．< 岡部さん okabe@okaibm.hep.okayama-u.ac.jp THANKS!

<nobr>..</nobr>が画面の幅を越えているときに，その直前で強制
改行していた挙動を変更．<nobr>の直前に長さを持つ要素があった
場合には改行し，そうでない場合には改行しないようにした．

1999.6.24
<input type=checkbox> で，VALUE 属性が指定されていなかった時に，
デフォルトの値を "on" にした．Netscape 等のブラウザの真似．

1999.6.23
大きさ0のファイルの中でカーソル移動をすると Segmentation fault
するバグの修正．

'\0' を含むファイルもそれなりに表示できるようにした．

lynx風キーバインドで，'G' をgoto-lineに，'g'を goto-URL に変更．

table の中で <H1 align=center> 等を使うと，その見出しを越えて
justification が適用されてしまうバグのfix.

<p align=xxx> の後にtableを置くと，それが常に左寄せになってしまう
バグの修正．原因は，table がレンダリングされると <pre>...</pre>
になっていて，かつ <pre> が段落を閉じていたせいだった．

単語検索機能を追加．(ESC w, ESC W)
w で一単語右，W で一単語左に移動するコマンドを追加．
< 西本さん g96p0935@mse.waseda.ac.jp THANKS!

メッセージ行が 300 字を越えると terms.c の配列 ScreenElem の
中身が壊れるバグの修正．
文字化けしているページで, コード 0x8e の文字が含まれているとき w3m が
落ちることがある問題の修正．
< 岡部さん okabe@okaibm.hep.okayama-u.ac.jp THANKS!

メニュー機能を追加．
最下行でのキー入力にヒストリ機能を追加．
< 坂本さん hsaka@mth.biglobe.ne.jp THANKS!

1999.6.21
minimum_length() の中の isalpha() を IS_ALPHA()に修正．

lynx風キーバインドを変更．j,k をカーソル移動に，J,Kを
1行スクロールに割りあてた．< Doug Kaufman dkaufman@rahul.net THANKS!


1999.6.16
XMakefile のインストールディレクトリに $(DESTDIR)を追加．
< 山縣さん yamagata@ns1.plathome.co.jp THANKS!

-v オプションを付けた．

最下行にリンクを表示するときに，まん中を ... で省略表示
するようにした．
dirBuffer() で /home/../.. などのディレクトリが正しく展開
されていなかったものの修正．
バッファ選択モードで、矢印キーを有効にしてみた。
< 坂本さん hsaka@mth.biglobe.ne.jp THANKS!
 
inputLine で -no-mouse オプションによらず、mouse_end(),
mouse_init() が呼ばれていたものの修正．
< 坂本さん hsaka@mth.biglobe.ne.jp && 坂根さん  sakane@d4.bsd.nes.nec.co.jp
  THANKS!



1999.6.15
FAQ.html を入れかえ．< Tom Berger tom.be@gmx.net THANKS!

1999.6.10
<nobr>の扱いを改良．

1999.6.9

HP-UX11.00 on PA-RISC2.0 対応．
インストール時に，インストール先ディレクトリがないと make
がコケる問題の修正．< Dave Eaton dwe@arde.com THANKS!

<dl compact>の挙動の修正．< 坂本さん hsaka@mth.biglobe.ne.jp
THANKS!

1999.6.8

-no-mouse オプションをつけた．

<nobr>と<pre>が入れ子になっているときに，内側のタグの
中身が表示されないバグの修正．
<table>の中に<nobr>があり，その中に <br>や <p> などがあっ
たときに，表の幅計算が狂うバグの修正．< 岡部さん
okabe@okaibm.hep.okayama-u.ac.jp THANKS!

パスワード付きページで，送ったパスワードがまちがっていて
再入力したときに，それが使われないバグの修正．< 畑口さん
THANKS!

char == unsigned char なマシンでうまく動かない部分の修正．
< すながわさん kei_sun@ba2.so-net.ne.jp THANKS!

NetBSD/macppc 用のパッチを用意．< すながわさん 
kei_sun@ba2.so-net.ne.jp THANKS!

tableの中にコメントがあり，それが閉じていないとき，無限
ループになるバグのfix. < 岡部さん okabe@okaibm.hep.okayama-u.ac.jp
THANKS!

1999.6.5
マウス使用時に，状態行のアイコンをクリックしてページ
上下と前ページ移動ができるようにした．

1999.6.3
ファイル名の最初に#が来た場合の処理にバグがあった．

再読みこみ時に，元の行番号の行に復帰するようにした．

マウス対応部分の改良．mouse_init()とmouse_term()を
terms.c に移動．

開始・終了時に termcap の ti/te を出すようにして
みた．

パスワード付きページで，送ったパスワードがまちがっていた
場合，無限ループになるバグの修正．

news:newsgroups の形式のURLを辿ろうとしたとき，「それは
使えない」旨のメッセージを出すことにした．

1999.6.1
マウスのドラッグに対応．< 武さん ytake@phys2.med.osaka-u.ac.jp
THANKS!

1999.5.26
ファイル名の最初と最後に # が来た場合には，それを
ラベルとして解釈しないようにした．

行番号表示機能を追加．

-no-proxy オプションを追加．

マウス対応．< 武さん ytake@phys2.med.osaka-u.ac.jp
THANKS!

&...; が来た場合の幅の計算にバグがあった．< 岡部さん 
okabe@okaibm.hep.okayama-u.ac.jp THANKS!

1文字横スクロール機能を追加．< 下津さん 
shim@nw.bs1.fc.nec.co.jp THANKS!

<wbr> に対応．

table の中での空白の扱いにバグがあったので修正．

table の中での <nobr>..</nobr>の幅計算にミスがあった
ので修正．

NNTPで記事を取り出すコマンドを article から ARTICLE
に変更．< patakuti さん patakuti@t3.rim.or.jp THANKS!

openURL()の中で，URLFile 型変数 uf の初期化が不完全
だった(uf.encoding を初期化していなかった)ために動作
が不安定になっていた．修正． < まきのさん 

1999.5.19
table の中に，; で終了しない character entity が
出てきたときに無限ループに陥るバグの修正．
< 山本さん mituharu@math.s.chiba-u.ac.jp THANKS!

HTML でないものはソースを表示しないようにした．

&nbsp のように ; のないものも，character entity と
解釈できる場合にはそのように表示することにした．

file.c の中で，一部のコンパイラでエラーになる部分の修正．
起動時オプションに +行番号 を追加．
< 下津さん shim@nw.bs1.fc.nec.co.jp THANKS!

1999.5.14
Cygwin で日本語を使う場合には，常に最下行を空ける
ようにした．

1999.5.13
<nobr>..</nobr>の挙動を勘違いしていたようなので，修正．
このタグの中では，追いこみをしつつ改行をしないように
した．

1999.5.12
J,Kで1行スクロールする際に，カーソル位置を保存するように
した．< 下津さん shim@nw.bs1.fc.nec.co.jp THANKS!

1999.5.11
text/plain の場合にも，読みこみ状況を最下行に表示するよう
にした．C-c での中断にも対処．

1999.5.7
<div>,<center>など，justificationをいじるタグを使う場合
には，現在のjustificationをスタックに退避し，終了タグに
よって環境を復帰するようにした．

gc を 4.14 にバージョンアップ．

Content-Length がサーバから送られてきた場合は，画面最下行
にprogress barを出すようにした．

'=' で文書情報を出すときに，HTTPヘッダの情報も表示する
ようにした．

1999.5.6
</OL>, </UL>が続くときに空行が連続してしまうバグの修正．

<OL>,<UL>の外で<LI>が出てきたときに改行するようにした．
'u'コマンドで絶対パスを表示するようにした．
< てんこうさん tnh@aurora.dti.ne.jp THANKS!

転送途中で C-c で中断したとき，そこまで読んだ内容を表示する
ようにした．

リンク先を直接保存する機能を改良．画像も保存できるようにする．
< 佐野さん yukihiko@yk.rim.or.jp  THANKS!


1999.4.30
config.h の一部を切り出して XXMakefile を作る作業をする
コマンドとして、CPPではなくawkを使うようにした。

バッファにHTTPヘッダの情報を保存するようにした．

'=' の情報画面に Last Modified を追加．

現在のドキュメントが ftp で，ユーザ名かパスワード指定で
アクセスしている場合は，Referer: に現在のURLを付けない
ようにした．

空行の判定を改良．</OL>,</UL>,</DL>,</BLOCKQUOTE>の直後の
<P>を無効にした．

コマンドに回数が指定できるようにした．
< 畑口さん patakuti@t3.rim.or.jp THANKS!

リンク先のドキュメントをファイルに保存する機能を追加．
< てんこうさん tnh@aurora.dti.ne.jp THANKS!

1999.4.28
ftp のディレクトリリストがアルファベット順になるようにした．

ftp://username@hostname/file 形式をサポート．
FTP のディレクトリリストをブックマークに登録できるようにし
FTP の画面でパスワードが表示されないようにした
ftp://username@hostname/file 形式の時は HTTP のパスワード認証と同様に
add_auth_cookie を用いてパスワードを保持するようにした
< 畑口さん patakuti@t3.rim.or.jp THANKS!

ftpにアクセスするとき，getpwuid()でユーザ情報が取り出せないと
エラーになるバグを修正．

<Hn>, <P>で align 属性が有効になるようにした．< 黒木玄さん
kuroki@math.tohoku.ac.jp THANKS!

行頭に空白が入ることがあるバグの修正． < 岡部さん 
okabe@okaibm.hep.okayama-u.ac.jp THANKS!

画面のリサイズをするとコアダンプするバグの修正．

ESC e で，画面の表示イメージを編集できるようにした．

1999.4.26
ftp://user:password@host/file 形式に対応．< てんこうさん 
tnh@aurora.dti.ne.jp THANKS!

"U" コマンドでURLを入力するとき，現在のURLをデフォルトにするよう
にした．

1999.4.23
EUCのX0201カナに対応．< てんこうさん tnh@aurora.dti.ne.jp THANKS!

1999.4.21
term.c で、config.h を include する順序を変更。こうしないと、config.h
の中で使われている FILE* が未定義になる。

ロードするURLに "" を使うとコアダンプするバグの修正。< _tom_さん
_tom_@sf.airnet.ne.jp THANKS!

rc.c の中の英語のメッセージのシンボル名に間違いがあった。
< 砂川さん Keiki_Sunagawa@yokogawa.co.jp THANKS!

ftp のパスワードを指定できるようにした。

1999.4.18

<tag attr=> のようなタグがあると、そこでタグが終了したとみなされない
バグの修正。

最下行のいちばん右のカラムに文字を出力しないようにした。ある種のター
ミナルエミュレータで、画面全体がスクロールしてしまうのを防ぐ。

1999.4.9

長いURLを入力すると，__ctype が破壊されて，表示が発狂するバグの修正．

1999.4.6

パスワードに ' ' が使えなかったバグの修正．< 匿名希望さん :-) THANKS!

1999.4.5

パスワード付きページが見られるように改良．

1999.4.4

ローカルCGIに対応．

1999.4.2

ローカルのディレクトリリストが見られるように改良．

1999.4.1

map 名に漢字を使うとうまく imagemap のリンクが辿れなかったバグの修正．

&...; について，最後の ; を付けなかった場合に幅の計算が狂う問題の
修正．

-halfdump オプションを付ける．将来への布石．(undocumented)

"#label" の形の URL を parseURL2 で解析した場合に結果がおかしくなる
バグの修正．

1999.3.31

ファイル名が漢字なバカURLに対処するため，followA と followI の中で
「URLが2バイトコードを含んでいたら，document_codeに変換してから送信」
にしてみた．漢字使ってもいいからリンクではURL encodeしてくれえ．

configure の中の 'pxvt' を 'rxvt' に訂正．

<base href="..."> があった場合に，それを自分のURLだと思っていた仕様
を訂正．base URL を別に保持して，それがある場合にはそれを相対URLの
補完に使い，ない場合は自分のURLを使うことにした．

1999.3.30

openSocket() の中で，getprotobyname() が失敗したら，tcpのプロトコル
番号を 6 で決め打ちすることにした．

-dump_source オプションをつける．

おまけに makeref スクリプトを添付．

ISO-2022-JPの文書にJIS X0201カナが入っていて，その直後にJIS X0208
が来る場合に文字化けしていたバグを修正．

1999.3.29

sigsetjmp() への対応が不完全だった．修正．

':' コマンドで URL とみなす文字種に ',' を追加．

configure で，システムの GC library のバージョンを調べ，古かったら
それを使うかどうか問いあわせることにした．

sigsetjmp()/siglongjmp() が存在する場合にはそちらを使うことにした．

1999.3.24

色のリセット問題の対応が不完全だったのを修正．

1999.3.23

<pre> の直後が改行だった場合，それを無視するよう修正．

デフォルトの文字の色を端末のforeground color以外にしていた場合に，
bold の効果の終わりで色がリセットされてしまうバグの修正．

HTTPでファイルをダウンロードする場合に，ファイル名変更ができない
バグの修正．

1999.3.22

POSTメソッドの応答の中にredirectが含まれていたときに，その
移動先へのアクセスが POSTになってしまうバグの修正．

入れ子になった table の中で <nobr>を(もっと正確には，</nobr>を)
使うと表が崩れるバグの修正．

オプション設定の表示を大幅変更．セクションを設けた．

自動的に状態行にリンク先のURLを表示するモードを追加．
< 柳田(Seiya Yanagita)さん THANKS!

POST メソッドで文字列をサーバに送るときに，行末が LF のみの場合は
CRLFを送るように変更．< 鈴木健一さん ksuzuki@miyagi-ct.ac.jp THANKS!

gcライブラリを 4.14alpha にバージョンアップ．

1999.3.20

"M" で外部ブラウザを起動するようにした．

1999.3.19

背景を黒にしていて，文字を白にしたとき，終了時に文字が黒く
なってしまうバグの修正．

ローカルファイルを相対パスで開いたときに，バッファに付くURL
が変だったバグの修正．

1999.3.18

<img alt="..."> の中に &...; があった場合，parsetag の中で
デコードされてしまうので，HTMLlineproc2 に食わせる前に
もう一度エンコードしなければならなかった．

-dump オプションで，-F (frame自動描画)が有効になるようにした．

<ADDRESS>..</ADDRESS>の前後で改行するようにした．
SPACE キーでバッファを改頁すると，バッファの横方向の位置が
狂うバグの修正．< 池原さん ikehara@hepn5.c.u-tokyo.ac.jp THANKS!

空のバッファに対してカーソル移動をしようとすると core dump
するバグの修正．< 佐野さん yukihiko@yk.rim.or.jp THANKS!

NO_PROXY に IPアドレス(の一部)を指定できるように改良．
接続先ホストが複数のIPアドレスを持っていた場合，最初のアドレス
への接続が失敗したら，次のアドレスに接続しに行くようにした．
< 水戸さん mit@nines.nec.co.jp THANKS!

1999.3.17

<table>が入れ子になっていて，内側の</table>の後が改行で
なかった場合，</table>に続く1文字が外側のtableのさらに
外に置かれてしまうバグの修正．文章で書くと，どういう症状
なのかよくわからないな．

frame の中に <pre>..</pre>があると，その中が一行おきになって
しまうバグの修正．

loadGeneralFile() の中で，cbreak() モードのまま return して
しまうことがあるバグのfix. < 上村さん uemura@sra.co.jp THANKS!

<caption>が閉じていないとメモリを無限に確保しまくるという
バグを一部fix．

1999.3.16

&hoge; 系統のものがうまくいってなかったので，修正．ある程度は
まともになったが，対応していない &...; を使われると，まだ表が
崩れてしまう．また，; を抜いたものを使っても同じ．対応は難しい．

枠なしの表で，COLSPAN が 2 以上のセルの幅の計算をまちがっていた．
修正．

1999.3.15

標準入出力がどちらもttyでなくて，-dump オプションを使うと
うまく動かないことがあるバグのfix.

Accept-Language に対応．中途半端．

1999.3.12

<table border="２">というフザケたページがあった．atoi("２")が
なぜか負になって，table が発狂した．fix.

1行スクロールで，最下行を消去してからスクロールするようにしてみた．
(かえってわずらわしいかも？)

文書に関する情報を表示する "=" コマンドを追加．

外部ビューアを起動するときに，system("cmd &")を使ってバックグラウンド
に回し，一時ファイルは最後にまとめて削除することにした．

loadGeneralFile, openURL で，is_link と is_cache を別々な引数にして
いたものを，32ビットのフラグに変更．

不要と思われる allocStr() を削除．副作用が予想される．

1999.3.11

configure で，リンクする termcap 互換ライブラリを選べるようにした．
同時に，それらしいライブラリが本当に termcap 関連ルーチンを含むか
どうかテストすることにした．

1999.3.10

Str 型の変数 s について，s->ptr[s->length-1] を同等の Strlastchar(s)
に置きかえた．s->length==0の場合の対処．

<textarea>が折りかえされてしまうバグのfix.

URLを開くときに，file 部分がないと現在のfileを付けてしまうバグのfix．

POST method で form を送信するときに，データの最後にCRLFを付けない
ようにした．

1999.3.9

resize に対応．

setlinescols の中の define で，TIOCGWINSZ を TIOCWINSZ
と間違えていた．< 上村さん uemura@sra.co.jp THANKS!

Reload のときに Pragma: no-cache を指定するようにした．
< 佐々木さん sasaki@isoternet.org THANKS!

Cygwin 用に，一時ファイルに拡張子を付けるようにした．
また，画像などの一時ファイルを作るときに，fopen(file,"wb")
を使うようにした．
< 上田さん ueda@flab.fujitsu.co.jp THANKS!

isalpha(), isalnum() に2バイト文字の一部を食わせたときの挙動
がおかしいために，表の形が崩れることがあるバグの修正．

<style><!-- ... --></style> のように<style>タグの中がコメント
になっている場合に，文書全体がコメントとみなされてしまうことが
あるバグの修正．

configure の修正が不完全だった．

1999.3.8
termcapライブラリについて，ncurses > curses > termcap の順に探す
ようにした．それに伴って，ncurses がリンクされたときに，terms.c
の curses 風の名前が ncurses と衝突するので，名前を変更した．

libftp を使うのをやめて，ftpアクセス関数を自前で用意した．

<OL> の中の <LI> で表示する数字のカウンタを char から int に
変更．数字が3桁を越えても表示幅が狂わないようにした．
< 飯村さん takkun@mma.club.uec.ac.jp THANKS!

colspan または rowspan が大きすぎたときに，abort することがある
バグの修正．< 坂根さん sakane@d4.bsd.nes.nec.co.jp THANKS!

表の最初に <a href=".."><h1>...</h1></a>のような要素があると，
<h1>による空行が </a> で閉じなかったバグの修正．

1999.3.5
起動した時に，バッファが全く読みこまれなかった場合，環境変数
HTTP_HOME からページを読むようにした．ちょっと不満．

ISO-2022-jp で表示している場合に，終了時に US_ASCII を指示する
ようにした．

色を設定できるようにした．

<li> の後の <P> を無効に．結構めんどう．

colspan が2以上の表について，各列の横幅の計算が変だったので修正．
しかしまだ変なところがある．原因不明．

/etc/mailcap も読むようにした．

terms.c の中の tgetstr()がうまく動かないことがあるバグの修正．
2重 fclose の fix. < うかいさん ukai@debian.or.jp THANKS!

<form> だけで属性がない場合に，form がうまく解釈されないバグの修正．

<style>..</style>を無視するようにした．

1行スクロールが滑らかに動くように改良．

1999.3.4
存在しないファイルを指定して異常終了したときに reset_tty が実行され
ないことがあるバグのfix. < 上田さん ueda@iias.flab.fujitsu.co.jp THANKS!

http://123.45.67.8/ の形式でうまく接続できないことがあるバグのfix.
< ryo さん ryo@misaki.oneechan.to THANKS!

表の要素の最初の文字がアルファベットであった時に，その文字の前に空白が
1個入って表が崩れることがあるバグのfix．HTMLlineproc1()で，RB_SPECIAL
フラグが立っている場合に文字を詰めたとき，obuf->prevchar を設定するの
を忘れていたためであった．

イメージ表示で，一時ファイルを消去するタイミングを調整．

<span> で改行するのは間違いだったらしいので，修正．そのかわりに
<form>..</form>で改行するようにした．< 池原さん ikehara@hepn5.c.u-tokyo.ac.jp
THANKS!

w3m -T text/html -dump < file.html > file.txt
でフォーマッタとして動くようにした．

1999.3.3
入れ子になったtableの処理で，内側のtableの幅で外側のtableの
列幅を固定している部分を削除．大体良いようだが，本当にこれで良い
のかどうかよくわからない．

colspan が2以上の <td>で width を指定すると表の形が狂うバグのfix.

ftp でのディレクトリリストのアンカーがうまく付いていなかったバグ
のfix.

Boehm GC library を 4.13 にバージョンアップ．

1999.3.2

Cygwin32対応．< まさひろさん masahiro@znet.or.jp THANKS!

ISO-2022-JPの文書で，行末に US_ASCII か JIS X0201 を指示しないで
終わっている場合でも字化けが起こらないよう工夫．

Editor, Mailer をオプションで変更可能にした．

q で終了するときに確認するかどうかをオプションで変更可能にした．

1999.3.1
文章中にコメントがあると，それ以降のソース上の行が改行されずに
表示されるバグを修正．

I でイメージを表示する場合に，ビューアがbackground で動くようにした．

q で終了するときに，終わっていいかどうか尋ねることにしてみた．
不評なら元に戻す予定．

proxy 経由の ftp 利用で，ファイル名生成にいたバグをある程度修正．

<BASE HREF=".."> に対応．

-dump, -cols オプションを追加．

<U>..</U>, <DEL>..</DEL>, <INS>..</INS>, <STRIKE>..</STRIKE>, <S>..</S>
の処理を追加．

ローカルファイルからのリンクを辿るときに，Referer: を付けないように変更．

1999.2.26
<div align=center/right> の中でcaptionの付いた表を使うと，中央/右寄せ
ができないバグの修正．

<pre>..</pre>の中の空行を無視するバグがあった．修正．

"z" の挙動にバグがあった．修正．

table の中で，<input> の長さの計算を間違っていた．修正．

config.param に設定値を書くときに，LDFLAGS が複数あるとエラーが
出ていたバグのfix. < 水戸さん mit@nines.nec.co.jp THANKS!

表示漢字コードをJISにした場合の動作が良くなかったのを改善．同時に，
設定パネルでJISの種類を詳細に選べるようにした．
< 水戸さん mit@nines.nec.co.jp 上田さん ueda@iias.flab.fujitsu.co.jp 
THANKS!

SIGIOT のハンドラの中で，SIGIOTのハンドラを元に戻してから abort()
するようにした．シグナルハンドラのOS依存性の解消が目的．
< 中川さん takayuki@ebina.hitachi.co.jp THANKS!

直接URLを入力しても，直前のページが Referer: としてサーバに送られて
しまっていたバグをfix．

1999.2.25

Makefile の中で CC=cc となっていた部分を config.h から取得して
動くようにした．

GET で CGI を送るときに，文字列に : が含まれているとうまく行かない
バグのfix. < 馬目さん manome@itlb.te.noda.sut.ac.jp THANKS!

1999.2.24

"S" でバッファを保存するときの漢字コードが内部コード(EUC)になっていた
のを修正．

"J","K" で1行スクロールするコマンドを実験的に追加．
< 古川さん furukawa@ces.kyutech.ac.jp THANKS!

Str.c の Sprintf() で，va_arg(*,char) という指定がマズかったので修正．
< やまてさん yamate@ebina.hitachi.co.jp THANKS!

ESC : で Message-ID をアンカーにする部分のバグfix．

news: のリンクがうまく辿れなかったバグのfix．< 坂根さん
sakane@d4.bsd.nes.nec.co.jp THANKS!

1999.2.23

Lynx 風キーマップファイルを作成．configureで選べるようにした．
< 橋本さん hasimoto@shimada.nuee.nagoya-u.ac.jp THANKS!

1999.2.22

表の中では alt の要素が折りかえされなかったバグ(正確には，alt の文字列長が
表の最小幅とされてしまうバグ)のfix．

2/22 版リリース．

TAB/ESC TAB で，form にも飛ぶようにした．< 古川さん furukawa@ces.kyutech.ac.jp 
THANKS!

ローカルファイルじゃないものを "E" で編集しようとすると，空のファイルを
編集したあげくリロードに失敗するというバグのfix.

"g"/"G" を，先頭行/末尾行へのジャンプに変更．これまでの "g" は
"ESC g" にマップ． < 古川さん furukawa@ces.kyutech.ac.jp THANKS!

URL のパスに . を含む場合に正規化するようにした．< 田中さん 
tanaka@sp.mmlab.toshiba.co.jp THANKS!

環境変数 HTTP_proxy からプロキシのURLを取ってきたときに，それを
parse するのを忘れていた．< 田中さん tanaka@sp.mmlab.toshiba.co.jp THANKS!

カーソルがちょうど中央の行にあるときに "z" を使うとコアダンプするバグをfix.
< 橋本さん hasimoto@shimada.nuee.nagoya-u.ac.jp THANKS!

1999.2.19

~/.w3m/config がないときに，~/.mailcap を読まないバグをfix．
~/.mailcap がないときに，searchExtViewer() の中でコアダンプするバグ
をfix.
nextA() を改良．後から登録したアンカーにも飛ぶ．
prevA() を追加．

1999.2.18

<dl compact> に対応．

入れ子になったtableの中でインデントの付く環境を使っていて，しかも
外側のtableに枠がない場合に表の表示が崩れるバグをfix.

1999.2.17

HTTP_proxy を利用しているとき，ラベルの付いた URL がうまく取りだせない
バグのfix.

オプションを設定したときに，各種proxy の情報がすぐに反映されなかった．

1999.2.16

<script>..</script>の内容を無視するコードで，<script><!-- ... --></script>
となっていると，</script>でスクリプトを閉じた後でもコメントが続いている
とみなされていた．

箇条書き環境で，書かれた文字数と文字カウントがずれていた．

1999.2.12

caption 対応にともなって，<tr><td>をつけないで<table>の中に
物を配置するとコアダンプするバグが混入していた．fix．

長年の懸案であった，画面更新ルーチンのバグ(画面の一部が更新されない)
の，少なくとも一部をfixした．

table.c, etc.c の中の isspace() を IS_SPACE() に変更．
isspace()の変な挙動(Solarisだけか？)のせいで一部の漢字がスペース
だと思われていた．

2/10版リリース．

1999.2.11

オプション設定パネルを新設．"o"コマンド．

一時ファイルを ~/.w3m に作ることにする．また，設定を
~/.w3m/config から読むことにする．

バッファを全部削除して終了するとコアダンプするバグ
の修正．< 佐々木さん sasaki@isoternet.org THANKS!

1999.2.9

タグ属性が ' ' で囲まれていたときにも動くよう改善．
HTMLlineproc1, HTMLlineproc2 の中で独自にタグを解析
していたものを，read_token()を使うよう統一する．
<caption>..</caption>に対応する．

1999.2.8

<SPAN>, </SPAN> で改行するようにする．Ringring の表示が
おかしかったため．
カラー表示用にコンパイルしても，白黒で表示できるスイッチ
をつける(-M)．
起動時オプションの表示をわかりやすく変更．

1999.2.6

タグ内の文字列の扱いを厳密化．= に続く引用符だけを本当の
引用符の開始とみなす．
<script>..</script>の中を無視するようにする．

1999.2.5

2/5版リリース．

<BASE TARGET="hoge">を解釈するようにする．

1999.2.3

Boehm GC を 4.13alpha3 にup．
location: ヘッダでredirectする場合，redirect先の指定を
; で打ち切っていたのを止めた．
腐ったtable対応．
frame対応．だいたい動く．
tableの中で異常な改行が発生するバグのfix．原因は一言では
言えないほど面倒だった．

1999.2.2

frame対応に着手．
<input type=image>の扱いが良くなかったので修正．
loadGeneralFile() の中で，ファイルポインタを2回 fclose()
していたバグの修正．< 松本さん shom@i.h.kyoto-u.ac.jp THANKS!

1999.2.1

<td colspan=2 rowspan=2>の項目が左端以外にあった場合に表の
罫線がうまく書かれないバグの修正．

1999.1.29

縦に長いtableに対応して，table が大きい場合は行方向に
自動的に伸びるように改良．

1999.1.28

file.c, conv.c の中で，固定長バッファを使っている部分を，
Str ライブラリを使うように変更．
動作確認：
	Solaris 2.5.1
	SunOS 4.1.3 w/JLE
	HP-UX 9.x
	OSF/1

1999.1.27

<ISINDEX> に対応する．
<input type=text accept> に対応する．
<select multiple> に対応する．
<input type=radio>で，最初にどれもチェックされていない
場合に，最初の要素をチェックするように改良しようとして
挫折．
<td>で rowspan と colspan の両方が2以上だった場合に
うまくレンダリングしないバグをfix.
[TAB] でカーソル移動するときに，アンカー文字列の中央に
飛ぶように動作を変更．
Boehm GC 4.12 で動くことを確認．

1999.1.26

table で，rowspan が3以上でborder=1の場合に，表の中に
空行ができるバグをfix.

1999.1.22  beta-990122

記録開始．αからβバージョンに格上げ．
これまでの config.h 編集方式をやめて，configure を書く．
添付のBoehm GC library を 4.10 から 4.11 に上げる．
```
