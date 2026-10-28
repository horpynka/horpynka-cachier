import cn from 'classnames';
import { Pressable, Text, View } from 'react-native';

export type BistroTab = 'report' | 'archive';

const tabs: { id: BistroTab; label: string }[] = [
  { id: 'report', label: 'Звіт' },
  { id: 'archive', label: 'Архів чеків' },
];

type Props = {
  tab: BistroTab;
  onChange: (tab: BistroTab) => void;
};

export const BistroTabs = ({ tab, onChange }: Props) => {
  return (
    <View className="flex-row gap-1 rounded-3xl border border-border bg-card p-1">
      {tabs.map((item) => {
        const selected = tab === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            className={cn(
              'h-10 flex-1 items-center justify-center rounded-xl',
              selected ? 'bg-primary' : 'active:bg-muted',
            )}
          >
            <Text
              className={cn(
                'text-sm font-semibold',
                selected ? 'text-primary-foreground' : 'text-muted-foreground',
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
