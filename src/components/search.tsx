import React, { useState, useEffect } from "react";
import { Index, DocumentStore } from "elasticlunr";
import { Link } from "gatsby";
import { Search } from "react-bootstrap-icons";
import styled from "@emotion/styled";

interface SearchResult {
  slug: string;
  projectTitle: string;
  id: string;
  categories: string[];
}
interface SearchIndex {
  searchIndex: string;
}

const SearchProject = ({ searchIndex }: SearchIndex) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  let index: Index<SearchResult> | null = null;

  // Function to get or create the search index
  const getOrCreateIndex = () =>
    index ? index : Index.load<SearchResult>(JSON.parse(searchIndex));

  // Function to perform search based on the provided query
  const performSearch = (searchQuery: string) => {
    // Update index by either using the existing one or loading a new one
    index = getOrCreateIndex();

    // Perform search and map results to SearchResult type
    const searchResults = index
      .search(searchQuery, { expand: true })
      .map(
        ({ ref }: { ref: string }) =>
          index!.documentStore.getDoc(ref) as SearchResult
      );

    // Set search results in the state
    setResults(searchResults);
  };

  useEffect(() => {
    if (query.length >= 2) {
      // Perform the search only if the query length is at least three characters
      performSearch(query);
    } else {
      // If the query is less than three characters, clear the results
      setResults([]);
    }
  }, [query]);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <label htmlFor="search">
        <input
          id="search"
          style={{ width: "100%", height: "27px", borderRadius: "5px" }}
          type="text"
          value={query}
          placeholder="Search..."
          onChange={(evt) => setQuery(evt.target.value)}
        />
      </label>
      <Search
        style={{
          color: "black",
          fontSize: "16px",
          position: "absolute",
          right: "0px",
          top: "8px",
        }}
      />
      <ul style={{ width: "100%", padding: "0" }}>
        {results.map((project) => (
          <StyledLi key={project.id}>
            <Link to={`/projects/${project.slug}`}>{project.projectTitle}</Link>

            <p style={{ paddingLeft: "2px", fontSize: "12px" }}>
              {project.categories.toString()}
            </p>
          </StyledLi>
        ))}
        {results.length === 0 && query.length >= 2 && (
          <li
            style={{
              fontSize: "14px",
              padding: "6px 0px 3px 0px",
              listStyle: "none",
            }}
          >
            No search result
          </li>
        )}
      </ul>
    </div>
  );
};
const StyledLi = styled.li`
  cursor: pointer;
  font-size: 14px;
  padding: 6px 0px 3px 0px;
  list-style: none;
  letter-spacing: 0.7px;

  &:hover {
    font-weight: 700;
  }
`;

export default SearchProject;
