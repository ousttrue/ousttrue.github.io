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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/pages`,
      },
    },
  ],
};
