"use client";

import { TextField, TextFieldProps } from "@mui/material";

type FormFieldProps = Omit<TextFieldProps, "variant"> & {
  error?: boolean;
  helperText?: string;
};

export function FormField({
  error = false,
  helperText,
  fullWidth = true,
  ...props
}: FormFieldProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth={fullWidth}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
}
