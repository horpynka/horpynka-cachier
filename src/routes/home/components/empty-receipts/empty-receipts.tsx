import { lightTheme } from '@/src/ui-kit';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export const EmptyReceipts = () => {
  return (
    <View className="flex-1 items-center justify-center rounded-3xl border border-border bg-card p-10">
      <View className="mb-3 opacity-40">
        <Ionicons name="receipt-outline" size={48} color={lightTheme.colors.mutedForeground} />
      </View>
      <Text className="text-center text-sm text-muted-foreground">Немає відкритих чеків</Text>
      <Text className="mt-1 text-center text-xs text-muted-foreground">
        Натисніть «Створити чек» праворуч
      </Text>
    </View>
  );
};
