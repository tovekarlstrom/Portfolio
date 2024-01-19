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
  const posts = data.contentfulAbout;

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
          <InnerContainer>
            {documentToReactComponents(JSON.parse(posts.description.raw))}
            {documentToReactComponents(JSON.parse(posts.education.raw))}
            {documentToReactComponents(JSON.parse(posts.experience.raw))}
          </InnerContainer>
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
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  background-color: #333232;
  p {
    padding: 3px;
  }
  h2 {
    padding: 10px 0;
  }
  p {
    padding-left: 5px;
  }
`;
const InnerContainer = styled.span`
  p {
    padding: 10px;
  }
`;
export default About;
