# Screen map

Mock paths are under `horpynka-lovable-cachier/src` from the monorepo root. Cashier paths are from this package.

Re-read the hook file before calling it. Method names move. The package import is `@horpynka/api-sdk`.

| Screen | Mock | Cashier | Data |
| --- | --- | --- | --- |
| Sign-in | — | `app/sign-in.tsx` | `authApi.ts` `mutateSignIn`, through `useSession().signIn()`. |
| Home | `routes/index.tsx` | `app/(app)/(tabs)/index.tsx`, `src/routes/home` | Drafts: `ordersApi.ts` `getOrdersQuery({ status: 'CREATED' })`, `mutateCreateOrder`, `mutateDeleteReceipt`. Open shift: `cashShiftsApi.ts` `getCashShiftsQuery`. Stats: `dashboardApi.ts` `getStatsQuery`. Do not sum mock receipts. Quick links: `/cash`, `/archive`, `/inventory`. |
| Receipt | `routes/receipt.$id.tsx`, `components/payment/PaymentSheet.tsx` | `app/(app)/(tabs)/receipts/[receiptId].tsx`, `src/routes/receiptId` | Catalog: `menuApi.ts` `getMenuQuery`, `categoriesApi.ts` `getCategoriesQuery`. Order: `ordersApi.ts` `getOrderQuery`, `mutateDeleteReceipt`. Payment sheet is on screen and does not call a pay mutation. |
| Archive | `routes/archive.tsx` | `app/(app)/(tabs)/archive/index.tsx`, `src/routes/archive` | `ordersApi.ts` `getOrdersQuery` (`status`, `search`, `from`, `to`). Sort is local. |
| Archive detail | `routes/archive.$id.tsx` | `app/(app)/(tabs)/archive/[id].tsx`, `src/routes/archive` | `ordersApi.ts` `getOrderQuery`. Return and cancel are on screen and unwired; that hook does not expose them. |
| Cash | `routes/cash.tsx` | `app/(app)/(tabs)/cash/index.tsx`, `src/routes/cash` | Drawer balance, then `useSession().signOut()`. Shift open/close is `cashShiftsApi.ts` (`mutateOpenCashShift`, `mutateCloseCashShift`); this screen does not call it. |
| Bistro | `routes/bistro.tsx` | — | No cashier route. The mock rail and home quick links include `/bistro`; this app does not. |
| Inventory list | `routes/inventory.tsx` | `app/(app)/(tabs)/inventory/index.tsx`, `src/routes/inventory` | `inventoryApi.ts` `getInventoriesQuery`, `mutateStartInventory`. |
| Inventory count | `routes/inventory.$id.tsx` | `app/(app)/(tabs)/inventory/[id].tsx`, `src/routes/inventory` | `inventoryApi.ts` `getInventoryQuery`, `mutateSaveInventoryActualQuantities`, `mutateCompleteInventory`. |
| Rail | `components/layout/SideRail.tsx` | `app/(app)/(tabs)/_layout.tsx` | Головна `/`, Архів `/archive`, Каса `/cash`, Облік `/inventory`, Вийти via `useSession().signOut()`. Storybook when `EXPO_PUBLIC_DEVELOPMENT`. The mock rail also has Бістро `/bistro`. |
| Header | `components/layout/AppHeader.tsx`, `components/ui/StatusChip.tsx` | `src/components/header` | NetInfo for Онлайн / Офлайн / Синхронізація. No cashier name. |

`app/(app)/(tabs)/kitchen.tsx`, `menu.tsx`, and `receipts/index.tsx` are leftover templates. Do not port a mock screen into them.

Ignore `routes/ui-kit.tsx`, `components/layout/BottomNav.tsx`, `components/layout/SideMenu.tsx`, `components/ui/*` (except StatusChip), `stores/pos-store.ts`, `data/mock-catalog.ts`.
