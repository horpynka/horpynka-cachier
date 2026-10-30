import { useInventoryApi, type InventoryDto } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { Href, useRouter } from 'expo-router';

import { InventoryList } from '@/src/routes/inventory/components/inventory-list';

export default function InventoryScreen() {
  const router = useRouter();
  const { getInventoriesQuery, mutateStartInventory } = useInventoryApi();
  const { data: inventories = [], isPending, isSuccess } = useQuery<InventoryDto[]>(getInventoriesQuery());

  return (
    <InventoryList
      inventories={inventories}
      isLoading={isPending}
      isCreating={mutateStartInventory.isPending}
      showEmpty={isSuccess && inventories.length === 0}
      onCreate={() => {
        mutateStartInventory.mutate(
          {},
          {
            onSuccess: (response) => {
              router.push(`/inventory/${response.data.id}` as unknown as Href);
            },
          },
        );
      }}
    />
  );
}
