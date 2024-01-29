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
        description
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
        gatsbyImageData: {
          images: {
            fallback: {
              src: string;
              srcSet: string;
              sizes: string;
            };
          };
          layout: string;
          backgroundColor: string;
          width: number;
          height: number;
          placeholder: string;
          blurredOptions: {
            width: number;
          };
          formats: string[];
          aspectRatio: number;
        };
        description: string;
      };
    };
  };
}

const IndexPage = ({ data }: Contentful) => {
  const frontPageData = data.contentfulPages;
  const image = getImage(data.contentfulPages.image);

  return (
    <Layout>
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
            <ImageConteiner>
              <GatsbyImage
                style={{
                  width: "100%",
                  height: "100%",
                }}
                image={image}
                alt={frontPageData.image.description}
              />
            </ImageConteiner>
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
`;
const ImageConteiner = styled.div`
  position: absolute;
  z-index: -10;
  right: 0;
  top: 40%;

  height: 730px;

  @media (min-width: 659px) {
    width: 700px;
    height: 730px;
    top: 30%;
  }
`;

const InnerLeftContainer = styled.div`
  position: absolute;

  left: 10%;
  z-index: 1;
  h1 {
    font-size: 30px !important;
    padding-bottom: 30px;
  }
  p {
    font-size: 19px;
  }

  @media (min-width: 768px) {
    width: 60%;
    h1 {
      margin-top: 50px;
      font-size: 52px;
    }
  }
`;

export default IndexPage;
