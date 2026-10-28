import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';
import { Href, Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export type BistroArchiveDish = {
  id: number;
  name: string;
  qty: number;
  totalCents: number;
};

export type BistroArchiveReceipt = {
  id: number;
  number: number;
  completedAt: string;
  cashierName?: string;
  status: 'completed' | 'returned' | 'cancelled' | 'draft';
  receiptTotalCents: number;
  payment?: 'cash' | 'card' | 'combo';
  kitchenTotalCents: number;
  dishes: BistroArchiveDish[];
};

const statusLabel = (status: BistroArchiveReceipt['status']) => {
  if (status === 'completed') {
    return 'Завершений';
  }

  if (status === 'returned') {
    return 'Повернений';
  }

  if (status === 'cancelled') {
    return 'Скасований';
  }

  return 'Чернетка';
};

const paymentLabel = (payment: BistroArchiveReceipt['payment']) => {
  if (payment === 'cash') {
    return 'Готівка';
  }

  if (payment === 'card') {
    return 'Картка';
  }

  if (payment === 'combo') {
    return 'Комбі';
  }

  return '—';
};

type Props = {
  receipt: BistroArchiveReceipt;
};

export const BistroArchiveCard = ({ receipt }: Props) => {
  const dishQty = receipt.dishes.reduce((sum, dish) => sum + dish.qty, 0);
  const when = [
    dateFns.format(receipt.completedAt, DATE_FORMATS.short),
    dateFns.format(receipt.completedAt, DATE_FORMATS.time),
    receipt.cashierName,
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <Link href={`/archive/${receipt.id}` as Href} asChild>
      <Pressable className="flex-1 rounded-3xl border border-border bg-card p-4 active:bg-muted">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-lg font-bold">Чек №{receipt.number}</Text>
            <Text className="mt-0.5 text-xs text-muted-foreground">{when}</Text>
          </View>
          <View className="rounded-full bg-success/15 px-2 py-0.5">
            <Text className="text-[10px] font-bold uppercase tracking-wide text-success">
              {statusLabel(receipt.status)}
            </Text>
          </View>
        </View>

        <View className="mt-3 flex-row gap-2">
          <View className="flex-1 rounded-2xl bg-muted p-3">
            <Text className="text-[10px] font-bold uppercase text-muted-foreground">Сума чека</Text>
            <Text className="mt-0.5 text-base font-bold">
              {moneyService.toMoney(receipt.receiptTotalCents)}
            </Text>
            <Text className="mt-0.5 text-[10px] text-muted-foreground">
              {paymentLabel(receipt.payment)}
            </Text>
          </View>
          <View className="flex-1 rounded-2xl bg-primary/10 p-3">
            <Text className="text-[10px] font-bold uppercase text-primary">Сума кухні</Text>
            <Text className="mt-0.5 text-base font-bold text-primary">
              {moneyService.toMoney(receipt.kitchenTotalCents)}
            </Text>
            <Text className="mt-0.5 text-[10px] text-muted-foreground">{dishQty} шт страв</Text>
          </View>
        </View>

        <View className="mt-3 gap-1">
          {receipt.dishes.map((dish) => (
            <View key={dish.id} className="flex-row items-center justify-between">
              <Text className="text-xs text-foreground/80">
                {dish.name} <Text className="text-muted-foreground">× {dish.qty}</Text>
              </Text>
              <Text className="text-xs font-semibold">{moneyService.toMoney(dish.totalCents)}</Text>
            </View>
          ))}
        </View>
      </Pressable>
    </Link>
  );
};
