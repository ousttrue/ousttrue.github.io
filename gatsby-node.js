const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  //fmImagesToRelative(node)

  if (node.internal.type === `Mdx`) {
    console.log("[node]", node.frontmatter);
    const slug = "/posts" + createFilePath({ node, getNode });
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

const path = require(`path`);
const postTemplate = path.resolve(`./src/templates/post-template.js`);
const tagTemplate = path.resolve(`./src/templates/tag-template.js`);

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
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `);

  data.allMdx.nodes.map((node) => {
    const page_path = node.fields.slug;
    createPage({
      path: page_path,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
  });

  data.allMdx.group.forEach((group) => {
    createPage({
      path: `/tags/${group.tag}`,
      component: tagTemplate,
      context: {
        tag: group.tag,
      },
    });
  });
};
