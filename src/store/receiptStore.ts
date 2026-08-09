import { StateCreator } from "zustand";
import { Order } from "../api/generated";

export type ReceiptsStore = {
  receipt: Order | null;
  setReceipt: (receipt: Order) => void;
}

export const createReceiptStore: StateCreator<ReceiptsStore> = (set) => ({
  receipt: null,
  setReceipt: (receipt: Order) => set(() => ({ receipt })),
});