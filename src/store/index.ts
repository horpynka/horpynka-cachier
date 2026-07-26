import {create} from 'zustand';
import { createReceiptsStore } from './receiptsStore';

export const useStore = create((set) => ({
  ...createReceiptsStore(set),
}));