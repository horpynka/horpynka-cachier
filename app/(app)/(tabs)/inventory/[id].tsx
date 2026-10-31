import { useInventoryApi, type InventoryDto } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { InventoryCount } from '@/src/routes/inventory/components/inventory-count';
import { InventoryNotFound } from '@/src/routes/inventory/components/inventory-not-found';

export default function InventoryCountScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getInventoryQuery } = useInventoryApi();
  const inventoryQuery = useQuery<InventoryDto>({
    ...getInventoryQuery(Number(id)),
    retry: false,
  });

  if ((inventoryQuery.isError && !inventoryQuery.data)) {
    return <InventoryNotFound />;
  }

  if (!inventoryQuery.data) {
    return <View className="flex-1" />;
  }

  return <InventoryCount key={inventoryQuery.data.id} inventory={inventoryQuery.data} />;
}
