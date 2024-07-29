import { Box, Container } from "@mui/material";
import HeroComponent from "./components/HeroComponent";

export default function Home() {
  return (
    <Box
      sx={{
        margin: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <HeroComponent />
    </Box>
  );
}
