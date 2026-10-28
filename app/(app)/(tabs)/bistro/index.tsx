import { BistroArchive } from '@/src/routes/bistro/components/bistro-archive';
import { BistroReport } from '@/src/routes/bistro/components/bistro-report';
import { BistroTab, BistroTabs } from '@/src/routes/bistro/components/bistro-tabs';
import { BistroPeriod, PeriodFilter } from '@/src/routes/bistro/components/period-filter';
import { DashboardStatsDto, useDashboardApi } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function BistroScreen() {
  const [period, setPeriod] = useState<BistroPeriod>('week');
  const [tab, setTab] = useState<BistroTab>('report');
  const { getStatsQuery } = useDashboardApi();
  const { data: stats, isError } = useQuery<DashboardStatsDto>(getStatsQuery());

  return (
    <View className="min-h-0 flex-1 gap-4">
      <Text className="text-2xl font-bold tracking-tight">Бістро (кухня)</Text>
      <BistroTabs tab={tab} onChange={setTab} />
      <PeriodFilter period={period} onChange={setPeriod} />
      {isError ? (
        <Text className="text-sm text-destructive">Не вдалося завантажити статистику.</Text>
      ) : null}
      <View className="min-h-0 flex-1">
        {tab === 'report' ? <BistroReport stats={stats} /> : <BistroArchive />}
      </View>
    </View>
  );
}
