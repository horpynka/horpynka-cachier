import type { Order } from '@horpynka/api-sdk';
import { Text, View } from 'react-native';

import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';

import { archiveStatusTone, paymentLabel } from '../../order-labels';

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

export const ArchiveReceiptDetail = ({ order }: Props) => {
  const status = archiveStatusTone(order.status);

  return (
    <View className="gap-4">
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
    </View>
  );
};
