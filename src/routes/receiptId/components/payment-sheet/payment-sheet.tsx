import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import { lightTheme } from '@/src/ui-kit';
import { moneyService } from '@/src/utils/money-service';

type PaymentMode = 'menu' | 'cash' | 'combo';

type Props = {
  total: number;
  isOpen: boolean;
  onClose: () => void;
};

const toCents = (value: string) => {
  const normalized = value.replace(',', '.').trim();
  if (!normalized) {
    return 0;
  }
  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount < 0) {
    return 0;
  }
  return Math.round(amount * 100);
};

export const PaymentSheet = ({ total, isOpen, onClose }: Props) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [mode, setMode] = useState<PaymentMode>('menu');
  const [received, setReceived] = useState('');
  const [cashPart, setCashPart] = useState('');

  const receivedCents = toCents(received);
  const change = Math.max(0, receivedCents - total);
  const cashPartCents = Math.min(total, toCents(cashPart));
  const cardPart = Math.max(0, total - cashPartCents);

  useEffect(() => {
    if (!isOpen) {
      sheetRef.current?.dismiss();
      return;
    }
    setMode('menu');
    setReceived('');
    setCashPart('');
    sheetRef.current?.present();
  }, [isOpen]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      enableDynamicSizing
      enablePanDownToClose
      keyboardBehavior="interactive"
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
      style={{ width: '100%', maxWidth: 440, alignSelf: 'center' }}
      backgroundStyle={{
        backgroundColor: lightTheme.colors.card,
        borderTopLeftRadius: lightTheme.radius['3xl'],
        borderTopRightRadius: lightTheme.radius['3xl'],
      }}
      handleIndicatorStyle={{ backgroundColor: lightTheme.colors.border }}
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-between border-b border-border p-4">
            <View>
              <Text className="text-xs text-muted-foreground">До оплати</Text>
              <Text className="text-2xl font-bold">{moneyService.toMoney(total)}</Text>
            </View>
            <Pressable
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-xl active:bg-muted"
            >
              <Ionicons name="close" size={20} color={lightTheme.colors.foreground} />
            </Pressable>
        </View>
        <View className="gap-3 p-4">
            {mode === 'menu' && (
              <>
                <Pressable
                  onPress={() => setMode('cash')}
                  className="h-16 w-full flex-row items-center gap-4 rounded-2xl border-2 border-border bg-card px-5 active:bg-muted"
                >
                  <Ionicons name="cash" size={24} color={lightTheme.colors.success} />
                  <Text className="font-bold text-foreground">Готівка</Text>
                </Pressable>
                <Pressable
                  onPress={() => undefined}
                  className="h-16 w-full flex-row items-center gap-4 rounded-2xl bg-primary px-5 active:opacity-90"
                >
                  <Ionicons name="card" size={24} color={lightTheme.colors.primaryForeground} />
                  <Text className="font-bold text-primary-foreground">Картка</Text>
                </Pressable>
                <Pressable
                  onPress={() => setMode('combo')}
                  className="h-16 w-full flex-row items-center gap-4 rounded-2xl border-2 border-border bg-card px-5 active:bg-muted"
                >
                  <Ionicons name="swap-horizontal" size={24} color={lightTheme.colors.foreground} />
                  <Text className="font-bold text-foreground">Комбінована</Text>
                </Pressable>
              </>
            )}
            {mode === 'cash' && (
              <View className="gap-3">
                <Field label="Отримано">
                  <View className="h-14 justify-center rounded-2xl bg-muted px-4">
                    <BottomSheetTextInput
                      autoFocus
                      value={received}
                      onChangeText={setReceived}
                      keyboardType="decimal-pad"
                      placeholder="0.00"
                      placeholderTextColor={lightTheme.colors.mutedForeground}
                      className="p-0 text-xl font-bold text-foreground"
                    />
                  </View>
                </Field>
                <View className="flex-row items-baseline justify-between">
                  <Text className="text-muted-foreground">Решта</Text>
                  <Text className="text-2xl font-bold text-success">{moneyService.toMoney(change)}</Text>
                </View>
                <Pressable
                  disabled={receivedCents < total}
                  onPress={() => undefined}
                  className="h-14 w-full items-center justify-center rounded-2xl bg-primary disabled:opacity-50"
                >
                  <Text className="font-bold text-primary-foreground">Завершити</Text>
                </Pressable>
              </View>
            )}
            {mode === 'combo' && (
              <View className="gap-3">
                <Field label="Готівка">
                  <View className="h-14 justify-center rounded-2xl bg-muted px-4">
                    <BottomSheetTextInput
                      value={cashPart}
                      onChangeText={setCashPart}
                      keyboardType="decimal-pad"
                      placeholder="0.00"
                      placeholderTextColor={lightTheme.colors.mutedForeground}
                      className="p-0 text-xl font-bold text-foreground"
                    />
                  </View>
                </Field>
                <Field label="Карткою (авто)">
                  <View className="h-14 justify-center rounded-2xl bg-muted px-4">
                    <Text className="text-xl font-bold text-muted-foreground">{moneyService.toMoney(cardPart)}</Text>
                  </View>
                </Field>
                <Pressable
                  disabled={cashPartCents + cardPart !== total || total === 0}
                  onPress={() => undefined}
                  className="h-14 w-full items-center justify-center rounded-2xl bg-primary disabled:opacity-50"
                >
                  <Text className="font-bold text-primary-foreground">Завершити</Text>
                </Pressable>
              </View>
            )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

type FieldProps = {
  label: string;
  children: ReactNode;
};

const Field = ({ label, children }: FieldProps) => {
  return (
    <View className="gap-1.5">
      <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</Text>
      {children}
    </View>
  );
};
