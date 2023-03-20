import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout.js";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";

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
  const frontmatter = data.mdx.frontmatter;
  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <div className="tags-index">
        {frontmatter.tags &&
          frontmatter.tags.length > 0 &&
          frontmatter.tags.map((tag) => {
            return (
              <Link to={`/tags/${tag}/`} itemProp="url">
                <button>{tag}</button>
              </Link>
            );
          })}
      </div>
      <MDXProvider components={components}>{children}</MDXProvider>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        tags
      }
    }
  }
`;
