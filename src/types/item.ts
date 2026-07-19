export interface Item {
  id: number;
  name: string;
  sku: string;
  purchaseUnit: string;
  purchaseQty: number;
  saleUnit: string;
  saleQty: number;
  conversionValue: number;
  currentStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemPayload {
  name: string;
  sku: string;
  purchaseUnit: string;
  purchaseQty: number;
  saleUnit: string;
  saleQty: number;
  conversionValue: number;
}

export type UpdateItemPayload = Partial<CreateItemPayload>;
