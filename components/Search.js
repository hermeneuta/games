import { useEffect, useState } from "react";
const Search = ({ onResultChange, onShowGameChange, onGetResultChange }) => {
  // Example of calling the API from a component
  const [searchTerm, setSearchTerm] = useState("");
  const [goSearch, setGoSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!goSearch) return;
      const response = await fetch(
        `/api/look?searchTerm=${encodeURIComponent(goSearch)}`,
      );
      const responseJson = await response.json();
      const data = Array.isArray(responseJson) ? responseJson : [responseJson];
      onResultChange(data);
      onShowGameChange(data);
      onGetResultChange(true);
    };
    fetchData();
  }, [goSearch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setGoSearch(searchTerm);
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
