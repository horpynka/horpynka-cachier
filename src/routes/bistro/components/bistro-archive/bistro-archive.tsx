import { FlatList, Text, View } from 'react-native';

import { BistroArchiveCard, BistroArchiveReceipt } from './bistro-archive-card';
import { BistroGapNote } from '../bistro-gap-note';

const receipts: BistroArchiveReceipt[] = [];

const MissingMetric = ({ label }: { label: string }) => {
  return (
    <View className="flex-1 rounded-3xl border border-border bg-card p-4">
      <Text className="text-xs font-bold uppercase text-muted-foreground">{label}</Text>
      <Text className="mt-1 text-sm text-muted-foreground">немає в статистиці</Text>
    </View>
  );
};

export const BistroArchive = () => {
  return (
    <FlatList
      className="min-h-0 flex-1"
      data={receipts}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      contentContainerClassName="gap-3 pb-6"
      ListHeaderComponent={
        <View className="gap-3 pb-3">
          <View className="flex-row gap-3">
            <MissingMetric label="Чеків з кухнею" />
            <MissingMetric label="Сума кухні" />
          </View>
          <BistroGapNote />
        </View>
      }
      ListEmptyComponent={
        <Text className="py-12 text-center text-sm text-muted-foreground">Немає чеків за період</Text>
      }
      renderItem={({ item }) => <BistroArchiveCard receipt={item} />}
    />
  );
};
