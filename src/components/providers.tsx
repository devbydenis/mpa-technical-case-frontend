"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#fafafa",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
