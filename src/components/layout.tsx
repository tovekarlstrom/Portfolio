import * as React from "react";
import { useStaticQuery, graphql, HeadFC } from "gatsby";
import NavBar from "./navbar";
import { Footer } from "./footer";
import "../style.css";

const Layout = ({ title, children }: any) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  // const query = graphql`
  //   query MyQuery {
  //     allContentfulProjects {
  //       nodes {
  //         id
  //         categories
  //         slug
  //         projectTitle
  //       }
  //     }
  //   }
  // `;
  return (
    <>
      <head>
        {/* <title>{data.site.siteMetadata.title}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway&display=swap"
          rel="stylesheet"
        /> */}
        <html lang="en" />
        <meta name="description" content="Portfolio page"></meta>
        <title>Portfolio</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </head>

      <NavBar />

      {children}
      <Footer />
      {/* <footer>
        © {new Date().getFullYear()}, Built with {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>{" "}
      </footer> */}
    </>
  );
};

export default Layout;
export const Head: HeadFC = () => (
  <head>
    <title>Home Page</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Raleway&display=swap"
      rel="stylesheet"
    />
    {/* Other head elements */}
  </head>
);
