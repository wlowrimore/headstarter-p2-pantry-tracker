import { Box } from "@mui/material";
import PantryMain from "../components/pantry/PantryMain";

const Pantry = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "80rem",
      }}
    >
      <PantryMain filteredItems={[]} />
    </Box>
  );
};

export default Pantry;
