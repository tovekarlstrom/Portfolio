import type { GatsbyNode } from "gatsby";
import path from "path";

interface ProjectNode {
  projectTitle: string;
  slug: string;
}

interface AllContentfulProjects {
  nodes: ProjectNode[];
}

interface QueryResult {
  allContentfulProjects: AllContentfulProjects;
}

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;
  // Define a template for blog post
  const blogPost = path.resolve("./src/templates/blog-post.tsx");
  const result = await graphql<QueryResult>(`
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
  const posts = result.data?.allContentfulProjects.nodes;
  if (posts && posts.length > 0) {
    posts.forEach((post: ProjectNode) => {
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
