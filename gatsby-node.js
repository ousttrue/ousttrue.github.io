const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  //fmImagesToRelative(node)

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    {
      allMdx {
        nodes {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
        }
      }
    }
  `);
  data.allMdx.nodes.map((node) => {
    console.log("create markdown page: ", node.fields.slug);

    createPage({
      path: node.fields.slug,
      component: path.resolve("src/templates/post-template.js"),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
