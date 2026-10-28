import { InventoryDto } from '@horpynka/api-sdk';
import cn from 'classnames';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';

type Props = {
  inventory: InventoryDto;
};

const statusLabel = (status: InventoryDto['status']) => {
  if (status === 'COMPLETED') {
    return 'Завершена';
  }

  if (status === 'WITH_DIFFERENCES') {
    return 'Є розбіжності';
  }

  return 'Чернетка';
};

const statusClassName = (status: InventoryDto['status']) => {
  if (status === 'COMPLETED') {
    return 'bg-success/15 text-success';
  }

  if (status === 'WITH_DIFFERENCES') {
    return 'bg-warning/15 text-warning';
  }

  return 'bg-muted text-muted-foreground';
};

export const InventoryCard = ({ inventory }: Props) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.push(`/inventory/${inventory.id}`);
      }}
      className="w-[48%] rounded-3xl border border-border bg-card p-4 active:bg-muted"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-2">
          <Text className="font-bold">Інвентаризація №{inventory.id}</Text>
          <Text className="mt-0.5 text-xs text-muted-foreground">
            {dateFns.format(inventory.createdAt, DATE_FORMATS.short)} • {inventory.responsible}
          </Text>
        </View>
        <Text
          className={cn(
            'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
            statusClassName(inventory.status),
          )}
        >
          {statusLabel(inventory.status)}
        </Text>
      </View>
    </Pressable>
  );
};
