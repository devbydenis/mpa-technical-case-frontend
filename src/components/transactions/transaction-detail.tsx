"use client";

import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { StockTransaction } from "@/types";

interface TransactionDetailProps {
  transaction: StockTransaction;
  onCancel: () => void;
  cancelLoading?: boolean;
}

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatFullDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TransactionDetail({
  transaction,
  onCancel,
  cancelLoading = false,
}: TransactionDetailProps) {
  const item = transaction.item;
  const isActive = transaction.status === "active";
  const unitLabel =
    transaction.unitType === "purchase"
      ? `Grosir (${item?.purchaseUnit ?? "-"})`
      : `Eceran (${item?.saleUnit ?? "-"})`;

  const convertedUnit =
    transaction.unitType === "purchase"
      ? item?.saleUnit ?? "-"
      : item?.purchaseUnit ?? "-";

  return (
    <Paper variant="outlined" sx={{ p: 3, maxWidth: 600 }}>
      <Stack spacing={2.5}>
        <DetailRow
          label="No. Transaksi"
          value={
            <Typography sx={{ fontFamily: "monospace", fontWeight: 600 }}>
              {transaction.sequenceNumber}
            </Typography>
          }
        />
        <DetailRow
          label="Tanggal"
          value={formatDateTime(transaction.transactionDate)}
        />
        <DetailRow
          label="Barang"
          value={
            item
              ? `${item.name} (${item.sku})`
              : `-`
          }
        />
        <DetailRow label="Satuan" value={unitLabel} />
        <DetailRow
          label="Quantity"
          value={`${transaction.quantity}`}
        />
        <DetailRow
          label="Konversi"
          value={`${transaction.quantity} → ${transaction.convertedQuantity} ${convertedUnit}`}
        />
        <DetailRow
          label="Stok Ditambahkan"
          value={
            <Typography
              sx={{ fontWeight: 600, color: isActive ? "success.main" : "text.secondary" }}
            >
              +{transaction.convertedQuantity} {convertedUnit}
            </Typography>
          }
        />
        {transaction.description && (
          <DetailRow label="Keterangan" value={transaction.description} />
        )}

        <Divider />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
            Status
          </Typography>
          <Chip
            label={isActive ? "Aktif" : "Dibatalkan"}
            color={isActive ? "success" : "error"}
            size="small"
            variant="outlined"
          />
        </Box>

        <DetailRow
          label="Dibuat pada"
          value={formatFullDateTime(transaction.createdAt)}
        />

        {!isActive && transaction.cancelledAt && (
          <DetailRow
            label="Dibatalkan pada"
            value={formatFullDateTime(transaction.cancelledAt)}
          />
        )}

        {isActive && (
          <>
            <Divider />
            <Button
              variant="outlined"
              color="error"
              onClick={onCancel}
              disabled={cancelLoading}
            >
              {cancelLoading ? "Membatalkan..." : "Kembalikan Stok (Cancel)"}
            </Button>
          </>
        )}
      </Stack>
    </Paper>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ minWidth: 120, flexShrink: 0 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}
