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
      <main>
        <div>
          <h1>{posts.title}</h1>
          {/* {image && (
            <GatsbyImage
              image={image}
              alt=""
              style={{
                objectFit: "cover",
                width: "200px",
                height: "220px",
                position: "absolute",
                right: "0",
                zIndex: "-1",
              }}
            />
          )} */}
        </div>

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
  padding: 5px;
  max-width: 600px;
  h2 {
    padding: 10px 0;
  }
  p {
    padding-left: 5px;
  }
`;
export default About;
