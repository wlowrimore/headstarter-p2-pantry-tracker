import Box from "@mui/material/Box";
import Loading from "./loading";
import GenRecipeContent from "../components/generate-recipe/GenRecipeContent";

export default function TempRecipe() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          width: "100%",
          maxWidth: "80rem",
        }}
      >
        <GenRecipeContent />
      </Box>
    </>
  );
}
