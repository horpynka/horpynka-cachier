import { Link, type Href } from 'expo-router';
import { Text, View } from 'react-native';

const archiveHref = '/archive' as Href;

export const ArchiveReceiptMissing = () => {
  return (
    <View className="flex-1 flex-row flex-wrap items-center justify-center">
      <Text className="text-center text-muted-foreground">Чек не знайдено. </Text>
      <Link href={archiveHref}>
        <Text className="text-primary underline">До архіву</Text>
      </Link>
    </View>
  );
};
