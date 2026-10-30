import { Pressable, Text, View } from 'react-native';

import { DateField } from '@/src/ui-kit/components/date-field';

export type ArchiveDateRange = {
  from: string;
  to: string;
};

type Props = {
  value: ArchiveDateRange;
  onChange: (value: ArchiveDateRange) => void;
};

export const ArchiveDateFilter = ({ value, onChange }: Props) => {
  const hasRange = Boolean(value.from || value.to);

  return (
    <View className="w-full max-w-md flex-row items-end gap-2 self-start">
      <DateField
        label="Дата від"
        className="min-w-0 flex-1"
        value={value.from}
        maximum={value.to || undefined}
        onChange={(from) => onChange({ ...value, from })}
      />
      <DateField
        label="Дата до"
        className="min-w-0 flex-1"
        value={value.to}
        minimum={value.from || undefined}
        onChange={(to) => onChange({ ...value, to })}
      />
      {hasRange ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Очистити дати"
          onPress={() => onChange({ from: '', to: '' })}
          className="h-11 shrink-0 justify-center px-2"
        >
          <Text className="text-sm font-semibold text-primary">Очистити</Text>
        </Pressable>
      ) : null}
    </View>
  );
};
