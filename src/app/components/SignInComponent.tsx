"use client";

import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const SignInComponent = () => {
  const { data: session } = useSession();

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
      {!session ? (
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
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row", gap: "5rem" }}>
          <Link
            href="#"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              padding: "1rem",
              color: "#D9EABE",
              "&:hover": {
                color: "#b9c475",
              },
            }}
          >
            <SettingsOutlinedIcon />
            &nbsp;Manage Pantry
          </Link>
          <Link
            href="#"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#D9EABE",
              "&:hover": {
                color: "#b9c475",
              },
            }}
          >
            <DashboardIcon />
            &nbsp;Go To Dashboard
          </Link>
          <Button
            onClick={() => signOut()}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#D9EABE",
              "&:hover": {
                color: "#b9c475",
              },
            }}
          >
            <LogoutOutlinedIcon />
            &nbsp;Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SignInComponent;
