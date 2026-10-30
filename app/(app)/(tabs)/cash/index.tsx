import { ScrollView, Text, View } from 'react-native';

import { CashDrawerBalance } from '@/src/routes/cash/components/cash-drawer-balance';

// TODO: we need a separate screen for transactions, the functionality on /cash screen we should move somewhere
const CashScreen = () => {
  return (
    <View className="flex-1 max-w-[500px] self-center">
      <View className="w-full max-w-5xl gap-4 self-center">
        <Text className="text-2xl font-bold tracking-tight text-foreground">Каса</Text>
        <CashDrawerBalance />
      </View>
    </View>
  );
};

export default CashScreen;
