import cn from 'classnames';
import { Pressable, Text, View } from 'react-native';

export type BistroPeriod = 'day' | 'week' | 'month' | 'all';

const periods: { id: BistroPeriod; label: string }[] = [
  { id: 'day', label: 'День' },
  { id: 'week', label: 'Тиждень' },
  { id: 'month', label: 'Місяць' },
  { id: 'all', label: 'Все' },
];

type Props = {
  period: BistroPeriod;
  onChange: (period: BistroPeriod) => void;
};

export const PeriodFilter = ({ period, onChange }: Props) => {
  return (
    <View className="flex-row gap-2">
      {periods.map((item) => {
        const selected = period === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            className={cn(
              'rounded-full border px-4 py-2',
              selected ? 'border-primary bg-primary' : 'border-border bg-card active:bg-muted',
            )}
          >
            <Text
              className={cn(
                'text-sm font-semibold',
                selected ? 'text-primary-foreground' : 'text-foreground',
              )}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
