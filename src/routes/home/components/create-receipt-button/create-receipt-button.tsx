import { lightTheme } from '@/src/ui-kit';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type Props = {
  onPress: () => void;
  disabled?: boolean;
};

export const CreateReceiptButton = ({ onPress, disabled = false }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="h-32 flex-col items-center justify-center gap-2 rounded-3xl bg-primary active:opacity-90 disabled:opacity-50"
    >
      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
        <Ionicons name="add" size={28} color={lightTheme.colors.primaryForeground} />
      </View>
      <Text className="text-xl font-bold text-primary-foreground">Створити чек</Text>
    </Pressable>
  );
};
