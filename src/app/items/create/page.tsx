"use client";

import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { ItemForm } from "@/components/items/item-form";
import { useCreateItem } from "@/hooks/use-items";
import { useSnackbar } from "@/components/snackbar-provider";
import { CreateItemPayload } from "@/types";

export default function CreateItemPage() {
  const router = useRouter();
  const { showSuccess, showError } = useSnackbar();
  const createMutation = useCreateItem();

  const handleSubmit = (data: CreateItemPayload) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        showSuccess("Barang berhasil ditambahkan");
        router.push("/items");
      },
      onError: (err) => {
        showError(err.message || "Gagal menambahkan barang");
      },
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Tambah Barang
      </Typography>
      <ItemForm
        onSubmit={handleSubmit}
        loading={createMutation.isPending}
      />
    </Box>
  );
}
