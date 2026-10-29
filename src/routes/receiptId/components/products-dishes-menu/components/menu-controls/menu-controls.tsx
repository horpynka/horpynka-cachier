import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import cn from 'classnames';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { lightTheme } from '@/src/ui-kit';

export type CatalogMode = 'products' | 'bistro';

export type CatalogChip = {
  id: number | 'all';
  name: string;
};

type Props = {
  mode: CatalogMode;
  query: string;
  categoryId: number | 'all';
  chips: CatalogChip[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (id: number | 'all') => void;
  onModeChange: (mode: CatalogMode) => void;
};

const modes = [
  { id: 'products', label: 'Товари', icon: '🛒' },
  { id: 'bistro', label: 'Бістро', icon: '🍔' },
] as const;

export const MenuControls = ({
  mode,
  query,
  categoryId,
  chips,
  onQueryChange,
  onCategoryChange,
  onModeChange,
}: Props) => {
  const router = useRouter();

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={() => router.push('/')}
          className="h-10 w-10 items-center justify-center rounded-xl border border-border bg-card active:bg-muted"
        >
          <Ionicons name="arrow-back" size={20} color={lightTheme.colors.foreground} />
        </Pressable>
        <View className="h-10 flex-1 flex-row items-center rounded-2xl border border-border bg-card px-3">
          <Ionicons name="search" size={16} color={lightTheme.colors.mutedForeground} />
          <TextInput
            value={query}
            onChangeText={onQueryChange}
            placeholder={mode === 'bistro' ? 'Пошук страв бістро...' : 'Пошук товарів...'}
            placeholderTextColor={lightTheme.colors.mutedForeground}
            className="h-full flex-1 px-3 text-sm text-foreground"
          />
        </View>
        <View className="shrink-0 flex-row gap-1 rounded-2xl bg-muted p-1">
          {modes.map((item) => {
            const active = mode === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => onModeChange(item.id)}
                className={cn('h-8 items-center justify-center rounded-xl px-4', active && 'bg-card')}
              >
                <Text className={cn('text-sm font-bold', active ? 'text-primary' : 'text-muted-foreground')}>
                  {item.icon} {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        {chips.map((chip) => {
          const active = chip.id === categoryId;
          return (
            <Pressable
              key={String(chip.id)}
              onPress={() => onCategoryChange(chip.id)}
              className={cn(
                'rounded-full border px-4 py-2',
                active ? 'border-primary bg-primary' : 'border-border bg-card',
              )}
            >
              <Text
                numberOfLines={1}
                className={cn('text-sm font-semibold', active ? 'text-primary-foreground' : 'text-foreground')}
              >
                {chip.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
