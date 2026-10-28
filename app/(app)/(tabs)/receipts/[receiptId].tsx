import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import {
  useCategoriesApi,
  useMenuApi,
  useOrdersApi,
  type FindAllCategoriesResponseDto,
  type MenuItemDto,
  type Order,
} from '@horpynka/api-sdk';

import { PaymentSheet } from '@/src/routes/receiptId/components/payment-sheet';
import { ProductsDishesMenu } from '@/src/routes/receiptId/components/products-dishes-menu';
import { ReceiptNotFound } from '@/src/routes/receiptId/components/receipt-not-found';
import { ReceiptSidebar } from '@/src/routes/receiptId/components/receipt-sidebar';
import { useStore } from '@/src/store';

type CatalogMode = 'products' | 'bistro';

const parseReceiptId = (value: string | string[] | undefined) => {
  const raw = Array.isArray(value) ? value[0] : value;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
};

export default function ReceiptDetails() {
  const { receiptId } = useLocalSearchParams<{ receiptId: string }>();
  const orderId = parseReceiptId(receiptId);
  const storedReceipt = useStore((state) => state.receipt);
  const initialOrder = storedReceipt && storedReceipt.id === orderId ? storedReceipt : undefined;

  const [mode, setMode] = useState<CatalogMode>('products');
  const [categoryId, setCategoryId] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const { getMenuQuery } = useMenuApi();
  const { getCategoriesQuery } = useCategoriesApi();
  const { getOrderQuery } = useOrdersApi();

  const { data: menu = [] } = useQuery<MenuItemDto[]>(getMenuQuery());
  const { data: categories } = useQuery<FindAllCategoriesResponseDto>(getCategoriesQuery());
  const { data: order, isPending } = useQuery<Order>({
    ...getOrderQuery(orderId ?? 0),
    enabled: orderId !== null,
    initialData: initialOrder,
  });

  const categoryChips = (mode === 'bistro' ? categories?.dishesCategories : categories?.productsCategories) ?? [];
  const chips = [
    { id: 'all' as const, name: 'Усі' },
    ...categoryChips.map((category) => ({ id: category.id, name: category.name })),
  ];

  const items = useMemo(() => {
    const kind = mode === 'bistro' ? 'DISH' : 'PRODUCT';
    const needle = query.trim().toLowerCase();

    return menu.filter((item) => {
      if (!item.selling || item.kind !== kind) {
        return false;
      }
      if (categoryId !== 'all' && item.categoryId !== categoryId) {
        return false;
      }
      return needle === '' || item.name.toLowerCase().includes(needle);
    });
  }, [categoryId, menu, mode, query]);

  const switchMode = (next: CatalogMode) => {
    setMode(next);
    setCategoryId('all');
  };

  if (orderId === null || (!order && !isPending)) {
    return <ReceiptNotFound />;
  }

  if (!order) {
    return <View className="flex-1" />;
  }

  return (
    <GestureHandlerRootView className="h-full flex-1">
      <BottomSheetModalProvider>
        <View className="h-full min-h-0 flex-1 flex-row gap-4">
          <ProductsDishesMenu
            mode={mode}
            query={query}
            categoryId={categoryId}
            chips={chips}
            items={items}
            onQueryChange={setQuery}
            onCategoryChange={setCategoryId}
            onModeChange={switchMode}
            onAddItem={() => undefined}
          />
          <ReceiptSidebar order={order} onPay={() => setIsPaymentOpen(true)} />
        </View>
        <PaymentSheet
          total={order.orderPrice}
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
