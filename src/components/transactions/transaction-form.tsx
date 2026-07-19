"use client";

import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Stack,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from "@mui/material";
import { FormField } from "@/components/ui/form-field";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useItems } from "@/hooks/use-items";
import { CreateTransactionPayload, Item } from "@/types";
import { INDONESIAN_DAYS, ROMAN_MONTHS } from "@/constants/transaction.constants";

function previewSequence(dateStr: string): string {
  if (!dateStr) return "STK/.../.../.../?????";
  const d = new Date(dateStr);
  const day = INDONESIAN_DAYS[d.getDay()];
  const month = ROMAN_MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `STK/${day}/${month}/${year}/?????`;
}

const transactionSchema = z.object({
  transactionDate: z.string().min(1, "Tanggal transaksi wajib diisi"),
  itemId: z.number().min(1, "Barang wajib dipilih"),
  unitType: z.enum(["purchase", "sale"], {
    message: "Jenis satuan wajib dipilih",
  }),
  quantity: z.number().min(0.01, "Quantity harus lebih dari 0"),
  description: z.string().optional(),
  sequenceMode: z.enum(["auto", "manual"]),
  sequenceNumber: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  onSubmit: (data: CreateTransactionPayload) => void;
  loading?: boolean;
}

export function TransactionForm({ onSubmit, loading = false }: TransactionFormProps) {
  const { data: itemsData, isLoading: itemsLoading } = useItems(1, 1000, "");
  const items = useMemo(() => itemsData?.data ?? [], [itemsData]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionDate: new Date().toISOString().split("T")[0],
      itemId: 0,
      unitType: "purchase",
      quantity: 1,
      description: "",
      sequenceMode: "auto",
      sequenceNumber: "",
    },
  });

  const watchedItemId = watch("itemId");
  const watchedUnitType = watch("unitType");
  const watchedQuantity = watch("quantity");
  const watchedDate = watch("transactionDate");
  const watchedSequenceMode = watch("sequenceMode");

  const selectedItem = useMemo(
    () => items.find((it: Item) => it.id === watchedItemId) ?? null,
    [items, watchedItemId],
  );

  const conversionPreview = useMemo(() => {
    if (!selectedItem || !watchedQuantity) return null;
    const qty = Number(watchedQuantity);
    if (qty <= 0) return null;

    if (watchedUnitType === "purchase") {
      const converted = qty * selectedItem.conversionValue;
      return {
        from: `${qty} ${selectedItem.purchaseUnit}`,
        to: `${converted} ${selectedItem.saleUnit}`,
        formula: `${qty} × ${selectedItem.conversionValue} = ${converted}`,
      };
    } else {
      const converted = qty / selectedItem.conversionValue;
      return {
        from: `${qty} ${selectedItem.saleUnit}`,
        to: `${converted} ${selectedItem.purchaseUnit}`,
        formula: `${qty} ÷ ${selectedItem.conversionValue} = ${converted}`,
      };
    }
  }, [selectedItem, watchedQuantity, watchedUnitType]);

  const handleFormSubmit = (values: TransactionFormValues) => {
    const payload: CreateTransactionPayload = {
      transactionDate: values.transactionDate,
      itemId: values.itemId,
      quantity: values.quantity,
      unitType: values.unitType,
      description: values.description || undefined,
    };
    if (values.sequenceMode === "manual" && values.sequenceNumber) {
      payload.sequenceNumber = values.sequenceNumber;
    }
    onSubmit(payload);
  };

  if (itemsLoading) return <LoadingOverlay message="Memuat data barang..." />;

  return (
    <Paper variant="outlined" sx={{ p: 3, maxWidth: 600 }}>
      <Stack component="form" spacing={3} onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="transactionDate"
          control={control}
          render={({ field }) => (
            <FormField
              {...field}
              label="Tanggal Transaksi"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.transactionDate}
              helperText={errors.transactionDate?.message}
            />
          )}
        />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Nomor Transaksi
          </Typography>
          <Controller
            name="sequenceMode"
            control={control}
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value="auto" control={<Radio size="small" />} label="Otomatis" />
                <FormControlLabel value="manual" control={<Radio size="small" />} label="Manual" />
              </RadioGroup>
            )}
          />
          {watchedSequenceMode === "auto" ? (
            <Alert severity="info" sx={{ mt: 1 }}>
              <Typography sx={{ fontFamily: "monospace" }} variant="body2">
                {previewSequence(watchedDate)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Nomor akan di-generate otomatis oleh server
              </Typography>
            </Alert>
          ) : (
            <Controller
              name="sequenceNumber"
              control={control}
              render={({ field }) => (
                <FormField
                  {...field}
                  label="Nomor Manual"
                  placeholder="STK/Senin/VII/2026/00001"
                  error={!!errors.sequenceNumber}
                  helperText={errors.sequenceNumber?.message}
                />
              )}
            />
          )}
        </Box>

        <Controller
          name="itemId"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.itemId}>
              <InputLabel>Barang</InputLabel>
              <Select
                {...field}
                label="Barang"
                value={field.value || ""}
                onChange={(e) => field.onChange(Number(e.target.value) || 0)}
              >
                {items.map((item: Item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name} ({item.sku})
                  </MenuItem>
                ))}
              </Select>
              {errors.itemId && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.itemId.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        {selectedItem && (
          <Alert severity="info" variant="outlined">
            <Typography variant="body2">
              Satuan: {selectedItem.purchaseUnit} → {selectedItem.saleUnit}{" "}
              | Konversi: {selectedItem.conversionValue}
            </Typography>
          </Alert>
        )}

        <Controller
          name="unitType"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.unitType}>
              <InputLabel>Jenis Satuan</InputLabel>
              <Select
                {...field}
                label="Jenis Satuan"
                value={field.value}
              >
                <MenuItem value="purchase">
                  Grosir (Pembelian) {selectedItem ? `— ${selectedItem.purchaseUnit}` : ""}
                </MenuItem>
                <MenuItem value="sale">
                  Eceran (Penjualan) {selectedItem ? `— ${selectedItem.saleUnit}` : ""}
                </MenuItem>
              </Select>
              {errors.unitType && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.unitType.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="quantity"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <FormField
              {...field}
              onChange={(e) => onChange(Number(e.target.value) || 0)}
              label="Quantity"
              type="number"
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
          )}
        />
        {conversionPreview && (
          <Alert severity="success" variant="outlined">
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Preview: {conversionPreview.formula}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {conversionPreview.from} → {conversionPreview.to}
            </Typography>
          </Alert>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <FormField
              {...field}
              label="Keterangan (opsional)"
              multiline
              rows={2}
            />
          )}
        />

        <Box sx={{ display: "flex", gap: 2, pt: 1 }}>
          <Button variant="outlined" href="/transactions" disabled={loading}>
            Batal
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Transaksi"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
