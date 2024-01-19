import { GatsbyNode } from "gatsby";
import path from "path";

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Define a template for blog post
  const blogPost = path.resolve("./src/templates/blog-post.tsx");
  const result = await graphql(`
    {
      allContentfulProjects {
        nodes {
          projectTitle
          slug
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    );
    return;
  }
  const posts = result.data.allContentfulProjects.nodes;
  if (posts.length > 0) {
    posts.forEach((post: any) => {
      createPage({
        path: `projects/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
        },
      });
    });
  }
};
