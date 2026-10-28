import { Text, View } from 'react-native';

import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';

type Props = {
  openedAt: string;
  cashSales: number;
  cardSales: number;
  cashIn: number;
  cashOut: number;
  expectedBalance: number;
};

type StatProps = {
  label: string;
  value: string;
};

const Stat = ({ label, value }: StatProps) => {
  return (
    <View className="flex-1 rounded-2xl bg-white/10 p-3">
      <Text className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground opacity-80">
        {label}
      </Text>
      <Text className="mt-1 text-lg font-bold text-primary-foreground">{value}</Text>
    </View>
  );
};

export const ShiftSummary = ({
  openedAt,
  cashSales,
  cardSales,
  cashIn,
  cashOut,
  expectedBalance,
}: Props) => {
  return (
    <View className="rounded-3xl bg-primary p-5">
      <Text className="text-xs font-bold uppercase tracking-wider text-primary-foreground opacity-80">
        Зміна відкрита
      </Text>
      <Text className="mt-1 text-sm text-primary-foreground">
        з {dateFns.format(openedAt, DATE_FORMATS.datetime)}
      </Text>
      <View className="mt-4 gap-3">
        <View className="flex-row gap-3">
          <Stat label="Готівкою" value={moneyService.toMoney(cashSales)} />
          <Stat label="Карткою" value={moneyService.toMoney(cardSales)} />
        </View>
        <View className="flex-row gap-3">
          <Stat label="Внесення" value={moneyService.toMoney(cashIn)} />
          <Stat label="Вилучення" value={moneyService.toMoney(cashOut)} />
        </View>
      </View>
      <View className="mt-4 flex-row items-baseline justify-between border-t border-white/20 pt-4">
        <Text className="text-primary-foreground opacity-80">Розрахунковий залишок</Text>
        <Text className="text-2xl font-bold text-primary-foreground">
          {moneyService.toMoney(expectedBalance)}
        </Text>
      </View>
    </View>
  );
};
