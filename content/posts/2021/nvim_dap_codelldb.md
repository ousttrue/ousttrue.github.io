---
date: 2021-06-27
tags:
- nvim
- dap
title: nvim-dap で coldelldb 動いた
---

[nvim-dap](https://github.com/mfussenegger/nvim-dap) で rust をデバッグするべく悪戦苦闘中。
nvim-dap というのは、来たる nvim-0.5 で動くようになる、 `vscode` のデバッグアダプターを動作させる機能。

rust(Windows) は native debugger をアタッチすればいいので、いくつか選択肢があって

* https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools
* https://marketplace.visualstudio.com/items?itemName=lanza.lldb-vscode
* https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb

最後の、`vscode-lldb(codelldb)` https://github.com/vadimcn/vscode-lldb が使いたい。

## codelldb の起動

nvim-dap から `codelldb.exe` プロセスは起動している様子。通信がうまくいってないように見える。

```
> .\.cache\dein\repos\github.com\puremourning\vimspector\gadgets\windows\CodeLLDB\adapter\codelldb.exe
Listening on port 55201
```

標準入出力を使うモードになっていないのでは？

`adapter/src/lib.rs`
```rust
async fn run_debug_server(
    addr: net::SocketAddr,
    adapter_settings: debug_protocol::AdapterSettings,
    multi_session: bool,
) {
    let listener = TcpListener::bind(&addr).await.unwrap();

    println!("Listening on port {}", listener.local_addr().unwrap().port());
```

遡る。 `main -> debug_server -> entry -> run_debug_server`

```rust
fn main() -> Result<(), Error> {
    env_logger::Builder::from_default_env().init();

    let matches = App::new("codelldb")
        .arg(Arg::with_name("port").long("port").takes_value(true))
        .arg(Arg::with_name("multi-session").long("multi-session"))
        .arg(Arg::with_name("preload").long("preload").multiple(true).takes_value(true))
        .arg(Arg::with_name("liblldb").long("liblldb").takes_value(true))
        .arg(Arg::with_name("params").long("params").takes_value(true))
        .subcommand(SubCommand::with_name("terminal-agent").arg(Arg::with_name("port").long("port").takes_value(true)))
        .get_matches();

    if let Some(matches) = matches.subcommand_matches("terminal-agent") {
        terminal_agent::terminal_agent(&matches)
    } else {
        debug_server(&matches)
    }
}
```

どうやら、 `executable` かつ `stdio ではなく tcp` 通信というタイプで nvim-dap では未対応ということでよさそう。？

* 起動
* `Listening on port XXXXX` メッセージから port を得る
* そのポートに対して TCP 接続という手順が必要

https://code.visualstudio.com/api/extension-guides/debugger-extension#alternative-approach-to-develop-a-debugger-extension

の `DebugAdapterServer` タイプにあたる。

## nvim-dap の改造を試みる

adapter.type `executable`, `server` に加えて、第3の `executable_server` を作れるか。

```lua
local function run_adapter(adapter, configuration, opts)
  local name = configuration.name or '[no name]'
  local options = adapter.options or {}
  opts = vim.tbl_extend('keep', opts, {
    cwd = options.cwd,
    env = options.env
  })
  if adapter.type == 'executable' then
    lazy.progress.report('Running: ' .. name)
    M.launch(adapter, configuration, opts)
  elseif adapter.type == 'server' then
    lazy.progress.report('Running: ' .. name)
    M.attach(adapter.host, adapter.port, configuration, opts)
  elseif adapter.type == 'executable_server' then -- 👈これを追加した
    lazy.progress.report('Running: ' .. name)
    -- local session = M.launch(adapter, configuration, opts)
    local stdin, stdout, stderr = executable_server(adapter, opts)
    -- `Error executing luv callback: vimL function must not be called in a lua loop callback`
    vim.loop.read_start(stdout, vim.schedule_wrap(function(err, data)
      -- codelldb の出力から port を得る
      -- Lisening on port xxxxx
      local port = string.match(data , "Listening on port (%d+)" )
      M.attach(nil, port, configuration, opts)
    end))
  else
    print(string.format('Invalid adapter type %s, expected `executable` or `server`', adapter.type))
  end
end

function executable_server(adapter, opts)
  local uv = vim.loop
  local stdin = uv.new_pipe(false)
  local stdout = uv.new_pipe(false)
  local stderr = uv.new_pipe(false)
  local handle
  local function onexit()
    stdin:close()
    stdout:close()
    stderr:close()
    handle:close()
  end
  local options = adapter.options or {}
  local pid_or_err
  handle, pid_or_err = uv.spawn(adapter.command, {
    args = adapter.args;
    stdio = {stdin, stdout, stderr};
    cwd = options.cwd;
    env = options.env;
    detached = true;
  }, onexit)
  assert(handle, 'Error running ' .. adapter.command .. ': ' .. pid_or_err)

  return stdin, stdout, stderr
end

function M.attach(host, port, config, opts)
  if session then
    session:close()
  end
  if not config.request then
    print('config needs the `request` property which must be one of `attach` or `launch`')
    return
  end
  -- initialize が早すぎるので config を connect 引数に
  session = require('dap.session'):connect(host, port, opts, config)
  return session
end

function Session:connect(host, port, opts, config)
  local session = session_defaults(opts or {})
  setmetatable(session, self)
  self.__index = self

  local client = uv.new_tcp()
  session.client = {
    write = function(line) 
        client:write(line) 
    end;
    close = function()
      client:shutdown()
      client:close()
    end;
  }
  client:connect(host or '127.0.0.1', tonumber(port), function(err)
    if (err) then print(err) end
    client:read_start(rpc.create_read_loop(function(body)
      session:handle_body(body)
    end))

    -- connect が成立してから initialize を送る
    session:initialize(config)

  end)
  return session
end
```

動いた。 PR 作ろう。

