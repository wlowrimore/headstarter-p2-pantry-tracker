"use client";

import { useState, useEffect } from "react";
import { Box, Button, Link } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { extractFirstName } from "../../utils/helpers";
import { Ingredients } from "../../interfaces";
import ItemsTable from "./ItemsTable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AddItems from "./AddItems";

const PantryMain: React.FC = () => {
  const [pantryItems, setPantryItems] = useState<Ingredients[]>([]);
  const [showAddItems, setShowAddItems] = useState<boolean>(false);
  const { data: session } = useSession();
  const name = extractFirstName();

  const handleOnClick = () => {
    setShowAddItems(!showAddItems);
  };

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
              alignItems: "center",
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
              <Box
                sx={{ "&:hover": { color: "#c8e599" } }}
                onClick={handleOnClick}
                style={{
                  cursor: "pointer",
                  fontSize: "1rem",
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Add Items
                <span style={{ marginTop: "0.2rem" }}>
                  <ExpandMoreIcon />
                </span>
              </Box>
              {showAddItems && <AddItems />}
            </h1>
          </Box>
        </Box>
      )}
      <ItemsTable />
    </Box>
  );
};

export default PantryMain;
