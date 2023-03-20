import React from "react";
import PropTypes from "prop-types";

// Components
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const Tags = ({ pageContext, data }) => {
    const { tag } = pageContext;
    const { edges, totalCount } = data.allMdx;
    const parents = data.parent.nodes;
    const children = data.children.nodes;
    const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
        } tagged with "${tag}"`;

    return (
        <Layout>
            <div>
                <h1>{tagHeader}</h1>
                <ul>
                    {edges.map(({ node }) => {
                        const { slug } = node.fields;
                        const { title } = node.frontmatter;
                        return (
                            <li key={slug}>
                                <Link to={slug}>{title}</Link>
                            </li>
                        );
                    })}
                </ul>
                {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
                <ul>
                    {parents.map((node) => {
                        return (
                            <li>
                                <Link to={`/tags/${node.name}/`}>{node.name}</Link>
                            </li>
                        );
                    })}
                </ul>
                <ul>
                    {children.map((node) => {
                        return (
                            <ul>
                                {node.tags.map((child_tag) => {
                                    return (
                                        <li>
                                            <Link to={`/tags/${child_tag}/`}>{child_tag}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    })}
                </ul>
                <Link to="/tags">All tags</Link>
            </div>
        </Layout>
    );
};

Tags.propTypes = {
    pageContext: PropTypes.shape({
        tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
        allMdx: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired,
                        }),
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired,
                        }),
                    }),
                }).isRequired
            ),
        }),
    }),
};

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    parent: allCategoriesJson(filter: { tags: { in: [$tag] } }) {
      nodes {
        name
        tags
      }
    }
    children: allCategoriesJson(filter: { name: { eq: $tag } }) {
      nodes {
        name
        tags
      }
    }
  }
`;
