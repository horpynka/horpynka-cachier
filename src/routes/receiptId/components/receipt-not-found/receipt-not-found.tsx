import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export const ReceiptNotFound = () => {
  return (
    <View className="flex-1 flex-row items-center justify-center">
      <Text className="text-center text-muted-foreground">Чек не знайдено. </Text>
      <Link href="/">
        <Text className="text-primary underline">На головну</Text>
      </Link>
    </View>
  );
};
