"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PageHeader } from "@/components/ui/page-header";
import { SearchField } from "@/components/ui/search-field";
import { DataTable } from "@/components/ui/data-table";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { getItemColumns } from "@/components/items/item-columns";
import { useItems, useDeleteItem } from "@/hooks/use-items";
import { useSnackbar } from "@/components/snackbar-provider";
import { Item } from "@/types";

export default function ItemsPage() {
  const { showSuccess, showError } = useSnackbar();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useItems(page + 1, limit, search);
  const deleteMutation = useDeleteItem();

  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);

  const columns = getItemColumns({
    onDelete: (item) => setDeleteTarget(item),
  });

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        showSuccess("Barang berhasil dihapus");
        setDeleteTarget(null);
      },
      onError: (err) => {
        showError(err.message || "Gagal menghapus barang");
        setDeleteTarget(null);
      },
    });
  };

  if (isLoading) return <LoadingOverlay message="Memuat data barang..." />;

  return (
    <Box>
      <PageHeader
        title="Master Barang"
        action={{ label: "Tambah Barang", href: "/items/create", icon: <AddIcon /> }}
      />

      <Box sx={{ mb: 2 }}>
        <SearchField
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(0);
          }}
          placeholder="Cari berdasarkan nama atau SKU..."
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
        open={!!deleteTarget}
        title="Hapus Barang"
        message={`Yakin ingin menghapus "${deleteTarget?.name}"?`}
        confirmText="Hapus"
        confirmColor="error"
        loading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
}
