import React from 'react';
import { Button, Badge, Card, Link } from 'react-daisyui'

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

// function Tag(props: { tag: string }) {
//   const { tag } = props;
//   return <Button tag="a" href={`/tags/${tag}`}>{tag}</Button>
// }


export default function Tag(props: { tag: string }) {
  const tag = props.tag;
  return <Button tag="a" size="xs" color={colorMap[tag] ?? "default"} href={`/tags/${tag}`}>{tag}</Button>;
}
