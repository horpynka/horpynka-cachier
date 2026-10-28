import cn from 'classnames';
import { Text, View } from 'react-native';

import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';

export type ShiftOperation = {
  id: string;
  type: 'in' | 'out';
  amount: number;
  createdAt: string;
  comment?: string;
};

type Props = {
  operations: ShiftOperation[];
};

const operationTitle = {
  in: 'Внесення',
  out: 'Вилучення',
} as const;

export const ShiftOperations = ({ operations }: Props) => {
  return (
    <View className="gap-2">
      <Text className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Історія операцій
      </Text>
      {operations.length === 0 ? (
        <Text className="py-6 text-center text-sm text-muted-foreground">Операцій ще немає</Text>
      ) : (
        operations.map((operation) => (
          <View
            key={operation.id}
            className="flex-row justify-between rounded-2xl border border-border bg-card p-3"
          >
            <View className="flex-1 pr-3">
              <Text className="text-sm font-semibold text-foreground">{operationTitle[operation.type]}</Text>
              <Text className="text-xs text-muted-foreground">
                {dateFns.format(operation.createdAt, DATE_FORMATS.datetime)}
              </Text>
              {operation.comment ? (
                <Text className="mt-1 text-xs text-foreground">{operation.comment}</Text>
              ) : null}
            </View>
            <Text
              className={cn(
                'font-bold',
                operation.type === 'in' ? 'text-success' : 'text-destructive',
              )}
            >
              {operation.type === 'in' ? '+' : '−'}
              {moneyService.toMoney(operation.amount)}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};
