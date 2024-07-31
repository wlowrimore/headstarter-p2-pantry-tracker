"use client";

import { useState, useEffect } from "react";
import { Box, Link } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { extractFirstName } from "../../utils/helpers";
import { Ingredients } from "../../interfaces";
import ItemsTable from "./ItemsTable";
const PantryMain: React.FC = () => {
  const [pantryItems, setPantryItems] = useState<Ingredients[]>([]);
  const { data: session } = useSession();
  const name = extractFirstName();

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const items = await getPantryItems();
  //     setPantryItems(items);
  //   };
  //   fetchItems();
  // }, []);

  return (
    <Box style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {!session ? (
        <p>
          Oops! You forgot to
          <span
            onClick={() => signIn("google", { callbackUrl: "pantry/" })}
            style={{ textDecoration: "underline", color: "red" }}
          >
            signIn
          </span>
          ...
        </p>
      ) : (
        <Box>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <h1
              style={{
                width: "100%",
                fontSize: "1.8rem",
                color: "#d9fcea",
                padding: "0.8rem 1.5rem",
                borderBottom: "1px solid #d9fcea",
                backgroundColor: "#2B3C34",
              }}
            >
              {name}&apos;s Pantry
            </h1>
          </Box>
        </Box>
      )}
      {/* {pantryItems?.map((item) => (
        <Box key={item.id}>
          <p>{item.name}</p>
        </Box>
      ))} */}
      <ItemsTable />
    </Box>
  );
};

export default PantryMain;
