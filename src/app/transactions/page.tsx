"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PageHeader } from "@/components/ui/page-header";
import { SearchField } from "@/components/ui/search-field";
import { DataTable } from "@/components/ui/data-table";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { getTransactionColumns } from "@/components/transactions/transaction-columns";
import {
  useTransactions,
  useCancelTransaction,
} from "@/hooks/use-transactions";
import { useSnackbar } from "@/components/snackbar-provider";
import { StockTransaction } from "@/types";

export default function TransactionsPage() {
  const { showSuccess, showError } = useSnackbar();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useTransactions(page + 1, limit, search);
  const cancelMutation = useCancelTransaction();

  const [cancelTarget, setCancelTarget] = useState<StockTransaction | null>(null);

  const columns = getTransactionColumns({
    onCancel: (tx) => setCancelTarget(tx),
  });

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    cancelMutation.mutate(cancelTarget.id, {
      onSuccess: () => {
        showSuccess("Transaksi berhasil dibatalkan");
        setCancelTarget(null);
      },
      onError: (err) => {
        showError(err.message || "Gagal membatalkan transaksi");
        setCancelTarget(null);
      },
    });
  };

  if (isLoading) return <LoadingOverlay message="Memuat data transaksi..." />;

  return (
    <Box>
      <PageHeader
        title="Transaksi Stok"
        action={{
          label: "Transaksi Baru",
          href: "/transactions/create",
          icon: <AddIcon />,
        }}
      />

      <Box sx={{ mb: 2 }}>
        <SearchField
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(0);
          }}
          placeholder="Cari berdasarkan nomor transaksi atau nama barang..."
        />
      </Box>

      <DataTable
        columns={columns}
        rows={data?.data ?? []}
        total={data?.total ?? 0}
        page={page}
        rowsPerPage={limit}
        keyExtractor={(row) => row.id}
        onPageChange={setPage}
        onRowsPerPageChange={(val) => {
          setLimit(val);
          setPage(0);
        }}
      />

      <ConfirmDialog
        open={!!cancelTarget}
        title="Batalkan Transaksi"
        message={`Yakin ingin membatalkan transaksi "${cancelTarget?.sequenceNumber}"? Stok akan dikurangi sebanyak ${cancelTarget?.convertedQuantity ?? 0} unit.`}
        confirmText="Batalkan"
        confirmColor="error"
        loading={cancelMutation.isPending}
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelTarget(null)}
      />
    </Box>
  );
}
