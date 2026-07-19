"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { DataTableProps } from "../../types/components/data-table.types";

export function DataTable<T>({
  columns,
  rows,
  total,
  page,
  rowsPerPage,
  emptyMessage = "Tidak ada data",
  keyExtractor,
  onPageChange,
  onRowsPerPageChange,
}: DataTableProps<T>) {
  const fromRow = total === 0 ? 0 : page * rowsPerPage + 1;
  const toRow = Math.min((page + 1) * rowsPerPage, total);

  return (
    <Paper elevation={0} variant="outlined" sx={{ width: "100%" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: 700, bgcolor: "grey.50" }}
                width={50}
              >
                #
              </TableCell>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align ?? "left"}
                  sx={{
                    fontWeight: 700,
                    bgcolor: "grey.50",
                    minWidth: col.minWidth,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <InboxIcon
                      sx={{ fontSize: 40, color: "text.disabled" }}
                    />
                    <Typography color="text.secondary">
                      {emptyMessage}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow hover key={keyExtractor(row)}>
                  <TableCell align="center" sx={{ color: "text.secondary" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.id} align={col.align ?? "left"}>
                      {col.render
                        ? col.render(row, page * rowsPerPage + index)
                        : String(
                            (row as Record<string, unknown>)[col.id] ?? "",
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
          Menampilkan {fromRow}–{toRow} dari {total}
        </Typography>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="Baris:"
        />
      </Box>
    </Paper>
  );
}
