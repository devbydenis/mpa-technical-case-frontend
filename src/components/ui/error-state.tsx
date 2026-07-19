"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Terjadi kesalahan saat memuat data",
  onRetry,
}: ErrorStateProps) {
  return (
    <Paper variant="outlined" sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          py: 4,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 48, color: "error.main" }} />
        <Typography variant="h6" color="text.secondary">
          {message}
        </Typography>
        {onRetry && (
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
          >
            Coba Lagi
          </Button>
        )}
      </Box>
    </Paper>
  );
}
