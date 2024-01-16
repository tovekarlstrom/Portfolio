import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { Border, BorderBottom, Search, X } from "react-bootstrap-icons";
import Header from "./header";
// export const query = graphql`
//   query MyQuery {
//     allContentfulProjects {
//       nodes {
//         id
//         slug
//         projectTitle
//         projectDescription {
//           raw
//         }
//         categories
//         projectImages {
//           url
//         }
//         projectThumbnail {
//           url
//         }
//       }
//     }
//   }
// `;

function NavBar() {
  const [showSearchContainer, setShowSearchContainer] = useState(false);

  const [categoryData, setCategoryData] = useState("Select category");
  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (index: any) => {
    setSelectedLink(index);
  };
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `);

  // const dataResult = data.allContentfulProjects.nodes || [];
  // console.log("data", dataResult);
  // const allCategories = Array.from(
  //   new Set(dataResult.flatMap((post: any) => post.categories))
  // );
  // console.log("allCategories", allCategories);
  // const filteredPosts = dataResult.filter((post: any) => {
  //   if (categoryData !== "Select category") {
  //     return post.categories.includes(categoryData);
  //   }
  // });
  // const clickedListElement = {
  //   border: "solid 2px black",
  // };
  return (
    <Container>
      <nav>
        <List>
          {data.site.siteMetadata.menuLinks.map((link: any, index: any) => (
            <ListItem key={index}>
              <Link
                activeStyle={{
                  borderBottom: "solid black 1.5px",
                  borderRight: "solid black 1.5px",
                  padding: "5px",
                }}
                to={link.link}
              >
                {link.name}
              </Link>
            </ListItem>
          ))}
          <ListItem>
            {showSearchContainer ? (
              <X onClick={() => setShowSearchContainer(!showSearchContainer)} />
            ) : (
              <Search
                onClick={() => setShowSearchContainer(!showSearchContainer)}
              />
            )}
          </ListItem>
        </List>
        {showSearchContainer && (
          <div>
            <Header />
            {/* <select onChange={(e) => setCategoryData(e.target.value)}>
              <option value="Select category">Select category</option>
              {allCategories.map((category: any, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ul>
              {filteredPosts.map((item: any) => (
                <li key={item.id}>{item.projectTitle}</li>
              ))}
            </ul> */}
          </div>
        )}
      </nav>
    </Container>
  );
}

const ListItem = styled.li`
  list-style: none;
  color: white;
  font-size: 20px;
  font-family: Georgia, "Times New Roman", Times, serif;
  padding: 20px;
  a {
    color: white;
  }
`;
const List = styled.ul`
  background-color: rgba(217, 217, 217, 0);
  display: flex;
  justify-content: right;
  padding: 20px;
  margin: 0;
`;
const Container = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
`;

export default NavBar;
