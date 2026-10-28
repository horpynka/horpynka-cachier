import { useStore } from '@/src/store';
import { Modal } from '@/src/ui-kit/components/modal';
import { lightTheme } from '@/src/ui-kit';
import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';
import { Ionicons } from '@expo/vector-icons';
import { Order, useOrdersApi } from '@horpynka/api-sdk';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = {
  data: Order;
};

export const ActiveReceiptCard = ({ data }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const setReceipt = useStore((s) => s.setReceipt);
  const router = useRouter();
  const { mutateDeleteReceipt } = useOrdersApi();
  const { id, orderItems, orderPrice, createdAt } = data;

  const openReceipt = () => {
    setReceipt(data);
    router.push(`/receipts/${id}`);
  };

  return (
    <View className="flex-row items-stretch rounded-3xl border border-border bg-card">
      <Pressable
        onPress={openReceipt}
        className="min-w-0 flex-1 flex-row items-center justify-between p-4 active:bg-muted"
      >
        <View className="min-w-0">
          <Text className="text-lg font-bold text-foreground">Чек №{id}</Text>
          <Text className="text-xs text-muted-foreground">
            {orderItems.length} поз. • {dateFns.format(createdAt, DATE_FORMATS.time)}
          </Text>
        </View>
        <View className="shrink-0 items-end">
          <Text className="text-base font-bold text-foreground">{moneyService.toMoney(orderPrice)}</Text>
          <View className="mt-1 rounded-full bg-muted px-2 py-0.5">
            <Text className="text-[10px] text-muted-foreground">Чернетка</Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        accessibilityLabel="Видалити"
        onPress={() => setIsDeleteModalOpen(true)}
        className="items-center justify-center border-l border-border px-4 active:bg-destructive/10"
      >
        <Ionicons name="trash" size={20} color={lightTheme.colors.destructive} />
      </Pressable>
      <Modal
        actions={[
          {
            label: 'Скасувати',
            variant: 'outline',
            onClick: () => {
              setIsDeleteModalOpen(false);
            },
          },
          {
            label: 'Видалити',
            variant: 'destructive',
            onClick: () => {
              mutateDeleteReceipt.mutate({
                params: { id },
                onSettledCallback: () => setIsDeleteModalOpen(false),
              });
            },
          },
        ]}
        title={`Видалити чек №${id}?`}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      >
        <Text className="text-sm text-muted-foreground">
          Чек буде видалено.
        </Text>
      </Modal>
    </View>
  );
};
