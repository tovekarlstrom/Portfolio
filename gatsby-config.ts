import type { GatsbyConfig } from "gatsby";
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: `portfolio-headless-cms`,
    siteUrl: `https://www.yourdomain.tld`,
    menuLinks: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Projects",
        link: "/projects",
      },
      {
        name: "About",
        link: "/about",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`projectTitle`, `categories`, `slug`, `id`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          ContentfulProjects: {
            projectTitle: (node: { projectTitle: string }) => node.projectTitle,
            categories: (node: { categories: string }) => node.categories,
            slug: (node: { slug: string }) => node.slug,
            id: (node: { id: string }) => node.id,
            // path: node => node.path,
          },
        },
        // Optional filter to limit indexed nodes
        // filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-emotion",
    "gatsby-plugin-netlify",
  ],
};

export default config;
