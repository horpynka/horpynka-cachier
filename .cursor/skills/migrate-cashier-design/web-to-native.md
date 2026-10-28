# Web mock to NativeWind

Keep semantic tokens (`bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`, `bg-success`, `bg-destructive`). They already match the mock. A color that has a token stays a token.

| Mock | Cashier |
| --- | --- |
| `div` | `View` |
| text node, `h1`, `span`, `p` | `Text` with the same size and weight (`text-2xl font-bold`, `text-xs text-muted-foreground`) |
| `button`, `onClick` | `Pressable` `onPress`. Filled primary actions can be `@/src/ui-kit/components/button`. |
| `input` | `TextField` inside a form. A search box is `TextInput` with `placeholderTextColor` from `lightTheme` in `@/src/ui-kit`. |
| `Link` from TanStack Router | `Link` or `router.push` from `expo-router` |
| `className` on several elements | `className` via NativeWind. Conditional classes use `cn` from `classnames`. |
| `flex`, `flex-col`, `flex-1`, `gap-*`, `p-*`, `rounded-2xl`, `rounded-3xl`, `border` | Same classes. Cards stay `rounded-3xl border border-border bg-card`. |
| `grid grid-cols-2` | `flex-row flex-wrap` with `w-[48%]` children, or two `flex-1` columns in a `flex-row` with `gap-3`. |
| `grid-cols-[1fr_360px]` or `[1fr_380px]` | `flex-row`. Main column `flex-1`. Side column a fixed width close to the mock (`w-[360px]` / `w-[380px]`). |
| `h-full`, `min-h-0`, scroll | Parent `flex-1`. A scrolling region is `ScrollView` or `FlatList`. List cards use `FlatList` and `contentContainerClassName="gap-3"`. |
| `fixed inset-0` confirm | `@/src/ui-kit/components/modal` |
| `fixed inset-0 items-end` payment sheet | `@gorhom/bottom-sheet` |
| `overflow-y-auto` | `ScrollView` |
| `size-5`, `size-10` | `w-5 h-5`, `w-10 h-10` |
| `space-y-3` | `gap-3` on the parent |
| `hidden sm:inline` | Drop the hide. The cashier is landscape. |
| `hover:*`, `transition-*`, `active:scale-*`, `shadow-*`, `animate-pulse` | Drop. `active:bg-muted` and `active:opacity-90` are enough. |
| lucide icon `className="size-5"` | Ionicons `size={20}`. Color is a `lightTheme` hex when the prop cannot take a class. |

Icon hints: Plus `add`, Trash2 `trash`, Search `search`, ArrowLeft `arrow-back`, Minus `remove`, X `close`, Home `home`, Archive `archive`, Wallet `wallet`, UtensilsCrossed `restaurant`, ClipboardList `clipboard`, LogOut `log-out`, Banknote `cash`, CreditCard `card`.
