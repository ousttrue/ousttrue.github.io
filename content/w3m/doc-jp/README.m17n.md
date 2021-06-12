---
title: "国際化/マルチリンガル化 w3m"
date: 2011-01-04
taxonomies: {tags: ["w3m"]}
---

国際化/マルチリンガル化 w3m 
                                                              2003/03/08
                                                              坂本 浩則

## はじめに

  w3m を国際化/マルチリンガル化しました。w3m-0.4.1 に対する拡張版を
  以下に置いてあります。

    http://www2u.biglobe.ne.jp/~hsaka/w3m/index-ja.html#m17n
                                          patch/w3m-0.4.1-m17n-20030308.tar.gz
                                          patch/README.m17n-ja

  まだ開発版であり、(私が日本語しか解さないため)十分なテストはできて
  いませんが興味ある方はお試しください。

  現在のところ以下の機能があります。

## 扱える文字コード

  * 日本語
      * EUC-JP           - US_ASCII, JIS X 0208, JIS X 0201, JIS X 0212
      * (EUC-JISX0213)     (JIS X 0213)
      * ISO-2022-JP      - US_ASCII, JIS X 0208, JIS X 0201, JIS X 0212, etc.
      * ISO-2022-JP-2    - US_ASCII, JIS X 0208, JIS X 0201, JIS X 0212,
                         GB 2312, KS X 1001, ISO 8859-1, ISO 8859-7, etc.
      * ISO-2022-JP-3    - US_ASCII, JIS X 0208, JIS X 0201, JIS X 0213, etc
      * Shift_JIS(CP932) - US_ASCII, JIS X 0208, JIS X 0201, CP932 の拡張文字
      * Shift_JISX0213   - US_ASCII, JIS X 0208, JIS X 0201, JIS X 0213
  * 中国語(簡体字)
      * EUC-CN(GB2312) - US_ASCII, GB 2312
      * ISO-2022-CN    - US_ASCII, GB 2312, CNS-11643-1,..7, etc.
      * GBK(CP936)     - US_ASCII, GB 2312, GBK
      * GB18030        - US_ASCII, GB 2312, GBK, GB18030, Unicode
      * HZ-GB-2312     - US_ASCII, GB 2312
  * 中国語(台湾、繁体字)
      * EUC-TW        - US_ASCII, CNS 11643-1,..16
      * ISO-2022-CN   - US_ASCII, CNS-11643-1,..7, GB 2312, etc.
      * Big5(CP950)   - Big5
      * HKSCS         - Big5, HKSCS
  * 韓国語
      * EUC-KR        - US_ASCII, KS X 1001 Wansung
      * ISO-2022-KR   - US_ASCII, KS X 1001 Wansung, etc.
      * Johab         - US_ASCII, KS X 1001 Johab
      * UHC(CP949)    - US_ASCII, KS X 1001 Wansung, UHC
  * ベトナム語
      * TCVN-5712 VN-1, VISCII 1.1, VPS, CP1258
  * タイ語
      * TIS-620 (ISO-8859-11), CP874
  * その他
      * US_ASCII, ISO-8859-1 ～ 10, 13 ～ 15,
      * KOI8-R, KOI8-U, NeXT, CP437, CP737, CP775, CP850, CP852, CP855, CP856,
      * CP857, CP860, CP861, CP862, CP863, CP864, CP865, CP866, CP869, CP1006,
      * CP1250, CP1251, CP1252, CP1253, CP1254, CP1255, CP1256, CP1257
  * Unicode (UCS-4)
      * UTF-8, UTF-7

  注意)
    * JIS X 0201 のローマ字部分と GB 1988(中国語ASCII) は US_ASCII として
      扱います。これは、ISO-2022(7bit) で表されていると HTML のタグ部分が
      扱えなくなるからです。その他の US_ASCII の variant はそのままです。
    * JIS C 6226(旧JIS) は JIS X 0208 として扱います。
    * HZ-GB-2312 の '~\n' は対応していません。

