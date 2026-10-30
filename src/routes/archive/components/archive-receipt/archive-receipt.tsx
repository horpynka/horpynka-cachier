import { Modal } from '@/src/ui-kit/components/modal';
import { lightTheme } from '@/src/ui-kit';
import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';
import { Ionicons } from '@expo/vector-icons';
import type { Order } from '@horpynka/api-sdk';
import { type Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { getItemName, getItemUnit, getPaymentLabel, getStatusLabel } from './helpers';
import { RowInfo } from './components/row-info';

type Props = {
  order: Order;
};

export const ArchiveReceipt = ({ order }: Props) => {
  const router = useRouter();
  const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = useState(false);
  const [isReturnOrderModalOpen, setIsReturnOrderModalOpen] = useState(false);
  const isCombo = order.paidWithCash > 0 && order.paidWithCard > 0;
  const canModify = order.status === 'COMPLETED';

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-4">
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => router.push('/archive' as Href)}
          className="-ml-2 h-10 w-10 items-center justify-center rounded-xl active:bg-muted"
        >
          <Ionicons name="arrow-back" size={20} color={lightTheme.colors.foreground} />
        </Pressable>
        <Text className="font-bold text-foreground">Чек №{order.id}</Text>
        <View className="w-10" />
      </View>

      <View className="gap-1 rounded-md border border-border bg-card p-4">
        <RowInfo label="Дата" value={dateFns.format(order.createdAt, DATE_FORMATS.datetime)} />
        <RowInfo label="Оплата" value={getPaymentLabel(order)} />
        {isCombo && (
          <>
            <RowInfo label="Готівкою" value={moneyService.toMoney(order.paidWithCash)} />
            <RowInfo label="Карткою" value={moneyService.toMoney(order.paidWithCard)} />
          </>
        )}
        <RowInfo label="Статус" value={getStatusLabel(order.status)} />
      </View>

      <View className="gap-2">
        <Text className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Позиції</Text>
        {order.orderItems.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between rounded-md border border-border bg-card p-3"
          >
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-foreground">{getItemName(item)}</Text>
              <Text className="text-xs text-muted-foreground">
                {`1 ${getItemUnit(item)} × ${moneyService.toMoney(item.sellingPrice)}`}
              </Text>
            </View>
            <Text className="font-bold text-foreground">{moneyService.toMoney(item.sellingPrice)}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row items-baseline justify-between rounded-md border border-border bg-card p-4">
        <Text className="text-muted-foreground">Сума</Text>
        <Text className="text-2xl font-bold text-foreground">{moneyService.toMoney(order.orderPrice)}</Text>
      </View>

      {/* TODO: add return and cancel actions logic on frontend and backend */}
      {canModify && (
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setIsReturnOrderModalOpen(true)}
            className="h-14 flex-1 flex-row items-center justify-center gap-2 rounded-md bg-warning/20 active:opacity-90"
          >
            <Ionicons name="arrow-undo" size={16} color={lightTheme.colors.foreground} />
            <Text className="font-semibold text-foreground">Повернути</Text>
          </Pressable>
          <Pressable
            onPress={() => setIsCancelOrderModalOpen(true)}
            className="h-14 flex-1 flex-row items-center justify-center gap-2 rounded-md bg-destructive/15 active:opacity-90"
          >
            <Ionicons name="ban" size={16} color={lightTheme.colors.destructive} />
            <Text className="font-semibold text-destructive">Скасувати</Text>
          </Pressable>
        </View>
      )}

      <Modal
        isOpen={isReturnOrderModalOpen}
        setIsOpen={setIsReturnOrderModalOpen}
        title='Виконати повне повернення?'
      />

      <Modal
        isOpen={isCancelOrderModalOpen}
        setIsOpen={setIsCancelOrderModalOpen}
        title='Скасувати чек?'
      />
    </ScrollView>
  );
};
