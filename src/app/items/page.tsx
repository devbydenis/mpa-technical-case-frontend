"use client";

import { Box, Typography } from "@mui/material";

export default function ItemsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        Master Barang
      </Typography>
      <Typography color="text.secondary">
        Halaman ini akan berisi daftar barang nantinya
      </Typography>
    </Box>
  );
}
