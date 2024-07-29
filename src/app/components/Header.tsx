import { Box, Button, Input, TextField } from "@mui/material";
import Image from "next/image";

import SiteLogo from "../../../public/images/logos/site-logo.png";

const Header = () => {
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
        <Button variant="text" style={{ color: "black" }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
