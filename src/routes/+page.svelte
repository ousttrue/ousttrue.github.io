<script lang="ts">
  // import React from "react";
  // import type { StaticData, PageProps } from "minista"
  // import { Card, Button } from "react-daisyui"
  import Quad from "./Quad.svelte";
</script>

<Quad data={{ name: "buildtool", url: "/buildtool", icon: "🚧" }} />
<Quad data={{ name: "ssg", url: "/ssg", icon: "⚡" }} />
<Quad data={{ name: "3D", url: "/threed", icon: "🐵" }} />

<Quad
  data={{
    name: "MesonBook",
    url: "https://ousttrue.github.io/meson_book/",
    icon: "🔗",
  }}
/>
<Quad
  data={{
    name: "CmakeBook",
    url: "https://ousttrue.github.io/cmake_book/",
    icon: "🔗",
  }}
/>
<Quad
  data={{
    name: "BlenderBook",
    url: "https://ousttrue.github.io/blender_book/",
    icon: "🔗",
  }}
/>
