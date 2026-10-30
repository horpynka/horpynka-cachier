import { type Order, useOrdersApi } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { ArchiveReceiptDetail } from '@/src/routes/archive/components/archive-receipt-detail';

export default function ArchiveReceiptScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getOrderQuery } = useOrdersApi();
  const { data: order, isLoading } = useQuery<Order>({
    ...getOrderQuery(Number(id)),
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
