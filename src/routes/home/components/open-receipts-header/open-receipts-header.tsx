import { Text, View } from 'react-native';

type Props = {
  count: number;
};

export const OpenReceiptsHeader = ({ count }: Props) => {
  return (
    <View className="flex-row items-end justify-between">
      <Text className="text-2xl font-bold tracking-tight text-foreground">Відкриті чеки</Text>
      <Text className="text-sm font-medium text-primary">{count} активних</Text>
    </View>
  );
};
