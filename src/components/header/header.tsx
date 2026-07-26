import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Ionicons } from '@expo/vector-icons';

export const Header = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View className="h-14 shrink-0 bg-card border-b border-border px-5 flex flex-row items-center justify-between gap-4">
      <Text className="text-m text-muted-foreground">{dateFns.format(dateFns.today(), DATE_FORMATS.withWeekday)}</Text>
      <View>
        <View className="flex flex-row items-center gap-1.5 rounded-full bg-card border border-border px-2.5 py-1">
          <Ionicons size={14} name='wifi-sharp' color={isConnected ? 'green' : 'red'} />
          <Text className="text-m font-semibold uppercase tracking-wider text-muted-foreground">{isConnected ? 'Онлайн' : 'Офлайн'}</Text>
        </View>
      </View>
    </View>
  );
};
