---
date: 2025-11-24
title: vaxis で TUI
tags: [zig]
---

https://github.com/rockorager/libvaxis

よさげなので調査中。

inteface が `vaxis.widgets`, `vaxis.vxfw` の二系統ある。
ローレベルの widgets の方から見てみる。

alt screen で main loop が生きている間表示されるアプリが標準の様子。
それ以外で、色付きの文字を出して終了するような用途はわからなかった。
後で調べる。

## vaxis.widgets

| examples   | note                    |
| ---------- | ----------------------- |
| cli        | vaxis.widgets.TextInput |
| image      | vaxis.Image             |
| main       | vaxis.Cell              |
| table      | vaxis.widgets.Table     |
| text_input | vaxis.widgets.TextInput |
| vaxis      | vaxis.widgets.alignment |
| view       | vaxis.widgets.View      |
| vt         | vaxis.widgets.Terminal  |

### tty

```zig
var buf: [1024]u8 = undefined;
var tty = try vaxis.Tty.init(&buf);
defer tty.deinit();
```

### vx (screen の初期化)

```zig
var gpa: std.heap.GeneralPurposeAllocator(.{}) = .init;
defer _ = gpa.detectLeaks();
const allocator = gpa.allocator();

var vx = try vaxis.init(allocator, .{});
defer vx.deinit(allocator, tty.writer());

const Event = union(enum) {
    key_press: vaxis.Key,
    winsize: vaxis.Winsize,
};
var loop: vaxis.Loop(Event) = .{ .tty = &tty, .vaxis = &vx };
try loop.init();
try loop.start();
defer loop.stop();
try vx.enterAltScreen(tty.writer());
try vx.queryTerminal(tty.writer(), 1 * std.time.ns_per_s);
// block until we get a resize
while (true) {
    const event = loop.nextEvent();
    switch (event) {
        .key_press => |key| if (key.matches('c', .{ .ctrl = true })) return,
        .winsize => |ws| {
            try vx.resize(allocator, tty.writer(), ws);
            break;
        },
    }
}
```

### loop

```zig
var areana = std.heap.ArenaAllocator.init(allocator);
defer areana.deinit();

while (true) {
    const frame_alloc = areana.allocator();
    defer _ = areana.reset(.retain_capacity);

    // event handling
    while (loop.tryEvent()) |event| {
        switch (event) {
            .key_press => |key| if (key.matches('c', .{ .ctrl = true })) return,
            .winsize => |ws| try vx.resize(allocator, tty.writer(), ws),
        }
    }

    // render
    const win = vx.window();
    win.clear();
    _ = win.printSegment(.{
        .text = try std.fmt.allocPrint(
            frame_alloc,
            "hello row{},col{}",
            .{ vx.screen.height, vx.screen.width },
        ),
        .style = .{
            .fg = .{
                .index = 4,
            },
        },
    }, .{});
    try vx.render(tty.writer());
}
```

### widgets

#### Table



## vaxis.vxfw

| examples   | note                  |
| ---------- | --------------------- |
| counter    | vaxis.vxfw.Button     |
| fuzzy      | vaxis.vxfw.ListView   |
| scroll     | vaxis.vxfw.ScrollBars |
| split_view | vaxis.vxfw.SplitView  |

## users

- https://github.com/natecraddock/zf
- https://github.com/JustinBraben/zbonsai
- https://github.com/ippsav/zrepl
- https://github.com/HHSGame/zhhs
- https://github.com/BrookJeynes/sftm
- https://github.com/Wojberni/file-browser
- https://github.com/BrookJeynes/jido
- https://github.com/Eloitor/fancy-cat
- https://github.com/bradcypert/book

