import { Column } from "@/types/components/data-table.types";
import { StockTransaction } from "@/types";
import { Chip, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

interface TransactionColumnsProps {
  onCancel: (transaction: StockTransaction) => void;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function getTransactionColumns({
  onCancel,
}: TransactionColumnsProps): Column<StockTransaction>[] {
  return [
    {
      id: "sequenceNumber",
      label: "No. Transaksi",
      minWidth: 220,
      render: (row) => (
        <span style={{ fontFamily: "monospace", fontSize: 13 }}>
          {row.sequenceNumber}
        </span>
      ),
    },
    {
      id: "transactionDate",
      label: "Tanggal",
      minWidth: 100,
      render: (row) => formatDate(row.transactionDate),
    },
    {
      id: "item",
      label: "Barang",
      minWidth: 150,
      render: (row) => row.item?.name ?? "-",
    },
    {
      id: "quantity",
      label: "Qty",
      align: "right",
      minWidth: 80,
      render: (row) => {
        const unit =
          row.unitType === "purchase"
            ? row.item?.purchaseUnit
            : row.item?.saleUnit;
        return `${row.quantity} ${unit ?? ""}`;
      },
    },
    {
      id: "convertedQuantity",
      label: "Konversi",
      align: "right",
      minWidth: 100,
      render: (row) => {
        const unit =
          row.unitType === "purchase"
            ? row.item?.saleUnit
            : row.item?.purchaseUnit;
        return `${row.convertedQuantity} ${unit ?? ""}`;
      },
    },
    {
      id: "status",
      label: "Status",
      align: "center",
      minWidth: 100,
      render: (row) => (
        <Chip
          label={row.status === "active" ? "Aktif" : "Dibatalkan"}
          color={row.status === "active" ? "success" : "error"}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      id: "actions",
      label: "Aksi",
      align: "center",
      minWidth: 130,
      render: (row) => (
        <>
          <Tooltip title="Detail">
            <IconButton
              size="small"
              component={Link}
              href={`/transactions/${row.id}`}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {row.status === "active" && (
            <Tooltip title="Batalkan">
              <IconButton
                size="small"
                color="error"
                onClick={() => onCancel(row)}
              >
                <span style={{ fontSize: 14, fontWeight: 700 }}>✕</span>
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ];
}
