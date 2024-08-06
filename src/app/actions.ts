"use server";

import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateRecipes(prompt: string) {
  try {
    prompt = `Generate three recipes for a ${prompt} dish. The output should be in JSON array and each object should contain a recipe name field named 'name', a description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'instructions'.`;

    const response = await chatModel.invoke(prompt);
    const data = JSON.parse(response.content as string);
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
}
