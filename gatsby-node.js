const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  //fmImagesToRelative(node)

  if (node.internal.type === `Mdx`) {
    console.log("[node]", node.frontmatter);
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

const path = require(`path`);
const postTemplate = path.resolve(`./src/templates/post-template.js`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);
  data.allMdx.nodes.map((node) => {
    const page_path = "/posts" + node.fields.slug;
    createPage({
      path: page_path,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
  });
};
