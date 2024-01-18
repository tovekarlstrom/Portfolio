import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";

export const query = graphql`
  query MyQuery {
    contentfulAbout(slug: { eq: "about" }) {
      slug
      title
      description {
        raw
      }
      education {
        raw
      }
      experience {
        raw
      }
      skills {
        raw
      }
      portrait {
        gatsbyImageData
      }
    }
  }
`;
const About = ({ data }: any) => {
  const siteTitle = `Title`;
  const posts = data.contentfulAbout;
  const image = getImage(data.contentfulAbout.portrait);

  return (
    <Layout>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{posts.title}</h1>
        <InfoContainer>
          {documentToReactComponents(JSON.parse(posts.description.raw))}
          {documentToReactComponents(JSON.parse(posts.education.raw))}
          {documentToReactComponents(JSON.parse(posts.experience.raw))}
          {documentToReactComponents(JSON.parse(posts.skills.raw))}
        </InfoContainer>
      </main>
    </Layout>
  );
};
const InfoContainer = styled.div`
  padding: 10px;
  margin: 20px 10px;
  max-width: 600px;
  border-radius: 30px;

  background: #333232;
  /* background: linear-gradient(
    180deg,
    rgba(207, 99, 99, 0.75) 33.26%,
    #d7932d 100%
  ); */

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  h2 {
    padding: 10px 0;
  }
  p {
    padding-left: 5px;
  }
`;
export default About;
