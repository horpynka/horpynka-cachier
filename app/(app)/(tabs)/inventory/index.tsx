import { useInventoryApi } from '@horpynka/api-sdk';
import { useRouter } from 'expo-router';

import { InventoryList } from '@/src/routes/inventory/components/inventory-list';

export default function InventoryScreen() {
  const router = useRouter();
  const { getInventoriesQuery, mutateStartInventory } = useInventoryApi();

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
      isCreating={mutateStartInventory.isPending}
      onCreate={onCreate}
    />
  );
}
