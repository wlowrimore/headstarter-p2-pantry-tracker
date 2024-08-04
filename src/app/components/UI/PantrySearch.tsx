"use client";

import { useState } from "react";

const PantrySearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  console.log("Search query:", searchQuery);
  if (onSearch) {
    onSearch(searchQuery);
  }
  console.log("Search query:", searchQuery);
  return (
    <form>
      <input
        type="text"
        onChange={handleSearch}
        style={{
          border: "1px solid gray",
          borderRadius: "0.25rem",
          padding: "0.25rem 0.5rem",
          backgroundColor: "none",
          outline: "none",
        }}
        placeholder="Search Pantry"
      />
    </form>
  );
};

export default PantrySearch;