## 表示

  多言語表示させるためには現在のところ以下の方法があります。

  (1) kterm + ISO-2022-JP/CN/KR

    * kterm は kterm-6.2.0 に対して、
        http://www.st.rim.or.jp/~hanataka/kterm-6.2.0.ext02.patch.gz
      の patch をあてると、JIS X 0213, CNS 11643 等が使用可能になります。

    * kterm に対して -fl オプションまたは ~/.Xdefaults 等で fontList を
      設定します
    
        -fl "*--16-*-jisx0213.2000-*,\
             *--16-*-jisx0212.1990-0,\
             *--16-*-ksc5601.1987-0,\
             *--16-*-gb2312.1980-0,\
             *--16-*-cns11643.1992-*,\
             *--16-*-iso8859-*"

      JIS 以外のフォントは X11 (XFree86) や Mule の配布物に幾つかありますし、
      Linux や FreeBSD の package からも使えます。
      JIS X 0213 のフォントは、
        http://www.mars.sphere.ne.jp/imamura/jisx0213.html
      にあるものが使えます。

    * w3m-m17n のオプション設定で表示コードを ISO-2022-JP (もしくは
      ISO-2022-JP-2, KR, CN) にし、後述の strict_iso2022
      (厳密な ISO-2022-JP/KR/CN を使う) を OFF にします。

  (2) xterm + UTF-8

    * xterm は XFree86 の最新版を使います。xterm-140 以降を推奨します。
        http://www.clark.net/pub/dickey/xterm/xterm.html

    * Unicode のフォントは
        http://www.cl.cam.ac.uk/~mgk25/ucs-fonts.html
        http://openlab.ring.gr.jp/efont/
      などにあります。

    * xterm を -u8 -wc オプション付きで使用します。
      フォントは、
        -fn "*-medium-*--13-*-iso10646-1" \
        -fb "*-bold-*--13-*-iso10646-1" \
        -fw "*-medium-*-ja-13-*-iso10646-1"
      の様に指定します。

    * w3m-m17n のオプション設定で表示コードを UTF-8 にします。
      後述の pre_conv (文書の読み込み時に文字コードを変換する) を
      ON にしておく方が良いです。そうしておかない場合、
      ISO 2022 系の多バイト文字集合(JIS)の一部を表示する場合、
      レンダリングが崩れる可能性があります。
  
  (3) mlterm + ISO-2022-JP/KR/CN or UTF-8

    * Homepage
        http://mlterm.sourceforge.net/

    * エンコーディングを ISO-2022-JP/KR/CN または UTF-8 にします。

  本当の多言語表示をさせるのは以上の方法だけですが、
  EUC-JP の場合、中国語や ISO-8859-* を疑似的に表示させることもできます。

    * kterm や日本語対応端末のフォントを JIS X 0213 にします。
      # しなくてもいいのですが、かなり表現能力が落ちます。

    * w3m-m17n のオプション設定で表示コードを EUC-JP にします。
      後述の pre_conv, use_gb12345_map, use_jisx0213 を ON にします。
      EUC-JP の SS3 (JIS X 0212) を解する端末の場合は、
      use_jisx0212 も ON にします。

  また、w3m-m17n は表示コードを切替えることも可能です。
  端末がフォントを切替えられるならば文書の言語に従って表示コードと
  フォントを切替えて使用することも可能です。

## コマンドラインオプション

   -I <優先文書コード>
   -O <表示/出力コード>

      基本的に MIME での charset としますが、以下の略号も受け付けます。

        j(p):      ISO-2022-JP
        j(p)2:     ISO-2022-JP-2
        j(p)3:     ISO-2022-JP-3
        cn:        ISO-2022-CN
        kr:        ISO-2022-KR
        e(j):      EUC-JP
        ec,g(b):   EUC-CN(GB2312)
        et:        EUC-TW
        ek:        EUC-KR
        s(jis):    Shift-JIS
        sjisx0213: Shift-JISX0213
        gbk:       GBK
        gb18030:   GB18030
        h(z):      HZ-GB-2312
        b(ig5):    Big5
        hk(scs):   HKSCS
        jo(hab):   Johab
        uhc:       UHC
        l?:        ISO-8859-?
        t(is):     TIS-620(ISO-8859-11)
        tc(vn):    TCVN-5712 VN-1
        v(iscii):  VISCII 1.1
        vp(s):     VPS
        ko(i8r):   KOI8-R
        koi8u:     KOI8-U
        n(ext):    NeXT
        cp???:     CP???
        w12??:     CP12??
        u(tf8):    UTF-8
        u(tf)7:    UTF-7

