import cn from 'classnames';
import { Pressable, ScrollView, Text } from 'react-native';

import { periods } from './helpers';
import type { ArchivePeriod } from './types';

type Props = {
  value: ArchivePeriod | null;
  onChange: (value: ArchivePeriod) => void;
};

export const ArchivePeriodFilter = ({ value, onChange }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="max-h-14 grow-0"
      contentContainerClassName="gap-2 pb-1"
    >
      {periods.map((period) => {
        const selected = value === period.id;

        return (
          <Pressable
            key={period.id}
            onPress={() => onChange(period.id)}
            className={cn(
              'rounded-full border px-4 py-2',
              selected ? 'border-primary bg-primary' : 'border-border bg-card',
            )}
          >
            <Text
              className={cn(
                'text-sm font-semibold',
                selected ? 'text-primary-foreground' : 'text-foreground',
              )}
            >
              {period.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
