"use client";

import { useEffect, useState } from "react";
import { Ingredients } from "../../interfaces";
import { collection, addDoc } from "firebase/firestore";
import { Box, Button, Input } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { db } from "../../firebase";

const AddItems: React.FC = () => {
  const [newPantryItem, setNewPantryItem] = useState<Ingredients[]>([
    { id: "", name: "", unit: "", quantity: "", notes: "" },
  ]);
  const [successMsg, setSuccessMsg] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      newPantryItem[0].name !== "" &&
      newPantryItem[0].unit !== "" &&
      newPantryItem[0].quantity !== ""
    ) {
      try {
        const docRef = await addDoc(collection(db, "pantryItems"), {
          name: newPantryItem[0].name.trim(),
          unit: newPantryItem[0].unit.trim(),
          quantity: newPantryItem[0].quantity.trim(),
          notes: newPantryItem[0].notes.trim(),
        });

        setNewPantryItem([
          {
            id: "",
            name: "",
            unit: "",
            quantity: "",
            notes: "",
          },
        ]);
        setSuccessMsg("Item added successfully!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.log("Please fill out all fields");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPantryItem((prevItems) => {
      return prevItems.map((item, index) => {
        if (index === 0) {
          return { ...item, [name]: value };
        }
        return item;
      });
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {successMsg && (
        <p
          style={{
            position: "absolute",
            top: "22%",
            color: "#F5F5DC",
            fontSize: "1.2rem",
            fontWeight: "lighter",
          }}
        >
          {successMsg}
        </p>
      )}
      <form
        onSubmit={addItem}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
          padding: "0.5rem 0",
        }}
      >
        <Input
          sx={{
            color: "white",
            borderBottom: "1px solid #F5F5DC",
          }}
          type="text"
          name="name"
          value={newPantryItem[0].name}
          onChange={handleInputChange}
          placeholder="Item Name"
        />
        <Input
          sx={{
            color: "white",
            borderBottom: "1px solid #F5F5DC",
            outline: "none",
          }}
          type="text"
          name="unit"
          value={newPantryItem[0].unit}
          onChange={handleInputChange}
          placeholder="Unit"
        />
        <Input
          sx={{
            color: "white",
            borderBottom: "1px solid #F5F5DC",
          }}
          type="text"
          name="quantity"
          value={newPantryItem[0].quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
        />
        <Input
          sx={{
            color: "white",
            borderBottom: "1px solid #F5F5DC",
          }}
          type="text"
          name="notes"
          value={newPantryItem[0].notes}
          onChange={handleInputChange}
          placeholder="Notes"
        />
        <Button
          type="submit"
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2b3c34",
            border: "none",
            color: "white",
            gap: "0.2rem",
            "&:hover": {
              color: "#c8e599",
            },
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.4rem 0.9rem 0.4rem 0.5rem",
            }}
          >
            <AddOutlinedIcon />
            Add
          </span>
        </Button>
      </form>
    </Box>
  );
};

export default AddItems;
