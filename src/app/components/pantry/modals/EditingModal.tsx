"use client";

import { useState } from "react";
import { Box, Button, Input } from "@mui/material";
import { EditingModalProps, Ingredients } from "../../../interfaces";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const EditingModal: React.FC<EditingModalProps> = ({
  item,
  onClose,
  onSave,
  onDelete,
  handleSave,
}) => {
  const defaultEditedItem: Ingredients = {
    name: "",
    quantity: "0",
    unit: "",
    notes: "",
    id: "",
  };

  const [editedItem, setEditedItem] = useState<Ingredients>(
    item || defaultEditedItem
  );

  if (!item) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });

    handleSave();
  };

  const handleSubmit = () => {
    onSave(editedItem);
    onClose();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "38.5%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "10",
        width: "100%",
        maxWidth: "75rem",
        height: "30vh",
        maxHeight: "30vh",
        margin: "0 auto",
        display: "flex",
        borderBottom: "1px solid #478e59",
        borderRadius: "1.5rem",
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
            margin: "2rem 0 4rem 5.7rem",
            color: "#000000",
            fontWeight: "lighter",
            fontSize: "3rem",
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
          <Button
            onClick={onDelete}
            sx={{
              outline: "none",
              border: "1px solid indianred",
              padding: "0.2rem 1rem 0.1rem 1rem",
              backgroundColor: "indianred",
              borderRadius: "0.3rem",
              color: "#2B3C34",
              cursor: "pointer",
              marginLeft: "0.5rem",
              marginBottom: "0.3rem",
              "&:hover": {
                backgroundColor: "black",
                color: "000000",
              },
            }}
          >
            <DeleteForeverOutlinedIcon sx={{ color: "white" }} />
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditingModal;
