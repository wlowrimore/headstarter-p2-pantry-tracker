"use client";

import { signOut, useSession } from "next-auth/react";
import { User } from "../interfaces";
import Image from "next/image";
import { Box, Button, Link, Stack, TextField } from "@mui/material";
import SiteLogo from "../../../public/images/logos/site-logo.png";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isNotMain, setIsNotMain] = useState<boolean>(false);
  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const { data: session } = useSession();
  const path = usePathname();

  const toggleMenu = () => {
    setMenuToggled(!menuToggled);
  };

  useEffect(() => {
    const getPath = () => {
      if (path === "/") {
        setIsNotMain(true);
      } else {
        setIsNotMain(false);
      }
    };
    getPath();
  }, [path]);

  return (
    <Box
      maxWidth={"80rem"}
      padding={"1rem 1rem 0.25rem 1rem"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"end"}
      margin={"0.5rem auto"}
      borderBottom={"1px solid gray"}
    >
      <Link href="/">
        <Image
          src={SiteLogo}
          alt="Pantry Tracker Logo"
          width={500}
          height={500}
          style={{
            width: "6rem",
            height: "6rem",
            color: "green",
          }}
        />
      </Link>
      {session?.user && session?.user?.image && (
        <>
          {!isNotMain && (
            <Box display={"flex"} alignItems={"end"} gap={"1rem"}>
              <Stack direction="row" spacing={4} marginBottom={-0.5}>
                <Link
                  href="#"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "#5C5F15",
                    },
                    padding: "0.5rem",
                  }}
                >
                  <p>My Items</p>
                </Link>
                <Link
                  href="#"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "#5C5F15",
                    },
                    padding: "0.5rem",
                  }}
                >
                  <p>Add Items</p>
                </Link>
                <Link
                  href="#"
                  underline={"hover"}
                  sx={{
                    color: "black",
                    textDecoration: "none",
                    padding: "0.5rem",
                  }}
                >
                  <p>Remove Items</p>
                </Link>
                <Link
                  href="#"
                  underline={"hover"}
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "#5C5F15",
                    },
                    padding: "0.5rem",
                  }}
                >
                  <p>Update List</p>
                </Link>
                <Link
                  href="#"
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "#5C5F15",
                    },
                    padding: "0.5rem",
                  }}
                >
                  <p>Dashboard</p>
                </Link>
              </Stack>
            </Box>
          )}

          {/* User Profile */}
          <Box
            display={"flex"}
            alignItems={"end"}
            gap={"1rem"}
            position={"relative"}
          >
            <Box
              onClick={toggleMenu}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.7rem",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#D9EABE",
                  borderRadius: "2rem",
                },
              }}
            >
              <Image
                src={session?.user.image}
                alt={session?.user?.name || "User Image"}
                width={44}
                height={44}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Stack direction="column" spacing={-0.5}>
                <p
                  style={{
                    fontWeight: "700",
                    marginBottom: "0.2rem",
                  }}
                >
                  {session?.user?.name}
                </p>
                <p style={{ marginBottom: "0.2rem" }}>{session?.user?.email}</p>
              </Stack>
            </Box>

            {/* Menu */}
            {menuToggled && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "3rem",
                  position: "absolute",
                  zIndex: "1",
                  right: "2%",
                  transform: "translateX(-4%)" || "translateX(0%)",
                  top: "5.7rem",
                  backgroundColor: "#D9EABE",
                  opacity: "0.8",
                  width: "30rem",
                  height: "30.5rem",
                }}
              >
                <Box
                  onClick={() => signOut()}
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#3B7B51",
                      textDecoration: "underline",
                    },
                  }}
                >
                  logout
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Header;
