"use client";

import { useState } from "react";
import { useQuantityTotal } from "../../hooks/useQuantityTotal";
import { Box } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { extractFirstName } from "../../utils/helpers";
import ItemsTable from "./ItemsTable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AddItems from "./AddItems";
import { Ingredients } from "@/app/interfaces";
import { db } from "@/app/firebase";

interface PantryMainProps {
  filteredItems: Ingredients[];
}

const PantryMain: React.FC<PantryMainProps> = ({}) => {
  const [showAddItems, setShowAddItems] = useState<boolean>(false);
  const { data: session } = useSession();
  const name = extractFirstName();

  const handleOnClick = () => {
    setShowAddItems(!showAddItems);
  };

  const totalQuantity = useQuantityTotal(db);

  return (
    <Box style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {!session ? (
        <p style={{ fontSize: "1.3rem", color: "white" }}>
          Oops! You forgot to
          <span
            onClick={() => signIn("google", { callbackUrl: "pantry/" })}
            style={{ textDecoration: "underline", color: "#2B3C34" }}
          >
            signIn
          </span>
          ...
        </p>
      ) : (
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
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "auto",
                fontSize: "1rem",
                fontWeight: "lighter",
              }}
            >
              Your Pantry contains{" "}
              <span style={{ color: "#c8e599" }}>
                &nbsp;{totalQuantity}&nbsp;
              </span>{" "}
              items.{" "}
            </span>
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
      )}
      <ItemsTable filteredItems={[]} items={[]} />
    </Box>
  );
};

export default PantryMain;
