
export type MetaData = {
  url: string;
  title: string;
  description: string;
  og: string | undefined;
  icon: string | undefined;
};

export const metaDataCache: { [key: string]: MetaData } = {
  "https://trap.jp/post/1549/": {
    "url": "https://trap.jp/post/1549/",
    "title": "350行でつくるVite⚡",
    "description": "この記事はtraP新歓ブログリレー2022 [https://trap.jp/tag/welcome-relay-2022/] 41日目(4/18)の記事です。\n\nこんにちは、19Bの翠(sappi_red)です。\n普段はSysAd班 [https://trap.jp/sysad/]で活動しています。\n\nこの記事ではVite [https://vitejs.dev/]\n-likeなウェブフロントエンドツールをつくっていきながら、Viteの大まかな仕組みを説明していきます。\n\nできる限り細かく手順を書いたので、ぜひ実際に追ってみてください！\n\n実際に完成したものはこのリポジトリ(sapphi-red/micro-vite\n[https://github.com/sapphi-red/micro-vite])にあります。名称は愚直にMicroViteにしました。\n\nある程度Viteに近い実装にはなっていますが、そこそこいろんな箇所が異なります\n\nまた、動作確認はNode.js v16.14.2で行っています。(がおそらくv12以降なら動くと思います)\n\n準備\nとりあえず動作確認用のごく単純",
    "og": "https://trap.jp/content/images/2022/04/vite.png",
    "icon": "https://trap.jp/content/images/size/w256h256/2020/01/traP_logo_icon.png"
  },
  "https://trap.jp/post/1863/": {
    "url": "https://trap.jp/post/1863/",
    "title": "Viteでの開発中のSSR対応の仕組み",
    "description": "この記事は新歓ブログリレー2023 37日目(4/14)の記事です。\n\nこんにちは、19B/22Mの翠(sappi_red)です。SysAd班 [https://trap.jp/sysad/]で活動していました。Vite\n[https://vitejs.dev/]のチームメンバー [https://vitejs.dev/team.html]だったりもします。\n\nこの記事ではViteでの開発中のSSR対応の仕組みがどう実装されているか、どうしてそうなっているかについて紹介します。\n\n前提知識\n特筆すべき点のみを取り上げたざっくりとした説明です。\n\nWebフロントエンド\nWeb上のサービス・アプリケーションのユーザー側に近い開発領域のことを指します。「ボタンを押したときにどうなるか」や「ページ内のどこに何が表示されるか」をプログラムするなど、主にユーザーの端末上で動作するプログラムの部分を指します。\n\nVite\nWebフロントエンド開発において使われているツールの一つです。フロントエンドのプログラムを構成するファイルを各実行環境(ブラウザ、Node.jsなど)が効率よく利用・実行できるよう",
    "og": "https://trap.jp/content/images/2023/04/vite-ssr-how-1.png",
    "icon": "https://trap.jp/content/images/size/w256h256/2020/01/traP_logo_icon.png"
  },
  "https://www.haxibami.net/blog/posts/blog-renewal": {
    "url": "https://www.haxibami.net/blog/posts/blog-renewal",
    "title": "Next.jsでブログをつくった",
    "description": "自作ブログの実装について",
    "og": "https://www.haxibami.net/api/og/article/blog/blog-renewal.png",
    "icon": "https://www.haxibami.net/favicon.ico"
  },
  "https://zenn.dev/dl10yr/articles/b49e70fe595c14": {
    "url": "https://zenn.dev/dl10yr/articles/b49e70fe595c14",
    "title": "Next.jsで作ったブログにリンクカードを実装する",
    "description": "",
    "og": "https://res.cloudinary.com/zenn/image/upload/s--YiPrjoMA--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:Next.js%25E3%2581%25A7%25E4%25BD%259C%25E3%2581%25A3%25E3%2581%259F%25E3%2583%2596%25E3%2583%25AD%25E3%2582%25B0%25E3%2581%25AB%25E3%2583%25AA%25E3%2583%25B3%25E3%2582%25AF%25E3%2582%25AB%25E3%2583%25BC%25E3%2583%2589%25E3%2582%2592%25E5%25AE%259F%25E8%25A3%2585%25E3%2581%2599%25E3%2582%258B%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_37:dl10yr%2Cx_203%2Cy_121/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly96ZW5uLWRldi5naXRodWIuaW8vZGVmYXVsdC1hdmF0YXJzL2RhcmsvZC5wbmc=%2Cr_max%2Cw_90%2Cx_87%2Cy_95/v1627283836/default/og-base-w1200-v2.png",
    "icon": "https://static.zenn.studio/images/icon.png"
  },
  "https://zenn.dev/januswel/articles/745787422d425b01e0c1": {
    "url": "https://zenn.dev/januswel/articles/745787422d425b01e0c1",
    "title": "unified を使って Markdown を拡張する",
    "description": "",
    "og": "https://res.cloudinary.com/zenn/image/upload/s--oWjgZF6r--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:unified%2520%25E3%2582%2592%25E4%25BD%25BF%25E3%2581%25A3%25E3%2581%25A6%2520Markdown%2520%25E3%2582%2592%25E6%258B%25A1%25E5%25BC%25B5%25E3%2581%2599%25E3%2582%258B%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_37:januswel%2Cx_203%2Cy_121/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2hPWVhXdlBhLXJBNGJEd1V3Vnhfb0c2UmJnZUFQYnpNVllKMk1MPXM5Ni1j%2Cr_max%2Cw_90%2Cx_87%2Cy_95/v1627283836/default/og-base-w1200-v2.png",
    "icon": "https://static.zenn.studio/images/icon.png"
  },
  "https://qiita.com/masato_makino/items/ef35e6687a71ded7b35a#remark-link-card": {
    "url": "https://qiita.com/masato_makino/items/ef35e6687a71ded7b35a#remark-link-card",
    "title": "MarkdownをHTMLに変換するunifiedインターフェースについての解説 - Qiita",
    "description": "はじめにこの記事はマークアップ言語変換インターフェイスunifiedについて解説、共有するためのものです。node.js環境でQiitaのマークダウンファイルをHTMLに変換する過程を題材に、un…",
    "og": "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9TWFya2Rvd24lRTMlODIlOTJIVE1MJUUzJTgxJUFCJUU1JUE0JTg5JUU2JThGJTlCJUUzJTgxJTk5JUUzJTgyJThCdW5pZmllZCVFMyU4MiVBNCVFMyU4MyVCMyVFMyU4MiVCRiVFMyU4MyVCQyVFMyU4MyU5NSVFMyU4MiVBNyVFMyU4MyVCQyVFMyU4MiVCOSVFMyU4MSVBQiVFMyU4MSVBNCVFMyU4MSU4NCVFMyU4MSVBNiVFMyU4MSVBRSVFOCVBNyVBMyVFOCVBQSVBQyZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9YzU5NDkxZGRkMjFiNDI3Yzg4ZTcyOWQyOGFkZmNmYjY&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwbWFzYXRvX21ha2lubyZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9ZjE3ZWM2YzBmM2NmMjExYzgwZDQyZDE4MWMwMDlmODU&blend-x=142&blend-y=491&blend-mode=normal&s=24c4de2a02fb044d3df9cfc9cf0e72c9",
    "icon": "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-ec5ba42a24ae923f16825592efdc356f.png"
  },
  "https://github.com/gladevise/remark-link-card": {
    "url": "https://github.com/gladevise/remark-link-card",
    "title": "GitHub - gladevise/remark-link-card",
    "description": "Contribute to gladevise/remark-link-card development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/ff70d42e95ba6b503b04e2d09f572f41390f3196df27b48c0f59d486cf11d215/gladevise/remark-link-card",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/ssssota/svelte-exmarkdown": {
    "url": "https://github.com/ssssota/svelte-exmarkdown",
    "title": "GitHub - ssssota/svelte-exmarkdown: Svelte component to render markdown.",
    "description": "Svelte component to render markdown. Contribute to ssssota/svelte-exmarkdown development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/50d1b6a42ba6fc1bd43d268cfe60f5dfce36e986a61451cb6bd6787c318462fa/ssssota/svelte-exmarkdown",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://histoire.dev/guide/svelte3/getting-started.html": {
    "url": "https://histoire.dev/guide/svelte3/getting-started.html",
    "title": "Histoire",
    "description": "Fast stories powered by Vite",
    "og": "https://histoire.dev/opengraph.png",
    "icon": "https://histoire.dev/favicon.ico"
  },
  "https://histoire.dev/guide/config.html": {
    "url": "https://histoire.dev/guide/config.html",
    "title": "Histoire",
    "description": "Fast stories powered by Vite",
    "og": "https://histoire.dev/opengraph.png",
    "icon": "https://histoire.dev/favicon.ico"
  },
  "https://kit.svelte.jp/docs/advanced-routing#matching": {
    "url": "https://kit.svelte.jp/docs/advanced-routing#matching",
    "title": "SvelteKit docs",
    "description": "高度なルーティング • SvelteKit documentation",
    "og": "https://kit.svelte.jp/images/twitter-thumbnail.jpg",
    "icon": "https://kit.svelte.jp/favicon.png"
  },
  "https://qiita.com/jwnr/items/8932978ca2f50f102e3d#ex-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0404": {
    "url": "https://qiita.com/jwnr/items/8932978ca2f50f102e3d#ex-%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0404",
    "title": "【SvelteKit 入門】ルーティング - Qiita",
    "description": "本記事で扱うファイル+page.svelte +server.jsシリーズまとめ（随時追加・更新）慣れている方は読むだけで大丈夫かと思います。手を動かしながら検証したい方は、空プロジェクトを…",
    "og": "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9JUUzJTgwJTkwU3ZlbHRlS2l0JTIwJUU1JTg1JUE1JUU5JTk2JTgwJUUzJTgwJTkxJUUzJTgzJUFCJUUzJTgzJUJDJUUzJTgzJTg2JUUzJTgyJUEzJUUzJTgzJUIzJUUzJTgyJUIwJnR4dC1jb2xvcj0lMjMyMTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LWNsaXA9ZWxsaXBzaXMmdHh0LWFsaWduPWxlZnQlMkN0b3Amcz00N2I0MTgxZjY2Yjc5NTMzMjY3NGEwZGZiYWFiYzc0Yg&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwanduciZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9N2FlZmY2ZGQwMjAwNTk4ZDgzNmE5YzU4MTQ1M2QwODQ&blend-x=142&blend-y=491&blend-mode=normal&s=d4b0de37543295bd5fba421965dbd996",
    "icon": "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-ec5ba42a24ae923f16825592efdc356f.png"
  },
  "https://ssssota.github.io/svelte-exmarkdown/": {
    "url": "https://ssssota.github.io/svelte-exmarkdown/",
    "title": "svelte-exmarkdown",
    "description": "svelte-exmarkdown. Svelte component to render markdown.",
    "icon": "https://ssssota.github.io/svelte-exmarkdown/favicon.png"
  },
  "https://kit.svelte.dev/docs/adapter-static": {
    "url": "https://kit.svelte.dev/docs/adapter-static",
    "title": "SvelteKit docs",
    "description": "Static site generation • SvelteKit documentation",
    "og": "https://kit.svelte.dev/images/twitter-thumbnail.jpg",
    "icon": "https://kit.svelte.dev/favicon.png"
  },
  "https://github.com/sveltejs/kit/discussions/9723": {
    "url": "https://github.com/sveltejs/kit/discussions/9723",
    "title": "Downloading assets at build time causes errors · sveltejs/kit · Discussion #9723",
    "description": "Describe the bug I want to download posters in .jpg format and transform them to .webp at build time. The new .webp files should be stored under static/posters and shown using <img src=\"poster/foo....",
    "og": "https://opengraph.githubassets.com/a3cb51c1c6ffa2762de4efa42c8b669786dadd0aeaf6e26af5a7a09632cb3555/sveltejs/kit/discussions/9723",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://tailwindcss.com/docs/guides/sveltekit": {
    "url": "https://tailwindcss.com/docs/guides/sveltekit",
    "title": "Install Tailwind CSS with SvelteKit - Tailwind CSS",
    "description": "Setting up Tailwind CSS in a SvelteKit project.",
    "og": "https://tailwindcss.com/api/og?path=/docs/guides/sveltekit",
    "icon": "https://tailwindcss.com/favicons/apple-touch-icon.png?v=3"
  },
  "https://minista.qranoko.jp/docs/partial-hydration": {
    "url": "https://minista.qranoko.jp/docs/partial-hydration",
    "title": "Partial Hydration - minista",
    "description": "minista（ミニスタ）はReactのJSXから綺麗なHTMLを作る日本製のスタティックサイトジェネレーターです。",
    "og": "https://minista.qranoko.jp/assets/images/ogp.png",
    "icon": "https://minista.qranoko.jp/assets/images/apple-touch-icon.png"
  },
  "https://ousttrue.github.io/storybook/?path=/story/hello-react-three-fiber--default-hello": {
    "url": "https://ousttrue.github.io/storybook/?path=/story/hello-react-three-fiber--default-hello",
    "title": "(No title)",
    "description": "",
    "icon": "https://ousttrue.github.io/favicon.png"
  },
  "https://minista.qranoko.jp/docs/fetch": {
    "url": "https://minista.qranoko.jp/docs/fetch",
    "title": "Fetch - minista",
    "description": "minista（ミニスタ）はReactのJSXから綺麗なHTMLを作る日本製のスタティックサイトジェネレーターです。",
    "og": "https://minista.qranoko.jp/assets/images/ogp.png",
    "icon": "https://minista.qranoko.jp/assets/images/apple-touch-icon.png"
  },
  "https://react.daisyui.com/": {
    "url": "https://react.daisyui.com/",
    "title": "@storybook/cli - Storybook",
    "description": "",
    "icon": "https://react.daisyui.com/favicon.svg"
  },
  "https://docusaurus.io/docs": {
    "url": "https://docusaurus.io/docs",
    "title": "Introduction | Docusaurus",
    "description": "Docusaurus was designed from the ground up to be easily installed and used to get your website up and running quickly.",
    "og": "https://docusaurus.io/img/docusaurus-social-card.jpg",
    "icon": "https://docusaurus.io/img/docusaurus.png"
  },
  "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog": {
    "url": "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog",
    "title": "📦 plugin-content-blog | Docusaurus",
    "description": "Provides the Blog feature and is the default blog plugin for Docusaurus.",
    "og": "https://docusaurus.io/img/docusaurus-social-card.jpg",
    "icon": "https://docusaurus.io/img/docusaurus.png"
  },
  "https://github.com/ginger-code/WGPU.Native/tree/main/examples/FSharp": {
    "url": "https://github.com/ginger-code/WGPU.Native/tree/main/examples/FSharp",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://immersive-web.github.io/webxr-samples/": {
    "url": "https://immersive-web.github.io/webxr-samples/",
    "title": "WebXR Samples",
    "description": "Sample WebXR pages for testing and reference",
    "icon": "https://immersive-web.github.io/webxr-samples/favicon-32x32.png"
  },
  "https://hyper.is/": {
    "url": "https://hyper.is/",
    "title": "Hyper™",
    "description": "A terminal built on web technologies",
    "og": "https://assets.vercel.com/image/upload/v1590627842/hyper/og-image-3.png",
    "icon": "https://hyper.is/apple-touch-icon-57x57.png"
  },
  "https://ousttrue.github.io/aframe-hands/": {
    "url": "https://ousttrue.github.io/aframe-hands/",
    "title": "aframe-hand",
    "description": ""
  },
  "https://github.com/RangerMauve/aframe-xterm-component": {
    "url": "https://github.com/RangerMauve/aframe-xterm-component",
    "title": "GitHub - RangerMauve/aframe-xterm-component: Playing around with getting xterm.js working in Aframe VR",
    "description": "Playing around with getting xterm.js working in Aframe VR - GitHub - RangerMauve/aframe-xterm-component: Playing around with getting xterm.js working in Aframe VR",
    "og": "https://opengraph.githubassets.com/19305caa85017f6c5a07b1252c1fcdcfb2056f70398adbb5d73283af121d9f38/RangerMauve/aframe-xterm-component",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://xrterm.com/": {
    "url": "https://xrterm.com/",
    "title": "xrterm - Terminal for XR",
    "description": "",
    "og": "https://xrterm.com/img/bg_scene.jpg",
    "icon": "https://xrterm.com/favicon.ico"
  },
  "https://garden.narze.live/100daysofcode-r3-90-ratchagitja-md-setup-astro/": {
    "url": "https://garden.narze.live/100daysofcode-r3-90-ratchagitja-md-setup-astro/",
    "title": "90 - Ratchagitja.md - Setup Astro",
    "description": "My notes & stuff",
    "og": "https://pptr.io/api/screenshot?width=1200&height=630&deviceScaleFactor=1&y=64&dark=1&url=https://garden.narze.live/100daysofcode-r3-90-ratchagitja-md-setup-astro/",
    "icon": "https://garden.narze.live/favicon.png"
  },
  "https://docs.astro.build/ja/core-concepts/routing/#%E9%9D%99%E7%9A%84ssg%E3%83%A2%E3%83%BC%E3%83%89": {
    "url": "https://docs.astro.build/ja/core-concepts/routing/#%E9%9D%99%E7%9A%84ssg%E3%83%A2%E3%83%BC%E3%83%89",
    "title": "ルーティング",
    "description": "Astroのルーティングの紹介",
    "og": "https://docs.astro.build/open-graph/ja/core-concepts/routing.png",
    "icon": "https://docs.astro.build/favicon.ico"
  },
  "https://docs.astro.build/ja/tutorial/0-introduction/": {
    "url": "https://docs.astro.build/ja/tutorial/0-introduction/",
    "title": "初めてのAstroブログ",
    "description": "プロジェクトベースのチュートリアルでAstroの基本を学びましょう。始めるために必要なすべての前提知識をお届けします！",
    "og": "https://docs.astro.build/open-graph/ja/tutorial/0-introduction.png",
    "icon": "https://docs.astro.build/favicon.ico"
  },
  "https://docs.astro.build/ja/guides/content-collections/": {
    "url": "https://docs.astro.build/ja/guides/content-collections/",
    "title": "コンテンツコレクション",
    "description": "コンテンツコレクションは、Markdownを整理し、フロントマターをスキーマで型チェックするのに役立ちます。",
    "og": "https://docs.astro.build/open-graph/ja/guides/content-collections.png",
    "icon": "https://docs.astro.build/favicon.ico"
  },
  "https://zenn.dev/yodaka/articles/596f441acf1cf3#commonjs%E3%81%AE%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%81%8B%E3%82%89esm%E3%82%92%E5%91%BC%E3%81%B6": {
    "url": "https://zenn.dev/yodaka/articles/596f441acf1cf3#commonjs%E3%81%AE%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%81%8B%E3%82%89esm%E3%82%92%E5%91%BC%E3%81%B6",
    "title": "CommonJSとES Modulesについてまとめる",
    "description": "",
    "og": "https://res.cloudinary.com/zenn/image/upload/s--07LTcrcQ--/c_fit%2Cg_north_west%2Cl_text:notosansjp-medium.otf_55:CommonJS%25E3%2581%25A8ES%2520Modules%25E3%2581%25AB%25E3%2581%25A4%25E3%2581%2584%25E3%2581%25A6%25E3%2581%25BE%25E3%2581%25A8%25E3%2582%2581%25E3%2582%258B%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Cl_text:notosansjp-medium.otf_37:%25E3%2582%2588%25E3%2581%25A0%25E3%2581%258B%2Cx_203%2Cy_121/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3plbm4tdXNlci11cGxvYWQvYXZhdGFyLzQwOGFhNzk1MzEuanBlZw==%2Cr_max%2Cw_90%2Cx_87%2Cy_95/v1627283836/default/og-base-w1200-v2.png",
    "icon": "https://static.zenn.studio/images/icon.png"
  },
  "https://www.gatsbyjs.com/docs/how-to/custom-configuration/es-modules/": {
    "url": "https://www.gatsbyjs.com/docs/how-to/custom-configuration/es-modules/",
    "title": "ES Modules (ESM) and Gatsby | Gatsby",
    "description": "Introduction The ECMAScript module (ESM) format is the  official TC39 standard  for packaging JavaScript. For many years,  CommonJS (CJS…",
    "og": "https://www.gatsbyjs.com/og-image_docs_how-to.png",
    "icon": "https://www.gatsbyjs.com/icons/icon-48x48.png?v=3ad5294f3fa6c06e2d07ab07c76df2cf"
  },
  "https://luals.github.io/wiki/annotations/": {
    "url": "https://luals.github.io/wiki/annotations/",
    "title": "Lua Language Server | Wiki",
    "description": "Lua Language Server uses the Language Server Protocol to offer a better Lua development experience for your favourite editors.",
    "icon": "https://luals.github.io/favicon.svg"
  },
  "https://github.com/luarocks/luarocks/wiki/Project:-LuaRocks-per-project-workflow": {
    "url": "https://github.com/luarocks/luarocks/wiki/Project:-LuaRocks-per-project-workflow",
    "title": "Project: LuaRocks per project workflow",
    "description": "LuaRocks is the package manager for the Lua programming language. - luarocks/luarocks",
    "og": "https://opengraph.githubassets.com/bca0dc0ee17afa3272ce4dacacb3457177a8555cb0b4cb6523f8a6d64cb35cf5/luarocks/luarocks",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/uim/uim/blob/master/fep/README.ja": {
    "url": "https://github.com/uim/uim/blob/master/fep/README.ja",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/uobikiemukot/yaskk": {
    "url": "https://github.com/uobikiemukot/yaskk",
    "title": "GitHub - uobikiemukot/yaskk: yet another skk for terminal",
    "description": "yet another skk for terminal. Contribute to uobikiemukot/yaskk development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/ac0ca17e4c080b00424c0cfb64ac13fb7dd5beca771addf95c649f28da6994cb/uobikiemukot/yaskk",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/microsoft/terminal/tree/main/samples/ConPTY/EchoCon": {
    "url": "https://github.com/microsoft/terminal/tree/main/samples/ConPTY/EchoCon",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/CedricGuillemet/ImGuizmo": {
    "url": "https://github.com/CedricGuillemet/ImGuizmo",
    "title": "GitHub - CedricGuillemet/ImGuizmo: Immediate mode 3D gizmo for scene editing and other controls based on Dear Imgui",
    "description": "Immediate mode 3D gizmo for scene editing and other controls based on Dear Imgui - GitHub - CedricGuillemet/ImGuizmo: Immediate mode 3D gizmo for scene editing and other controls based on Dear Imgui",
    "og": "https://opengraph.githubassets.com/8e2badae09ccd2efc23ad44a2efeeb0acd0a9759d419af2a7eed26f355e3c488/CedricGuillemet/ImGuizmo",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://phelipetls.github.io/posts/async-make-in-nvim-with-lua/": {
    "url": "https://phelipetls.github.io/posts/async-make-in-nvim-with-lua/",
    "title": "Asynchronous :make in Neovim with Lua",
    "description": "The :make command in Vim is quite useful, it runs whatever program is under\nthe makeprg option and returns its output in the quickfix list, where you’ll\nbe able to hop through the errors if they were parsed correctly by the\nerrorformat option.",
    "og": "https://phelipetls.github.io/posts/async-make-in-nvim-with-lua/image.png"
  },
  "https://badsector.pullup.net/?p=70": {
    "url": "https://badsector.pullup.net/?p=70",
    "title": "WTF-8?",
    "description": "CESU-8とは違う内部用UTF-8亜種エンコード。",
    "og": "https://s0.wp.com/i/blank.jpg",
    "icon": "https://badsector.pullup.net/favicon.ico"
  },
  "https://simonsapin.github.io/wtf-8/": {
    "url": "https://simonsapin.github.io/wtf-8/",
    "title": "The WTF-8 encoding",
    "description": "",
    "icon": "https://simonsapin.github.io/wtf-8/logo-wtf-8.svg"
  },
  "https://github.com/getnikola/nikola/blob/398d5722d78a27ac5233849e3057f9d787345561/nikola/__main__.py#L301": {
    "url": "https://github.com/getnikola/nikola/blob/398d5722d78a27ac5233849e3057f9d787345561/nikola/__main__.py#L301",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://pydoit.org/extending.html?highlight=taskloader#doit.cmd_base.TaskLoader2": {
    "url": "https://pydoit.org/extending.html?highlight=taskloader#doit.cmd_base.TaskLoader2",
    "title": "Using doit as a framework for CLI power-tools - pydoit guide",
    "description": "How to modify to core doit components, extend and create CLI programs",
    "icon": "https://pydoit.org/_static/favico.ico"
  },
  "https://github.com/getnikola/nikola/blob/398d5722d78a27ac5233849e3057f9d787345561/nikola/__main__.py#L257": {
    "url": "https://github.com/getnikola/nikola/blob/398d5722d78a27ac5233849e3057f9d787345561/nikola/__main__.py#L257",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/wez/wezterm/issues/1236": {
    "url": "https://github.com/wez/wezterm/issues/1236",
    "title": "sixel doesn't work on Windows 10 · Issue #1236 · wez/wezterm",
    "description": "What Operating System(s) are you seeing this problem on? Windows WezTerm version wezterm 20210814-124438-54e29167 Did you try the latest nightly build to see if the issue is better (or worse!) than...",
    "og": "https://opengraph.githubassets.com/5c9c90cb9a81688250f4c30035c3ee542d5e19b1a3dfe30162b17e146d23a2d1/wez/wezterm/issues/1236",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/zigtools/zls": {
    "url": "https://github.com/zigtools/zls",
    "title": "GitHub - zigtools/zls: The @ziglang language server for all your Zig editor tooling needs, from autocomplete to goto-def!",
    "description": "The @ziglang language server for all your Zig editor tooling needs, from autocomplete to goto-def! - GitHub - zigtools/zls: The @ziglang language server for all your Zig editor tooling needs, from ...",
    "og": "https://opengraph.githubassets.com/50356aeac609ecd94b8adda07ebc5672a4e36fe4f9c14afea579056c7888dc7e/zigtools/zls",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://pypi.org/project/pydear/": {
    "url": "https://pypi.org/project/pydear/",
    "title": "pydear",
    "description": "Dear imgui binding",
    "og": "https://pypi.org/static/images/twitter.abaf4b19.webp",
    "icon": "https://pypi.org/static/images/favicon.35549fe8.ico"
  },
  "https://masonry.desandro.com/": {
    "url": "https://masonry.desandro.com/",
    "title": "Masonry",
    "description": "Cascading grid layout library",
    "icon": "https://masonry.desandro.com/favicon.ico"
  },
  "https://www.getzola.org/documentation/templates/pagination/": {
    "url": "https://www.getzola.org/documentation/templates/pagination/",
    "title": "Pagination | Zola ",
    "description": "Everything you need to make a static site engine in one binary.",
    "icon": "https://www.getzola.org/favicon.ico"
  },
  "https://www.getzola.org/documentation/content/linking/#internal-links": {
    "url": "https://www.getzola.org/documentation/content/linking/#internal-links",
    "title": "Internal links & deep linking | Zola ",
    "description": "Everything you need to make a static site engine in one binary.",
    "icon": "https://www.getzola.org/favicon.ico"
  },
  "https://www.getzola.org/documentation/content/search/": {
    "url": "https://www.getzola.org/documentation/content/search/",
    "title": "Search | Zola ",
    "description": "Everything you need to make a static site engine in one binary.",
    "icon": "https://www.getzola.org/favicon.ico"
  },
  "https://forum.dlang.org/thread/dkamxcamwttszxwwxttv@forum.dlang.org": {
    "url": "https://forum.dlang.org/thread/dkamxcamwttszxwwxttv@forum.dlang.org",
    "title": "C++ binding issues with C++ function returning a simple POD struct.",
    "description": "D Programming Language Forum",
    "og": "https://www.gravatar.com/avatar/9914e570fc3ec4b91bd8486a25537f36?d=identicon&s=256",
    "icon": "https://forum.dlang.org/static/635698880721262223/favicon.ico"
  },
  "https://neovim.io/doc/user/starting.html#$XDG_CONFIG_HOME": {
    "url": "https://neovim.io/doc/user/starting.html#$XDG_CONFIG_HOME",
    "title": " Starting - Neovim docs",
    "description": "Neovim user documentation",
    "icon": "https://neovim.io/favicon.ico"
  },
  "https://code.visualstudio.com/api/extension-guides/debugger-extension#alternative-approach-to-develop-a-debugger-extension": {
    "url": "https://code.visualstudio.com/api/extension-guides/debugger-extension#alternative-approach-to-develop-a-debugger-extension",
    "title": "Debugger Extension",
    "description": "Learn how to provide debugger extensions (plug-ins) for Visual Studio Code through a Debug Adapter.",
    "og": "https://code.visualstudio.com/opengraphimg/opengraph-docs.png",
    "icon": "https://code.visualstudio.com/apple-touch-icon.png"
  },
  "https://github.com/marketplace/actions/mdbook-action": {
    "url": "https://github.com/marketplace/actions/mdbook-action",
    "title": "mdBook Action - GitHub Marketplace",
    "description": "GitHub Actions for mdBook ⚡️ Setup mdBook quickly and build your site fast",
    "og": "https://repository-images.githubusercontent.com/224423059/cacfa480-116b-11ea-8fca-8e0229d5975c",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://o296.com/e/mdbook_as_blog.html": {
    "url": "https://o296.com/e/mdbook_as_blog.html",
    "title": "404: This page could not be found",
    "description": "",
    "icon": "https://o296.com/favicon.ico"
  },
  "https://github.com/luvit/luv": {
    "url": "https://github.com/luvit/luv",
    "title": "GitHub - luvit/luv: Bare libuv bindings for lua",
    "description": "Bare libuv bindings for lua. Contribute to luvit/luv development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/dbf439894ccfba217d93f2ee4b0bbeac803820848c5360937565c3ea5e641fa7/luvit/luv",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/catwell/luajit-msgpack-pure": {
    "url": "https://github.com/catwell/luajit-msgpack-pure",
    "title": "GitHub - catwell/luajit-msgpack-pure: MessagePack for LuaJIT (using FFI, no bindings, V4 API)",
    "description": "MessagePack for LuaJIT (using FFI, no bindings, V4 API) - GitHub - catwell/luajit-msgpack-pure: MessagePack for LuaJIT (using FFI, no bindings, V4 API)",
    "og": "https://opengraph.githubassets.com/789c8c198a09a47fad86e303bb06b5d786bfb48eacb45a45ee39bca5fcb7579e/catwell/luajit-msgpack-pure",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://www.lua.org/docs.html": {
    "url": "https://www.lua.org/docs.html",
    "title": "Lua: documentation",
    "description": "",
    "icon": "https://www.lua.org/favicon.ico"
  },
  "https://www.lua.org/versions.html": {
    "url": "https://www.lua.org/versions.html",
    "title": "Lua: version history",
    "description": "",
    "icon": "https://www.lua.org/favicon.ico"
  },
  "https://ousttrue.github.io/lua/": {
    "url": "https://ousttrue.github.io/lua/",
    "title": "lua コード解読 — lua code read  ドキュメント",
    "description": ""
  },
  "https://stackoverflow.com/questions/6691651/is-it-possible-to-use-functions-from-c-namespaces-with-luajit-ffi": {
    "url": "https://stackoverflow.com/questions/6691651/is-it-possible-to-use-functions-from-c-namespaces-with-luajit-ffi",
    "title": "Is it possible to use functions from c++ namespaces with luajit ffi?",
    "description": "I've got a lot of c++ code which contains a lot of functions and classes in namespaces (boost, for example).\nNow I'm trying to embed LuaJiT2 as script engine, but I cannot find anything about calling ",
    "og": "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
    "icon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a"
  },
  "https://stackoverflow.com/questions/54858455/lua-debug-hooks-seems-to-prevent-the-coroutine-from-working": {
    "url": "https://stackoverflow.com/questions/54858455/lua-debug-hooks-seems-to-prevent-the-coroutine-from-working",
    "title": "Lua debug hooks seems to prevent the coroutine from working",
    "description": "So, I'm trying to build a multitasking system in lua that hands control back to the main thread at regular intervals.\nThe issue is that debug.sethook seems to cause the coroutines to die immediatel...",
    "og": "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
    "icon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a"
  },
  "https://github.com/tomblind/local-lua-debugger-vscode/pull/37": {
    "url": "https://github.com/tomblind/local-lua-debugger-vscode/pull/37",
    "title": "escape backslash in args by ousttrue · Pull Request #37 · tomblind/local-lua-debugger-vscode",
    "description": "Hello.\nBackslash in args require escape.\n// launch.json.\n            \"args\": [\n                \"C:\\\\GLtfSampleModles\\\\2.0\\\\Cube\\\\glTF\\\\Cube.gltf\",\n            ],\nThis pull request escape backslash....",
    "og": "https://opengraph.githubassets.com/da3f379bb40ce0614d11962bee1002e366200e72daa1430c0a466034e023ca4a/tomblind/local-lua-debugger-vscode/pull/37",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://microsoft.github.io/debug-adapter-protocol/specification": {
    "url": "https://microsoft.github.io/debug-adapter-protocol/specification",
    "title": "Specification",
    "description": "Debug Adapter Protocol documentation and specification page.\n",
    "icon": "https://microsoft.github.io/debug-adapter-protocol/img/favicon.png"
  },
  "https://github.com/Microsoft/vscode-debugadapter-node/blob/main/adapter/src/loggingDebugSession.ts": {
    "url": "https://github.com/Microsoft/vscode-debugadapter-node/blob/main/adapter/src/loggingDebugSession.ts",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://code.visualstudio.com/api/working-with-extensions/publishing-extension": {
    "url": "https://code.visualstudio.com/api/working-with-extensions/publishing-extension",
    "title": "Publishing Extensions",
    "description": "Learn how to publish Visual Studio Code extensions to the public Marketplace and share them with other developers.",
    "og": "https://code.visualstudio.com/opengraphimg/opengraph-docs.png",
    "icon": "https://code.visualstudio.com/apple-touch-icon.png"
  },
  "https://www.getzola.org/": {
    "url": "https://www.getzola.org/",
    "title": "Zola",
    "description": "Everything you need to make a static site engine in one binary.",
    "icon": "https://www.getzola.org/favicon.ico"
  },
  "https://www.getzola.org/documentation/getting-started/overview/": {
    "url": "https://www.getzola.org/documentation/getting-started/overview/",
    "title": "Overview | Zola ",
    "description": "Everything you need to make a static site engine in one binary.",
    "icon": "https://www.getzola.org/favicon.ico"
  },
  "https://www.getzola.org/documentation/getting-started/configuration/": {
    "url": "https://www.getzola.org/documentation/getting-started/configuration/",
    "title": "Configuration | Zola ",
    "description": "Everything you need to make a static site engine in one binary.",
    "icon": "https://www.getzola.org/favicon.ico"
  },
  "https://tera.netlify.app/docs": {
    "url": "https://tera.netlify.app/docs",
    "title": "TERA",
    "description": ""
  },
  "https://tera.netlify.app/docs/#include": {
    "url": "https://tera.netlify.app/docs/#include",
    "title": "TERA",
    "description": ""
  },
  "https://github.com/luarocks/hererocks/pull/15": {
    "url": "https://github.com/luarocks/hererocks/pull/15",
    "title": "Visual Studio 2019 patch by ousttrue · Pull Request #15 · luarocks/hererocks",
    "description": "This fix detects the installation of vc by vswhere and adds the environment variables INCLUDE, LIB, PATH from the run of vcvars64.bat.\nI'm using VisualStudio2019BuildTools on Windows10(64bit)\nThank...",
    "og": "https://opengraph.githubassets.com/3ea3ae84513a02f0bc165ba993afb57e873daf0a91fa3effbc49b82cdabae952/luarocks/hererocks/pull/15",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/wbthomason/packer.nvim/issues/302": {
    "url": "https://github.com/wbthomason/packer.nvim/issues/302",
    "title": "Hererocks fails to install in Windows · Issue #302 · wbthomason/packer.nvim",
    "description": "I tried to install some luarocks in Windows and I got this error. I tried running nvim as both admin and non-admin, still hitting same error. There wasn't a specific error message shown compared to...",
    "og": "https://opengraph.githubassets.com/3452e51c7d1b8a51e85200fb8836f5f166a9bd703bbed5fab386ff9c7319c9f1/wbthomason/packer.nvim/issues/302",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/Microsoft/vswhere": {
    "url": "https://github.com/Microsoft/vswhere",
    "title": "GitHub - microsoft/vswhere: Locate Visual Studio 2017 and newer installations",
    "description": "Locate Visual Studio 2017 and newer installations. Contribute to microsoft/vswhere development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/0e145dc8e584f9ad5a49eb63191130a39c527acfb73c5e4a93a81df23b383349/microsoft/vswhere",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/microsoft/vswhere/wiki/Find-VC": {
    "url": "https://github.com/microsoft/vswhere/wiki/Find-VC",
    "title": "Find VC",
    "description": "Locate Visual Studio 2017 and newer installations. Contribute to microsoft/vswhere development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/0e145dc8e584f9ad5a49eb63191130a39c527acfb73c5e4a93a81df23b383349/microsoft/vswhere",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/HankiDesign/awesome-dear-imgui#languages": {
    "url": "https://github.com/HankiDesign/awesome-dear-imgui#languages",
    "title": "GitHub - TimoSalomaki/awesome-dear-imgui: A collection of awesome dear imgui bindings, extensions and resources",
    "description": "A collection of awesome dear imgui bindings, extensions and resources - GitHub - TimoSalomaki/awesome-dear-imgui: A collection of awesome dear imgui bindings, extensions and resources",
    "og": "https://opengraph.githubassets.com/25a5f8256f2e90085fbb769330a2152385a3cb673d73120aae67f31fdc0b8863/TimoSalomaki/awesome-dear-imgui",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://www.lfd.uci.edu/~gohlke/pythonlibs/": {
    "url": "https://www.lfd.uci.edu/~gohlke/pythonlibs/",
    "title": "Archived: Python Extension Packages for Windows - Christoph Gohlke",
    "description": "",
    "icon": "https://www.lfd.uci.edu/~gohlke/icon.ico"
  },
  "https://github.com/OSGeo/gdal/issues/1762": {
    "url": "https://github.com/OSGeo/gdal/issues/1762",
    "title": "Gdal install error · Issue #1762 · OSGeo/gdal",
    "description": "Hi how are you? i have a issue when i try to install gdal library. what can i do to resolve? thanks Federicos-MacBook-Pro:osgeo fewcom$ pip install gdal Collecting gdal Using cached https://files.p...",
    "og": "https://opengraph.githubassets.com/14dc4e5d690a33fa4ffe286954c2021f9142135329770c7256de14f21d68b8ca/OSGeo/gdal/issues/1762",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://ablog.readthedocs.io/en/latest/manual/posting-and-listing/#posting-with-page-front-matter": {
    "url": "https://ablog.readthedocs.io/en/latest/manual/posting-and-listing/#posting-with-page-front-matter",
    "title": "\n  404 Not Found\n | Read the Docs ",
    "description": "",
    "icon": "https://assets.readthedocs.org/images/favicon.f231b6609d0b.png"
  },
  "https://github.com/sunpy/ablog/pull/119": {
    "url": "https://github.com/sunpy/ablog/pull/119",
    "title": "Fix tags field for myst_parser by ousttrue · Pull Request #119 · sunpy/ablog",
    "description": "Description\nMarkdown post with tags field in front-matter has format mismatch.\n---\ntags: [\"a\", \"b\"]\n---\n\nInterpreted as  [\"a\" and \"b\"].\nI'm fix it.\n\nThis is caused in\nhttps://github.com/executableb...",
    "og": "https://opengraph.githubassets.com/d1a7347b9783ee4a1ab21d8b37b5f2a5342b2c0918383ab47e0ee2460b75dff4/sunpy/ablog/pull/119",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://devblogs.microsoft.com/cppblog/c-coroutines-in-visual-studio-2019-version-16-8/": {
    "url": "https://devblogs.microsoft.com/cppblog/c-coroutines-in-visual-studio-2019-version-16-8/",
    "title": "C++ Coroutines in Visual Studio 2019 Version 16.8 - C++ Team Blog",
    "description": "Please see our Visual Studio 2019 version 16.8 Preview 3 release notes for more of our latest features. It’s been a long journey for coroutines in C++ and in MSVC. We announced an early preview of resumable functions in 2013, followed up by the /await switch and initial C++ standardization proposals in 2014,",
    "og": "https://devblogs.microsoft.com/cppblog/wp-content/uploads/sites/9/2018/08/cplusplusfeature.png",
    "icon": "https://devblogs.microsoft.com/cppblog/wp-content/uploads/sites/9/2018/10/Microsoft-Favicon.png"
  },
  "https://clang.llvm.org/cxx_status.html": {
    "url": "https://clang.llvm.org/cxx_status.html",
    "title": "Clang - C++ Programming Language Status",
    "description": "",
    "icon": "https://clang.llvm.org/favicon.ico"
  },
  "https://github.com/RMichelsen/Nvy": {
    "url": "https://github.com/RMichelsen/Nvy",
    "title": "GitHub - RMichelsen/Nvy: Nvy - A Neovim client in C++",
    "description": "Nvy - A Neovim client in C++. Contribute to RMichelsen/Nvy development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/e0bd4057582694d6536ccbf4c977648df026d6b83f6f419daeb70f4382d1fe1e/RMichelsen/Nvy",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/mmikk/MikkTSpace": {
    "url": "https://github.com/mmikk/MikkTSpace",
    "title": "GitHub - mmikk/MikkTSpace: A common standard for tangent space used in baking tools to produce normal maps.",
    "description": "A common standard for tangent space used in baking tools to produce normal maps. - GitHub - mmikk/MikkTSpace: A common standard for tangent space used in baking tools to produce normal maps.",
    "og": "https://opengraph.githubassets.com/4ce965916cb3760a982987d9f37bd286f49852c562b147e7e2e60a6f78c7a26a/mmikk/MikkTSpace",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/bwasty/gltf-viewer/tree/master/src/shaders": {
    "url": "https://github.com/bwasty/gltf-viewer/tree/master/src/shaders",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://www.glfw.org/docs/latest/quick.html": {
    "url": "https://www.glfw.org/docs/latest/quick.html",
    "title": "GLFW: Getting started",
    "description": "",
    "icon": "https://www.glfw.org/favicon.ico"
  },
  "https://github.com/bjornbytes/maf": {
    "url": "https://github.com/bjornbytes/maf",
    "title": "GitHub - bjornbytes/maf: 3D math library for Lua",
    "description": "3D math library for Lua. Contribute to bjornbytes/maf development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/41274c9c0603254a78c7b452696b1a25f54034a47813e4150ff810878b733428/bjornbytes/maf",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/sumneko/lua-language-server/wiki/Command-line": {
    "url": "https://github.com/sumneko/lua-language-server/wiki/Command-line",
    "title": "Home",
    "description": "A language server that offers Lua language support - programmed in Lua - LuaLS/lua-language-server",
    "og": "https://opengraph.githubassets.com/0754f8f88bd2677f7162ae374870dbe3a4d2cd12c5692d6446cf487a80c01f0f/LuaLS/lua-language-server",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://microsoft.github.io/language-server-protocol/": {
    "url": "https://microsoft.github.io/language-server-protocol/",
    "title": "Official page for Language Server Protocol",
    "description": "Language Server Protocol documentation and specification page.\n",
    "icon": "https://microsoft.github.io/language-server-protocol/img/favicon.svg"
  },
  "https://github.com/scoder/lupa": {
    "url": "https://github.com/scoder/lupa",
    "title": "GitHub - scoder/lupa: Lua in Python",
    "description": "Lua in Python. Contribute to scoder/lupa development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/df2806d3fbcf9ef685f6e3723a0ff4c8ef6d4408f420776a187153a001ec7c6b/scoder/lupa",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://ameblo.jp/kay-nea/entry-12688563203.html": {
    "url": "https://ameblo.jp/kay-nea/entry-12688563203.html",
    "title": "『■　Blender 3.0 Alphaを触ってみた　【　Blender 3.0 Alpha　】』",
    "description": "　Blenderの現行版は2.93ですが、候補版として3.0　Alphaが出ているので、使ってみる事にしました。このバージョンから素材の管理がしやすくなってい…",
    "og": "https://stat.ameba.jp/user_images/20210726/00/kay-nea/50/4f/p/o0800033414977631814.png",
    "icon": "https://stat100.ameba.jp/common_style/img/sp/apple-touch-icon.png"
  },
  "https://getnikola.com/": {
    "url": "https://getnikola.com/",
    "title": "Static Site Generator",
    "description": "Nikola — Static Site Generator. In goes content, out comes a website, ready to deploy.",
    "icon": "https://getnikola.com/favicon.ico"
  },
  "https://qiita.com/MoriokaReimen/items/dbe1448ce6c0f80a6ac1": {
    "url": "https://qiita.com/MoriokaReimen/items/dbe1448ce6c0f80a6ac1",
    "title": "Pacmanの使い方 - Qiita",
    "description": "Pacmanの使い方この記事についてパッケージマネージャpacmanの使い方を紹介します。こちらのサイトを翻訳した内容となっています。pacmanはArch系のLinuxディストリビュージョ…",
    "og": "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9UGFjbWFuJUUzJTgxJUFFJUU0JUJEJUJGJUUzJTgxJTg0JUU2JTk2JUI5JnR4dC1jb2xvcj0lMjMyMTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LWNsaXA9ZWxsaXBzaXMmdHh0LWFsaWduPWxlZnQlMkN0b3Amcz1hYzQxMDdhOGE2MzliZDAyNjNmZDk2YjY3ZmVmMGIzNw&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwTW9yaW9rYVJlaW1lbiZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9NGU5NjhjMjEzMzFiY2FhMWY0YjNkMTY4ZTA2YjUyYWE&blend-x=142&blend-y=491&blend-mode=normal&s=77c4411bd0adf3254b641c8e7cec946f",
    "icon": "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-ec5ba42a24ae923f16825592efdc356f.png"
  },
  "https://www.khronos.org/ktx/": {
    "url": "https://www.khronos.org/ktx/",
    "title": "KTX - GPU Texture Container Format",
    "description": "",
    "og": "https://www.khronos.org/assets/uploads/apis/KTX-Square.png",
    "icon": "https://www.khronos.org/apple-touch-icon.png"
  },
  "https://github.com/ddiakopoulos/tinygizmo": {
    "url": "https://github.com/ddiakopoulos/tinygizmo",
    "title": "GitHub - ddiakopoulos/tinygizmo: :triangular_ruler: An simple immediate-mode 3D gimzo/manipulator (translation, rotation, scale widget) in ~1200 LoC",
    "description": ":triangular_ruler: An simple immediate-mode 3D gimzo/manipulator (translation, rotation, scale widget) in ~1200 LoC - GitHub - ddiakopoulos/tinygizmo: :triangular_ruler: An simple immediate-mode 3D...",
    "og": "https://opengraph.githubassets.com/992e7ae4b87261636d3f2aa79bcf7196078df267dbe74da014d4dba827dd42cb/ddiakopoulos/tinygizmo",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/john-chapman/im3d": {
    "url": "https://github.com/john-chapman/im3d",
    "title": "GitHub - john-chapman/im3d: Immediate mode rendering and 3d gizmos.",
    "description": "Immediate mode rendering and 3d gizmos. Contribute to john-chapman/im3d development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/a0898239daf4897fe7a0f157367baa3c091eadc0d5160a5a6d995dd306f0c7f9/john-chapman/im3d",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://docutils.sourceforge.io/": {
    "url": "https://docutils.sourceforge.io/",
    "title": "Docutils: Documentation Utilities",
    "description": ""
  },
  "https://qiita.com/imkitchen/items/02a9df7baaaf434fee66": {
    "url": "https://qiita.com/imkitchen/items/02a9df7baaaf434fee66",
    "title": "[CentOS7] emacs24にemacs-w3mインストール - Qiita",
    "description": "emacs-w3mとはemacsからw3mを使ってウェブブラウジングを可能にするelパッケージ。CentOS6までは標準リポジトリにw3mがあった気がするが7の標準リポジトリには見あたらなかった…",
    "og": "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9JTVCQ2VudE9TNyU1RCUyMGVtYWNzMjQlRTMlODElQUJlbWFjcy13M20lRTMlODIlQTQlRTMlODMlQjMlRTMlODIlQjklRTMlODMlODglRTMlODMlQkMlRTMlODMlQUImdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT01NiZ0eHQtY2xpcD1lbGxpcHNpcyZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPTEwM2FlMzVjNDA1YzU2OTEwNjM0OWIwNzQ1N2VjNzQ3&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwaW1raXRjaGVuJnR4dC1jb2xvcj0lMjMyMTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9MzYmdHh0LWFsaWduPWxlZnQlMkN0b3Amcz1mOWEzMTI5NmE0YTM1YTc1MjZlMmJlOWE4ZjllYmMwOQ&blend-x=142&blend-y=491&blend-mode=normal&s=17eb8b1782691929861b58f3e7ebdf56",
    "icon": "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-ec5ba42a24ae923f16825592efdc356f.png"
  },
  "https://hitkey.nekokan.dyndns.info/diary2004.php#D200424": {
    "url": "https://hitkey.nekokan.dyndns.info/diary2004.php#D200424",
    "title": "2020-04 doubledepth",
    "description": ""
  },
  "https://github.com/microsoft/WSL/issues/633": {
    "url": "https://github.com/microsoft/WSL/issues/633",
    "title": "ulimit and stack size · Issue #633 · microsoft/WSL",
    "description": "When I initiate a bash session, the output of ulimit -s is 8192 (which is in kb). This limit cannot be increased (Ideally I'd like to be able to set it as unlimited). Any suggestions?",
    "og": "https://opengraph.githubassets.com/d7967ff5ea1128171108390a8e88a6af4d6d1645d27d30729e2b75a3567b6cd4/microsoft/WSL/issues/633",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://wyam.io/docs/advanced/what_to_exclude_from_source_control": {
    "url": "https://wyam.io/docs/advanced/what_to_exclude_from_source_control",
    "title": "Wyam - What To Exclude From Source Control",
    "description": "",
    "icon": "https://wyam.io/assets/img/favicon.ico"
  },
  "https://wyam.io/docs/deployment/appveyor": {
    "url": "https://wyam.io/docs/deployment/appveyor",
    "title": "Wyam - AppVeyor for Continuous Integration",
    "description": "",
    "icon": "https://wyam.io/assets/img/favicon.ico"
  },
  "https://github.com/ChaosinaCan/pyvswhere": {
    "url": "https://github.com/ChaosinaCan/pyvswhere",
    "title": "GitHub - joelspadin/pyvswhere: Python interface to Microsoft's Visual Studio locator tool, vswhere",
    "description": "Python interface to Microsoft's Visual Studio locator tool, vswhere - GitHub - joelspadin/pyvswhere: Python interface to Microsoft's Visual Studio locator tool, vswhere",
    "og": "https://opengraph.githubassets.com/19311503fd62faa143597b1684546d228739f0aef587d33e49f4ea07c833e3f0/joelspadin/pyvswhere",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/Microsoft/language-server-protocol/blob/master/versions/protocol-2-x.md": {
    "url": "https://github.com/Microsoft/language-server-protocol/blob/master/versions/protocol-2-x.md",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/Microsoft/vscode-debugadapter-node/blob/master/debugProtocol.json": {
    "url": "https://github.com/Microsoft/vscode-debugadapter-node/blob/master/debugProtocol.json",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/Microsoft/vscode-python/issues/3762": {
    "url": "https://github.com/Microsoft/vscode-python/issues/3762",
    "title": "Debug adapter protocol violations in 2018.12.1 · Issue #3762 · microsoft/vscode-python",
    "description": "Environment data VS Code version: N/A (using the debug adapter with vimspector Extension version (available under the Extensions sidebar): 2018.12.1 OS and version: macOS Mojave (10.14.1) Python ve...",
    "og": "https://opengraph.githubassets.com/22d1d7498c8dca7da0a67a5ddc3cd2c33277575c72385c2ac775d160ba3e39c1/microsoft/vscode-python/issues/3762",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/Microsoft/vscode-go/issues/219": {
    "url": "https://github.com/Microsoft/vscode-go/issues/219",
    "title": "Cannot debug programs which read from STDIN · Issue #219 · microsoft/vscode-go",
    "description": "[EDIT] I think the Debugger Console cannot accept input, or in other words, work as an interactive console. Is that right? Is there an alternative, like attaching to a process? [/EDIT] I tried to d...",
    "og": "https://opengraph.githubassets.com/a110d9b6d39808431ec544505945faca9a1e9dde63263f98c85a450c7647fafe/microsoft/vscode-go/issues/219",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://code.visualstudio.com/Docs/editor/debugging#_launchjson-attributes": {
    "url": "https://code.visualstudio.com/Docs/editor/debugging#_launchjson-attributes",
    "title": "Debugging in Visual Studio Code",
    "description": "One of the great things in Visual Studio Code is debugging support.  Set breakpoints, step-in, inspect variables and more.",
    "og": "https://code.visualstudio.com/assets/docs/editor/debugging/Debugging.png",
    "icon": "https://code.visualstudio.com/apple-touch-icon.png"
  },
  "https://github.com/Chiel92/vim-autoformat": {
    "url": "https://github.com/Chiel92/vim-autoformat",
    "title": "GitHub - vim-autoformat/vim-autoformat: Provide easy code formatting in Vim by integrating existing code formatters.",
    "description": "Provide easy code formatting in Vim by integrating existing code formatters. - GitHub - vim-autoformat/vim-autoformat: Provide easy code formatting in Vim by integrating existing code formatters.",
    "og": "https://opengraph.githubassets.com/e2f4c37d2e8faa28e739679dd051eb39cb3b16e5facbc8dc65456bb99a7f143f/vim-autoformat/vim-autoformat",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://docs.python.org/3/library/subprocess.html": {
    "url": "https://docs.python.org/3/library/subprocess.html",
    "title": "subprocess — Subprocess management",
    "description": "Source code: Lib/subprocess.py The subprocess module allows you to spawn new processes, connect to their input/output/error pipes, and obtain their return codes. This module intends to replace seve...",
    "og": "https://docs.python.org/3/_static/og-image.png",
    "icon": "https://docs.python.org/3/_static/py.svg"
  },
  "https://docs.python.org/3/library/logging.html": {
    "url": "https://docs.python.org/3/library/logging.html",
    "title": "logging — Logging facility for Python",
    "description": "Source code: Lib/logging/__init__.py Important: This page contains the API reference information. For tutorial information and discussion of more advanced topics, see Basic Tutorial, Advanced Tutor...",
    "og": "https://docs.python.org/3/_static/og-image.png",
    "icon": "https://docs.python.org/3/_static/py.svg"
  },
  "https://github.com/michaeljones/sphinx-to-github": {
    "url": "https://github.com/michaeljones/sphinx-to-github",
    "title": "GitHub - michaeljones/sphinx-to-github: Sphinx extension & script to prepare Sphinx html output for github pages.",
    "description": "Sphinx extension & script to prepare Sphinx html output for github pages. - GitHub - michaeljones/sphinx-to-github: Sphinx extension & script to prepare Sphinx html output for github pages.",
    "og": "https://opengraph.githubassets.com/4540284977bf331bf7df75265c7b4f4695808ff4d7efb9da36feb3486c27ec0e/michaeljones/sphinx-to-github",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/ColinDuquesnoy/QDarkStyleSheet": {
    "url": "https://github.com/ColinDuquesnoy/QDarkStyleSheet",
    "title": "GitHub - ColinDuquesnoy/QDarkStyleSheet: A dark style sheet for QtWidgets application",
    "description": "A dark style sheet for QtWidgets application . Contribute to ColinDuquesnoy/QDarkStyleSheet development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/682bbe6f808568b76ed096f44431e1587eef3b1b0936feb9ae8f69bfaa5345b4/ColinDuquesnoy/QDarkStyleSheet",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://qiita.com/amedama/items/b856b2f30c2f38665701": {
    "url": "https://qiita.com/amedama/items/b856b2f30c2f38665701",
    "title": "ログ出力のための print と import logging はやめてほしい - Qiita",
    "description": "はじめにhttps://docs.python.org/ja/3/howto/logging.htmlPython入門系の記事では概して、Pythonのロギング機能の紹介で最初にlogging.…",
    "og": "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9JUUzJTgzJUFEJUUzJTgyJUIwJUU1JTg3JUJBJUU1JThBJTlCJUUzJTgxJUFFJUUzJTgxJTlGJUUzJTgyJTgxJUUzJTgxJUFFJTIwcHJpbnQlMjAlRTMlODElQTglMjBpbXBvcnQlMjBsb2dnaW5nJTIwJUUzJTgxJUFGJUUzJTgyJTg0JUUzJTgyJTgxJUUzJTgxJUE2JUUzJTgxJUJCJUUzJTgxJTk3JUUzJTgxJTg0JnR4dC1jb2xvcj0lMjMyMTIxMjEmdHh0LWZvbnQ9SGlyYWdpbm8lMjBTYW5zJTIwVzYmdHh0LXNpemU9NTYmdHh0LWNsaXA9ZWxsaXBzaXMmdHh0LWFsaWduPWxlZnQlMkN0b3Amcz1hYjVlN2JhODdiYjE3MGM4OWE4OGExZTE5NTgzNTFmYw&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwYW1lZGFtYSZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTM2JnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9MDc3YmRiZjAwMGY0MTJhZWNiNGZlNjAxOGVmN2JlMjA&blend-x=142&blend-y=491&blend-mode=normal&s=e12feb3cfc6b1fd598a11cdc4d6b6963",
    "icon": "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-ec5ba42a24ae923f16825592efdc356f.png"
  },
  "https://docs.python.org/2/library/logging.html#logger-objects": {
    "url": "https://docs.python.org/2/library/logging.html#logger-objects",
    "title": "15.7. logging — Logging facility for Python — Python 2.7.18 documentation",
    "description": "",
    "icon": "https://docs.python.org/2/_static/py.png"
  },
  "https://docs.python.org/2/library/logging.html#logrecord-attributes": {
    "url": "https://docs.python.org/2/library/logging.html#logrecord-attributes",
    "title": "15.7. logging — Logging facility for Python — Python 2.7.18 documentation",
    "description": "",
    "icon": "https://docs.python.org/2/_static/py.png"
  },
  "https://github.com/buha/gpibcs/blob/master/qplaintexteditlogger.py": {
    "url": "https://github.com/buha/gpibcs/blob/master/qplaintexteditlogger.py",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://wiki.gentoo.org/wiki/Xorg/Guide": {
    "url": "https://wiki.gentoo.org/wiki/Xorg/Guide",
    "title": "Xorg/Guide - Gentoo wiki",
    "description": "",
    "icon": "https://www.gentoo.org/favicon.ico"
  },
  "https://wiki.gentoo.org/wiki/TigerVNC": {
    "url": "https://wiki.gentoo.org/wiki/TigerVNC",
    "title": "TigerVNC - Gentoo wiki",
    "description": "",
    "icon": "https://www.gentoo.org/favicon.ico"
  },
  "https://github.com/google/draco": {
    "url": "https://github.com/google/draco",
    "title": "GitHub - google/draco: Draco is a library for compressing and decompressing 3D geometric meshes and point clouds. It is intended to improve the storage and transmission of 3D graphics.",
    "description": "Draco is a library for compressing and decompressing 3D geometric meshes and point clouds. It is intended to improve the storage and transmission of 3D graphics. - GitHub - google/draco: Draco is a...",
    "og": "https://opengraph.githubassets.com/bf7e3c6d9c9d036d781084070f860ac1a04a2e9a9a6a5229d7f925619163812a/google/draco",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/Microsoft/cppwinrt/tree/master/10.0.15063.0/Samples/CL": {
    "url": "https://github.com/Microsoft/cppwinrt/tree/master/10.0.15063.0/Samples/CL",
    "title": "File not found · microsoft/cppwinrt",
    "description": "C++/WinRT. Contribute to microsoft/cppwinrt development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/2feebc913948fd72a5e0bafdc0eeb5fe719aa39286d0e29972120763ff4c678a/microsoft/cppwinrt",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/Kitware/CMake/blob/master/Tests/VSWinStorePhone/CMakeLists.txt": {
    "url": "https://github.com/Kitware/CMake/blob/master/Tests/VSWinStorePhone/CMakeLists.txt",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/DonJayamanne/pythonVSCode/issues/1039": {
    "url": "https://github.com/DonJayamanne/pythonVSCode/issues/1039",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/Barbarbarbarian/Blender-VScode-Debugger": {
    "url": "https://github.com/Barbarbarbarian/Blender-VScode-Debugger",
    "title": "GitHub - Barbarbarbarian/Blender-VScode-Debugger: Blender Python add-on debugger for Visual Studio Code",
    "description": "Blender Python add-on debugger for Visual Studio Code - GitHub - Barbarbarbarian/Blender-VScode-Debugger: Blender Python add-on debugger for Visual Studio Code",
    "og": "https://opengraph.githubassets.com/9467d5dbfbec1baacdc6d3c583fecf0fbd37314b9f218273084b1430ce1b3d89/Barbarbarbarian/Blender-VScode-Debugger",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://docs.blender.org/manual/en/dev/advanced/scripting/addon_tutorial.html": {
    "url": "https://docs.blender.org/manual/en/dev/advanced/scripting/addon_tutorial.html",
    "title": "Add-on Tutorial — Blender Manual",
    "description": "",
    "icon": "https://docs.blender.org/manual/en/dev/_static/favicon.ico"
  },
  "https://www.microsoft.com/en-us/download/details.aspx?id=44266": {
    "url": "https://www.microsoft.com/en-us/download/details.aspx?id=44266",
    "title": "Error 404 - Not Found",
    "description": "",
    "icon": "https://www.microsoft.com/favicon.ico?v2"
  },
  "https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation": {
    "url": "https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://msdn.microsoft.com/en-us/library/windows/desktop/ff685299(v=vs.85).aspx": {
    "url": "https://msdn.microsoft.com/en-us/library/windows/desktop/ff685299(v=vs.85).aspx",
    "title": "MP3 File Source - Win32 apps",
    "description": "The MP3 file source parses MP3 files.",
    "og": "https://learn.microsoft.com/en-us/media/open-graph-image.png",
    "icon": "https://msdn.microsoft.com/favicon.ico"
  },
  "https://msdn.microsoft.com/en-us/library/windows/desktop/dd757766(v=vs.85).aspx": {
    "url": "https://msdn.microsoft.com/en-us/library/windows/desktop/dd757766(v=vs.85).aspx",
    "title": "MPEG-4 File Source - Win32 apps",
    "description": "The MPEG-4 file source parses MP4 and 3GPP files.",
    "og": "https://learn.microsoft.com/en-us/media/open-graph-image.png",
    "icon": "https://msdn.microsoft.com/favicon.ico"
  },
  "https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/wavsink": {
    "url": "https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/wavsink",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer": {
    "url": "https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/Microsoft/Windows-classic-samples/blob/master/Samples/DX11VideoRenderer/cpp/Presenter.cpp": {
    "url": "https://github.com/Microsoft/Windows-classic-samples/blob/master/Samples/DX11VideoRenderer/cpp/Presenter.cpp",
    "title": "(No title)",
    "description": "",
    "icon": "https://github.com/favicon.ico"
  },
  "https://github.com/Microsoft/vcpkg/blob/master/docs/examples/patching-libpng.md#patching-the-code-to-improve-compatibility": {
    "url": "https://github.com/Microsoft/vcpkg/blob/master/docs/examples/patching-libpng.md#patching-the-code-to-improve-compatibility",
    "title": "File not found · microsoft/vcpkg",
    "description": "C++ Library Manager for Windows, Linux, and MacOS. Contribute to microsoft/vcpkg development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/27eac6bb7611f0fb72b1315c40876c75496f8dd639cb1ba58e194924babd2347/microsoft/vcpkg",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/ocornut/imgui/tree/master/examples/sdl_opengl3_example": {
    "url": "https://github.com/ocornut/imgui/tree/master/examples/sdl_opengl3_example",
    "title": "File not found · ocornut/imgui",
    "description": "Dear ImGui: Bloat-free Graphical User interface for C++ with minimal dependencies - File not found · ocornut/imgui",
    "og": "https://repository-images.githubusercontent.com/22067521/01b5ff00-53d7-11ea-86fa-52aee7e335a2",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://developer.microsoft.com/en-us/windows/mixed-reality/rendering_in_directx#important_note_about_rendering_on_non-hololens_devices": {
    "url": "https://developer.microsoft.com/en-us/windows/mixed-reality/rendering_in_directx#important_note_about_rendering_on_non-hololens_devices",
    "title": "Rendering in DirectX - Mixed Reality",
    "description": "Learn how to update and render content in DirectX applications for Windows Mixed Reality.",
    "og": "https://learn.microsoft.com/en-us/media/open-graph-image.png",
    "icon": "https://developer.microsoft.com/favicon.ico"
  },
  "https://docs.python.org/3/library/asyncio-eventloop.html": {
    "url": "https://docs.python.org/3/library/asyncio-eventloop.html",
    "title": "Event Loop",
    "description": "Source code: Lib/asyncio/events.py, Lib/asyncio/base_events.py Preface The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO ...",
    "og": "https://docs.python.org/3/_static/og-image.png",
    "icon": "https://docs.python.org/3/_static/py.svg"
  },
  "https://docs.python.org/3/library/asyncio-eventloops.html#asyncio.ProactorEventLoop": {
    "url": "https://docs.python.org/3/library/asyncio-eventloops.html#asyncio.ProactorEventLoop",
    "title": "404 Not Found",
    "description": "",
    "icon": "https://docs.python.org/favicon.ico"
  },
  "https://stackoverflow.com/questions/29868372/python-asyncio-run-event-loop-once": {
    "url": "https://stackoverflow.com/questions/29868372/python-asyncio-run-event-loop-once",
    "title": "python asyncio run event loop once?",
    "description": "I am trying to understand the asyncio library, specifically with using sockets. I have written some code in an attempt to gain understanding, \n\nI wanted to run a sender and a receiver sockets ",
    "og": "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
    "icon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a"
  },
  "https://github.com/Microsoft/HoloToolkit-Unity/blob/master/Assets/HoloToolkit/Build/Editor/BuildDeployTools.cs#L72": {
    "url": "https://github.com/Microsoft/HoloToolkit-Unity/blob/master/Assets/HoloToolkit/Build/Editor/BuildDeployTools.cs#L72",
    "title": "File not found · microsoft/MixedRealityToolkit-Unity",
    "description": "This repository is for the legacy Mixed Reality Toolkit (MRTK) v2.  For the latest version of the MRTK please visit https://github.com/MixedRealityToolkit/MixedRealityToolkit-Unity - File not found...",
    "og": "https://repository-images.githubusercontent.com/50605426/ce574819-6bf5-44c5-a174-f22f20ee0ce9",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://cmake.org/cmake/help/latest/command/add_subdirectory.html": {
    "url": "https://cmake.org/cmake/help/latest/command/add_subdirectory.html",
    "title": "add_subdirectory — CMake 3.28.1 Documentation",
    "description": "",
    "icon": "https://cmake.org/cmake/help/latest/_static/cmake-favicon.ico"
  },
  "https://cmake.org/cmake/help/latest/command/add_executable.html": {
    "url": "https://cmake.org/cmake/help/latest/command/add_executable.html",
    "title": "add_executable — CMake 3.28.1 Documentation",
    "description": "",
    "icon": "https://cmake.org/cmake/help/latest/_static/cmake-favicon.ico"
  },
  "https://cmake.org/cmake/help/latest/command/add_library.html": {
    "url": "https://cmake.org/cmake/help/latest/command/add_library.html",
    "title": "add_library — CMake 3.28.1 Documentation",
    "description": "",
    "icon": "https://cmake.org/cmake/help/latest/_static/cmake-favicon.ico"
  },
  "https://github.com/vim-scripts/VimIM": {
    "url": "https://github.com/vim-scripts/VimIM",
    "title": "GitHub - vim-scripts/VimIM: Vim Input Method -- Vim 中文输入法",
    "description": "Vim Input Method -- Vim 中文输入法. Contribute to vim-scripts/VimIM development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/f5a64c2a8d947938149b3cee51a9ace4681c331b58c3a2b4a62c8fc3538438de/vim-scripts/VimIM",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://blog.tedd.no/2016/10/09/investigating-unity-hang-on-second-run-multi-threading/": {
    "url": "https://blog.tedd.no/2016/10/09/investigating-unity-hang-on-second-run-multi-threading/",
    "title": "Investigating Unity hang on second run (multi-threading) - Tedds blog",
    "description": "Background he problem of Unity hangs on second run may have multiple causes and can sometimes be difficult to debug. When searching for an answer I see many with the same problem. I am therefore sharing a my debugging process in hope that it can help others solve their own problem. The problem Unity has ... Read more",
    "og": "https://blog.tedd.no/wp-content/uploads/2023/03/6e0d3-img_58e4ae1f12e56.png",
    "icon": "https://s0.wp.com/i/webclip.png"
  },
  "https://stackoverflow.com/questions/16200997/why-doesnt-include-python-h-work": {
    "url": "https://stackoverflow.com/questions/16200997/why-doesnt-include-python-h-work",
    "title": "Why doesn't #include <Python.h> work?",
    "description": "I'm trying to run Python modules in C++ using \"#include &lt;Python.h&gt;\", however, after setting the \"Additional Include Dependencies\" of the project to \"\\include\" I get the following error when ",
    "og": "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
    "icon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a"
  },
  "https://github.com/pybind/pybind11": {
    "url": "https://github.com/pybind/pybind11",
    "title": "GitHub - pybind/pybind11: Seamless operability between C++11 and Python",
    "description": "Seamless operability between C++11 and Python. Contribute to pybind/pybind11 development by creating an account on GitHub.",
    "og": "https://opengraph.githubassets.com/14e63828a3e2b35594a00e6cb14b98ffb57d6eb1053b1ea0ae23fcd658cf73d7/pybind/pybind11",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://refreshless.com/nouislider/": {
    "url": "https://refreshless.com/nouislider/",
    "title": "noUiSlider - JavaScript Range Slider | Refreshless.com",
    "description": "noUiSlider is a lightweight, ARIA-accessible JavaScript range slider with multi-touch and keyboard support. Great for responsive designs, and no dependencies!"
  },
  "https://fortawesome.github.io/Font-Awesome/": {
    "url": "https://fortawesome.github.io/Font-Awesome/",
    "title": "Site not found · GitHub Pages",
    "description": ""
  },
  "https://codemirror.net/": {
    "url": "https://codemirror.net/",
    "title": "CodeMirror",
    "description": "In-browser code editor",
    "icon": "https://codemirror.net/style/logo.svg"
  },
  "https://marijnhaverbeke.nl/acorn/": {
    "url": "https://marijnhaverbeke.nl/acorn/",
    "title": "acorn.js",
    "description": "",
    "icon": "https://marijnhaverbeke.nl/favicon.ico"
  },
  "https://github.com/RubaXa/Sortable": {
    "url": "https://github.com/RubaXa/Sortable",
    "title": "GitHub - SortableJS/Sortable: Reorderable drag-and-drop lists for modern browsers and touch devices. No jQuery or framework required.",
    "description": "Reorderable drag-and-drop lists for modern browsers and touch devices. No jQuery or framework required. - GitHub - SortableJS/Sortable: Reorderable drag-and-drop lists for modern browsers and touch...",
    "og": "https://repository-images.githubusercontent.com/15308499/15b56200-6e92-11e9-8a66-ddd673bf8aed",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://github.com/millermedeiros/js-signals": {
    "url": "https://github.com/millermedeiros/js-signals",
    "title": "GitHub - millermedeiros/js-signals: Custom Event/Messaging system for JavaScript inspired by AS3-Signals",
    "description": "Custom Event/Messaging system for JavaScript inspired by AS3-Signals - GitHub - millermedeiros/js-signals: Custom Event/Messaging system for JavaScript inspired by AS3-Signals",
    "og": "https://opengraph.githubassets.com/0fae5e4170dab9bbae786249056163d38c73b2aaa8ea7d47f83e926f1521aba4/millermedeiros/js-signals",
    "icon": "https://github.githubassets.com/favicons/favicon.png"
  },
  "https://jqueryui.com/": {
    "url": "https://jqueryui.com/",
    "title": "jQuery UI",
    "description": "jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library. Whether you're building highly interactive web applications or you just need to add a date picker to a form control, jQuery UI is the perfect choice.",
    "icon": "https://jqueryui.com/wp-content/themes/jqueryui.com/i/favicon.ico"
  }
};