"use client";

import { useState, useEffect } from "react";
import { Box, Button, Input } from "@mui/material";
import { EditingModalProps, Ingredients } from "../../../interfaces";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const EditingModal = ({
  item,
  onClose,
  onSave,
  onDelete,
  handleSave,
}: EditingModalProps) => {
  if (!item) {
    return null;
  }
  const [editedItem, setEditedItem] = useState<Ingredients>(item);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });

    handleSave();
  };

  const handleSubmit = () => {
    onSave(editedItem);
    onClose();
  };

  const handleDelete = () => {};

  return (
    <Box
      sx={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "10",
        width: "100%",
        maxWidth: "80rem",
        height: "30vh",
        maxHeight: "30vh",
        display: "flex",
        border: "1px solid #478e59",
        borderRadius: "1rem",
        boxShadow: "2px 2px 20px 0 rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)",
        backgroundColor: "#D9EABE",
        flexDirection: "column",
        padding: "0 1rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1
          style={{
            margin: "1rem 0 3rem 8.7rem",
            color: "#000000",
            fontWeight: "lighter",
          }}
        >
          Now Editing
        </h1>
        <CloseOutlinedIcon
          onClick={onClose}
          sx={{
            cursor: "pointer",
            fontSize: "2.3rem",
            padding: "0.3rem",
            color: "#2B3C34",
            marginTop: "0.5rem",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            gap: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Name</p>
            <Input
              type="text"
              name="name"
              value={editedItem.name}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Unit</p>
            <Input
              type="text"
              name="unit"
              value={editedItem.unit}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
              Quantity
            </p>
            <Input
              type="text"
              name="quantity"
              value={editedItem.quantity}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Notes</p>
            <Input
              type="text"
              name="notes"
              value={editedItem.notes}
              onChange={handleInputChange}
            />
          </Box>
          <Button
            type="submit"
            sx={{
              outline: "none",
              border: "1px solid #478E59",
              padding: "0.2rem 1rem 0.1rem 1rem",
              backgroundColor: "transparent",
              borderRadius: "0.3rem",
              color: "#2B3C34",
              cursor: "pointer",
              marginLeft: "0.5rem",
              marginBottom: "0.3rem",
              "&:hover": {
                backgroundColor: "#2B3C34",
                color: "white",
              },
            }}
          >
            Save
          </Button>
          <Button onClick={onDelete}>
            <CloseOutlinedIcon
              sx={{
                cursor: "pointer",
                fontSize: "1.8rem",
                padding: "0.3rem",
                color: "#2B3C34",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            />
            Delete
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditingModal;
