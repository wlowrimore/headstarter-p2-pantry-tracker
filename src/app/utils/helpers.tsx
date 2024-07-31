"use client";

import { useSession } from "next-auth/react";
export function extractFirstName() {
  const { data: session } = useSession();
  if (session) {
    const firstName = session?.user?.name?.split(" ")[0];
    return firstName;
  } else {
    return null;
  }
}

export async function getPantryItems() {
  const data = await fetch("/json/pantryItems.json");
  const items = await data.json();
  return items;
}
