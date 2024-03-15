import { useEffect, useState } from "react";
const Search = () => {
  // Example of calling the API from a component
  const [searchTerm, setSearchTerm] = useState("");
  const [goSearch, setGoSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/look?searchTerm=${encodeURIComponent(goSearch)}`,
      );
      const data = await response.json();
      console.log(data);
      // onResultChange(data);
      // onShowGameChange(data[0]);
      // onGetResultChange(true);
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
