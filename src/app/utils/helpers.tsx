"use client";

import jsPDF from "jspdf";
import { Ingredients, Recipe } from "../interfaces";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getPantryItems = async () => {
  const querySnapshot = await getDocs(collection(db, "pantryItems"));
  const items: Ingredients[] = [];
  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      name: doc.data().name,
      unit: doc.data().unit,
      quantity: doc.data().quantity,
      notes: doc.data().notes,
    });
  });
  return items;
};

export const handleDownloadPDF = (recipeData: Recipe) => {
  const pdf = new jsPDF();

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  const contentWidth = pdf.internal.pageSize.width - margin.left - margin.right;

  let currentY = margin.top;
  const fontSize = 12; // Default font size

  pdf.setFontSize(fontSize);

  pdf.text(`Recipe Name: ${recipeData.name}`, margin.left, currentY);
  currentY += 15; // Adjust spacing as needed

  // Handle description with adjusted font size
  pdf.setFontSize(10);
  const descriptionLines = pdf.splitTextToSize(
    recipeData.description,
    contentWidth - 2 * margin.left
  );
  descriptionLines.forEach((line: string | string[], index: number) => {
    pdf.text(line, margin.left, currentY + index * 10);
  });
  currentY += descriptionLines.length * 10;
  pdf.setFontSize(fontSize); // Restore default font size

  pdf.text("Ingredients:", margin.left, currentY);
  currentY += 10;
  recipeData.ingredients.forEach((ingredient, index) => {
    pdf.text(`- ${ingredient}`, margin.left, currentY + index * 10);
  });
  currentY += recipeData.ingredients.length * 10;

  pdf.text("Instructions:", margin.left, currentY);
  currentY += 10;
  const instructionsLines = pdf.splitTextToSize(
    recipeData.instructions.join("\n"),
    contentWidth - 2 * margin.left
  );
  instructionsLines.forEach((line: string | string[], index: number) => {
    pdf.text(line, margin.left, currentY + index * 10);
  });

  pdf.save("recipe.pdf");
};
