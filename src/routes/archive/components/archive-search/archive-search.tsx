import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

import { lightTheme } from '@/src/ui-kit';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const ArchiveSearch = ({ value, onChange }: Props) => {
  return (
    <View className="h-12 flex-row items-center rounded-2xl border border-border bg-card px-3">
      <Ionicons name="search" size={16} color={lightTheme.colors.mutedForeground} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Пошук: №, товар, касир"
        placeholderTextColor={lightTheme.colors.mutedForeground}
        className="h-full flex-1 bg-transparent px-3 text-sm text-foreground"
      />
    </View>
  );
};
