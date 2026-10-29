import { Pressable, Text, View } from 'react-native';
import type { MenuItemDto } from '@horpynka/api-sdk';

import { moneyService } from '@/src/utils/money-service';

type Props = {
  item: MenuItemDto;
  onPress: () => void;
};

export const MenuItemCard = ({ item, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 rounded-2xl border border-border bg-card p-3 active:bg-accent/30"
    >
      <View className="mb-2 aspect-square w-full items-center justify-center rounded-xl bg-muted" />
      <Text numberOfLines={2} className="min-h-10 text-sm font-semibold leading-tight">
        {item.name}
      </Text>
      <Text className="mt-1 text-sm font-bold text-primary">{moneyService.toMoney(item.sellingPrice)}</Text>
    </Pressable>
  );
};
