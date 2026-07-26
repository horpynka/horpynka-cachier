import { ordersApi } from '@/src/api/client';
import { Order } from '@/src/api/generated';
import { ActiveReceiptList } from '@/src/routes/home/components/active-receipt-list';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const [receipts, setReceipts] = useState<Order[]>([]);
  useEffect(() => {
    ordersApi.findAll().then((res) => setReceipts(res.data));
  }, []);

  return (
    <View className="flex flex-row justify-between">
      <View className='flex flex-col gap-4 max-w-[60%] w-full pb-28'>
        <View className="flex flex-row">
          <Text className="text-2xl font-bold">Відкриті чеки ({receipts.length})</Text>
        </View>
        <ActiveReceiptList receipts={receipts} />
      </View>
      <View><Text>smth</Text></View>
    </View>
  );
}
