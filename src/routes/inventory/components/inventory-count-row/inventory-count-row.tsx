import type { InventoryItemDto } from '@horpynka/api-sdk';
import cn from 'classnames';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Text, View } from 'react-native';

import { TextField } from '@/src/ui-kit/components/text-field';

import {
  UNIT_LABEL,
  countedDifference,
  differenceClassName,
  formatDifference,
  parseActualQuantity,
} from '../../inventory-quantity';

type Props = {
  item: InventoryItemDto;
  value: string;
  error?: string;
  readOnly: boolean;
  registration: UseFormRegisterReturn;
  onCommit: () => void;
};

export const InventoryCountRow = ({
  item,
  value,
  error,
  readOnly,
  registration,
  onCommit,
}: Props) => {
  const unit = UNIT_LABEL[item.measurementUnit];
  const difference = countedDifference(parseActualQuantity(value), item.expectedQuantity);

  return (
    <View className="flex-row items-center gap-3 rounded-2xl border border-border bg-card p-3">
      <View className="min-w-0 flex-1">
        <Text className="text-sm font-semibold leading-tight">{item.name}</Text>
        <Text className="text-xs text-muted-foreground">
          Очікувана: {item.expectedQuantity} {unit}
        </Text>
      </View>
      <View className="w-28">
        <TextField
          {...registration}
          value={value}
          error={error}
          disabled={readOnly}
          placeholder="—"
          keyboardType="number-pad"
          inputMode="numeric"
          onBlur={(event) => {
            void registration.onBlur(event);
            if (!readOnly) {
              onCommit();
            }
          }}
        />
      </View>
      <Text className="w-8 text-xs text-muted-foreground">{unit}</Text>
      <View className="w-24 items-end">
        <Text className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Різниця</Text>
        <Text className={cn('text-sm font-bold', differenceClassName(difference))}>
          {formatDifference(difference, unit)}
        </Text>
      </View>
    </View>
  );
};
