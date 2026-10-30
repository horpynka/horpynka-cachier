import type { Order } from '@horpynka/api-sdk';
import cn from 'classnames';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';

import { archiveStatusTone, paymentLabel } from '../../../order-labels';

type Props = {
  order: Order;
};

export const ArchiveReceiptCard = ({ order }: Props) => {
  const router = useRouter();
  const status = archiveStatusTone(order.status);

  return (
    <Pressable
      onPress={() => {
        router.push(`/archive/${order.id}`);
      }}
      className="rounded-3xl border border-border bg-card p-4 active:bg-muted/30"
    >
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-lg font-bold">Чек №{order.id}</Text>
          <Text className="mt-0.5 text-xs text-muted-foreground">
            {dateFns.format(order.createdAt, DATE_FORMATS.short)} • {dateFns.format(order.createdAt, DATE_FORMATS.time)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-lg font-bold">{moneyService.toMoney(order.orderPrice)}</Text>
          <Text className="text-xs text-muted-foreground">{paymentLabel(order)}</Text>
        </View>
      </View>
      <View className={cn('mt-2 self-start rounded-full px-2 py-0.5', status.containerClassName)}>
        <Text className={cn('text-[10px] font-bold uppercase tracking-wide', status.textClassName)}>
          {status.label}
        </Text>
      </View>
    </Pressable>
  );
};
