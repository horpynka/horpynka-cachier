import { yupResolver } from '@hookform/resolvers/yup';
import { useCashShiftsApi } from '@horpynka/api-sdk';
import { Ionicons } from '@expo/vector-icons';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';

import { Button } from '@/src/ui-kit/components/button';
import { TextField } from '@/src/ui-kit/components/text-field';
import { lightTheme } from '@/src/ui-kit';
import { moneyService } from '@/src/utils/money-service';
import { yupService } from '@/src/utils/yup-service';

const openingSchema = yup.object({
  openingBalance: yupService.money(),
});

type OpeningFormValues = yup.InferType<typeof openingSchema>;

export const ClosedShift = () => {
  const { mutateOpenCashShift } = useCashShiftsApi();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OpeningFormValues>({
    resolver: yupResolver(openingSchema),
    mode: 'onChange',
    defaultValues: {
      openingBalance: '',
    },
  });

  const onSubmit: SubmitHandler<OpeningFormValues> = ({ openingBalance }) => {
    const openingBalanceCents = moneyService.toCents(openingBalance);

    if (openingBalanceCents === null) {
      return;
    }

    mutateOpenCashShift.mutate({
      params: {
        openCashShiftDto: {
          openingBalance: openingBalanceCents,
        },
      },
    });
  };

  return (
    <View className="gap-4 rounded-3xl border border-border bg-card p-5">
      <View className="flex-row items-center gap-2">
        <Ionicons name="lock-open-outline" size={20} color={lightTheme.colors.foreground} />
        <Text className="font-semibold text-foreground">Зміна закрита</Text>
      </View>
      <View className="gap-1.5">
        <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Початковий залишок
        </Text>
        <TextField
          {...register('openingBalance')}
          placeholder="0.00"
          keyboardType="decimal-pad"
          error={errors.openingBalance?.message}
          disabled={mutateOpenCashShift.isPending}
        />
      </View>
      <Button
        className="h-14 w-full rounded-2xl"
        disabled={!isValid}
        loading={mutateOpenCashShift.isPending}
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-base font-bold text-primary-foreground">Відкрити зміну</Text>
      </Button>
    </View>
  );
};
