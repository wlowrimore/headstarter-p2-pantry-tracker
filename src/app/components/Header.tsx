"use client";

import { useSession } from "next-auth/react";
import { User } from "../interfaces";
import Image from "next/image";
import { Box, Button, Input, Stack, TextField } from "@mui/material";
import SiteLogo from "../../../public/images/logos/site-logo.png";

const Header = () => {
  const { data: session } = useSession();
  return (
    <Box
      maxWidth={"80rem"}
      padding={"1rem 0 0.25rem 0"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"end"}
      margin={"0.5rem auto"}
      borderBottom={"1px solid gray"}
    >
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

      <Box display={"flex"} alignItems={"end"} gap={"1rem"}>
        {session?.user && session?.user?.image && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.3rem",
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
        )}
      </Box>
    </Box>
  );
};

export default Header;
