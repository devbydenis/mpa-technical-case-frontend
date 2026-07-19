"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  ApiResponse,
  PaginatedData,
  Item,
  CreateItemPayload,
  UpdateItemPayload,
} from "@/types";

export function useItems(page: number, limit: number, q: string) {
  return useQuery({
    queryKey: ["items", page, limit, q],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (q) params.set("q", q);
      const res = await api.get<ApiResponse<PaginatedData<Item>>>(
        `/items?${params}`,
      );
      const { data } = res.data;
      return data;
    },
  });
}

export function useItem(id: number | null) {
  return useQuery({
    queryKey: ["items", id],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Item>>(`/items/${id}`);
      const { data } = res.data;
      return data;
    },
    enabled: id !== null,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dataItem: CreateItemPayload) => {
      const res = await api.post<ApiResponse<Item>>("/items", dataItem);
      const { data } = res.data;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateItemPayload;
    }) => {
      const res = await api.put<ApiResponse<Item>>(`/items/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete<ApiResponse<null>>(`/items/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
