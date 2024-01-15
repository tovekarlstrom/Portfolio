import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const query = graphql`
  query MyQuery {
    contentfulPages(slug: { eq: "about-me" }) {
      slug
      title
      description {
        raw
      }
      image {
        url
      }
    }
  }
`;
const About = ({ data }: any) => {
  const siteTitle = `Title`;
  const posts = data.contentfulPages;

  return (
    <Layout>
      <main>
        <h1>{posts.title}</h1>
        <img src={posts.image.url} alt="" />
        <div>
          {documentToReactComponents(JSON.parse(posts.description.raw))}
        </div>
      </main>
    </Layout>
  );
};
export default About;
