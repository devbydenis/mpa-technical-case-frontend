"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  action?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {action && (
        <Button
          component={Link}
          href={action.href}
          variant="contained"
          startIcon={action.icon}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
}
