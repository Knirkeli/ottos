import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search listings..."
        className="px-4 py-2 border rounded-l shadow-sm focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Search
      </button>
    </div>
  );
};
