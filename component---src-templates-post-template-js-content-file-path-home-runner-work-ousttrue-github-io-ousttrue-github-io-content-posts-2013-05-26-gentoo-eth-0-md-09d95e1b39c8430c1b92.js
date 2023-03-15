"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8651],{5590:function(e,n,t){t.r(n),t.d(n,{default:function(){return o}});var s=t(1151),a=t(7294);function c(e){const n=Object.assign({p:"p",span:"span"},(0,s.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"Gentoo でネットワークインターフェースが eth0 にならない件"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">最近インストールしたAMDのオンボードEtherと、MacBookAirのUsb\nEtherが共にeth0にならなかった。\nAMD機では、/etc/init.d/net.eth0 startが失敗するのでなんでかと思ったら違う名前になっていた。\n# ifconfig -a\nenp3s0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n\neth0ではないので/etc/init.d/net.eth0ではなく/etc/init.d/net.enp3s0とする必要があった。\n/etc/conf.d/netも書き換え。\nMacBookAirでも違う名前になっていた。\n# ifconfig -a\nenp0s29f7u1u1: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n\nとりあえずシンボリックリンク/etc/init.d/net.enp0s29f7u1u1を作って接続することはできたがちょっと調べてみることにした。\nudevinfo\nなんかudevinfoが見つからぬ。\nhttp://www.gossamer-threads.com/lists/gentoo/user/174113\nによるとudevadmになったらしい。\n# udevadm info -a /sys/class/net/enp3s0\n\nで情報をとれた。\n参考:http://www.ice.is.kit.ac.jp/~umehara/misc/comp/20060408.html\ngentooのudev設定\nhttp://www.gentoo.gr.jp/transdocs/udevrules/udevrules.html#example-iface\n/etc/udev/rules.d/myether\nSUBSYTEM="net", ATTR{address}=="XX:XX:XX:XX:XX:XX", NAME="eth0"\n\n書いてみた。最近のudevではSYSFSはATTRになったぽい。\ntest\n# udevadm test /sys/class/net/enp3s0\n\nうまくいかぬ・・・\n# cd /etc/udev/rules.d\n# mv myether 50-ether.rules\n\n有効なファイル名が決まっていた。\ntest\n# udevadm test /sys/class/net/enp3s0\nunknown key \'SUBSYTEM\' in /etc/udev/rules.d/50-ether.rules:1\ninvalid rule \'/etc/udev/rules.d/50-ether.rules:1\'\n\n書き方がよろしくないらしい\nSUBSYSTEM=="net", ATTR{address}=="XX:XX:XX:XX:XX:XX", NAME="eth0"\n\nタイポを修正\nchanging net interface name from \'enp3s0\' to \'eth0\'\n\nうまくいった。\n反映\n# cd /etc/int.d\n# rc-update delete net.enp3s0\n# mv net.enp3s0 net.eth0\n# rc-update add net.eth0 defalt\n# vim /etc/conf.d/net\n\n# reboot</code></pre></div>'}}))}var r=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?a.createElement(n,e,a.createElement(c,e)):c(e)},l=(t(8678),t(8838));const u={code:e=>{let{children:n,className:t}=e;return t?a.createElement(l.Z,{className:t},n):a.createElement("code",null,n)}};function d(e){let{data:n,children:t}=e;return a.createElement(a.Fragment,null,a.createElement("h1",null,n.mdx.frontmatter.title),a.createElement(s.Zo,{components:u},t))}function o(e){return a.createElement(d,e,a.createElement(r,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2013-05-26-gentoo-eth-0-md-09d95e1b39c8430c1b92.js.map