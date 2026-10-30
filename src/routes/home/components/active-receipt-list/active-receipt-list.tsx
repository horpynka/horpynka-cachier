import { Order } from '@horpynka/api-sdk';
import { FlatList } from 'react-native';
import { EmptyReceipts } from '../empty-receipts';
import { ActiveReceiptCard } from './active-receipt-card';

type Props = {
  receipts: Order[];
};

export const ActiveReceiptList = ({ receipts }: Props) => {
  if (receipts.length === 0) {
    return <EmptyReceipts />;
  }

  return (
    <FlatList
      data={receipts}
      keyExtractor={(item) => String(item.id)}
      className="flex-1"
      contentContainerClassName="gap-3"
      renderItem={({ item }) => <ActiveReceiptCard data={item} />}
    />
  );
};
