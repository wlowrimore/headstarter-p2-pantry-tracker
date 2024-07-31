"use client";

import { useState, useEffect } from "react";
import { Box, Button, Input } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const AddItems: React.FC = () => {
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
      <form
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
          placeholder="Unit"
        />
        <Input
          sx={{
            color: "white",
            borderBottom: "1px solid #F5F5DC",
          }}
          type="text"
          name="quantity"
          placeholder="Quantity"
        />
        <Input
          sx={{
            color: "white",
            borderBottom: "1px solid #F5F5DC",
          }}
          type="text"
          name="notes"
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
              border: "1px solid white",
              borderTop: "none",
              borderBottom: "none",
              borderRadius: "50%",
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
