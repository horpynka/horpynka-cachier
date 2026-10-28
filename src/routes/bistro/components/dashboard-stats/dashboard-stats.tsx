import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { moneyService } from '@/src/utils/money-service';
import { DashboardStatsDto } from '@horpynka/api-sdk';
import { Text, View } from 'react-native';

type Props = {
  stats: DashboardStatsDto | undefined;
};

type Metric = {
  label: string;
  value: string;
};

const shiftStatusLabel = (status: 'OPEN' | 'CLOSED') => {
  if (status === 'OPEN') {
    return 'Відкрита';
  }

  return 'Закрита';
};

export const DashboardStats = ({ stats }: Props) => {
  if (!stats) {
    return null;
  }

  const metrics: Metric[] = [
    { label: 'Продажі сьогодні', value: moneyService.toMoney(stats.todaySales) },
    { label: 'Середній чек', value: moneyService.toMoney(stats.averageOrder) },
    { label: 'Кількість чеків', value: String(stats.ordersCount) },
    { label: 'Відкриті чеки', value: String(stats.openOrders) },
    { label: 'Закриті чеки', value: String(stats.closedOrders) },
    { label: 'Повернення', value: moneyService.toMoney(stats.refunds) },
  ];
  const metricRows = Array.from({ length: Math.ceil(metrics.length / 2) }, (_, index) =>
    metrics.slice(index * 2, index * 2 + 2),
  );

  return (
    <View className="gap-3">
      <View className="gap-3">
        {metricRows.map((row) => (
          <View key={row.map((metric) => metric.label).join('-')} className="flex-row gap-3">
            {row.map((metric) => (
              <View key={metric.label} className="flex-1 rounded-3xl border border-border bg-card p-4">
                <Text className="text-xs font-bold uppercase text-muted-foreground">{metric.label}</Text>
                <Text className="mt-1 text-xl font-bold">{metric.value}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View className="gap-2 rounded-3xl border border-border bg-card p-4">
        <Text className="text-xs font-bold uppercase text-muted-foreground">Оплати</Text>
        {stats.paymentSplit.map((item) => (
          <View key={item.name} className="flex-row items-center justify-between">
            <Text className="text-sm">{item.name}</Text>
            <Text className="text-sm font-bold">{moneyService.toMoney(item.value)}</Text>
          </View>
        ))}
      </View>

      <View className="gap-2 rounded-3xl border border-border bg-card p-4">
        <Text className="text-xs font-bold uppercase text-muted-foreground">Продажі за днями</Text>
        {stats.salesByDay.map((day) => (
          <View key={day.date} className="flex-row items-center justify-between gap-3">
            <Text className="text-sm text-muted-foreground">
              {dateFns.format(day.date, DATE_FORMATS.short)}
            </Text>
            <Text className="text-sm font-semibold">{moneyService.toMoney(day.sales)}</Text>
            <Text className="text-xs text-muted-foreground">{day.orders}</Text>
          </View>
        ))}
      </View>

      <View className="rounded-3xl border border-border bg-card p-4">
        <Text className="text-xs font-bold uppercase text-muted-foreground">Поточна зміна</Text>
        {stats.currentShift ? (
          <Text className="mt-1 text-sm">
            {stats.currentShift.cashierName}
            {' • '}
            {dateFns.format(stats.currentShift.openedAt, DATE_FORMATS.datetime)}
            {' • '}
            {shiftStatusLabel(stats.currentShift.status)}
          </Text>
        ) : (
          <Text className="mt-1 text-sm text-muted-foreground">Поточної зміни немає</Text>
        )}
      </View>
    </View>
  );
};
