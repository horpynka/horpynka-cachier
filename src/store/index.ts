import {create} from 'zustand';
import { createReceiptStore } from './receiptStore';
import { ReceiptsStore } from './receiptStore';

export const useStore = create<ReceiptsStore>((set, get, api) => ({
  ...createReceiptStore(set, get, api),
}));