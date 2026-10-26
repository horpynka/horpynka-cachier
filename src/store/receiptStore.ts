import { Order } from "@horpynka/api-sdk";
import { StateCreator } from "zustand";

export type ReceiptsStore = {
  receipt: Order | null;
  setReceipt: (receipt: Order) => void;
}

export const createReceiptStore: StateCreator<ReceiptsStore> = (set) => ({
  receipt: null,
  setReceipt: (receipt: Order) => set(() => ({ receipt })),
});