## オプションパネル

   display_charset
       表示用文字コード
   document_charset
       文書の標準の文字コード
   auto_detect
       文書の読み込み時に文字コードの自動判定を行う(デフォルト ON)
   system_charset
       システムの文字コード。設定ファイルやファイル名に使用する。
   follow_locale
       Locale(環境変数 LANG) に従って、システムの文字コードを設定する。
       (デフォルト ON)
   ext_halfdump
       表示用文字コードで halfdump の出力を行う
   search_conv
       検索文字列を文書の文字コードに変換する(デフォルト ON)
   use_wide
       複数カラムの文字を使う(デフォルト ON)
   use_combining
       結合文字を使う(デフォルト ON)
   use_language_tag
       Unicode の言語タグを使う(デフォルト ON)
   ucs_conv
       Unicode を介したコード変換(デフォルト ON)
   pre_conv
       文書の読み込み時に文字コードを変換する(デフォルト OFF)
   fix_width
       文字幅の変わる変換をしない(デフォルト ON)
       OFF にするとレンダリングが崩れる可能性がある。
   use_gb12345_map
       GB 12345 の Unicode マップを GB 2312 用に使う(デフォルト OFF)
       ON にすると EUC-CN, HZ を EUC-JP や EUC-TW で出力する場合に有用。
   use_jisx0201
       ISO-2022-JP で JIS X 0201 Roman を使う(デフォルト OFF)
   use_jisc6226
       ISO-2022-JP で JIS C 6226:1978 (旧JIS) を使う(デフォルト OFF)
   use_jisx0201k
       JIS X 0201 Katakana を使う(デフォルト OFF)
       OFF にすると通常は JIS X 0208 に変換される。
   use_jisx0212
       JIS X 0212:1990 (補助漢字) を使う(デフォルト OFF)
   use_jisx0213
       JIS X 0213:2000 (2000JIS) を使う(デフォルト OFF)
       ON の場合、EUC-JP は EUC-JISX0213 相当。
       OFF の場合、Shift_JISX0213 は純粋な Shift_JIS になる。
   strict_iso2022
       厳密な ISO-2022-JP/KR/CN を使う(デフォルト ON)
       OFF にすると ISO 2022 系の文字集合は全て表示/出力する。
   east_asian_width
       ある種のUnicode文字を全角にする(デフォルト OFF)
       ON にすると East Asian Ambiguous 文字を全角とみなす。
   gb18030_as_ucs
       GB18030 の 4バイト文字を Unicode として扱う(デフォルト OFF)
   simple_preserve_space
       単純な空白の保存。
       ON にすると日本語などでも文字間の空白が削除されない。

   alt_entity
       エンティティを ASCII の代替表現で表す(デフォルト ON)
       OFF にすると ISO 8859-1 として扱う。
   graphic_char
       テーブルやメニューの枠に DEC 特殊文字文字を使う(デフォルト OFF)
       OFF の場合 CJK の文字コード、UTF-8 では罫線を使う。

## コード変換

  * 各コード間で特別の変換を用意しているものは、
    * EUC-JP <-> ISO-2022-JP <-> Shift-JIS
    * EUC-CN <-> ISO-2022-CN <-> HZ-GB-2312
    * EUC-TW <-> ISO-2022-CN
    * EUC-KR <-> ISO-2022-KR <-> Johab (記号、Hanja のみ)
    のみです。それ以外は Unicode を介した変換となります。

## 文書のコードの切替え

   '=' で文書の情報を表示させると文書のコードを選択できる様になっています。

   また、keymap として
     keymap C CHARSET
     keymap M-c DEFAULT_CHARSET
   の様に設定しておくと、C で現在の文書のコードを、M-c で標準の文書の
   コードを変更できます。

