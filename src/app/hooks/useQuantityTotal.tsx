import { useState, useEffect } from "react";
import { usePantry } from "../../providers/PantryProvider";
import { Ingredients } from "../interfaces";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
export const useQuantityTotal = (db: any) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { pantryItems } = usePantry();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "pantryItems"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const quantities = data.map((item) => parseInt(item.quantity));
        const total = quantities.reduce((acc, curr) => acc + curr, 0);
        setTotalQuantity(total);
      }
    );

    return () => unsubscribe();
  }, [db]);

  return totalQuantity;
};
