import { useState } from "react";
const Search = () => {
  // Example of calling the API from a component
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `/api/look?searchTerm=${encodeURIComponent(searchTerm)}`,
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  return (
    <>
      <div>Search</div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          aria-label="Search"
        />

        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default Search;
