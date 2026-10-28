import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOrdersApi, type Order } from '@horpynka/api-sdk';

import { Modal } from '@/src/ui-kit/components/modal';
import { lightTheme } from '@/src/ui-kit';
import { moneyService } from '@/src/utils/money-service';
import { OrderItem } from './components/order-item';

type Props = {
  order: Order;
  onPay: () => void;
};

export const ReceiptSidebar = ({ order, onPay }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const { mutateDeleteReceipt } = useOrdersApi();
  const quantity = order.orderItems.length;

  const deleteReceipt = () => {
    mutateDeleteReceipt.mutate({
      params: { id: order.id },
      onSettledCallback: () => {
        setIsDeleteModalOpen(false);
        router.push('/');
      },
    });
  };

  return (
    <View className="w-[380px] overflow-hidden rounded-3xl border border-border bg-card">
      <View className="flex-row items-center justify-between border-b border-border p-4">
        <View>
          <Text className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Чек</Text>
          <Text className="text-lg font-bold leading-tight">№{order.id}</Text>
        </View>
        <Pressable
          onPress={() => setIsDeleteModalOpen(true)}
          className="h-10 w-10 items-center justify-center rounded-xl active:bg-muted"
        >
          <Ionicons name="trash" size={20} color={lightTheme.colors.destructive} />
        </Pressable>
      </View>
      <View className="min-h-0 flex-1">
        <FlatList
          data={order.orderItems}
          keyExtractor={(item) => String(item.id)}
          contentContainerClassName="gap-2 p-3"
          ListEmptyComponent={
            <Text className="py-12 text-center text-sm text-muted-foreground">
              Натисніть на товар, щоб додати у чек
            </Text>
          }
          renderItem={({ item }) => (
            <OrderItem
              data={item}
              onRemove={() => undefined}
              onChangeQuantity={() => undefined}
            />
          )}
        />
      </View>
      <View className="gap-3 border-t border-border p-4">
        <View className="flex-row items-baseline justify-between">
          <Text className="text-sm text-muted-foreground">Підсумок ({quantity})</Text>
          <Text className="text-2xl font-bold">{moneyService.toMoney(order.orderPrice)}</Text>
        </View>
        <Pressable
          disabled={quantity === 0}
          onPress={onPay}
          className="h-14 w-full items-center justify-center rounded-2xl bg-primary active:opacity-90 disabled:opacity-50"
        >
          <Text className="font-bold text-primary-foreground">Оплатити</Text>
        </Pressable>
      </View>
      <Modal
        title="Видалити чек?"
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        actions={[
          {
            label: 'Скасувати',
            variant: 'outline',
            onClick: () => setIsDeleteModalOpen(false),
          },
          {
            label: 'Видалити',
            variant: 'destructive',
            loading: mutateDeleteReceipt.isPending,
            onClick: deleteReceipt,
          },
        ]}
      />
    </View>
  );
};
