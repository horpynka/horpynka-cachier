import type { Order } from '@horpynka/api-sdk';
import { ScrollView, Text, View } from 'react-native';

import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';

import { archiveStatusTone, paymentLabel } from '../../order-labels';
import { type BoughtLine, boughtQuantityLabel, groupBoughtLines } from './helpers';

type Props = {
  order: Order;
};

type RowProps = {
  label: string;
  value: string;
};

const DetailRow = ({ label, value }: RowProps) => {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <Text className="text-muted-foreground">{label}</Text>
      <Text className="font-semibold text-foreground">{value}</Text>
    </View>
  );
};

const BoughtLineRow = ({ line, isLast }: { line: BoughtLine; isLast: boolean }) => {
  return (
    <View className={isLast ? 'gap-1 px-4 py-3' : 'gap-1 border-b border-border px-4 py-3'}>
      <View className="flex-row items-start justify-between gap-3">
        <Text className="min-w-0 flex-1 font-semibold text-foreground">{line.name}</Text>
        <Text className="font-bold text-foreground">{moneyService.toMoney(line.unitPrice * line.quantity)}</Text>
      </View>
      {line.meta ? <Text className="text-xs text-muted-foreground">{line.meta}</Text> : null}
      <Text className="text-sm text-muted-foreground">
        {line.quantity} × {moneyService.toMoney(line.unitPrice)}
      </Text>
      {line.discountLabel ? <Text className="text-xs text-muted-foreground">{line.discountLabel}</Text> : null}
    </View>
  );
};

export const ArchiveReceiptDetail = ({ order }: Props) => {
  const status = archiveStatusTone(order.status);
  const lines = groupBoughtLines(order.orderItems);
  const quantity = order.orderItems.length;

  return (
    <ScrollView className="h-full" contentContainerClassName="w-full max-w-3xl gap-4 self-center pb-8">
      <Text className="text-lg font-bold">Чек №{order.id}</Text>
      <View className="gap-1 rounded-3xl border border-border bg-card p-4">
        <DetailRow
          label="Дата"
          value={`${dateFns.format(order.createdAt, DATE_FORMATS.short)} ${dateFns.format(order.createdAt, DATE_FORMATS.time)}`}
        />
        <DetailRow label="Оплата" value={paymentLabel(order)} />
        <DetailRow label="Статус" value={status.label} />
        <DetailRow label="Сума" value={moneyService.toMoney(order.orderPrice)} />
      </View>
      <View className="overflow-hidden rounded-3xl border border-border bg-card">
        <View className="border-b border-border px-4 py-3">
          <Text className="font-semibold text-foreground">Куплено</Text>
          <Text className="text-xs text-muted-foreground">{boughtQuantityLabel(quantity)}</Text>
        </View>
        {lines.length === 0 ? (
          <Text className="px-4 py-8 text-center text-sm text-muted-foreground">У чеку немає позицій.</Text>
        ) : (
          lines.map((line, index) => (
            <BoughtLineRow key={line.key} line={line} isLast={index === lines.length - 1} />
          ))
        )}
      </View>
    </ScrollView>
  );
};
