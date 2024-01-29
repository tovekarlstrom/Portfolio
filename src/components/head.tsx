import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql, HeadFC } from "gatsby";

const Head = () => {
  const data = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <Helmet>
      <html lang="en" />
      <meta name="description" content="Portfolio page"></meta>
      <title>{data.site.siteMetadata.title}</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default Head;
