const content_path = "content/posts";

module.exports = {
  siteMetadata: {
    title: "三次元日誌(Gatsby)",
    author: "ousttrue",
    description: "",
  },
  plugins: [
    `gatsby-remark-prismjs`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    // content_path
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/${content_path}`,
      },
    },
  ],
};
