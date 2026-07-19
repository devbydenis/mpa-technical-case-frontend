import { Column } from "@/components/ui/data-table.types";
import { Item } from "@/types";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

interface ItemColumnsProps {
  onDelete: (item: Item) => void;
}

export function getItemColumns({ onDelete }: ItemColumnsProps): Column<Item>[] {
  return [
    { id: "name", label: "Nama Barang", minWidth: 150 },
    { id: "sku", label: "SKU", minWidth: 100 },
    { id: "purchaseUnit", label: "Sat. Beli", minWidth: 100 },
    { id: "purchaseQty", label: "Qty Beli", align: "right", minWidth: 80 },
    { id: "saleUnit", label: "Sat. Jual", minWidth: 100 },
    { id: "saleQty", label: "Qty Jual", align: "right", minWidth: 80 },
    { id: "conversionValue", label: "Konversi", align: "right", minWidth: 80 },
    { id: "currentStock", label: "Stok", align: "right", minWidth: 80 },
    {
      id: "actions",
      label: "Aksi",
      align: "center",
      minWidth: 120,
      render: (item) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              component={Link}
              href={`/items/${item.id}`}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Hapus">
            <IconButton size="small" color="error" onClick={() => onDelete(item)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
}
