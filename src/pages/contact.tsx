import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const query = graphql`
  query MyQuery {
    contentfulPages(slug: { eq: "contact" }) {
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
export default function Contact({ data }: any) {
  const siteTitle = `Title`;
  const contactData = data.contentfulPages;
  return (
    <Layout>
      <main>
        <h1>{contactData.title}</h1>
        <div>
          {documentToReactComponents(JSON.parse(contactData.description.raw))}
        </div>
      </main>
    </Layout>
  );
}
