import React from "react";
import { StaticQuery, graphql } from "gatsby";

import SearchProject from "./search";

const Header = () => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={(data) => (
      <header>
        <SearchProject searchIndex={data.siteSearchIndex.index} />
      </header>
    )}
  />
);

export default Header;
