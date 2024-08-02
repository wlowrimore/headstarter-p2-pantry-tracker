"use client";

import { SetStateAction, useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Input } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { Ingredients } from "../../interfaces";

const ItemSearch = ({
  ingredients,
  setFilteredItems,
}: {
  ingredients: Ingredients[];
  setFilteredItems: React.Dispatch<SetStateAction<Ingredients[]>>;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [originalItems, setOriginalItems] =
    useState<Ingredients[]>(ingredients);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const updatedList = ingredients.filter((item: Ingredients) =>
      item.name.toLowerCase().includes(query)
    );

    setFilteredItems(updatedList);
  };

  useEffect(() => {
    if (!searchQuery) {
      // Revert to full list when search query is empty
      setFilteredItems(ingredients);
    } else {
      const updatedList = ingredients.filter((item: Ingredients) =>
        item.name.toLowerCase().includes(searchQuery)
      );
      setFilteredItems(updatedList);
    }
  }, [searchQuery]);

  return (
    <>
      <form style={{ display: "flex", alignItems: "center" }}>
        <Input
          onChange={handleSearch}
          type="text"
          placeholder="Search By Name"
        />
      </form>
    </>
  );
};

export default ItemSearch;
