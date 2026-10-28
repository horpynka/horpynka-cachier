import { InventoryDto, useInventoryApi } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { InventoryList } from '@/src/routes/inventory/components/inventory-list';

export default function InventoryScreen() {
  const router = useRouter();
  const { getInventoriesQuery, mutateStartInventory } = useInventoryApi();
  const { data: inventories = [], isPending } = useQuery<InventoryDto[]>(getInventoriesQuery());

  const onCreate = () => {
    mutateStartInventory.mutate(
      {},
      {
        onSuccess: (response) => {
          router.push(`/inventory/${response.data.id}`);
        },
      },
    );
  };

  return (
    <InventoryList
      inventories={inventories}
      isLoading={isPending}
      isCreating={mutateStartInventory.isPending}
      onCreate={onCreate}
    />
  );
}
