"use client";

import { useSession } from "next-auth/react";
import { Ingredients } from "../interfaces";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
export function extractFirstName() {
  const { data: session } = useSession();
  if (session) {
    const firstName = session?.user?.name?.split(" ")[0];
    return firstName;
  } else {
    return null;
  }
}

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
