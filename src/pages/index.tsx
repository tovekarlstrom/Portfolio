import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styled from "@emotion/styled";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const query = graphql`
  query MyQuery {
    contentfulPages(slug: { eq: "front-page" }) {
      slug
      title
      description {
        raw
      }
      image {
        gatsbyImageData
      }
    }
  }
`;
interface Contentful {
  data: {
    contentfulPages: {
      slug: string;
      title: string;
      description: {
        raw: string;
      };
      image: {
        gatsbyImageData: any;
      };
    };
  };
}

const IndexPage = ({ data }: Contentful) => {
  const frontPageData = data.contentfulPages;
  const image = getImage(data.contentfulPages.image);

  return (
    <Layout data={data}>
      <main>
        <UpperContainer>
          <InnerLeftContainer>
            <h1
              style={{
                color: "#F5F5F5",
                fontSize: "52px",
                fontWeight: "400",
              }}
            >
              {frontPageData.title}
            </h1>

            {documentToReactComponents(
              JSON.parse(frontPageData.description.raw)
            )}
          </InnerLeftContainer>
          {image && (
            <GatsbyImage
              image={image}
              alt=""
              style={{
                objectFit: "cover",
                width: "500px",
                height: "520px",
                position: "absolute",
                right: "0",
                top: "40%",
                zIndex: "0",
              }}
            />
          )}
        </UpperContainer>
      </main>
    </Layout>
  );
};
const UpperContainer = styled.div`
  display: flex;
  background-color: "#898D80";
  position: relative;
  height: 50vh;
  width: 100%;
  margin-top: 30px;
  img {
    width: 500px;
    height: 520px;
  }

  @media (min-width: 768px) {
    margin-top: 170px;
    img {
      width: 700px;
      height: 730px;
    }
  }
`;

const InnerLeftContainer = styled.div`
  position: absolute;
  width: 60%;
  left: 10%;
  z-index: 1;
  h1 {
    font-size: 30px !important;
  }
  h2 {
    margin-top: 50px;
    font-size: 20px;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 52px;
    }
    h2 {
      margin-top: 100px;
      font-size: 30px;
      font-weight: 400;
    }
  }
`;

export default IndexPage;
