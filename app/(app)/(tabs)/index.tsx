import { ActiveReceiptList } from '@/src/routes/home/components/active-receipt-list';
import { Order, useOrdersApi } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const { getOrdersQuery } = useOrdersApi();
  const { data: receipts = [] } = useQuery<Order[]>(getOrdersQuery());

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
