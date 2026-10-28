import { Modal } from '@/src/ui-kit/components/modal';
import { lightTheme } from '@/src/ui-kit';
import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';
import { Ionicons } from '@expo/vector-icons';
import type { Order, OrderItem } from '@horpynka/api-sdk';
import { type Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

type Props = {
  order: Order;
};

type ConfirmAction = 'return' | 'cancel';

const statusLabel = (status: Order['status']) => {
  if (status === 'COMPLETED') return 'Завершений';
  if (status === 'REFUNDED') return 'Повернений';
  if (status === 'CANCELLED') return 'Скасований';
  return 'Чернетка';
};

const paymentLabel = (order: Order) => {
  const cash = order.paidWithCash > 0;
  const card = order.paidWithCard > 0;
  if (cash && card) return 'Комбі';
  if (cash) return 'Готівка';
  if (card) return 'Картка';
  return '—';
};

const itemName = (item: OrderItem) => item.product?.name ?? item.dish?.name ?? '—';

const itemUnit = (item: OrderItem) => {
  const unit = item.product?.measurementUnit;
  if (unit === 'g') return 'г';
  if (unit === 'ml') return 'мл';
  if (unit === 'pcs' || item.dish) return 'шт';
  return '—';
};

type RowProps = {
  label: string;
  value: string;
};

const MetaRow = ({ label, value }: RowProps) => {
  return (
    <View className="flex-row justify-between py-1">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      <Text className="text-sm font-medium text-foreground">{value}</Text>
    </View>
  );
};

export const ArchiveReceipt = ({ order }: Props) => {
  const router = useRouter();
  const [confirm, setConfirm] = useState<ConfirmAction | null>(null);
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

      <View className="gap-1 rounded-3xl border border-border bg-card p-4">
        <MetaRow label="Дата" value={dateFns.format(order.createdAt, DATE_FORMATS.datetime)} />
        <MetaRow label="Оплата" value={paymentLabel(order)} />
        {isCombo && (
          <>
            <MetaRow label="Готівкою" value={moneyService.toMoney(order.paidWithCash)} />
            <MetaRow label="Карткою" value={moneyService.toMoney(order.paidWithCard)} />
          </>
        )}
        <MetaRow label="Статус" value={statusLabel(order.status)} />
      </View>

      <View className="gap-2">
        <Text className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Позиції</Text>
        {order.orderItems.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between rounded-2xl border border-border bg-card p-3"
          >
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-foreground">{itemName(item)}</Text>
              <Text className="text-xs text-muted-foreground">
                {`1 ${itemUnit(item)} × ${moneyService.toMoney(item.sellingPrice)}`}
              </Text>
            </View>
            <Text className="font-bold text-foreground">{moneyService.toMoney(item.sellingPrice)}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row items-baseline justify-between rounded-3xl border border-border bg-card p-4">
        <Text className="text-muted-foreground">Сума</Text>
        <Text className="text-2xl font-bold text-foreground">{moneyService.toMoney(order.orderPrice)}</Text>
      </View>

      {canModify && (
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setConfirm('return')}
            className="h-14 flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-warning/20 active:opacity-90"
          >
            <Ionicons name="arrow-undo" size={16} color={lightTheme.colors.foreground} />
            <Text className="font-semibold text-foreground">Повернути</Text>
          </Pressable>
          <Pressable
            onPress={() => setConfirm('cancel')}
            className="h-14 flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-destructive/15 active:opacity-90"
          >
            <Ionicons name="ban" size={16} color={lightTheme.colors.destructive} />
            <Text className="font-semibold text-destructive">Скасувати</Text>
          </Pressable>
        </View>
      )}

      <Modal
        isOpen={confirm !== null}
        setIsOpen={(isOpen) => {
          if (!isOpen) setConfirm(null);
        }}
        title={
          confirm === 'cancel'
            ? 'Скасувати чек?'
            : confirm === 'return'
              ? 'Виконати повне повернення?'
              : undefined
        }
      />
    </ScrollView>
  );
};
