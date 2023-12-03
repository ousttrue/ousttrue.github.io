// src/global.tsx
import type { GlobalProps } from "minista"
import { Head } from "minista"

import "./global.css"

function Header(props: GlobalProps) {
  return (<header>
    <h1><a href="/">三次元日誌(minista)</a></h1>
  </header>)
}

function Footer(props: GlobalProps) {
  return (<footer>powered by <a href="https://minista.qranoko.jp/">minista</a></footer>)
}

function Content(props: GlobalProps) {
  return (<article>{props.children}</article>)
}

export default function(props: GlobalProps) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta property="description" content="description" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
      </Head>

      <div id="root">
        <Header {...props} />
        <Content {...props} />
        <Footer {...props} />
      </div>
    </>
  )
}
