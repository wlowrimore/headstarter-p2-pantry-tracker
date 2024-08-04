"use client";

import { useState, useEffect } from "react";
import { usePantry } from "../../../providers/PantryProvider";
import {
  collection,
  doc,
  getDocs,
  FieldValue,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

import { Column, Ingredients, UpdatableIngredient } from "../../interfaces";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddItems from "./AddItems";
import { Box, Button, Input } from "@mui/material";
import EditingModal from "./modals/EditingModal";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import ItemSearch from "../ItemSearch";
import PantrySearch from "../UI/PantrySearch";
import ListRefresh from "../UI/ListRefresh";
const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "unit", label: "Unit", minWidth: 100 },
  { id: "quantity", label: "Quantity", minWidth: 100 },
  { id: "notes", label: "Notes", minWidth: 100 },
];

interface ItemsTableProps {
  ingredients: Ingredients[];
  onFilterChange: (filter: string) => void;
  onSearch: (query: string) => void;
}

const ItemsTable: React.FC = () => {
  const { pantryItems, setPantryItems } = usePantry();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAscendingOrder, setIsAscendingOrder] = useState<boolean>(true);
  const [selectedRow, setSelectedRow] = useState<Ingredients | null>(null);
  const [updatedItem, setUpdatedItem] = useState<Ingredients | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetchedPantryItems, setFetchedPantryItems] = useState<Ingredients[]>(
    []
  );
  const [ingredients, setIngredients] = useState<Ingredients[]>();
  const [displayedItems, setDisplayedItems] = useState<Ingredients[]>();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "pantryItems"),
      (snapshot) => {
        const items: Ingredients[] = [];
        snapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            name: doc.data().name,
            unit: doc.data().unit,
            quantity: doc.data().quantity,
            notes: doc.data().notes,
          });
        });
        setFetchedPantryItems(items.sort((a, b) => b.id.localeCompare(a.id)));
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setIngredients(fetchedPantryItems);
  }, [fetchedPantryItems]);

  const rows = fetchedPantryItems;

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
      console.log("Delete item:", selectedRow.name);

      await deleteDoc(doc(db, "pantryItems", selectedRow.id))
        .then(() => {
          const updatedList = ingredients.filter(
            (item: Ingredients) => item.id !== selectedRow.id
          );
          setIngredients(updatedList);
        })
        .catch((error) => {
          console.error(
            "Error marking item as deleted in the database:",
            error
          );
        });

      setSelectedRow(null);
      setIsModalOpen(false);
    }
  };
  const toggleSort = () => {
    if (isAscendingOrder) {
      const sortedRows = [...rows].sort((a, b) => b.id.localeCompare(a.id));
      setFetchedPantryItems(sortedRows);
    } else {
      const sortedRows = [...rows].sort((a, b) => a.id.localeCompare(b.id));
      setFetchedPantryItems(sortedRows);
    }
    setIsAscendingOrder(!isAscendingOrder);
  };

  useEffect(() => {
    setDisplayedItems(fetchedPantryItems);
  }, [fetchedPantryItems]);

  const handleFislterChange = (filter: string) => {
    if (filter === "") {
      setDisplayedItems(fetchedPantryItems);
    } else {
      const filteredItems = fetchedPantryItems.filter(
        (item) => item.name.toLowerCase
      );
    }
  };

  const handleRefresh = () => {
    console.log("handleRefresh", pantryItems);
  };

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
            <ItemSearch
              ingredients={fetchedPantryItems}
              onFilterChange={setFetchedPantryItems}
            />

            <p
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <ListRefresh />
            </p>

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
                .map((row) => {
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
