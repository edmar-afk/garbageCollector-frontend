import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";

function Search({ search, setSearch }) {
  return (
    <form className="flex items-center w-96">
      <label htmlFor="file-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FolderIcon className="text-gray-400" fontSize="small" />
        </div>
        <input
          type="text"
          id="file-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 placeholder-gray-400"
          placeholder="Search Files..."
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <SearchIcon className="text-gray-400" fontSize="small" />
        </button>
      </div>
    </form>
  );
}

export default Search;
