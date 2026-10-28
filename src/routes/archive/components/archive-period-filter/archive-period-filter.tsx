import cn from 'classnames';
import { Pressable, ScrollView, Text } from 'react-native';

import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';

export type ArchivePeriod = 'today' | 'yesterday' | 'week' | 'month' | 'all';

const periods: { id: ArchivePeriod; label: string }[] = [
  { id: 'today', label: 'Сьогодні' },
  { id: 'yesterday', label: 'Вчора' },
  { id: 'week', label: 'Тиждень' },
  { id: 'month', label: 'Місяць' },
  { id: 'all', label: 'Все' },
];

export const archivePeriodRange = (period: ArchivePeriod): { from?: string; to?: string } => {
  const now = dateFns.now();
  const today = dateFns.format(now, DATE_FORMATS.isoDate);

  if (period === 'today') {
    return { from: today, to: today };
  }

  if (period === 'yesterday') {
    const yesterday = dateFns.format(dateFns.subDays(now, 1), DATE_FORMATS.isoDate);
    return { from: yesterday, to: yesterday };
  }

  if (period === 'week') {
    return { from: dateFns.format(dateFns.subDays(now, 7), DATE_FORMATS.isoDate), to: today };
  }

  if (period === 'month') {
    return { from: dateFns.format(dateFns.subDays(now, 30), DATE_FORMATS.isoDate), to: today };
  }

  return {};
};

type Props = {
  value: ArchivePeriod;
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
