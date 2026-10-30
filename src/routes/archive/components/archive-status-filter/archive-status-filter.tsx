import { Ionicons } from '@expo/vector-icons';
import type { FindAllStatusEnum } from '@horpynka/api-sdk';
import cn from 'classnames';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { lightTheme } from '@/src/ui-kit';

import { archiveStatusTone } from '../../order-labels';

export const ARCHIVE_CLOSED_STATUSES = [
  'PAID',
  'CANCELLED',
  'REFUNDED',
  'COMPLETED',
] as const satisfies readonly FindAllStatusEnum[];

export type ArchiveClosedStatus = (typeof ARCHIVE_CLOSED_STATUSES)[number];
export type ArchiveReceiptStatus = 'all' | ArchiveClosedStatus;

const statuses: { id: ArchiveReceiptStatus; label: string }[] = [
  { id: 'all', label: 'Усі статуси' },
  ...ARCHIVE_CLOSED_STATUSES.map((id) => ({
    id,
    label: archiveStatusTone(id).label,
  })),
];

type Props = {
  value: ArchiveReceiptStatus;
  onChange: (value: ArchiveReceiptStatus) => void;
};

export const ArchiveStatusFilter = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const selected = statuses.find((status) => status.id === value) ?? statuses[0];

  return (
    <View className="w-56 gap-1 self-start">
      <Text className="text-xs font-medium text-muted-foreground">Статус чека</Text>
      <View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Статус чека"
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
            {statuses.map((status) => {
              const active = status.id === value;

              return (
                <Pressable
                  key={status.id}
                  onPress={() => {
                    onChange(status.id);
                    setOpen(false);
                  }}
                  className={cn('h-11 justify-center px-4', active ? 'bg-muted' : 'active:bg-muted')}
                >
                  <Text className="text-sm font-medium text-foreground">{status.label}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};
