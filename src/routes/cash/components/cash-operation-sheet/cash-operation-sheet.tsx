import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import * as yup from 'yup';

import { TextField } from '@/src/ui-kit/components/text-field';
import { lightTheme } from '@/src/ui-kit';
import { yupService } from '@/src/utils/yup-service';

const operationSchema = yup.object({
  amount: yupService.money(),
  comment: yup.string().trim(),
});

type OperationFormValues = yup.InferType<typeof operationSchema>;

export type CashOperationKind = 'in' | 'out';

type Props = {
  kind: CashOperationKind | null;
  onClose: () => void;
};

export const CashOperationSheet = ({ kind, onClose }: Props) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const {
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<OperationFormValues>({
    resolver: yupResolver(operationSchema),
    mode: 'onChange',
    defaultValues: {
      amount: '',
      comment: '',
    },
  });

  useEffect(() => {
    if (!kind) {
      sheetRef.current?.dismiss();
      return;
    }

    reset({ amount: '', comment: '' });
    sheetRef.current?.present();
  }, [kind, reset]);

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
      keyboardBlurBehavior="restore"
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: 'transparent' }}
      handleIndicatorStyle={{ backgroundColor: lightTheme.colors.mutedForeground }}
      style={{ width: 440, maxWidth: '100%', alignSelf: 'center' }}
    >
      <BottomSheetView>
        <View className="w-full gap-3 rounded-t-3xl bg-card p-5">
          <Text className="text-lg font-bold text-foreground">
            {kind === 'out' ? 'Вилучити кошти' : 'Внести кошти'}
          </Text>
          <TextField
            {...register('amount')}
            placeholder="Сума"
            keyboardType="decimal-pad"
            error={errors.amount?.message}
          />
          <TextField
            {...register('comment')}
            placeholder="Коментар"
            multiline
          />
          <Pressable
            disabled={!isValid}
            className="h-14 w-full items-center justify-center rounded-2xl bg-primary disabled:opacity-50"
          >
            <Text className="font-bold text-primary-foreground">
              {kind === 'out' ? 'Вилучити' : 'Внести'}
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
