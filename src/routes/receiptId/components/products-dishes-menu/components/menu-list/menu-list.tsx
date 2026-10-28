import { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import type { MenuItemDto } from '@horpynka/api-sdk';

import { MenuItemCard } from './components/menu-item-card';

const columns = 4;

type Props = {
  items: MenuItemDto[];
  onAddItem: (item: MenuItemDto) => void;
};

export const MenuList = ({ items, onAddItem }: Props) => {
  const data = useMemo(() => {
    if (items.length === 0) {
      return [];
    }
    const missing = (columns - (items.length % columns)) % columns;
    return [...items, ...Array.from({ length: missing }, () => null)];
  }, [items]);

  return (
    <FlatList
      className="min-h-0 flex-1"
      data={data}
      numColumns={columns}
      keyExtractor={(item, index) => item?.id ?? `empty-${index}`}
      contentContainerClassName="gap-3"
      columnWrapperClassName="gap-3"
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <Text className="py-12 text-center text-sm text-muted-foreground">Нічого не знайдено</Text>
      }
      renderItem={({ item }) =>
        item ? <MenuItemCard item={item} onPress={() => onAddItem(item)} /> : <View className="flex-1" />
      }
    />
  );
};
