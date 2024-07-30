"use client";

import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignInComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "0.3rem",
        backgroundColor: "#2B3C34",
      }}
    >
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        sx={{
          fontSize: "0.8rem",
          color: "white",
          borderColor: "white",
          borderWidth: "0.5rem",
          borderRadius: "60px",
          ":hover": {
            color: "#b9c475",
            borderColor: "white",
            borderWidth: "0.5rem",
            borderRadius: "60px",
          },
        }}
        variant="outlined"
      >
        Sign In with your Google Account
      </Button>
    </Box>
  );
};

export default SignInComponent;
