import { Ionicons } from '@expo/vector-icons';
import type { OrderItem as OrderItemModel } from '@horpynka/api-sdk';
import { Pressable, Text, TextInput, View } from 'react-native';

import { lightTheme } from '@/src/ui-kit';
import { moneyService } from '@/src/utils/money-service';

type Props = {
  data: OrderItemModel;
  onRemove?: () => void;
  onChangeQuantity?: (quantity: number) => void;
};

export const OrderItem = ({ data, onRemove, onChangeQuantity }: Props) => {
  const name = data.product?.name ?? data.dish?.name ?? '';
  const quantity = 1;

  return (
    <View className="rounded-2xl bg-muted/40 p-3">
      <View className="mb-2 flex-row items-start justify-between gap-2">
        <Text className="min-w-0 flex-1 text-sm font-semibold">{name}</Text>
        <Pressable onPress={onRemove} className="shrink-0">
          <Ionicons name="trash" size={16} color={lightTheme.colors.destructive} />
        </Pressable>
      </View>
      <View className="flex-row items-center justify-between gap-2">
        <View className="flex-row items-center gap-1.5">
          <Pressable
            onPress={() => onChangeQuantity?.(quantity - 1)}
            className="h-8 w-8 items-center justify-center rounded-xl border border-border bg-card active:bg-muted"
          >
            <Ionicons name="remove" size={14} color={lightTheme.colors.foreground} />
          </Pressable>
          <TextInput
            value={String(quantity)}
            keyboardType="number-pad"
            onChangeText={(value) => onChangeQuantity?.(Number(value) || 0)}
            className="h-8 w-12 rounded-xl border border-border bg-card text-center text-sm font-semibold text-foreground"
          />
          <Pressable
            onPress={() => onChangeQuantity?.(quantity + 1)}
            className="h-8 w-8 items-center justify-center rounded-xl border border-border bg-card active:bg-muted"
          >
            <Ionicons name="add" size={14} color={lightTheme.colors.foreground} />
          </Pressable>
        </View>
        <View className="items-end">
          <Text className="text-[10px] text-muted-foreground">{moneyService.toMoney(data.sellingPrice)}</Text>
          <Text className="text-sm font-bold">{moneyService.toMoney(data.sellingPrice * quantity)}</Text>
        </View>
      </View>
    </View>
  );
};
