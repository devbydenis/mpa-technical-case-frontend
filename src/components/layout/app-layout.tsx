"use client";

import { Box } from "@mui/material";
import { Sidebar } from "./sidebar";
import { DRAWER_WIDTH } from "@/constants/layout";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
