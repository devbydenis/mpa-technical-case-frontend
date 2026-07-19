"use client";

import { Box, Typography } from "@mui/material";

export default function TransactionsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        Transaksi Stok
      </Typography>
      <Typography color="text.secondary">
        Halaman ini akan berisi daftar transaksi stok nantinya
      </Typography>
    </Box>
  );
}
