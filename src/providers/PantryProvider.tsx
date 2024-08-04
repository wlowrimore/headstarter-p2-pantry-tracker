"use client";

import { Ingredients } from "@/app/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import { getPantryItems } from "@/app/utils/helpers";

export interface PantryContextType {
  pantryItems: Ingredients[];
  setPantryItems: React.Dispatch<React.SetStateAction<Ingredients[]>>;
}

const PantryContext = createContext<PantryContextType | null>(null);
export const PantryProvider = ({ children }: { children: React.ReactNode }) => {
  const [pantryItems, setPantryItems] = useState<Ingredients[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchPantryItems = async () => {
      setIsLoading(true);
      try {
        const items = await getPantryItems();
        setPantryItems(items);
      } catch (error) {
        console.error("Error fetching pantry items:", error);
        setErrorMsg("Error fetching pantry items");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPantryItems();
  }, []);

  return (
    <PantryContext.Provider value={{ pantryItems, setPantryItems }}>
      {children}
    </PantryContext.Provider>
  );
};

export const usePantry = () => {
  const context = useContext(PantryContext);
  if (!context) {
    throw new Error("usePantry must be used within a PantryProvider");
  }
  return context;
};
