import React, { useState, useEffect } from "react";
import { Index, DocumentStore } from "elasticlunr";
import { Link } from "gatsby";

interface SearchResult {
  slug: string;
  projectTitle: string;
  id: string;
  categories: string[];
}

const Search = ({ searchIndex }: any) => {
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
  console.log("hej", results);
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
    <div>
      <input
        type="text"
        value={query}
        onChange={(evt) => setQuery(evt.target.value)}
      />
      <ul>
        {results.map((page) => (
          <li key={page.id}>
            <Link to={`/${page.slug}`}>{page.projectTitle}</Link>

            <p>{page.categories.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
