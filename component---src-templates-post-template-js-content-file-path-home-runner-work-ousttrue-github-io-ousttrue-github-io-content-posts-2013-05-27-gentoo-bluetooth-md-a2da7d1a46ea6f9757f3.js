"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1062],{5426:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var l=n(1151),a=n(7294);function o(e){const t=Object.assign({p:"p",span:"span"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(t.p,null,"Gentoo で Bluetooth\nGentoo で bluetooth を使う。"),"\n",a.createElement(t.p,null,"http://wiki.gentoo.org/wiki/Bluetooth"),"\n",a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">dmesg\n[22782.149236] Bluetooth: Core ver 2.16\n[22782.149244] NET: Registered protocol family 31\n[22782.149245] Bluetooth: HCI device and connection manager initialized\n[22782.149252] Bluetooth: HCI socket layer initialized\n[22782.149254] Bluetooth: L2CAP socket layer initialized\n[22782.149255] Bluetooth: SCO socket layer initialized\n[22782.151467] Bluetooth: BNEP (Ethernet Emulation) ver 1.3\n[22782.151469] Bluetooth: BNEP filters: protocol multicast\n[22782.151475] Bluetooth: BNEP socket layer initialized\n\nkernel\nHCI USB driver (btusb) を有効にする。\nUSE設定とツール\n/etc/portage/make.conf\nUSEにbluetoothを追加\n\n/etc/portage/package.use\nnet-wireless/bluez test-programs # simple-agentに必要\n\nインストール\n# emerge --ask --changed-use --deep @world\n# /etc/init.d/bluetooth start\n# rc-update add bluetooth default\n\nPairing\n$ hcitools scan\n        XX:XX:XX:XX:XX:XX       M-NV1BR Series\n\n$ simple-agent XX:XX:XX:XX:XX:XX\nTraceback (most recent call last):\n  File "/usr/bin/simple-agent", line 115, in &lt;module>\n    path = manager.FindAdapter(args[0])\n  File "/usr/lib64/python2.7/site-packages/dbus/proxies.py", line 70, in __call__\n    return self._proxy_method(*args, **keywords)\n  File "/usr/lib64/python2.7/site-packages/dbus/proxies.py", line 145, in __call__\n    **keywords)\n  File "/usr/lib64/python2.7/site-packages/dbus/connection.py", line 651, in call_blocking\n    message, timeout)\ndbus.exceptions.DBusException: org.bluez.Error.NoSuchAdapter: No such adapter\n\nここで頓挫。どうも埒が明かぬ。\nと思ったらsimple-agentの引数が足りなかった。\nbluetooth deviceのコネクトボタンを押す\n\n$ simple-agent hci0 XX:XX:XX:XX:XX:XX\n$ bluez-test-device trusted XX:XX:XX:XX:XX:XX yes\n$ bluez-test-input connect XX:XX:XX:XX:XX:XX\n\nとりあえず接続はできた。\n複数接続登録タイプのキーボードとマウスを買ってきたのでそれを有効にしたいのだが、\n今のところ切り替え時に毎回コネクトボタンを押さされている。\n一瞬だけコネクトボタンなしでの切り替えができた時期があったのでなんか方法があるはずなのだが。\nutility\n# emerge -av blueman</code></pre></div>'}}))}var i=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?a.createElement(t,e,a.createElement(o,e)):o(e)},r=(n(8678),n(8838));const s={code:e=>{let{children:t,className:n}=e;return n?a.createElement(r.Z,{className:n},t):a.createElement("code",null,t)}};function c(e){let{data:t,children:n}=e;return a.createElement(a.Fragment,null,a.createElement("h1",null,t.mdx.frontmatter.title),a.createElement(l.Zo,{components:s},n))}function u(e){return a.createElement(c,e,a.createElement(i,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-05-27-gentoo-bluetooth-md-a2da7d1a46ea6f9757f3.js.map