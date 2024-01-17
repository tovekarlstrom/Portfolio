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

  return (
    <>
      <head>
        <html lang="en" />
        <meta name="description" content="Portfolio page"></meta>
        <title>Portfolio</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </head>

      <NavBar />

      {children}
      <Footer />
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
  </head>
);
