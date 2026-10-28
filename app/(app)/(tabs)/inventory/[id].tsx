import { useInventoryApi, type InventoryDto } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { InventoryCount } from '@/src/routes/inventory/components/inventory-count';
import { InventoryNotFound } from '@/src/routes/inventory/components/inventory-not-found';

export default function InventoryCountScreen() {
  const { id: rawId } = useLocalSearchParams<{ id: string }>();
  const idText = Array.isArray(rawId) ? rawId[0] : rawId;
  const parsedId = Number(idText);
  const idIsValid = Number.isInteger(parsedId) && parsedId > 0;
  const { getInventoryQuery } = useInventoryApi();
  const inventoryQuery = useQuery<InventoryDto>({
    ...getInventoryQuery(idIsValid ? parsedId : 0),
    enabled: idIsValid,
    retry: false,
  });

  if (!idIsValid || (inventoryQuery.isError && !inventoryQuery.data)) {
    return <InventoryNotFound />;
  }

  if (!inventoryQuery.data) {
    return <View className="flex-1" />;
  }

  return <InventoryCount key={inventoryQuery.data.id} inventory={inventoryQuery.data} />;
}
