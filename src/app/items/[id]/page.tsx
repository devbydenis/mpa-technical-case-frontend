"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { ItemForm } from "@/components/items/item-form";
import { useItem, useUpdateItem } from "@/hooks/use-items";
import { useSnackbar } from "@/components/snackbar-provider";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ErrorState } from "@/components/ui/error-state";
import { UpdateItemPayload } from "@/types";

export default function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const itemId = Number(id);

  const router = useRouter();
  const { showSuccess, showError } = useSnackbar();

  const { data: item, isLoading, isError, error, refetch } = useItem(itemId);
  const updateMutation = useUpdateItem();

  const handleSubmit = (data: UpdateItemPayload) => {
    updateMutation.mutate(
      { id: itemId, data },
      {
        onSuccess: () => {
          showSuccess("Barang berhasil diperbarui");
          router.push("/items");
        },
        onError: (err) => {
          showError(err.message || "Gagal memperbarui barang");
        },
      },
    );
  };

  if (isLoading) return <LoadingOverlay message="Memuat data barang..." />;
  if (isError)
    return (
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Edit Barang
        </Typography>
        <ErrorState message={error?.message} onRetry={() => refetch()} />
      </Box>
    );
  if (!item) return <Typography>Barang tidak ditemukan</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Edit Barang
      </Typography>
      <ItemForm
        item={item}
        onSubmit={handleSubmit}
        loading={updateMutation.isPending}
      />
    </Box>
  );
}
