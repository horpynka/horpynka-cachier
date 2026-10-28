import { moneyService } from '@/src/utils/money-service';
import { DashboardStatsDto } from '@horpynka/api-sdk';
import cn from 'classnames';
import { Text, View } from 'react-native';

type Props = {
  isShiftOpen: boolean;
  stats?: DashboardStatsDto;
};

type Stat = {
  label: string;
  value: string;
  valueClassName?: string;
};

export const HomeStatCards = ({ isShiftOpen, stats }: Props) => {
  const cards: Stat[] = [
    {
      label: 'Зміна',
      value: isShiftOpen ? 'Відкрита' : 'Закрита',
      valueClassName: isShiftOpen ? 'text-success' : 'text-muted-foreground',
    },
    {
      label: 'Виручка сьогодні',
      value: moneyService.toMoney(stats?.todaySales ?? 0),
    },
    {
      label: 'Оплачено картою',
      value: moneyService.toMoney(stats?.cardSales ?? 0),
    },
    {
      label: 'Оплачено готівкою',
      value: moneyService.toMoney(stats?.cashSales ?? 0),
    },
    {
      label: 'Відкриті чеки',
      value: String(stats?.openOrders ?? 0),
    },
    {
      label: 'Всього чеків',
      value: String(stats?.ordersCount ?? 0),
    },
    {
      label: 'Закрито чеків',
      value: String(stats?.closedOrders ?? 0),
    },
  ];

  return (
    <View className="flex-row flex-wrap justify-between gap-y-3">
      {cards.map((stat) => (
        <View key={stat.label} className="w-[48%] rounded-lg border border-border bg-card px-4 py-3">
          <Text className="text-[10px] font-bold uppercase text-muted-foreground">{stat.label}</Text>
          <Text className={cn('mt-1 text-sm font-bold', stat.valueClassName ?? 'text-foreground')}>{stat.value}</Text>
        </View>
      ))}
    </View>
  );
};
