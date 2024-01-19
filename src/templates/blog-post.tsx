import React, { useEffect, useState } from "react";
import { X, CaretRight } from "react-bootstrap-icons";
import { Link, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/layout";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";

const Blog = ({ data }: any) => {
  const posts = data.contentfulProjects;
  const [imageIndex, setImageIndex] = useState(null);
  const [smallScreenMenu, setSmallScreenMenu] = useState(
    typeof window !== "undefined" && window.innerWidth > 890 ? false : true
  );
  const image = getImage(data.contentfulProjects.images);

  // useEffect to handle window resize events
  useEffect(() => {
    // Function to handle resize events
    const handleResize = () => {
      // Check if window is defined and its width is greater than 890 pixels
      if (typeof window !== "undefined" && window.innerWidth > 890) {
        // If true, set smallScreenMenu to false
        setSmallScreenMenu(false);
      } else {
        // If false, set smallScreenMenu to true
        setSmallScreenMenu(true);
      }
    };

    // Add event listener for resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array indicates this effect runs once on mount
  return (
    <Layout>
      <main>
        <Container blurBackground={imageIndex !== null}>
          <ProjectTitle>{posts.projectTitle}</ProjectTitle>
          <div
            style={{
              position: "relative",
              margin: "100px 10% 200px 10%",
            }}
          >
            <ProjectInfoContainer>
              {documentToReactComponents(
                JSON.parse(posts.projectDescription.raw)
              )}
            </ProjectInfoContainer>
            <InfoContainer>
              <ArtSpan></ArtSpan>
              <Category>{posts.categories.join(", ")}</Category>
            </InfoContainer>
          </div>

          <div
            style={{
              width: `${smallScreenMenu ? "360px" : "600px"}`,
              margin: "0!",
            }}
          >
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              centeredSlides={true} // Center the active slide
              centeredSlidesBounds={true} // Center the slide within bounds
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              {posts.images &&
                posts.images.map((item: any, index: string) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => setImageIndex(item.gatsbyImageData)}
                  >
                    <div
                      style={{
                        padding: "20px",
                        cursor: "pointer",
                        width: `${smallScreenMenu ? "200px" : "400px"}`,
                        height: `${smallScreenMenu ? "200px" : "400px"}`,

                        objectFit: "cover",
                        backgroundColor: "#333232",
                        margin: "50px",
                        marginLeft: `${smallScreenMenu ? "60px" : "90px"}`,

                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      {item && (
                        <GatsbyImage
                          image={item.gatsbyImageData}
                          alt={item.description}
                          imgStyle={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              ...
            </Swiper>
          </div>

          <LinkToProject>
            {documentToReactComponents(JSON.parse(posts.links.raw))}
            <ArtSpanContainer top="70px" right="40px">
              <div
                style={{
                  position: "relative",
                  width: "180px",
                  height: "220px",
                }}
              >
                <ArtSpanTop></ArtSpanTop>
                <ArtSpanBottom></ArtSpanBottom>
              </div>
            </ArtSpanContainer>
          </LinkToProject>
        </Container>
        {imageIndex !== null && (
          <ImageOverlay>
            <div style={{ position: "absolute" }}></div>
            <X
              onClick={() => setImageIndex(null)}
              style={{
                cursor: "pointer",
                fontSize: "30px",
                objectFit: "cover",
                position: "absolute",
                top: "2px",
                right: "2px",
                color: "white",
              }}
            />

            {imageIndex && (
              <GatsbyImage
                image={imageIndex}
                alt="showing the same image but larger in a modal"
                imgStyle={{
                  width: "100%",
                  height: "100%",
                  zIndex: "20",
                }}
              />
            )}
          </ImageOverlay>
        )}
      </main>
    </Layout>
  );
};
export default Blog;
const LinkToProject = styled.div`
  width: 90%;
  padding-left: 32px;
  /* padding-right: 32px; */
  position: relative;
  padding-top: 190px;

  a {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-decoration-line: underline;
    padding: 5px;
  }
`;

const ArtSpanTop = styled.div`
  position: absolute;
  top: 0;
  right: 55px;
  z-index: -3;
  width: 108px;
  height: 108px;
  height: 108px;
  border-top-left-radius: 100px;
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
`;

const ProjectTitle = styled.h1`
  margin: 20px;
  margin-top: 100px;
  font-size: 40px;
  /* margin-bottom: 600px; */
`;

const Container = styled.div<{ blurBackground: boolean }>`
  padding-bottom: 100px;
  filter: ${(props) => (props.blurBackground ? "blur(5px)" : "none")};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 60%;
  left: 5%;
  right: 5%;
  max-width: 90%;
  padding: 27px;
  background-color: #333232;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  @media (min-width: 768px) {
    left: 20%;
    right: 20%;
    max-width: 60%;
  }
`;

const ArtSpan = styled.div`
  position: absolute;
  bottom: 0;
  left: -10%;
  width: 60px;
  height: 100%;
  border-top-left-radius: 50px;
  background-color: #d7932d;
`;
const Category = styled.p`
  padding: 20px;
  max-width: 200px;
  position: absolute;
  bottom: -40px;
  left: -5%;
  color: black;
  background-color: rgba(237, 207, 120, 0.75);
`;
const ProjectInfoContainer = styled.div`
  padding: 30px;
  z-index: 11;
  background: #333232;
  max-width: 600px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
`;
const InfoContainer = styled.div`
  padding-top: 55px;

  width: 50%;
`;

export const query = graphql`
  query MyQuery($slug: String!) {
    contentfulProjects(slug: { eq: $slug }) {
      id
      slug
      projectTitle
      projectDescription {
        raw
      }

      images {
        description
        gatsbyImageData
      }
      link
      categories
      links {
        raw
      }
    }
  }
`;
