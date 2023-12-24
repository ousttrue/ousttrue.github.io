import React from 'react';
import { Button, Badge, Card, Link } from 'react-daisyui'
import type { PostType } from './postheader';


const colorMap = {
  zola: 'neutral',
  ssg: 'neutral',
  css: 'neutral',
  hugo: 'neutral',
  mdbook: 'neutral',
  octpress: 'neutral',
  wyam: 'neutral',
  sphinx: 'neutral',

  cg: 'primary',
  '3D': 'primary',
  bullet: 'primary',
  blender: 'primary',
  Blender: 'primary',
  OpenGL: 'primary',
  opengl: 'primary',
  d3d: 'primary',
  gltf: 'primary',
  hololens: 'primary',
  imgui: 'primary',
  mediafoundation: 'primary',
  opencv: 'primary',
  threejs: 'primary',
  unity: 'primary',
  usd: 'primary',
  webgl: 'primary',
  webxr: 'primary',
  wgpu: 'primary',

  zig: 'secondary',
  asio: 'secondary',
  msgpack: 'secondary',
  lua: 'secondary',
  luajit: 'secondary',
  libclang: 'secondary',
  gyp: 'secondary',
  dap: 'secondary',
  dlang: 'secondary',
  ffi: 'secondary',
  fsharp: 'secondary',
  cython: 'secondary',
  cmake: 'secondary',
  com: 'secondary',
  csharp: 'secondary',
  cpp: 'secondary',
  clang: 'secondary',
  boost: 'secondary',
  buildtool: 'secondary',
  'c++': 'secondary',
  python: 'secondary',
  qt: 'secondary',
  rust: 'secondary',
  sq: 'secondary',
  uwp: 'secondary',
  vcpkg: 'secondary',

  lsp: 'accent',
  wsl: 'accent',
  w3m: 'accent',
  wayland: 'accent',
  ptk: 'accent',
  nvim: 'accent',
  msys2: 'accent',
  linux: 'accent',
  skk: 'accent',
  sway: 'accent',
  term: 'accent',
  tui: 'accent',
  xonsh: 'accent',
  vim: 'accent',
  vscode: 'accent',
}

export type TagType = {
  name: string,
  posts?: PostType[],
}

export function Tags(props: { tags: string[] }) {
  return props.tags.map((tag) => <Tag key={tag} tag={{ name: tag }} />)
}

export default function Tag(props: { tag: TagType }) {
  const { name, posts } = props.tag;
  return (<Button
    className="m-1"
    tag="a" size="xs" color={colorMap[name] ?? "default"} href={`/tags/${name}`}>
    {name}
    {posts ? <Badge>{posts.length}</Badge> : ''}
  </Button>);
}
