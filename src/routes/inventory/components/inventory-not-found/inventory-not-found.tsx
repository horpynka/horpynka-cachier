import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export const InventoryNotFound = () => {
  return (
    <View className="flex-1 flex-row items-center justify-center">
      <Text className="text-center text-muted-foreground">Не знайдено. </Text>
      <Link href="/inventory">
        <Text className="text-primary underline">Назад</Text>
      </Link>
    </View>
  );
};
