import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
const Search = ({
  onResultChange,
  onShowGameChange,
  onGetResultChange,
  onResultRef,
}) => {
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
      onResultRef();
    };
    fetchData();
  }, [goSearch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setGoSearch(searchTerm);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="berek"
          aria-label="Search"
          className="
    border-zinc-50 
    border-2 
    p-1 
    pl-5 // Adjust left padding as needed
    rounded-md 
    shadow-sm 
    focus:ring-2 
    focus:ring-blue-500 
    focus:border-transparent 
    outline-none 
    text-gray-700
  "
        />
        <button className="ml-4 justify-center items-center" type="submit">
          <MagnifyingGlassIcon className="font-bold w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Search;
