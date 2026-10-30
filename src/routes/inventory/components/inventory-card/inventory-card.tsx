import { InventoryDto } from '@horpynka/api-sdk';
import cn from 'classnames';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { getStatusClassName, getStatusLabel } from './helpers';

type Props = {
  inventory: InventoryDto;
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
            getStatusClassName(inventory.status),
          )}
        >
          {getStatusLabel(inventory.status)}
        </Text>
      </View>
    </Pressable>
  );
};
