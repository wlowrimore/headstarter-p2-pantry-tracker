"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { generateRecipes } from "@/app/actions";
import { extractFirstName } from "../utils/helpers";
import Loading from "./loading";
import { Recipe } from "@/app/interfaces";
import { handleDownloadPDF } from "../utils/helpers";
import SiteLogo from "../../../public/images/logos/site-logo.png";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import { Avatar, CardHeader, CardMedia, Grid, Input } from "@mui/material";
import Image from "next/image";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

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
      setRecipes(data);
    } catch (error) {
      console.error("Error generating recipes:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownload = (recipeData: Recipe) => {
    handleDownloadPDF(recipeData);
  };

  console.log("Recipes:", recipes);
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
                fontSize: "1.3rem",
              }}
            >
              Most of us have a hard time deciding what we want to cook, and it
              can be frustrating to try and come up with something that works
              with the ingredients we already have.
            </p>
            <p style={{ color: "#0e0e0e", marginBottom: "1rem" }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "0.9rem",
              padding: "1rem 0",
            }}
          >
            {recipes.map((recipe, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    maxHeight: "32rem",
                    maxWidth: "26rem",
                    overflow: "auto",
                    border: "1px solid #478F59",
                    borderRadius: "0.5rem",
                  }}
                >
                  <CardHeader
                    sx={{
                      backgroundColor: "#D9EABE",
                      borderBottom: "1px solid gray",
                      display: "flex",
                      alignItems: "center",
                      position: "sticky",
                      top: "0",
                      zIndex: "1",
                    }}
                    title={
                      <Typography
                        sx={{ fontWeight: "bold", lineHeight: "1.3" }}
                      >
                        {recipe.name}
                      </Typography>
                    }
                    avatar={
                      <Avatar
                        sx={{ backgroundColor: "#478F59" }}
                        aria-label="recipe"
                      >
                        <Image
                          src={SiteLogo}
                          alt="William Lowrimore"
                          width={200}
                          height={200}
                          style={{
                            width: "90%",
                            height: "90%",
                            borderRadius: "50%",
                            padding: "0.05rem",
                          }}
                        />
                      </Avatar>
                    }
                  />
                  <Button
                    onClick={() => handleDownload(recipe)}
                    variant="text"
                    sx={{
                      color: "#2B3C34",
                      fontSize: "0.5rem",
                      borderRadius: "2rem",
                      padding: "0 0.5rem",
                      marginTop: "0.5rem",
                      marginLeft: "0.3rem",
                      "&:hover": {
                        backgroundColor: "#D9EABE",
                      },
                    }}
                  >
                    <LocalPrintshopOutlinedIcon sx={{ width: "1rem" }} />
                    &nbsp; Print Recipe
                  </Button>
                  <CardContent>
                    <Typography sx={{ fontWeight: "600" }}>
                      Description
                    </Typography>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "#1a1c1b", fontWeight: "500" }}
                      >
                        {recipe.description}
                      </Typography>
                    </Box>
                    <Box sx={{ padding: "1rem 0 0.5rem 0" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Ingredients
                      </Typography>
                    </Box>
                    {recipe.ingredients.map(
                      (ingredient: string, index: number) => (
                        <Box key={index}>
                          <Typography
                            variant="body2"
                            sx={{ color: "#1a1c1b", fontWeight: "500" }}
                          >
                            {ingredient}
                          </Typography>
                        </Box>
                      )
                    )}
                    <Box sx={{ padding: "1rem 0 0.5rem 0" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Instructions
                      </Typography>
                    </Box>
                    {recipe.instructions.map(
                      (instruction: string, index: number) => (
                        <Box key={index}>
                          <Typography
                            variant="body2"
                            sx={{ color: "#1a1c1b", fontWeight: "500" }}
                          >
                            {index + 1}. {instruction}
                          </Typography>
                        </Box>
                      )
                    )}
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
