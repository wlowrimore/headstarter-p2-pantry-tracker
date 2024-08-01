"use client";

import { useState, useEffect, useRef } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
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
import AddItems from "./AddItems";
import PantryMain from "./PantryMain";

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "unit", label: "Unit", minWidth: 100 },
  { id: "quantity", label: "Quantity", minWidth: 100 },
  { id: "notes", label: "Notes", minWidth: 100 },
];

function createData(
  id: string,
  name: string,
  unit: string,
  quantity: string,
  notes: string
): Ingredients {
  return { id, name, unit, quantity, notes };
}

export default function ItemsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetchedPantryItems, setFetchedPantryItems] = useState<Ingredients[]>(
    []
  );

  // Get Pantry Items
  // useEffect(() => {
  //   const getPantryItems = async () => {
  //     const querySnapshot = await getDocs(collection(db, "pantryItems"));
  //     const items: Ingredients[] = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push({
  //         id: doc.id,
  //         name: doc.data().name,
  //         unit: doc.data().unit,
  //         quantity: doc.data().quantity,
  //         notes: doc.data().notes,
  //       });
  //     });
  //     setFetchedPantryItems(items);
  //   };

  //   getPantryItems();
  // }, []);

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
        setFetchedPantryItems(items);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

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

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                      sx={{
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
}
