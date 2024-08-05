"use client";

import { Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { Box, Button, Input } from "@mui/material";
import { extractFirstName } from "@/app/utils/helpers";
import RecipeCard from "./RecipeCard";
import { generateRecipes } from "@/app/actions";
import LinearIndeterminate from "@/app/loading";
import Loading from "../../temprecipe/loading";

interface RecipesMainProps {
  isLoading: boolean;
  recipes: any[];
  setRecipes: React.Dispatch<React.SetStateAction<any[]>>;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
}

const RecipesMain: React.FC<RecipesMainProps> = ({ recipes }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit() {
    setIsLoading(true);
    await generateRecipes(prompt);
    setPrompt("");
    setIsLoading(false);
  }

  // const { data: session } = useSession();
  const firstName = extractFirstName();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "80rem",
      }}
    >
      {/* <h1 style={{ color: "#F5F5DC" }}>Your AI Recipe Generator</h1> */}
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
          Most of us have a hard time deciding what we want to cook, and it can
          be frustrating to try and come up with something that works with the
          ingredients we already have.
          <br />
          <br />
          Well, let&apos;s simplify this process. All you need to know is what
          ingredients you have on hand, and what theme you are in the mood for.
          Let&apos;s get started...shall we?
        </p>
      </article>
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
          onSubmit={onSubmit}
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
      <Suspense fallback={<Loading />}>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
        >
          {recipes &&
            recipes.length > 0 &&
            recipes.map((recip, i) => (
              <RecipeCard
                key={i}
                recipe={recip}
                isLoading={false}
                prompt={prompt}
                setPrompt={undefined}
              />
            ))}
        </Box>
      </Suspense>
    </Box>
  );
};

export default RecipesMain;
