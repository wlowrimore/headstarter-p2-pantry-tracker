"use client";

import { useState, useEffect } from "react";
import { Input } from "@mui/material";
import { Ingredients } from "../interfaces";

const ItemSearch = ({
  ingredients,
  onFilterChange,
}: {
  ingredients: Ingredients[];
  onFilterChange: (filteredItems: Ingredients[]) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<Ingredients[]>([]);

  const filterIngredients = (ingredients: Ingredients[], query: string) => {
    if (!query) {
      return ingredients;
    }

    return ingredients.filter((item: Ingredients) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    console.log("Search query:", query);
    setSearchQuery(query);
    const updatedList = filterIngredients(ingredients, query);
    setFilteredItems(updatedList);
    if (onFilterChange) {
      onFilterChange(updatedList);
    }
    onFilterChange(updatedList);
  };
  useEffect(() => {
    const updatedList = filterIngredients(ingredients, searchQuery);
    setFilteredItems(updatedList);
  }, [searchQuery]);

  return (
    <>
      <form style={{ display: "flex", alignItems: "center" }}>
        <Input
          sx={{ backgroundColor: "#f5f5f5", padding: "0.25rem 0.5rem" }}
          onChange={handleSearch}
          value={searchQuery}
          type="text"
          placeholder="Search By Name"
        />
      </form>
    </>
  );
};

export default ItemSearch;

// "use client";

// import { useState, useEffect, SetStateAction } from "react";
// import { Input } from "@mui/material";
// import { Ingredients } from "../../interfaces";

// const ItemSearch = ({
//   ingredients = [],
//   onFilterChange,
// }: {
//   ingredients?: Ingredients[];
//   onFilterChange: React.Dispatch<SetStateAction<Ingredients[]>>;
// }) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [filteredItems, setFilteredItems] = useState<Ingredients[]>([]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//   };

//   useEffect(() => {
//     console.log("Search query in useEffect:", searchQuery);
//     if (searchQuery) {
//       const updatedList = ingredients.filter((item: Ingredients) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       console.log("Filtered items:", updatedList);
//       setFilteredItems(updatedList);
//       onFilterChange(updatedList); // Call onFilterChange with filtered items
//     }
//   }, [searchQuery]);

//   return (
//     <>
//       <form style={{ display: "flex", alignItems: "center" }}>
//         <Input
//           onChange={handleSearch}
//           value={searchQuery}
//           type="text"
//           placeholder="Search By Name"
//         />
//       </form>
//     </>
//   );
// };

// export default ItemSearch;
