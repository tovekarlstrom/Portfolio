import React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styled from "@emotion/styled";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const query = graphql`
  query MyQuery {
    contentfulPages(slug: { eq: "contact" }) {
      slug
      title
      description {
        raw
      }
      image {
        gatsbyImageData
      }
      link {
        raw
      }
    }
  }
`;
export default function Contact({ data }: any) {
  const siteTitle = `Title`;
  const contactData = data.contentfulPages;
  const image = getImage(data.contentfulPages.image);
  //log the image
  console.log("image", image);
  return (
    <Layout>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>{contactData.title}</h1>
        <div
          style={{
            width: "300px",
            height: "450px",
            backgroundColor: "green",
            position: "relative",
          }}
        ></div>

        <InfoContainer>
          <ArtSpan></ArtSpan>
          <Hej>@</Hej>
          <ProjectInfoContainer>
            {" "}
            {documentToReactComponents(JSON.parse(contactData.description.raw))}
          </ProjectInfoContainer>
        </InfoContainer>

        <div
          style={{
            padding: "50px",
            marginBottom: "200px",
            marginTop: "100px",
            position: "relative",
            maxWidth: "600px",
            minWidth: "350px",
          }}
        >
          <ArtSpanContainer top="0px" right="10px">
            <div
              style={{ position: "relative", width: "180px", height: "220px" }}
            >
              <LinkContainer>
                {documentToReactComponents(JSON.parse(contactData.link.raw))}
              </LinkContainer>
              <ArtSpanTop></ArtSpanTop>
              <ArtSpanBottom>
                {image && (
                  <GatsbyImage
                    image={image}
                    alt=""
                    style={{
                      objectFit: "cover",
                      width: "70px",
                      height: "70px",
                      position: "absolute",
                      right: "10px",
                      bottom: "10px",
                      zIndex: "0",
                    }}
                  />
                )}
              </ArtSpanBottom>
            </div>
          </ArtSpanContainer>
        </div>
      </main>
    </Layout>
  );
}

const ArtSpanTop = styled.div`
  position: absolute;
  top: 0;
  right: 55px;
  z-index: -3;
  width: 108px;
  height: 108px;
  height: 108px;
  border-top-left-radius: 50px;
  background-color: rgba(207, 99, 99, 0.75);
`;
const ArtSpanBottom = styled.div`
  position: absolute;
  bottom: 0;
  right: 0px;
  z-index: -4;
  width: 128px;
  height: 172px;
  border-bottom-right-radius: 50px;
  background-color: #d7932d;
`;
const ArtSpanContainer = styled.div<{ top: string; right: string }>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  width: 100%;
`;
const ArtSpan = styled.div`
  position: absolute;
  bottom: 0;
  left: 7%;
  width: 100px;
  height: 250px;
  border-top-left-radius: 50px;
  background-color: #d7932d;
`;
const Hej = styled.p`
  padding: 30px;
  max-width: 200px;
  position: absolute;
  bottom: -10px;
  left: 17%;
  background-color: rgba(237, 207, 120, 0.75);
`;
const ProjectInfoContainer = styled.div`
  position: absolute;
  bottom: 30%;
  left: 40%;
  max-width: 70%;
  min-width: 55%;
`;
const InfoContainer = styled.div`
  padding-top: 300px;
  padding-bottom: 100px;
  position: relative;
  display: flex;
  justify-content: space-around;
  max-width: 600px;
  min-width: 350px;
`;

const LinkContainer = styled.div`
  position: absolute;
  bottom: 30%;
  left: 0;
  z-index: 10;
`;
