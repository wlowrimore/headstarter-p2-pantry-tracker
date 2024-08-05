"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { generateRecipes } from "@/app/actions";
import { extractFirstName } from "../utils/helpers";
import Loading from "./loading";
import { Avatar, CardHeader, CardMedia, Grid, Input } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
}

export default function TempRecipe() {
  const [expanded, setExpanded] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const firstName = extractFirstName();

  async function onSubmit() {
    setIsLoading(true);
    try {
      let data = await generateRecipes(prompt);
      console.log("Recipes:", recipes);
      setRecipes(data);
    } catch (error) {
      console.error("Error generating recipes:", error);
    } finally {
      setIsLoading(false);
    }
  }

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "80rem",
          }}
        >
          <article
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              maxWidth: "50rem",
            }}
          >
            <p style={{ color: "#F5F5DC", fontSize: "2.5rem" }}>
              Hi, {firstName} welcome to your personal&nbsp;
              <span style={{ color: "#000000", fontWeight: "bold" }}>
                AI Recipe Generator
              </span>
              .
            </p>
            <p
              style={{
                color: "#000000",
                fontSize: "1.4rem",
                marginBottom: "1rem",
              }}
            >
              Most of us have a hard time deciding what we want to cook, and it
              can be frustrating to try and come up with something that works
              with the ingredients we already have.
              <br />
              <br />
              Well, let&apos;s simplify this process. All you need to know is
              what ingredients you have on hand, and what theme you are in the
              mood for. Let&apos;s get started...shall we?
            </p>
          </article>
          {isLoading ? (
            <Loading />
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "1.5rem",
              }}
            >
              <Input
                sx={{
                  width: "100%",
                  maxWidth: "60rem",
                  backgroundColor: "#F5F5DC",
                  padding: "0.25rem 0.5rem",
                }}
                type="text"
                placeholder="Enter ingredients and theme"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                onClick={() => onSubmit()}
                variant={"text"}
                type={"submit"}
                sx={{
                  width: "100%",
                  maxWidth: "15rem",
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid white",
                  borderRadius: "0.5rem",
                }}
              >
                Generate Recipes
              </Button>
            </Box>
          )}

          {/* Recipe Cards */}
          <Box>
            {recipes.map((recipe, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ backgroundColor: "#F5F5DC" }}
                        aria-label="recipe"
                      >
                        PT
                        <h2>Recipe Name</h2>
                      </Avatar>
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                  />
                  <CardContent></CardContent>
                </Card>
              </Grid>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
