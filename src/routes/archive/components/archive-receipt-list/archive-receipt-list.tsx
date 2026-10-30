import type { Order } from '@horpynka/api-sdk';
import { FlatList, Text } from 'react-native';

import { ArchiveReceiptCard } from './archive-receipt-card';

type Props = {
  orders: Order[];
  isLoading: boolean;
};

export const ArchiveReceiptList = ({ orders, isLoading }: Props) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={(order) => String(order.id)}
      className="flex-1"
      contentContainerClassName="grow gap-3"
      renderItem={({ item }) => <ArchiveReceiptCard order={item} />}
      ListEmptyComponent={
        isLoading ? null : (
          <Text className="py-12 text-center text-sm text-muted-foreground">Немає чеків</Text>
        )
      }
    />
  );
};
