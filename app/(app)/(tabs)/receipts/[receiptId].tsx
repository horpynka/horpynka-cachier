import { useMemo, useState } from 'react';
import { View } from 'react-native';
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

type CatalogMode = 'products' | 'bistro';

export default function ReceiptDetails() {
  const { receiptId } = useLocalSearchParams<{ receiptId: string }>();
  const orderId = Number(receiptId);

  const [mode, setMode] = useState<CatalogMode>('products');
  const [categoryId, setCategoryId] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const { getMenuQuery } = useMenuApi();
  const { getCategoriesQuery } = useCategoriesApi();
  const { getOrderQuery } = useOrdersApi();

  // TODO: for now this returns all items as one array, we need two fields: products and dishes
  const { data: menu = [] } = useQuery<MenuItemDto[]>(getMenuQuery());
  const { data: categories } = useQuery<FindAllCategoriesResponseDto>(getCategoriesQuery());
  const { data: order, isPending } = useQuery<Order>({
    ...getOrderQuery(orderId),
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
    <>
      <View className="h-full min-h-0 flex-1 flex-row gap-4">
        {/* TODO: we should have logic for adding/removing items to the order and syncing local data with db data */}
        <ProductsDishesMenu
          mode={mode}
          query={query}
          categoryId={categoryId}
          chips={chips}
          items={items}
          onQueryChange={setQuery}
          onCategoryChange={setCategoryId}
          onModeChange={switchMode}
        />
        <ReceiptSidebar order={order} onPay={() => setIsPaymentOpen(true)} />
      </View>
      <PaymentSheet
        total={order.orderPrice}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />
    </>
  );
}
