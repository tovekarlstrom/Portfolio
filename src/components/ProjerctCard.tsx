import React from "react";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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
        }
      }
    }
  }
`;

interface AllContentfulProjecs {
  data: {
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
    };
  };
}
export const ProjectCard = ({ data }: AllContentfulProjecs) => {
  const image = getImage(data.projectThumbnail.gatsbyImageData);

  return (
    <Link
      to={data.slug}
      style={{
        margin: "10px",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
          width: "332px",
          height: "407px",
          backgroundColor: "#333232",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "260px",
            height: "264px",
            marginBottom: "14px",
            objectFit: "cover",
          }}
        >
          {image ? (
            <GatsbyImage
              image={image}
              alt=""
              style={{
                width: "260px",
                height: "264px",
                objectFit: "contain",
              }}
            />
          ) : (
            // <img
            //   style={{ width: "100%" }}
            //   src={data.projectThumbnail.url}
            //   alt=""
            // />
            <ProjectTitleIcon>{data.projectTitle}</ProjectTitleIcon>
          )}
        </div>
        <div style={{ width: "260px" }}>
          <ProjectTitle>{data.projectTitle}</ProjectTitle>
          <ProjectLang>{data.categories[0]}</ProjectLang>
        </div>
      </div>
    </Link>
  );
};

const ProjectTitleIcon = styled.h2`
  color: black;
  font-size: medium;
  color: #444;
  text-shadow: 1px 0px 1px #ccc, 0px 1px 1px #eee, 2px 1px 1px #ccc,
    1px 2px 1px #eee, 3px 2px 1px #ccc, 2px 3px 1px #eee, 4px 3px 1px #ccc;
  /* 3px 4px 1px #eee, 5px 4px 1px #ccc, 4px 5px 1px #eee, 6px 5px 1px #ccc; */
  /* 5px 6px 1px #eee, 7px 6px 1px #ccc; */
`;
const ProjectTitle = styled.h2`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;
const ProjectLang = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
