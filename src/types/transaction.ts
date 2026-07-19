import { Item } from "./item";

export interface StockTransaction {
  id: number;
  sequenceNumber: string;
  transactionDate: string;
  itemId: number;
  quantity: number;
  unitType: "purchase" | "sale";
  convertedQuantity: number;
  description: string | null;
  status: "active" | "cancelled";
  cancelledAt: string | null;
  createdAt: string;
  item: Item;
}

export interface CreateTransactionPayload {
  transactionDate: string;
  itemId: number;
  quantity: number;
  unitType: "purchase" | "sale";
  description?: string;
  sequenceNumber?: string;
}
