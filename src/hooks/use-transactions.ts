"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  ApiResponse,
  PaginatedData,
  StockTransaction,
  CreateTransactionPayload,
} from "@/types";

export function useTransactions(page: number, limit: number, q: string) {
  return useQuery({
    queryKey: ["transactions", page, limit, q],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (q) params.set("q", q);
      const res = await api.get<ApiResponse<PaginatedData<StockTransaction>>>(
        `/stock-transactions?${params}`,
      );
      const { data } = res.data;
      return data;
    },
  });
}

export function useTransaction(id: number | null) {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<StockTransaction>>(
        `/stock-transactions/${id}`,
      );
      const { data } = res.data;
      return data;
    },
    enabled: id !== null,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionPayload) => {
      const res = await api.post<ApiResponse<StockTransaction>>(
        "/stock-transactions",
        data,
      );
      const { data: result } = res.data;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useCancelTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.patch<ApiResponse<StockTransaction>>(
        `/stock-transactions/${id}/cancel`,
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
