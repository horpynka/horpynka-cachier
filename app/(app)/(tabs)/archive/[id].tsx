import { type Order, useOrdersApi } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ArchiveReceiptDetail } from '@/src/routes/archive/components/archive-receipt-detail';

const orderIdFromParam = (id: string | string[] | undefined) => {
  const raw = Array.isArray(id) ? id[0] : id;
  const orderId = Number(raw);

  return Number.isInteger(orderId) && orderId > 0 ? orderId : null;
};

export default function ArchiveReceiptScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const orderId = orderIdFromParam(id);
  const { getOrderQuery } = useOrdersApi();
  const { data: order, isLoading } = useQuery<Order>({
    ...getOrderQuery(orderId ?? 0),
    enabled: orderId !== null,
  });

  if (order) {
    return <ArchiveReceiptDetail order={order} />;
  }

  if (isLoading) {
    return <View className="flex-1" />;
  }

  return (
    <View className="items-center gap-2 py-12">
      <Text className="text-center text-muted-foreground">Чек не знайдено.</Text>
      <Pressable onPress={() => router.push('/archive')}>
        <Text className="text-primary underline">До архіву</Text>
      </Pressable>
    </View>
  );
}
