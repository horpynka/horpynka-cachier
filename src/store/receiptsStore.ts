
type ReceiptsStore = {
  receipts: 
}

export const createReceiptsStore = (set) => ({
  receipts: [],
  setReceipts: (receipts) => set(() => ({ receipts })),
});