## 一行エディタ

   8bit 文字の場合は、表示コードが 8bit コードの場合はそのコードで、
   表示コードが 7bit コード(ISO-2022) の場合は、対応する EUC で
   扱います。HZ での入力は対応していません。

   ISO-2022(7bit) で入力する場合は、ISO-2022-JP 型 (G0 のみ使う)
   しか使えません。
   理由は、G1 ～ G3 を使うために必要な SI(\017, ^O), SO(\016, ^N)
   SS3(ESC O, ^[O) が他に割り当てられているためです。

## 正規表現

   対応しています。[あ-ん] なども使用可能です。

## URL やファイルの文字コード

   文書内の URL は文書の文字コード、local ファイルの文字コードは SystemCharset
   であつかわれます。ただし、通常 % でエンコードして扱われます。
   アクセス時は HTTP, GOPHER の場合はエンコードしたまま、その他の場合は、
   自力で %?? をデコードして(SystemCharset に戻してから)アクセスします。

   * コマンドライン引数では、デフォルトでは
     scheme: がある場合ば URL (#label や ?query, % でのクォートを解釈) 
     scheme: がない場合は全てファイル名 (#label も解釈しない)
     としています。
     オプション argv_is_url=1 で全て URL 扱いにすることもできます。
   * LOAD('V') では全てファイル名として解釈します。
   * GOTO('U') はコマンドラインと全く同じ扱いにしています。
     current の URL も NULL にしています。

## 既知のバグ(というか問題のある仕様)

 * 日本語 L10N はしてますが、I18N(NLS) 関連は未対応です。
 * 結合文字が文字列の先頭にきた場合、レンダリングが崩れる(かもしれない)。
 * JIS X 0213 は、まだ使用例が少ないため入力時に関しては、JIS X 0208 や
   JIS X 0212 のエスケープシーケンスが使われていても読み込む様にしている。
   また、JIS X 0213 で包摂基準の変わった文字でも JIS X 0208 とみなす。
 * ISO 2022 での C0, C1 集合への指示は無視されます。
   C0 は常に ACSII のコントロール文字、C1 は未定義文字となります。
 * JIS X 0208:1990 の ESC & @ は無視されます。

-----------------------------------
## TODO

 * NLS 対応
   * NLS ライブラリ(gettext, catgets) を使うか、自前で処理するか？
   * 落ち着いてからでも良いと思う。
 * #undef USE_M17N, #define LANG EN, #undef USE_UNICODE のチェック
   * 時々やらないとまずいかな。やっぱり。

-----------------------------------
## 更新記録

2003/03/08	w3m-0.4.1-m17n-20030308
 * w3m-0.4.1 ベース

2003/02/24	w3m-0.4-m17n-20030224
 * w3m-0.4 ベース

2003/02/11	w3m-0.4rc1-m17n-20030211
 * w3m-0.4rc1 ベース

2003/02/07	w3m-0.3.2.2-m17n-20030207
 * w3m-0.3.2.2+cvs-1.742 ベース

2003/02/01	w3m-0.3.2.2-m17n-20030201
 * w3m-0.3.2.2+cvs-1.734 ベース

2003/01/31	w3m-0.3.2.2-m17n-20030131
 * w3m-0.3.2.2+cvs-1.732 ベース

2003/01/23	w3m-0.3.2.2-m17n-20030123
 * w3m-0.3.2.2+cvs-1.705 ベース

2003/01/22	w3m-0.3.2.2-m17n-20030122
 * w3m-0.3.2.2+cvs-1.699 ベース

2003/01/01	w3m-0.3.2.2-m17n-20030101
 * w3m-0.3.2.2+cvs-1.655 ベース

2002/12/22	w3m-0.3.2.2-m17n-20021222
 * w3m-0.3.2.2+cvs-1.640 ベース

2002/12/19	w3m-0.3.2.2-m17n-20021219
 * w3m-0.3.2.2+cvs-1.635 ベース

2002/12/07	w3m-0.3.2.2-m17n-20021207
 * w3m-0.3.2.2+cvs-1.599 ベース
 * int != long な環境での問題を修正

2002/11/27	w3m-0.3.2.1-m17n-20021127
 * w3m-0.3.2.1+cvs-1.562 ベース

2002/11/20	w3m-0.3.2-m17n-20021120
 * w3m-0.3.2+cvs-1.538 ベース

2002/11/18
 * 文字コードの自動判別に UTF-7 を追加。

2002/11/16	w3m-0.3.2-m17n-20021116
 * w3m-0.3.2+cvs-1.526 ベース

2002/11/13	w3m-0.3.2-m17n-20021113
 * w3m-0.3.2+cvs-1.506 ベース

2002/11/12	w3m-0.3.2-m17n-20021112
 * w3m-0.3.2+cvs-1.498 ベース

2002/11/09	w3m-0.3.2-m17n-20021109
 * w3m-0.3.2+cvs-1.490 ベース

2002/11/07	w3m-0.3.2-m17n-20021107
 * w3m-0.3.2 ベース
 * [w3m-dev 03371] は適用

2002/10/22	w3m-0.3.1-m17n-20021022
 * w3m-0.3.1+cvs-1.444 ベース

2002/07/17	w3m-0.3.1-m17n-20020717
 * w3m-0.3.1 ベース

2002/05/29	w3m-0.3-m17n-20020529
 * w3m-0.3+cvs-1.379 ベース

2002/03/16	w3m-0.3-m17n-20020316
 * w3m-0.3+cvs-1.353 ベース

2002/03/11	w3m-0.3-m17n-20020311
 * w3m-0.3+cvs-1.342 ベース
 * バグ修正

2002/02/16	w3m-0.2.5-m17n-20020216
 * w3m-0.2.5+cvs-1.319 ベース
 * use_wide オプションを追加

2002/02/05	w3m-0.2.5-m17n-20020205
 * w3m-0.2.5+cvs-1.302 ベース

2002/02/02	w3m-0.2.5-m17n-20020202
 * w3m-0.2.5+cvs-1.291 ベース

2002/01/31	w3m-0.2.4-m17n-20020131
 * w3m-0.2.4+cvs-1.278 ベース

2002/01/29	w3m-0.2.4-m17n-20020129
 * w3m-0.2.4+cvs-1.268 ベース
 * バグ修正

2002/01/28	w3m-0.2.4-m17n-20020128
 * w3m-0.2.4+cvs-1.265 ベース

2002/01/08	w3m-0.2.4-m17n-20020108
 * w3m-0.2.4 ベース

2002/01/07
 * 一部の wc_conv,wc_Str_conv を wc_conv_strict,wc_Str_conv_strict で
   置き換え。

2001/12/31
 * HKSCS の Unicode 変換表を追加
 * Big5 の Unicode 変換表を修正
 * Big5 と CNS11643 の変換を廃止(Unicode ベースへ)
 * HKSCS の扱いを修正

2001/12/30	w3m-0.2.3.2-m17n-20011230
 * w3m-0.2.3.2+cvs-1.196 ベース

2001/12/22	w3m-0.2.3.2-m17n-20011222
 * w3m-0.2.3.2 ベース
 * [w3m-dev-en 00660] INET6 のときコンパイルできない
 * [w3m-dev-en 00663] WC_N_??? の２重定義の修正

2001/12/21	w3m-0.2.3.1-m17n-20011221
 * w3m-0.2.3.1 ベース

2001/12/19
 * HKSCS を追加。Unicode の変換表は未だ。
 * KOI8-U を追加。

2001/12/18	w3m-0.2.2-m17n+cvs-1.137
 * ISO 8859-16 の Unciode 変換表を追加
 * JIS X 0208(0213) の 0x7425,0x7426 を JIS X 0213 扱いに
 * バグ修正

2001/12/17	w3m-0.2.2-m17n+cvs-1.131

2001/12/15	w3m-0.2.2-m17n+cvs-1.124
 * sourceforge.net の CVS をベース
 * UTF-7 に対応。
 * -o ext_halfdump を追加。
 * =?iso-8859-1?q? の様な小文字での MIME の指定に対応。
 * ISO 2022 の ESC % を読み飛ばす様にした。
 * ks_c_5601-1987 (ksc) を EUC-KR と認識する様にした。
 * locale が zh_TW, zh_HK の時のデフォルトの文字コードを Big5 へ。
 * 結合文字の直前で改行されることがあるバグの修正。
 * resize すると文字化けすることがある問題の修正。
 * UTF-8 判定部のバグ修正。

2001/04/12	w3m-(0.2.1)-m17n-0.19
 * JISX0212, JISX0213 の"チルダ"の Unicode への変換を FULLWIDTH TILDE
   に修正。
 * MICRO SIGN を JISX0208 の"ギリシャ小文字ミュー"へ変換する様にした。
 * [w3m-dev 01892], [w3m-dev 01894], [w3m-dev 01898], [w3m-dev 01902]
   に対応。

2001/03/31
 * <_SYMBOL> の実装の修正。
 * -dump の時でも pre_conv のデフォルトは OFF。

2001/03/29
 * TCVN 5712 の結合文字に対応。
 * [w3m-dev 01873], [w3m-dev-en 00411] に対応。

2001/03/28
 * configure で suffix 無しを指定可能にした。(thanks to naddy!)
 * #define USE_SSL で #undef USE_SSL_VERIFY の場合に rc.c がコンパイル
   できないバグの修正。(thanks to naddy!)
 * [w3m-dev 01859] に対応。
 * Shift-JIS で 0xA0 がエラーとならないバグ修正。
 * <_SYMBOL> の実装の変更。[w3m-dev 01852] に対応。

2001/03/24	w3m-(0.2.1)-m17n-0.18
 * w3m-0.2.1 ベース
 * [w3m-dev 01703], [w3m-dev 01814], [w3m-dev 01823] に対応。
 * ISO-2022-JP-3 を ISO-2022-JP と分離。ISO-2022-JP では絶対に
   JIS X 0212 や JIS X 0213 を送らない様にした。
 * 自動判別の改良。

2001/03/23
 * w3m-0.2.0 ベース

2001/02/21
 * CHARSET, DEFAULT_CHARSET 関数を追加。
 * frame の時の文字コード判定を改良。

2001/03/20
 * FULL WIDTH variant (ASCII 以外)からの変換を行う様にした。

2001/03/18	w3m-(0.1.11-pre-hsaka24)-m17n-0.17
 * [w3m-dev 01779] w3m-0.1.11-pre-hsaka24 への対応。
 * JIS X 0213 を JIS X 0212 より優先するようにした。
 
2001/03/14	w3m-(0.1.11-pre-kokb23)-m17n-0.16
 * JIS X 0213 と Unicode Extention B との変換を追加。
 * JIS X 0213 と Unicode 変換の修正。
 * UHC をハングルと判定するように修正。
 * pre_conv = ON の場合は、search_conv を無視する。

2001/03/09	w3m-(0.1.11-pre-kokb23)-m17n-0.15
 * wc_wchar_t を改良(主に Unicode 用)。
 * Unicode の扱いの幾つかのバグ修正。
 * GBK, GB18030 で出力する場合は use_gb12345_map は無効にした。
 * -dump の時は常に pre_conv = ON。
 * -dump や -halfdump の時は余計な処理はしない様にした。
 * system の文字コードを環境変数 LC_CTYPE -> LANG -> LC_ALL の順で設定
   する様にした。
 * [w3m-dev 01724], [w3m-dev 01726], [w3m-dev 01752], [w3m-dev 01753],
   [w3m-dev 01754] に対応。

2001/03/06	w3m-(0.1.11-pre-kokb23)-m17n-0.14
 * Language tag (UTR#7) に対応してみた。
 * GB18030, Johab と Unicode 変換部のバグ修正。
 * Unicode の full width の結合文字(ひらがなの濁音など)を precompose できて
   いなかったバグの修正。(w3m-m17n-0.10 で直したはずが直っていなかった)

2001/03/04	w3m-(0.1.11-pre-kokb23)-m17n-0.13
 * GBK(CP936), GB18030, UHC(CP949) に対応。
 * GB2312, GB12345 の Unicode のマッピングテーブルを CP936, GB18030 と
   互換にした。(コード: 0xA1A4, 0xA1AA)
 * Unicode の 0xFFFE, 0xFFFF をそのまま通す様にした。(GB18030 との互換性)
 * Unicode の NBSP が 0x80 になっていたバグ修正。

2001/03/03	w3m-(0.1.11-pre-kokb23)-m17n-0.12
 * CP932 に対応。Shift_JIS は CP932 を意味するものとし、Shift_JISX0213 は
   明示しないかぎり判別しない。
 * JIS X 0213 対応にかなりバグがあったので修正。ただし厳密に JIS X 0213 に
   従ってはいない。
 * JIS X 0208 → Unicode のマッピングテーブルを CP932 のものに置き換え。
   "＼", "～", "∥", "－", "￠", "￡", "￢"
   Unicode → JIS X 0208 は両方。0x00A5 (YEN SIGN) も "￥" へ変換。
 * Unicode への変換時のエラー処理のバグの修正。
 * CP1258 での出力時ののバグ修正。
 * 標準入力からのデータを vwSrc で HTML 表示する時の一時ファイルの
 * configure の typo 修正。(下津さん thanks!)
 * HTML 中の属性値の URL の最初と最後の空白文字は削除するようにした。
   (下津さん thanks!)

2001/02/15	w3m-(0.1.11-pre-kokb23)-m17n-0.11
 * Strdelete のバグが非常にまずいので、とりあえず公開。

2001/01/29
 * Refresh で相対パスの場合に動作していなかったのを修正。
   # そもそも goURL() を使うのがまずいんじゃ...

2001/01/23
 * Strdelete の処理を元に戻した。(坂根さん thanks!)

2001/01/19	w3m-(0.1.11-pre-kokb23)-m17n-0.10
 * Unicode の full width の結合文字(ひらがなの濁音など)を precompose できて
   いなかったバグの修正。
 * [w3m-dev 01650], [w3m-dev 01651], [w3m-dev 01560] に対応。

2001/01/17	w3m-(0.1.11-pre-kokb23)-m17n-0.9
 * [w3m-dev 01617], [w3m-dev 01621], [w3m-dev 01624], [w3m-dev 01625],
   [w3m-dev 01635], [w3m-dev 01643], [w3m-dev 01647] に対応。

2001/01/16	w3m-(0.1.11-pre-kokb23)-m17n-0.8 (置き換え)
 * typo 修正(坂根さん thanks!)

2001/01/14	w3m-(0.1.11-pre-kokb23)-m17n-0.8
 * JIS X 0213-2 にバグがあるがとりあえず公開する。

2000/12/29
 * [w3m-dev 01594] に対応。(やまてさん thanks!)
 * [w3m-dev 01602] に対応。

2000/12/27
 * UCS-2/4 の扱いを改良。Unicode 以外の 31個の 16bit文字セット、
   7個の 32bit文字セットが使用可能。
   # 使う事あるのか？ → GB18030 で使うことになりそう
   PCSW(Shift_JIS,Big5,等) の扱いについても改良を考案中。
 * checkType() で s->length > size の場合の処理にバグがあったものを修正。
   # 全然、直って無かった。(やまてさん thanks!)
 * Big5 の Level1 と Level2 を分ける位置が間違っていた。
   # 一年近く昔からのバグ。なぜ気づかなかったのだろう。

2000/12/25	w3m-(0.1.11-pre-kokb23)-m17n-0.7
 * UCS-2/4 の扱いを他の 16/32bit コードが使える様に改良するため、
   とりあえず、w3m-m17n-0.7 としてまとめる。
 * [w3m-dev 01564] に対応。(やまてさん thanks!)

2000/12/24
 * Johab に対応。自前の Unicode 変換テーブルを持ちたくなかったため、
   特殊な変換になってしまい汎用性に欠けるようになってしまった。
 * wtf_gr_ces が KS X 1001 だった場合にハングルが "わかち書き" されない
   バグの修正。
 * UCS の中でハングルと判定するコードポイントを増やした。
 * file 名中に '+' を含む file にアクセスできなくなっていたバグの修正。

2000/12/23
 * checkType() で s->length > size の場合の処理にバグがあったものを修正。
 * UTF-8 の解析で現れるべきではないシーケンス(サロゲート等)のチェックを
   行う様にした。
 * WC_CCS_SET と WC_CCS_TYPE を混同していたバグの修正(良く動いてたなぁ)
 * Big5 の表現をそのままのコード(WC_CCS_BIG5)と CS94 型のコード
   (WC_CCS_BIG5_1, WC_CCS_BIG5_2)の両方を使える様にした。

2000/12/22
 * [w3m-dev 01555], [w3m-dev 01556] に対応。

2000/12/21	w3m-(0.1.11-pre-kokb23)-m17n-0.6
 * ISO 2022 の SS2, SS3 に関する修正が適用されていなかったので再修正。
 * [w3m-dev 01531], [w3m-dev 01534] に対応。
 * textarea を編集した後、読み込むときに auto detect を ON にした。
   DisplayCharset が 7bit コード(特に ISO-2022-JP)の場合に対応。
 * form 中での PC_UNKNOWN の処理を追加。
 * form 中での PC_CTRL の幅が 2 になっていたものを修正。
 * form 中での結合文字(width=0)に対処。
 * DEL の wtf_width_map が 2 になっていたバグの修正。
 * table 中に <hr> があるとレンダリングが崩れるバグの修正。(やまてさん thanks!)
 * pager モードから HTML view する場合は buf->document_charset で
   saveBuffer する様にした。
 * entity の扱いの整理。
 * DocumentCharset が UTF-8 の場合の auto detect で ISO-8859-1 を判別する
   ことを止めた。ISO-2022 のみ判別する。
 * wc_ces と wc_ccs の typo を修正
 * sourcefile を load する場合は常に file_to_url() する様にした。

2000/12/20	w3m-(0.1.11-pre-kokb23)-m17n-0.5
 * entity の扱いの改良。conv_entity を直接呼ぶコードに対応。
 * ANSI color escape sequence 対応。

2000/12/19
 * ページャモードで \b の解析時のバグ修正。(坂根さん thanks!)
 * <ol><li> の後の空白文字が削除されないバグ修正。
 * Str.c 内の strncpy を bcopy へ。
 * 型のチェック(特に unsigned char と char)。(坂根さん thanks!)
 * マクロの引数を () で囲んでいなかったものの修正。
 * libwc/Makefile で ranlib をそのまま使っていたのをマクロに。

2000/12/18
 * -I オプションが指定されている場合、コマンドラインのファイルまたは
   URL の読み込みに関してはヘッダや <META> の Content-Type での
   charset の指定を適用しない様に変更。
 * <META> での charset の指定がクリアされていないバグの修正。

2000/12/17	w3m-(0.1.11-pre-kokb23)-m17n-0.4
 * [w3m-dev 01515], [w3m-dev 01516] に対応。
 * INTSPACE の処理に関するコード整理。
 * テーブルの枠などの symbol に関するバグ修正。
 * 表示する時、ごく稀にゴミがでる問題の修正。

2000/12/16	w3m-(0.1.11-pre-kokb23)-m17n-0.3
 * w3m-0.1.11-pre-kokb23 対応。

2000/12/16	w3m-(0.1.11-pre-kokb22)-m17n-0.2
 * テーブルの枠が検索でおかしなマッチをする問題を修正。
   合わせて <UL> の記号等も同じ処理に改良。
 * #ifdef __EMX__ の場合に CodePage から DisplayCharset 等を設定する様
   にしてみた。(動作は未確認)

2000/12/15
 * ISO 2022 の SS2, SS3 に関する修正。
 * SHOW_PARAMS に関する修正。
 * loadHTMLString で作成したバッファにも文字コードを適宜設定。

2000/12/15	w3m-(0.1.11-pre-kokb22)-m17n-0.1
 * 最初の alpha リリース
 * configure に対応。

-----------------------------------
坂本 浩則 <hsaka@mth.biglobe.ne.jp>
 http://www2u.biglobe.ne.jp/~hsaka/

