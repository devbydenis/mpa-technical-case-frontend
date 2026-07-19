"use client";

import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { useCreateTransaction } from "@/hooks/use-transactions";
import { useSnackbar } from "@/components/snackbar-provider";
import { CreateTransactionPayload } from "@/types";

export default function CreateTransactionPage() {
  const router = useRouter();
  const { showSuccess, showError } = useSnackbar();
  const createMutation = useCreateTransaction();

  const handleSubmit = (data: CreateTransactionPayload) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        showSuccess("Transaksi berhasil ditambahkan");
        router.push("/transactions");
      },
      onError: (err) => {
        showError(err.message || "Gagal menambahkan transaksi");
      },
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Transaksi Baru
      </Typography>
      <TransactionForm
        onSubmit={handleSubmit}
        loading={createMutation.isPending}
      />
    </Box>
  );
}
