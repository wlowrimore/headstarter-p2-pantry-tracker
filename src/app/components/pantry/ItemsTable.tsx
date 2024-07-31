"use client";

import { useState, useEffect } from "react";
import { Column, Ingredients } from "../../interfaces";
import { getPantryItems } from "../../utils/helpers";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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
  quantity: number,
  notes: string
): Ingredients {
  return { id, name, unit, quantity, notes };
}

const rows = [
  createData("1", "Banana", "pcs", 1, "fresh"),
  createData("2", "Potato", "pcs", 1, "fresh"),
  createData("3", "Tomato", "pcs", 1, "fresh"),
];

export default function ItemsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pantryItems, setPantryItems] = useState<Ingredients[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getPantryItems();
      setPantryItems(items);
    };
    fetchItems();
  }, []);

  const rows = pantryItems;
  // useEffect(() => {
  //   console.log("PantryItems:", pantryItems);
  // }, []);
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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
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
  );
}
