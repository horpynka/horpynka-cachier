import { ArchiveReceipt } from '@/src/routes/archive/components/archive-receipt';
import { ArchiveReceiptMissing } from '@/src/routes/archive/components/archive-receipt-missing';
import { useOrdersApi, type Order } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function ArchiveReceiptScreen() {
  const { id: rawId } = useLocalSearchParams<{ id: string | string[] }>();
  const id = Number(Array.isArray(rawId) ? rawId[0] : rawId);
  const isValidId = Number.isInteger(id) && id > 0;
  const { getOrderQuery } = useOrdersApi();
  const { data: order, isLoading, isError } = useQuery<Order>({
    ...getOrderQuery(id),
    enabled: isValidId,
  });

  if (isValidId && isLoading) {
    return <View className="flex-1" />;
  }

  if (!isValidId || isError || !order) {
    return <ArchiveReceiptMissing />;
  }

  return <ArchiveReceipt order={order} />;
}
