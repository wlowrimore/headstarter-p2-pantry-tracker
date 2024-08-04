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
          {/* {!isNotMain && (
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
          )} */}

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
                backgroundColor: "#D9EABE",
                borderRadius: "2rem",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.7rem",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#F5F5DC",
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
                  gap: "1rem",
                  padding: "3rem",
                  position: "absolute",
                  zIndex: "10",
                  left: "-8%",
                  transform: "translateX(-4%)" || "translateX(0%)",
                  top: "4.2rem",
                  backgroundColor: "#D9EABE",
                  width: "20rem",
                  height: "13.8rem",
                  border: "1px solid #5C5F15",
                  borderBottomLeftRadius: "1.5rem",
                  borderTopLeftRadius: "0.4rem",
                }}
              >
                <Link href="/dashboard" className="menu-link">
                  Recipe Generator
                </Link>
                <Link href="/dashboard" className="menu-link">
                  Dashboard
                </Link>
                <Box
                  onClick={() => signOut({ callbackUrl: "/" })}
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    padding: "0.5rem 1rem",
                    textTransform: "uppercase",
                    borderRadius: "3rem",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#c8d9b0",
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
