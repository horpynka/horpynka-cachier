# Screen map

Mock paths are under `horpynka-lovable-cachier/src` from the monorepo root. Cashier paths are from this package.

Re-read the hook file before calling it. Method names move. The package import is `@horpynka/api-sdk`.

| Screen | Mock | Cashier | Data |
| --- | --- | --- | --- |
| Home | `routes/index.tsx` | `app/(app)/(tabs)/index.tsx`, `src/routes/home` | `api-sdk/src/operations/ordersApi.ts` for drafts. Shift and today's revenue: `cashShiftsApi.ts`, `dashboardApi.ts`. Do not sum mock receipts. |
| Receipt | `routes/receipt.$id.tsx`, `components/payment/PaymentSheet.tsx` | `app/(app)/(tabs)/receipts/[receiptId].tsx`, `src/routes/receiptId` | `menuApi.ts` for the catalog, `ordersApi.ts` for lines and payment. |
| Archive | `routes/archive.tsx` | `app/(app)/(tabs)/archive/index.tsx`, `src/routes/archive` | `ordersApi.ts` `getOrdersQuery` filters (`status`, `search`, `from`, `to`). |
| Archive detail | `routes/archive.$id.tsx` | `app/(app)/(tabs)/archive/[id].tsx`, `src/routes/archive` | `ordersApi.ts` `getOrderQuery`. Return and cancel only if that hook exposes them. |
| Cash | `routes/cash.tsx` | `app/(app)/(tabs)/cash/index.tsx`, `src/routes/cash` | `cashShiftsApi.ts`. Cash in/out only if the spec has the operation. |
| Bistro | `routes/bistro.tsx` | `app/(app)/(tabs)/bistro/index.tsx`, `src/routes/bistro` | `dashboardApi.ts`, plus `dishesApi.ts` if the stats DTO is not enough. Do not aggregate `pos-store`. |
| Inventory list | `routes/inventory.tsx` | `app/(app)/(tabs)/inventory/index.tsx`, `src/routes/inventory` | `inventoryApi.ts` |
| Inventory count | `routes/inventory.$id.tsx` | `app/(app)/(tabs)/inventory/[id].tsx`, `src/routes/inventory` | `inventoryApi.ts` |
| Rail | `components/layout/SideRail.tsx` | `app/(app)/(tabs)/_layout.tsx` | Logout: `useSession().signOut()` |
| Header | `components/layout/AppHeader.tsx`, `components/ui/StatusChip.tsx` | `src/components/header` | NetInfo for Онлайн / Офлайн / Синхронізація. Cashier name from the session, not the mock. |

Ignore `routes/ui-kit.tsx`, `components/layout/BottomNav.tsx`, `components/layout/SideMenu.tsx`, `components/ui/*` (except StatusChip), `stores/pos-store.ts`, `data/mock-catalog.ts`.
