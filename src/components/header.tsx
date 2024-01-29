import React from "react";
import { StaticQuery, graphql } from "gatsby";

import SearchProject from "./search";
interface QueryResult {
  siteSearchIndex: {
    index: string;
  };
}

const Header = () => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={(data: QueryResult) => (
      <header>
        <SearchProject searchIndex={data.siteSearchIndex.index} />
      </header>
    )}
  />
);

export default Header;
