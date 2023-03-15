import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout.js";
import { MDXProvider } from "@mdx-js/react";

import PrismSyntaxHighlight from "../components/prism-syntax-highlight";

const components = {
  code: ({ children, className }) => {
    return className ? (
      <PrismSyntaxHighlight className={className}>
        {children}
      </PrismSyntaxHighlight>
    ) : (
      <code>{children}</code>
    );
  },
};

export default function PostTempalte({ data, children }) {
  return (
    <>
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXProvider components={components}>{children}</MDXProvider>
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
