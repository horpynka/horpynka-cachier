import { moneyService } from '@/src/utils/money-service';
import { DashboardStatsDto } from '@horpynka/api-sdk';
import cn from 'classnames';
import { FlatList, Text, View } from 'react-native';

import { BistroGapNote } from '../bistro-gap-note';
import { DashboardStats } from '../dashboard-stats';

export type BistroDishSale = {
  id: string;
  name: string;
  qty: number;
  revenueCents: number;
};

type Props = {
  stats: DashboardStatsDto | undefined;
};

type DishRowProps = {
  row: BistroDishSale;
  isLast: boolean;
};

const dishSales: BistroDishSale[] = [];

const MissingMetric = ({ label }: { label: string }) => {
  return (
    <View className="flex-1 rounded-3xl border border-border bg-card p-4">
      <Text className="text-xs font-bold uppercase text-muted-foreground">{label}</Text>
      <Text className="mt-1 text-sm text-muted-foreground">немає в статистиці</Text>
    </View>
  );
};

const DishTableHeader = () => {
  return (
    <View className="flex-row gap-3 rounded-t-3xl border-x border-t border-b border-border bg-card px-4 py-3">
      <Text className="flex-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Страва
      </Text>
      <Text className="w-12 text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Шт
      </Text>
      <Text className="w-24 text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Виручка
      </Text>
    </View>
  );
};

const DishRow = ({ row, isLast }: DishRowProps) => {
  return (
    <View
      className={cn(
        'flex-row gap-3 border-x border-b border-border bg-card px-4 py-3',
        isLast && 'rounded-b-3xl',
      )}
    >
      <Text className="flex-1 text-sm font-medium">{row.name}</Text>
      <Text className="w-12 text-right text-sm font-semibold">{row.qty}</Text>
      <Text className="w-24 text-right text-sm font-bold">{moneyService.toMoney(row.revenueCents)}</Text>
    </View>
  );
};

export const BistroReport = ({ stats }: Props) => {
  return (
    <FlatList
      className="min-h-0 flex-1"
      data={dishSales}
      keyExtractor={(item) => item.id}
      contentContainerClassName="pb-6"
      ListHeaderComponent={
        <View className="gap-3">
          <View className="flex-row gap-3">
            <MissingMetric label="Виручка кухні" />
            <MissingMetric label="Продано шт." />
          </View>
          <BistroGapNote />
          <DashboardStats stats={stats} />
          <DishTableHeader />
        </View>
      }
      ListEmptyComponent={
        <View className="rounded-b-3xl border-x border-b border-border bg-card">
          <Text className="px-4 py-8 text-center text-sm text-muted-foreground">
            Немає продажів за період
          </Text>
        </View>
      }
      renderItem={({ item, index }) => (
        <DishRow row={item} isLast={index === dishSales.length - 1} />
      )}
    />
  );
};
