import React, { useState } from "react";
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

const Blog = ({ data }: any) => {
  const posts = data.contentfulProjects;
  const [imageIndex, setImageIndex] = useState("");
  console.log("indexImage", imageIndex);
  return (
    <Layout>
      <Container blurBackground={imageIndex !== ""}>
        <ProjectTitle>{posts.projectTitle}</ProjectTitle>
        {/* <div style={{ width: "200px" }}>
            {posts.projectThumbnail && (
              <img
                style={{ width: "100%" }}
                src={posts.projectThumbnail.url}
                alt=""
              />
            )}
          </div> */}

        {/* {posts.projectImages && <img src={posts.projectImages.url} alt="" />} */}

        {/* {posts.images &&
              posts.images.map((item: any, index: string) => (

                  <div
                    style={{
                      padding: "20px",
                      paddingBottom: "40px",
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                      backgroundColor: "#333232",
                      margin: "10px",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <img
                      onClick={() => setImageIndex(item.url)}
                      key={item.url}
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      src={item.url}
                      alt=""
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "40px",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ color: "#CF6363" }}>View</p>
                      <CaretRight color="#CF6363" />
                    </div>
                  </div> */}

        <InfoContainer>
          <ArtSpan></ArtSpan>
          <Hej>{posts.categories.join(", ")}</Hej>
          <ProjectInfoContainer>
            {documentToReactComponents(
              JSON.parse(posts.projectDescription.raw)
            )}
          </ProjectInfoContainer>
        </InfoContainer>

        <div style={{ width: "360px", margin: "0!" }}>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            centeredSlides={true} // Center the active slide
            centeredSlidesBounds={true} // Center the slide within bounds
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {posts.images &&
              posts.images.map((item: any, index: string) => (
                <SwiperSlide>
                  <div
                    style={{
                      padding: "20px",
                      cursor: "pointer",
                      paddingBottom: "40px",
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                      backgroundColor: "#333232",
                      margin: "50px",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <img
                      onClick={() => setImageIndex(item.url)}
                      key={item.url}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      src={item.url}
                      alt=""
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "40px",
                        alignItems: "center",
                      }}
                    >
                      {/* <p style={{ color: "#CF6363" }}>View</p>
                        <CaretRight color="#CF6363" /> */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            ...
          </Swiper>
        </div>

        <LinkToProject>
          <Link to="https://healthlab.onrender.com/">
            Link to the publiched project
          </Link>
          <ArtSpanContainer top="70px" right="40px">
            <div
              style={{ position: "relative", width: "180px", height: "220px" }}
            >
              <ArtSpanTop></ArtSpanTop>
              <ArtSpanBottom></ArtSpanBottom>
            </div>
          </ArtSpanContainer>
        </LinkToProject>
      </Container>
      {imageIndex !== "" && (
        <ImageOverlay>
          <div style={{ position: "absolute" }}></div>
          <X
            onClick={() => setImageIndex("")}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              objectFit: "cover",
              position: "absolute",
              top: "2px",
              right: "2px",
            }}
          />

          <img style={{ width: "100%" }} src={imageIndex} alt="" />
        </ImageOverlay>
      )}
    </Layout>
  );
};
export default Blog;
const LinkToProject = styled.div`
  width: 100%;
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
`;

const Container = styled.div<{ blurBackground: boolean }>`
  padding-bottom: 100px;
  filter: ${(props) => (props.blurBackground ? "blur(5px)" : "none")};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  position: relative;
`;
const ImageOverlay = styled.div`
  position: absolute;
  top: 50%;
  margin: 10%;
  padding: 20px;
  background-color: white; /* Set the background color of the overlay */
  width: 80%; /* Adjust the width of the overlay as needed */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add a shadow to the overlay */
`;

const ArtSpan = styled.div`
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 200px;
  height: 300px;
  border-top-left-radius: 50px;
  background-color: #d7932d;
`;
const Hej = styled.p`
  padding: 30px;
  max-width: 200px;
  position: absolute;
  bottom: -10px;
  left: 20%;
  background-color: rgba(237, 207, 120, 0.75);
`;
const ProjectInfoContainer = styled.div`
  position: absolute;
  bottom: 40%;
  left: 27%;
  max-width: 70%;
  min-width: 55%;
`;
const InfoContainer = styled.div`
  padding-top: 300px;
  padding-bottom: 100px;
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100%;
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
      categories
      projectImages {
        url
      }
      projectThumbnail {
        url
      }
      images {
        url
      }
    }
  }
`;
