+++
title = "Lua Language Server 解読"
date = 2021-08-06
taxonomies.tags = ["lua", "luajit", "lsp"]
[extra]
+++

[lua-language-server](https://github.com/sumneko/lua-language-server) が luajit ffi のインテリセンスを出せるように emmylua annotation を生成するより、
`ffi.cdef` を読めるようにすればよいのでは。
ということで、lua-language-server を探ってみる。

# 構成

<https://github.com/sumneko/lua-language-server/wiki/Command-line>

`BINRARY/lua-language-server LUA_LANGUAGE_SERVER/main.lua --logpath=D:/log --metapath=D:/meta --locale=en-us --configpath="config.json"`

```
> .\bin\Windows\lua-language-server.exe --help
lua-language-server.exe:unrecognized option '--help'usage: C:\Users\oustt\ghq\github.com\sumneko\lua-language-server\bin\Windows\lua-language-server.exe [options] [script [args]]
Available options are:
  -e stat  execute string 'stat'
  -i       enter interactive mode after executing 'script'
  -l name  require library 'name' into global 'name'
  -v       show version information
  -E       ignore environment variables
  -W       turn warnings on
  --       stop handling options
  -        stop handling options and execute stdin
> .\bin\Windows\lua-language-server.exe -v    
Lua 5.4.4  Copyright (C) 1994-2021 Lua.org, PUC-Rio  
```

native モジュールを埋め込んだインタープリター `lua-language-server.exe` で `main.lua` を実行する。

# LSP

<https://microsoft.github.io/language-server-protocol/>

* [signatureHelp](https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocument_signatureHelp)

# main.lua

* main.lua
    * script/service/service.lua

```lua
function m.start()
    util.enableCloseFunction()
    await.setErrorHandle(log.error)
    pub.recruitBraves(4)

    -- transport
    proto.listen()

    m.report()
    m.pulse()
    m.reportStatus()
    m.testVersion()

    require 'provider'

    m.startTimer()
end
```

# script/parser

lua のコード解析

* script/parser/parse.lua

`ast.init(state)`

* [lpeg](http://www.inf.puc-rio.br/~roberto/lpeg/)

* script/parser/grammar.lua
