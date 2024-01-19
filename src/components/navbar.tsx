import React, { useEffect, useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { Search, X, List } from "react-bootstrap-icons";
import Header from "./header";

function NavBar() {
  const [showSearchContainer, setShowSearchContainer] = useState(false);
  const [smallScreenMenu, setSmallScreenMenu] = useState(
    typeof window !== "undefined" && window.innerWidth > 768 ? false : true
  );
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      // Check if window is defined and its width is greater than 768 pixels
      if (typeof window !== "undefined" && window.innerWidth > 768) {
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
  }, []);

  return (
    <Container>
      {smallScreenMenu && (
        <nav
          style={{
            color: "white",
            padding: "20px",
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
          }}
        >
          {showHamburgerMenu ? (
            <X
              style={{
                fontSize: "30px",
                color: "white",
                zIndex: 100,
                cursor: "pointer",
              }}
              onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
            />
          ) : (
            <List
              style={{
                fontSize: "30px",
                color: "white",
                zIndex: 100,
                cursor: "pointer",
              }}
              onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
            />
          )}
          {showHamburgerMenu && (
            <HamburgerMenuList>
              {data.site.siteMetadata.menuLinks.map((link: any, index: any) => (
                <ListItem key={index} className="menu-item">
                  <Link
                    activeStyle={{
                      borderBottom: "solid white 1.5px",
                      borderRight: "solid white 1.5px",
                      padding: "0 5px 5px 0",
                    }}
                    to={link.link}
                  >
                    {link.name}
                  </Link>
                </ListItem>
              ))}
              <ListItem>
                <Header />
              </ListItem>
            </HamburgerMenuList>
          )}
        </nav>
      )}
      {!smallScreenMenu && (
        <nav>
          <NavBarList>
            {data.site.siteMetadata.menuLinks.map((link: any, index: any) => (
              <ListItem key={index}>
                <Link
                  activeStyle={{
                    borderBottom: "solid white 1.5px",
                    borderRight: "solid white 1.5px",
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
                <X
                  cursor={"pointer"}
                  fontSize={"24px"}
                  onClick={() => setShowSearchContainer(!showSearchContainer)}
                />
              ) : (
                <Search
                  cursor={"pointer"}
                  onClick={() => setShowSearchContainer(!showSearchContainer)}
                />
              )}
            </ListItem>
          </NavBarList>
          {showSearchContainer && (
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                padding: "5px 50px",
                backgroundColor: "#272626",
                height: "200px",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Header />
            </div>
          )}
        </nav>
      )}
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
const NavBarList = styled.ul`
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
const HamburgerMenuList = styled.ul`
  background: #333232;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  width: 170px;
`;

export default NavBar;
