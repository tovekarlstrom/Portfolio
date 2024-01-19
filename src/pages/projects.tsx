import * as React from "react";
import { useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import styled from "@emotion/styled";
import { ProjectCard } from "../components/ProjerctCard";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const query = graphql`
  query MyQuery {
    allContentfulProjects {
      nodes {
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
          gatsbyImageData
          description
        }
      }
    }
  }
`;
interface Contentful {
  data: {
    allContentfulProjects: {
      nodes: [
        {
          id: string;
          slug: string;
          projectTitle: string;
          projectDescription: { row: string };
          categories: string[];
          projectImages: {
            url: string;
          };
          projectThumbnail: {
            gatsbyImageData: any;
            description: string;
          };
        }
      ];
    };
  };
}

const IndexPage = ({ data }: Contentful) => {
  const projectData = data.allContentfulProjects.nodes;

  const [categoryData, setCategoryData] = useState("All");

  // Extract all unique categories from the projectData array of posts
  const allCategories = Array.from(
    new Set(projectData.flatMap((post: any) => post.categories))
  );

  // Filter posts based on selected categoryData: show all posts if "All" is chosen,
  // otherwise, return posts that include the selected category
  const filteredPosts = projectData.filter((post: any) => {
    if (categoryData === "All") {
      // Return all posts when "All" is selected
      return projectData;
    } else {
      // Return posts that include the selected category
      return post.categories.includes(categoryData);
    }
  });

  return (
    <Layout data={data}>
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Title>Projects</Title>

        <ArtSpan top="30px" left="10px"></ArtSpan>

        <ArtSpanContainer top="630px" right="10px">
          <div
            style={{ position: "relative", width: "180px", height: "220px" }}
          >
            <ArtSpanTop></ArtSpanTop>
            <ArtSpanBottom></ArtSpanBottom>
          </div>
        </ArtSpanContainer>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            zIndex: "1",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label htmlFor="category">
            <SelectCategory
              id="category"
              onChange={(e) => setCategoryData(e.target.value)}
            >
              <option value="All">All</option>
              {allCategories.map((category: any, index) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </SelectCategory>
          </label>
          <ProjectContainer>
            {filteredPosts.map((item: any) => (
              <ProjectCard key={item.id} data={item} />
            ))}
          </ProjectContainer>
        </section>
      </main>
    </Layout>
  );
};
const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin: 70px;
`;
const ArtSpan = styled.div<{ top: string; left: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 80px;
  height: 180px;
  border-top-left-radius: 50px;
  background-color: #d7932d;
`;
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
`;

const ProjectContainer = styled.div`
  display: flex;
  max-width: 60%;
  padding: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const SelectCategory = styled.select`
  width: 155px;
  height: 52px;
  margin-right: 40%;
  border-radius: 20px;
  background: #333232;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-style: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #f5f5f5;
  padding: 10px;
  cursor: pointer;
`;
export default IndexPage;
