import { Order } from '@/src/api/generated';
import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';
import { Text, View } from 'react-native';

type Props = {
  data: Order
}

export const ActiveReceiptCard = ({ data: { id, orderItems, orderPrice, createdAt } }: Props) => {
  return (
    <View className="h-22 bg-card rounded-3xl border border-border flex items-stretch">
      <View className="flex flex-row justify-between items-center">
        <View className="flex justify-between p-4">
          <View className="flex flex-col">
            <Text className="font-bold text-lg">Чек №{id}</Text>
            <Text className="text-xs text-muted-foreground">
              {orderItems.length} поз.{' '}
              {dateFns.isSameDay(createdAt, new Date())
                ? dateFns.format(createdAt, DATE_FORMATS.time)
                : dateFns.format(createdAt, DATE_FORMATS.datetime)}
            </Text>
          </View>
        </View>
        <View className="flex flex-col">
          <Text>{moneyService.toMoney(orderPrice)}</Text>
          <Text>test</Text>
        </View>
      </View>
    </View>
  );
};
