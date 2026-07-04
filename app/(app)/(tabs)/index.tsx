import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Link href="/menu">go to menu page</Link>
    </View>
  );
}
