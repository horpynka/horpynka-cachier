import { FlatList } from 'react-native';
import { ActiveReceiptCard } from './active-receipt-card';
import { Order } from '@horpynka/api-sdk';

type Props = {
  receipts: Order[]
}

export const ActiveReceiptList = ({ receipts }: Props) => {
  return (
    <FlatList
      data={receipts}
      contentContainerClassName="gap-3"
      renderItem={({ item }) => <ActiveReceiptCard data={item} />}
    />
  );
};
