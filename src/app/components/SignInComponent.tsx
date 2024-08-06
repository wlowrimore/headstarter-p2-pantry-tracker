"use client";

import { Box, Button, Link } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Image from "next/image";
import GoogleLogo from "../../../public/images/logos/google.jpg";
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
            backgroundColor: "#000000",
            borderColor: "white",
            borderWidth: "0.5rem",
            borderRadius: "60px",
            "&:hover": {
              color: "#b9c475",
              borderColor: "white",
              borderWidth: "0.5rem",
              borderRadius: "60px",
            },
          }}
          variant="outlined"
        >
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Image
              src={GoogleLogo}
              alt="William Lowrimore"
              width={500}
              height={500}
              style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%" }}
            />
            Sign In with Google
          </span>
        </Button>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row", gap: "5rem" }}>
          <Link
            href="/pantry"
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
            href="/recipe-generator"
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
            &nbsp;AI Recipe Generator
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
