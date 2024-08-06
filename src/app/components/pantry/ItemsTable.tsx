"use client";

import { useState, useEffect } from "react";
import { usePantry } from "../../../providers/PantryProvider";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Column, Ingredients } from "../../interfaces";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Input } from "@mui/material";
import EditingModal from "./modals/EditingModal";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import { getPantryItems } from "../../utils/helpers";
const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "unit", label: "Unit", minWidth: 100 },
  { id: "quantity", label: "Quantity", minWidth: 100 },
  { id: "notes", label: "Notes", minWidth: 100 },
];

interface ItemsTableProps {
  filteredItems: Ingredients[];
  items: Ingredients[];
}

const ItemsTable: React.FC<ItemsTableProps> = () => {
  const { pantryItems, setPantryItems } = usePantry();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAscendingOrder, setIsAscendingOrder] = useState<boolean>(true);
  const [selectedRow, setSelectedRow] = useState<Ingredients | null>(null);
  const [updatedItem, setUpdatedItem] = useState<Ingredients | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<Ingredients[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetchedPantryItems, setFetchedPantryItems] = useState<Ingredients[]>(
    []
  );
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [displayedItems, setDisplayedItems] = useState<Ingredients[]>();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "pantryItems"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          unit: doc.data().unit,
          quantity: doc.data().quantity,
          notes: doc.data().notes,
        }));
        setPantryItems(items);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row: Ingredients) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleSave = (updatedItem: Ingredients) => {
    const updates: Record<string, any> = {};
    if (updatedItem) {
      for (const key in updatedItem) {
        if (updatedItem.hasOwnProperty(key)) {
          updates[key as keyof Ingredients] =
            updatedItem[key as keyof Ingredients];
        }
      }
    }

    updateDoc(doc(db, "pantryItems", updatedItem.id), updates)
      .then(() => {
        console.log("Item updated successfully");
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });

    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedRow && ingredients) {
      console.log("Ingredients: ", ingredients);

      try {
        // Optimistic update: remove item from UI immediately
        const updatedList = ingredients.filter(
          (item: Ingredients) => item.id !== selectedRow.id
        );
        setIngredients(updatedList);

        await deleteDoc(doc(db, "pantryItems", selectedRow.id));
        console.log("Item deleted successfully");
      } catch (error) {
        console.error("Error deleting item:", error);
        // Handle error, e.g., show error message to user, revert to original state
        setIngredients(ingredients); // Revert to original state if deletion fails
      }

      setSelectedRow(null);
      setIsModalOpen(false);
    }
    console.log("DETETE CALLLED: ", selectedRow);
    console.log("UPDATED LIST: ", ingredients);
  };
  const toggleSort = () => {
    console.log("TOGGLING SORT!!!!", toggleSort);
    if (isAscendingOrder) {
      const sortedRows = [...rows].sort((a, b) => b.id.localeCompare(a.id));
      setFilteredItems(sortedRows);
    } else {
      const sortedRows = [...rows].sort((a, b) => a.id.localeCompare(b.id));
      setFilteredItems(sortedRows);
    }
    console.log("Sorted rows:", fetchedPantryItems);
    setIsAscendingOrder(!isAscendingOrder);
  };

  useEffect(() => {
    setDisplayedItems(fetchedPantryItems);
  }, [fetchedPantryItems]);

  const handleFilterChange = (filter: string) => {
    if (filter === "") {
      setDisplayedItems(fetchedPantryItems);
    } else {
      const filteredItems = fetchedPantryItems.filter(
        (item) => item.name.toLowerCase
      );
    }
  };

  useEffect(() => {
    const getItems = async () => {
      const items = await getPantryItems();
      setPantryItems(items);
    };

    getItems();
  }, []);

  useEffect(() => {
    const filtered = pantryItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [pantryItems, searchQuery]);
  console.log("Filtered items:", filteredItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const rows = filteredItems;

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5rem 1rem",
              backgroundColor: "#D9EABE",
              fontWeight: "bold",
              fontSize: "1rem",
              borderBottom: "1px solid #2B3C34",
            }}
          >
            <>
              <form style={{ display: "flex", alignItems: "center" }}>
                <Input
                  onChange={handleSearch}
                  value={searchQuery}
                  type="text"
                  placeholder="Search By Name"
                  sx={{
                    width: "100%",
                    backgroundColor: "#eaeaea",
                    padding: "0.25rem 0.5rem",
                  }}
                />
              </form>
            </>

            <p
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            ></p>
            {filteredItems.length === 0 && (
              <Box
                sx={{
                  fontSize: "1.2rem",
                  width: "50%",
                  display: "flex",
                  justifyContent: "start",
                  paddingLeft: "8.5rem",
                  alignItems: "center",
                }}
              >
                No Items Found
              </Box>
            )}
            <p
              onClick={toggleSort}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              Sort By Name&nbsp;
              <SwapVertOutlinedIcon />
            </p>
          </Box>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#D9EABE",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      borderBottom: "1px solid #2B3C34",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Ingredients) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      onClick={() => handleRowClick(row)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: "#F5F5DC",
                        borderBottom: "1px solid #2B3C34",
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {isModalOpen && (
            <EditingModal
              item={selectedRow}
              onClose={() => setIsModalOpen(false)}
              onSave={(newItem: Ingredients) => {
                setIsModalOpen(false);
                if (newItem) {
                  setUpdatedItem(newItem);
                  handleSave(newItem);
                }
              }}
              onDelete={handleDelete}
              handleSave={() => {
                if (updatedItem) {
                  handleSave(updatedItem);
                }
              }}
            />
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ItemsTable;
