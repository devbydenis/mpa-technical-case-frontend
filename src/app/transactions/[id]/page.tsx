"use client";

import { use, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TransactionDetail } from "@/components/transactions/transaction-detail";
import { useTransaction, useCancelTransaction } from "@/hooks/use-transactions";
import { useSnackbar } from "@/components/snackbar-provider";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ErrorState } from "@/components/ui/error-state";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const transactionId = Number(id);

  const { showSuccess, showError } = useSnackbar();

  const { data: transaction, isLoading, isError, error, refetch } =
    useTransaction(transactionId);
  const cancelMutation = useCancelTransaction();

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handleCancel = () => {
    if (!transaction) return;
    cancelMutation.mutate(transaction.id, {
      onSuccess: () => {
        showSuccess("Transaksi berhasil dibatalkan");
        setCancelDialogOpen(false);
      },
      onError: (err) => {
        showError(err.message || "Gagal membatalkan transaksi");
        setCancelDialogOpen(false);
      },
    });
  };

  if (isLoading) return <LoadingOverlay message="Memuat data transaksi..." />;
  if (isError)
    return (
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Detail Transaksi
        </Typography>
        <ErrorState message={error?.message} onRetry={() => refetch()} />
      </Box>
    );
  if (!transaction)
    return <Typography>Transaksi tidak ditemukan</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Detail Transaksi
      </Typography>
      <TransactionDetail
        transaction={transaction}
        onCancel={() => setCancelDialogOpen(true)}
        cancelLoading={cancelMutation.isPending}
      />

      <ConfirmDialog
        open={cancelDialogOpen}
        title="Batalkan Transaksi"
        message={`Yakin ingin membatalkan transaksi "${transaction.sequenceNumber}"? Stok akan dikurangi sebanyak ${transaction.convertedQuantity} unit.`}
        confirmText="Batalkan"
        confirmColor="error"
        loading={cancelMutation.isPending}
        onConfirm={handleCancel}
        onCancel={() => setCancelDialogOpen(false)}
      />
    </Box>
  );
}
