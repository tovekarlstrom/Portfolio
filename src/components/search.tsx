import React, { useState, useEffect } from "react";
import { Index, DocumentStore } from "elasticlunr";
import { Link } from "gatsby";
import { Search } from "react-bootstrap-icons";

interface SearchResult {
  slug: string;
  projectTitle: string;
  id: string;
  categories: string[];
}

const SearchProject = ({ searchIndex }: any) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  let index: Index<SearchResult> | null = null;

  const getOrCreateIndex = () =>
    index ? index : Index.load<SearchResult>(searchIndex);

  const performSearch = (searchQuery: string) => {
    index = getOrCreateIndex();
    const searchResults = index
      .search(searchQuery, { expand: true })
      .map(
        ({ ref }: { ref: string }) =>
          index!.documentStore.getDoc(ref) as SearchResult
      );
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
      <input
        style={{ width: "100%" }}
        type="text"
        value={query}
        onChange={(evt) => setQuery(evt.target.value)}
      />
      <Search
        style={{
          color: "black",
          fontSize: "15px",
          position: "absolute",
          right: "0px",
          top: "6px",
        }}
      />
      <ul style={{ width: "100%", padding: "0" }}>
        {results.map((page) => (
          <li
            style={{
              cursor: "pointer",
              fontSize: "14px",
              padding: "6px 0px 3px 0px",
              listStyle: "none",
            }}
            key={page.id}
          >
            <Link to={`/projects/${page.slug}`}>{page.projectTitle}</Link>

            <p style={{ paddingLeft: "2px", fontSize: "12px" }}>
              {page.categories.toString()}
            </p>
          </li>
        ))}
        {results.length === 0 && query.length >= 2 && (
          <li
            style={{
              cursor: "pointer",
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

export default SearchProject;
