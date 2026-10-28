import { View } from 'react-native';
import type { MenuItemDto } from '@horpynka/api-sdk';

import { MenuControls, type CatalogChip, type CatalogMode } from './components/menu-controls';
import { MenuList } from './components/menu-list';

type Props = {
  mode: CatalogMode;
  query: string;
  categoryId: number | 'all';
  chips: CatalogChip[];
  items: MenuItemDto[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (id: number | 'all') => void;
  onModeChange: (mode: CatalogMode) => void;
  onAddItem: (item: MenuItemDto) => void;
};

export const ProductsDishesMenu = ({
  mode,
  query,
  categoryId,
  chips,
  items,
  onQueryChange,
  onCategoryChange,
  onModeChange,
  onAddItem,
}: Props) => {
  return (
    <View className="min-h-0 min-w-0 flex-1 gap-3">
      <MenuControls
        mode={mode}
        query={query}
        categoryId={categoryId}
        chips={chips}
        onQueryChange={onQueryChange}
        onCategoryChange={onCategoryChange}
        onModeChange={onModeChange}
      />
      <MenuList items={items} onAddItem={onAddItem} />
    </View>
  );
};
