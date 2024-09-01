import React from 'react';
import type { MarkdownData } from '../mymd-vite-plugin.ts';
import { Node } from "mdast";

export type MarkdownProps = {
  path: string,
  post: MarkdownData,
  // mdast: Node,
};

export function Markdown(props: MarkdownProps) {
  const { path, post } = props;

  return (<>
    <div>{post.frontmatter.title}</div>
    <div>{post.content}</div>
  </>);
}
