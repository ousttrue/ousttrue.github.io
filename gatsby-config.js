const content_path = "content/posts/";

module.exports = {
  siteMetadata: {
    title: "三次元日誌(Gatsby)",
    author: "ousttrue",
    description: "",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
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
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/${content_path}`,
      },
    },
  ],
};
