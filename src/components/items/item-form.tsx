"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, Stack, Paper, Typography } from "@mui/material";
import { FormField } from "@/components/ui/form-field";
import { Item, CreateItemPayload } from "@/types";

const itemSchema = z.object({
  name: z.string().min(1, "Nama barang wajib diisi"),
  sku: z.string().min(1, "SKU wajib diisi"),
  purchaseUnit: z.string().min(1, "Satuan pembelian wajib diisi"),
  purchaseQty: z.number().min(1, "Qty pembelian harus lebih dari 0"),
  saleUnit: z.string().min(1, "Satuan penjualan wajib diisi"),
  saleQty: z.number().min(1, "Qty penjualan harus lebih dari 0"),
  conversionValue: z.number().min(1, "Konversi satuan harus lebih dari 0"),
});

type ItemFormValues = z.infer<typeof itemSchema>;

interface ItemFormProps {
  item?: Item;
  onSubmit: (data: CreateItemPayload) => void;
  loading?: boolean;
}

export function ItemForm({ item, onSubmit, loading = false }: ItemFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      sku: "",
      purchaseUnit: "",
      purchaseQty: 1,
      saleUnit: "",
      saleQty: 1,
      conversionValue: 1,
    },
  });

  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        sku: item.sku,
        purchaseUnit: item.purchaseUnit,
        purchaseQty: item.purchaseQty,
        saleUnit: item.saleUnit,
        saleQty: item.saleQty,
        conversionValue: item.conversionValue,
      });
    }
  }, [item, reset]);

  return (
    <Paper variant="outlined" sx={{ p: 3, maxWidth: 600 }}>
      <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormField
              {...field}
              label="Nama Barang"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="sku"
          control={control}
          render={({ field }) => (
            <FormField
              {...field}
              label="SKU"
              error={!!errors.sku}
              helperText={errors.sku?.message}
            />
          )}
        />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Satuan Pembelian
          </Typography>
          <Stack direction="row" spacing={2}>
            <Controller
              name="purchaseUnit"
              control={control}
              render={({ field }) => (
                <FormField
                  {...field}
                  label="Satuan"
                  error={!!errors.purchaseUnit}
                  helperText={errors.purchaseUnit?.message}
                />
              )}
            />
            <Controller
              name="purchaseQty"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <FormField
                  {...field}
                  onChange={(e) => onChange(Number(e.target.value) || 0)}
                  label="Qty"
                  type="number"
                  error={!!errors.purchaseQty}
                  helperText={errors.purchaseQty?.message}
                />
              )}
            />
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Satuan Penjualan
          </Typography>
          <Stack direction="row" spacing={2}>
            <Controller
              name="saleUnit"
              control={control}
              render={({ field }) => (
                <FormField
                  {...field}
                  label="Satuan"
                  error={!!errors.saleUnit}
                  helperText={errors.saleUnit?.message}
                />
              )}
            />
            <Controller
              name="saleQty"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <FormField
                  {...field}
                  onChange={(e) => onChange(Number(e.target.value) || 0)}
                  label="Qty"
                  type="number"
                  error={!!errors.saleQty}
                  helperText={errors.saleQty?.message}
                />
              )}
            />
          </Stack>
        </Box>

        <Controller
          name="conversionValue"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <FormField
              {...field}
              onChange={(e) => onChange(Number(e.target.value) || 0)}
              label="Konversi Satuan"
              type="number"
              error={!!errors.conversionValue}
              helperText={errors.conversionValue?.message}
            />
          )}
        />

        <Box sx={{ display: "flex", gap: 2, pt: 1 }}>
          <Button
            variant="outlined"
            href="/items"
            disabled={loading}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
