import { Box, Container, Grid } from "@mui/material";
import Image from "next/image";
import Hero from "../../../public/images/hero.jpg";

const HeroComponent = () => {
  return (
    <Grid
      container
      sx={{
        maxWidth: "80rem",
        height: "100%",
        maxHeight: "100vh",
        margin: "1rem auto",
        display: "flex",
        justifyContent: "center",
        padding: "0 0.5rem",
      }}
    >
      <Grid
        sx={{
          width: "40%",
          color: "#D9EABE",
        }}
      >
        <h2>Track what you have.</h2>
        <h2>Add what you need.</h2>
        <h2>Get great recipe ideas.</h2>
        <h2>All in one place!</h2>
      </Grid>
      <Grid
        sx={{
          width: "60%",
        }}
      >
        <Image
          src={Hero}
          alt="Pantry Hero"
          width={500}
          height={500}
          style={{
            width: "100%",
            height: "100%",
            color: "green",
            borderRadius: "5rem",
            boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.7)",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default HeroComponent;
