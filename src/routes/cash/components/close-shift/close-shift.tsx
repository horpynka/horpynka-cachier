import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@expo/vector-icons';
import { useCashShiftsApi } from '@horpynka/api-sdk';
import cn from 'classnames';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import * as yup from 'yup';

import { TextField } from '@/src/ui-kit/components/text-field';
import { lightTheme } from '@/src/ui-kit';
import { moneyService } from '@/src/utils/money-service';
import { yupService } from '@/src/utils/yup-service';

const closingSchema = yup.object({
  actualBalance: yupService.money(),
});

type ClosingFormValues = yup.InferType<typeof closingSchema>;

type Props = {
  shiftId: number;
  expectedBalance: number;
};

type Highlight = 'ok' | 'warn' | 'err';

const highlightClassName: Record<Highlight, string> = {
  ok: 'text-success',
  warn: 'text-warning-foreground',
  err: 'text-destructive',
};

const BalanceRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: Highlight;
}) => {
  return (
    <View className="flex-row justify-between">
      <Text className="text-sm text-muted-foreground">{label}</Text>
      <Text className={cn('text-sm font-bold', highlight ? highlightClassName[highlight] : 'text-foreground')}>
        {value}
      </Text>
    </View>
  );
};

const differenceLabel = (difference: number): { label: string; highlight: Highlight } => {
  if (difference === 0) {
    return { label: 'Збіг', highlight: 'ok' };
  }

  if (difference > 0) {
    return { label: 'Надлишок', highlight: 'warn' };
  }

  return { label: 'Нестача', highlight: 'err' };
};

export const CloseShift = ({ shiftId, expectedBalance }: Props) => {
  const { mutateCloseCashShift } = useCashShiftsApi();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ClosingFormValues>({
    resolver: yupResolver(closingSchema),
    mode: 'onChange',
    defaultValues: {
      actualBalance: '',
    },
  });

  const actualCents = moneyService.toCents(watch('actualBalance') ?? '');
  const difference = actualCents === null ? null : actualCents - expectedBalance;
  const differenceRow = difference === null ? null : differenceLabel(difference);

  const onSubmit: SubmitHandler<ClosingFormValues> = ({ actualBalance }) => {
    const actualClosingBalance = moneyService.toCents(actualBalance);

    if (actualClosingBalance === null) {
      return;
    }

    mutateCloseCashShift.mutate({
      params: {
        id: shiftId,
        closeCashShiftDto: {
          actualClosingBalance,
        },
      },
    });
  };

  return (
    <View className="gap-4 rounded-3xl border border-border bg-card p-5">
      <View className="flex-row items-center gap-2">
        <Ionicons name="lock-closed-outline" size={20} color={lightTheme.colors.foreground} />
        <Text className="font-semibold text-foreground">Закрити зміну</Text>
      </View>
      <View className="gap-1.5">
        <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Фактичний залишок у касі
        </Text>
        <TextField
          {...register('actualBalance')}
          placeholder="0.00"
          keyboardType="decimal-pad"
          error={errors.actualBalance?.message}
          disabled={mutateCloseCashShift.isPending}
        />
      </View>
      {difference !== null && differenceRow ? (
        <View className="gap-1">
          <BalanceRow label="Очікуваний" value={moneyService.toMoney(expectedBalance)} />
          <BalanceRow label="Фактичний" value={moneyService.toMoney(actualCents ?? 0)} />
          <BalanceRow
            label={differenceRow.label}
            value={moneyService.toMoney(Math.abs(difference))}
            highlight={differenceRow.highlight}
          />
        </View>
      ) : null}
      <Pressable
        disabled={!isValid || mutateCloseCashShift.isPending}
        className="h-14 w-full items-center justify-center rounded-2xl bg-slate-900 active:opacity-90 disabled:opacity-50"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="font-bold text-primary-foreground">Закрити зміну</Text>
      </Pressable>
    </View>
  );
};
