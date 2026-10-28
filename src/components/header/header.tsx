import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { StatusChip } from './components/status-chip';

type Props = {
  title?: string;
};

const DATE_TICK_MS = 30000;

export const Header = ({ title = 'POS Касир' }: Props) => {
  const [now, setNow] = useState(() => dateFns.now());

  useEffect(() => {
    const id = setInterval(() => setNow(dateFns.now()), DATE_TICK_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <View className="h-14 w-full shrink-0 flex-row items-center justify-between gap-4 border-b border-border bg-card px-5">
      <View className="min-w-0 flex-1 flex-row items-baseline gap-3">
        <Text className="shrink text-base font-bold text-foreground" numberOfLines={1}>
          {title}
        </Text>
        <Text className="shrink-0 text-xs text-muted-foreground">
          {dateFns.format(now, DATE_FORMATS.withWeekday)}
        </Text>
      </View>
      <View className="shrink-0 flex-row items-center gap-3">
        <StatusChip />
      </View>
    </View>
  );
};
