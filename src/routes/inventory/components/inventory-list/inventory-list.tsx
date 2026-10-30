import { Ionicons } from '@expo/vector-icons';
import { InventoryDto, useInventoryApi } from '@horpynka/api-sdk';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { lightTheme } from '@/src/ui-kit';

import { InventoryCard } from '../inventory-card';

type Props = {
  inventories: InventoryDto[];
  isLoading: boolean;
  isCreating: boolean;
  showEmpty: boolean;
  onCreate: () => void;
};

export const InventoryList = ({
  inventories,
  isLoading,
  isCreating,
  showEmpty,
  onCreate,
}: Props) => {
  return (
    <ScrollView className="flex-1" contentContainerClassName="w-full max-w-5xl gap-4">
      <View className="flex-row items-center justify-between gap-4">
        <Text className="text-2xl font-bold tracking-tight">Інвентаризації</Text>
        <Pressable
          onPress={onCreate}
          disabled={isCreating}
          className="h-14 flex-row items-center gap-2 rounded-2xl bg-primary px-6 active:opacity-90 disabled:opacity-50"
        >
          <Ionicons name="add" size={20} color={lightTheme.colors.primaryForeground} />
          <Text className="font-bold text-primary-foreground">Нова інвентаризація</Text>
        </Pressable>
      </View>

      {isLoading ? <View className="flex-1" /> : null}

      {showEmpty ? (
        <Text className="w-full py-12 text-center text-sm text-muted-foreground">
          Інвентаризацій ще немає
        </Text>
      ) : null}

      {inventories.length > 0 ? (
        <View className="flex-row flex-wrap justify-between gap-y-3">
          {inventories.map((inventory) => (
            <InventoryCard key={inventory.id} inventory={inventory} />
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
};
