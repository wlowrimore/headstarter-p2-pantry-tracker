"use client";

import { Box, Link } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { extractFirstName } from "../../utils/helpers";
const PantryMain: React.FC = () => {
  const { data: session } = useSession();
  const name = extractFirstName();

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
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
                fontSize: "1.8rem",
                color: "#d9fcea",
                padding: "0.8rem 1.5rem",
              }}
            >
              {name}&apos;s Pantry
            </h1>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PantryMain;
