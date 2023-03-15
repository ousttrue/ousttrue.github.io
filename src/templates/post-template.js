import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout.js";
import { MDXProvider } from "@mdx-js/react";

export default function PostTempalte({ data, children }) {
  return (
    <>
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXProvider>{children}</MDXProvider>
    </>
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
