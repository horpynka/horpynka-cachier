import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { type CashShiftDto, useCashShiftsApi } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ClosedShift } from '@/src/routes/cash/components/closed-shift';
import { OpenShift } from '@/src/routes/cash/components/open-shift';

export default function CashScreen() {
  const { getCashShiftsQuery } = useCashShiftsApi();
  const { data: shifts = [], isSuccess } = useQuery<CashShiftDto[]>(getCashShiftsQuery());
  const openShift = shifts.find((shift) => shift.status === 'OPEN');

  return (
    <View className="flex-1">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ScrollView className="flex-1" contentContainerClassName="gap-4 pb-4">
            <View className="w-full max-w-5xl gap-4 self-center">
              <Text className="text-2xl font-bold tracking-tight text-foreground">Каса</Text>
              {isSuccess ? (
                openShift ? <OpenShift shift={openShift} /> : <ClosedShift />
              ) : null}
            </View>
          </ScrollView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
};
