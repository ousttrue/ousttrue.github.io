// src/global.tsx
import React from 'react'
import type { GlobalProps } from "minista"
import { Head } from "minista"
import { Navbar, Footer, Button } from 'react-daisyui'
import PostHeader from './components/postheader';

import "./global.css"

export default function(props: GlobalProps) {
  const isPost = props.url.match(/^\/posts\/\d+/);

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta property="description" content="description" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
      </Head>

      <div id="root">
        <Navbar className="bg-accent text-accent-content">
          <div className="flex-1">
            <Button tag="a" className="text-x1" href="/">三次元日誌(minista)</Button>
            <Button tag="a" href="/posts">blog</Button>
            <Button tag="a" href="/tags">tags</Button>
          </div>
          <div className="flex-none">
            <Button tag="a" href="https://ousttrue.github.io/cmake_book/">CmakeBook</Button>
            <Button tag="a" href="https://ousttrue.github.io/blender_book">BlenderBook</Button>
            <Button tag="a" href="https://github.com/ousttrue/ousttrue.github.io">github</Button>
          </div>
        </Navbar>

        <article>
          {props.children}
        </article>

        <Footer className="p-10 bg-neutral text-neutral-content">
          powered by
          <a href="https://minista.qranoko.jp/">minista</a>
          +
          <a href="https://react.daisyui.com/">daisyui</a>
        </Footer>
      </div>
    </>
  )
}
