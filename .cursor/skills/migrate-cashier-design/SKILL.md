---
name: migrate-cashier-design
description: >-
  Ports one screen from the horpynka-lovable-cachier POS mock into the Expo
  cashier app. Use when the user asks to migrate, port, match, or implement
  cashier UI from the Lovable mock, horpynka-lovable-cachier, or the POS design.
---

# Migrate cashier design

`horpynka-lovable-cachier` is a read-only web mock (TanStack Start, mock Zustand, shadcn). This package is the Expo app. Copy layout, copy, and interaction from the mock. Implement them with `.cursor/rules/horpynka-cashier.mdc` (structure, NativeWind, components, `@horpynka/api-sdk`).

Do not edit the mock. Do not restate that rule into code comments.

## One screen

Port the screen the user named. If they did not name one, list the rows in [screen-map.md](screen-map.md) and ask which screen. Do not port the app in one pass.

## Read before editing

1. The mock route for that screen, plus feature components it imports (`horpynka-lovable-cachier/src/components/layout`, `src/components/payment`). Skip `src/components/ui/*` except `StatusChip.tsx`. `BottomNav.tsx` and `SideMenu.tsx` are unused. `routes/ui-kit.tsx`, `stores/pos-store.ts`, `data/mock-catalog.ts`, and `lib/format.ts` are not source material.
2. The cashier files in the screen-map row. Extend them. Create a route only when that row has none.
3. The SDK hook file named in the row. Call `useXApi()` as the cashier rule describes. If the behavior has no hook, add it in `api-sdk` with `.cursor/rules/horpynka-api-sdk.mdc` and `api-sdk/.cursor/skills/generate-openapi-client/SKILL.md`. The directory is `api-sdk`, even if a rule says `horpynka-api-sdk`. If the deployed spec has no operation, build the visible control, leave it unwired, and say so. Do not invent `fetch`, axios, or a local success path.

## What to reproduce

- Landscape regions, spacing, radii, and hierarchy from the mock route. The shell is already a left rail plus header. Page padding comes from `app/(app)/(tabs)/_layout.tsx`. Do not add a second safe area, rail, or header inside a tab screen.
- Ukrainian strings from the mock, verbatim.
- Press flows: create, open, delete confirm, search, filters, pay, shift, inventory. Wire each one to the SDK hook that owns it.
- Empty states from the mock.

## What to drop

- HTML (`div`, `button`, `input`, `a`, `header`). Use `View`, `Text`, `Pressable`, `TextInput` or `TextField`, and `expo-router` `Link`. Every string sits in `Text`.
- `lucide-react`, shadcn, `sonner`, TanStack Router, `localStorage`, `navigator.onLine`. Icons are `@expo/vector-icons` Ionicons. Connectivity is `@react-native-community/netinfo`, already used by `src/components/header`.
- Mock prices and `formatPrice`. API money is integer cents. Display it with `moneyService.toMoney`. Dates go through `dateFns` and `DATE_FORMATS`.
- The static cashier name «Олена В.». Read the signed-in user from the session or `useAuthApi`. If the profile is not available yet, omit the name rather than hardcode the mock.
- `hover:`, `grid`, `fixed`, `sticky`, `space-y-*`, `transition`, `shadow-*`, and `size-*`. Translation table: [web-to-native.md](web-to-native.md).
- Template screens `kitchen.tsx`, `menu.tsx`, and the empty `receipts/index.tsx`. Do not implement a mock screen inside them.

## Shell

Change the rail or header only when the user asked for the shell, or the screen you are adding has no rail item yet. Add that item to match `SideRail.tsx` (88px, `bg-slate-900`, icon plus Ukrainian label, active `bg-primary`). Keep the Storybook item behind `EXPO_PUBLIC_DEVELOPMENT`. Logout calls `useSession().signOut()`.

Target destinations, in rail order: Головна `/`, Архів `/archive`, Каса `/cash`, Облік `/inventory`, Вийти. Home is open drafts, not a second «Чеки» tab.

## Layout patterns that matter

- Home is a horizontal split: draft list, then a column with «Створити чек», four stat cards, and four quick links. Confirm uses the cashier `Modal`.
- Receipt is catalog (search, Товари/Бістро, category chips, product cards) beside a cart column. Payment is the bottom panel in `PaymentSheet.tsx`: Готівка, Картка, Комбінована. Use `@gorhom/bottom-sheet` for that panel. Use `Modal` for confirms.
- Search and chips are `useState` on the screen. Submit forms use `TextField`, `react-hook-form`, and `yupService`.

## Done

Match the mock's regions and copy, with live SDK data instead of `usePos`. Run `npm run type-check` in this package. If Expo is already running, open the screen and check the flow you wired (open, create, filter, pay, or the action for that screen).
