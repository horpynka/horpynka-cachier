import { Ionicons } from '@expo/vector-icons';
import { type CashShiftDto } from '@horpynka/api-sdk';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { lightTheme } from '@/src/ui-kit';

import { CashOperationSheet, type CashOperationKind } from '../cash-operation-sheet';
import { CloseShift } from '../close-shift';
import { ShiftOperations } from '../shift-operations';
import { ShiftSummary } from '../shift-summary';

type Props = {
  shift: CashShiftDto;
};

export const OpenShift = ({ shift }: Props) => {
  const [operation, setOperation] = useState<CashOperationKind | null>(null);

  return (
    <View className="gap-4">
      <View className="flex-row items-start gap-4">
        <View className="flex-1 gap-4">
          <ShiftSummary
            openedAt={shift.openedAt}
            cashSales={shift.cashSales}
            cardSales={shift.cardSales}
            cashIn={0}
            cashOut={0}
            expectedBalance={shift.closingBalance}
          />
          <View className="flex-row gap-3">
            <Pressable
              className="h-16 flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-success/15 active:opacity-90"
              onPress={() => setOperation('in')}
            >
              <Ionicons name="arrow-down" size={20} color={lightTheme.colors.success} />
              <Text className="font-bold text-success">Внести</Text>
            </Pressable>
            <Pressable
              className="h-16 flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-destructive/15 active:opacity-90"
              onPress={() => setOperation('out')}
            >
              <Ionicons name="arrow-up" size={20} color={lightTheme.colors.destructive} />
              <Text className="font-bold text-destructive">Вилучити</Text>
            </Pressable>
          </View>
        </View>
        <View className="flex-1 gap-4">
          <CloseShift shiftId={shift.id} expectedBalance={shift.closingBalance} />
          <ShiftOperations operations={[]} />
        </View>
      </View>
      <CashOperationSheet kind={operation} onClose={() => setOperation(null)} />
    </View>
  );
};
