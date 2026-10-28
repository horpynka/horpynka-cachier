import { Ionicons } from '@expo/vector-icons';
import cn from 'classnames';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { lightTheme } from '@/src/ui-kit';

export type ArchiveSortMode = 'new' | 'old' | 'sum_asc' | 'sum_desc';

const sorts: { id: ArchiveSortMode; label: string }[] = [
  { id: 'new', label: 'Нові спочатку' },
  { id: 'old', label: 'Старі спочатку' },
  { id: 'sum_asc', label: 'Сума ↑' },
  { id: 'sum_desc', label: 'Сума ↓' },
];

type Props = {
  value: ArchiveSortMode;
  onChange: (value: ArchiveSortMode) => void;
};

export const ArchiveSort = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const selected = sorts.find((sort) => sort.id === value) ?? sorts[0];

  return (
    <View>
      <Pressable
        onPress={() => setOpen((current) => !current)}
        className="h-11 w-full flex-row items-center rounded-2xl border border-border bg-card px-4"
      >
        <Text className="flex-1 text-sm font-medium text-foreground">{selected.label}</Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={16}
          color={lightTheme.colors.mutedForeground}
        />
      </Pressable>
      {open ? (
        <View className="mt-2 overflow-hidden rounded-2xl border border-border bg-card">
          {sorts.map((sort) => {
            const active = sort.id === value;

            return (
              <Pressable
                key={sort.id}
                onPress={() => {
                  onChange(sort.id);
                  setOpen(false);
                }}
                className={cn('h-11 justify-center px-4', active ? 'bg-muted' : 'active:bg-muted')}
              >
                <Text className="text-sm font-medium text-foreground">{sort.label}</Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};
