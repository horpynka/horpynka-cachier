import { Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export const RowInfo = ({ label, value }: Props) => {
  return (
    <View className="flex-row justify-between py-1">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      <Text className="text-sm font-medium text-foreground">{value}</Text>
    </View>
  );
};