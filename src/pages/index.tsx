import React from "react";
import type { StaticData, PageProps } from "minista"
import { Card, Button } from "react-daisyui"


type QuadData = {
  name: string;
  icon: string;
  url: string;
}

function Quad(props: { data: QuadData }) {
  const { name, icon, url } = props.data;

  return (<Button
    className="w-60 h-60 m-2"
    tag="a"
    href={url}
  >
    {icon}{name}
  </Button>);
}

export default function(props: PagePostsProps) {
  return (
    <>
      <Quad data={{ name: "buildtool", url: "/buildtool", icon: "🚧" }} />
      <Quad data={{ name: "ssg", url: "/ssg", icon: "⚡" }} />
      <Quad data={{ name: "3D", url: "/threed", icon: "🐵" }} />
    </>
  )
}
