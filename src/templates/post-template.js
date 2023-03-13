import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/layout.js";

export default function PostTempalte({ pageContext }) {
  const { node } = pageContext;
  return (
    <Layout>
      <h2>{node.frontmatter.title}</h2>
      <MDXRenderer>{node.body}</MDXRenderer>
    </Layout>
  );
}
