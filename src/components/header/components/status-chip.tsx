import { lightTheme } from '@/src/ui-kit';
import { Ionicons } from '@expo/vector-icons';
import { addEventListener as netInfoAddEventListener } from '@react-native-community/netinfo';
import cn from 'classnames';
import { useEffect, useState, type ComponentProps } from 'react';
import { Text, View } from 'react-native';

type Status = 'online' | 'offline' | 'syncing';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

const SYNC_VISIBLE_MS = 1500;

const statusView = {
  online: {
    label: 'Онлайн',
    icon: 'wifi',
    dotClassName: 'bg-success',
    iconColor: lightTheme.colors.success,
  },
  syncing: {
    label: 'Синхронізація',
    icon: 'sync',
    dotClassName: 'bg-warning',
    iconColor: lightTheme.colors.warning,
  },
  offline: {
    label: 'Офлайн',
    icon: 'cloud-offline',
    dotClassName: 'bg-muted-foreground',
    iconColor: lightTheme.colors.mutedForeground,
  },
} as const satisfies Record<
  Status,
  {
    label: string;
    icon: IoniconName;
    dotClassName: string;
    iconColor: string;
  }
>;

export const StatusChip = () => {
  const [status, setStatus] = useState<Status>('online');

  useEffect(() => {
    let wasOffline = false;
    let syncTimer: ReturnType<typeof setTimeout> | undefined;

    const apply = (reachable: boolean | null) => {
      if (reachable === null) {
        return;
      }

      if (!reachable) {
        wasOffline = true;
        if (syncTimer) {
          clearTimeout(syncTimer);
          syncTimer = undefined;
        }
        setStatus('offline');
        return;
      }

      if (wasOffline) {
        // TODO: perform sync local data with db, we will stop syncing animation when sync is complete
        wasOffline = false;
        setStatus('syncing');
        syncTimer = setTimeout(() => setStatus('online'), SYNC_VISIBLE_MS);
        return;
      }

      setStatus((current) => (current === 'syncing' ? current : 'online'));
    };

    const unsubscribe = netInfoAddEventListener((state) => {
      apply(state.isInternetReachable);
    });

    return () => {
      unsubscribe();
      if (syncTimer) {
        clearTimeout(syncTimer);
      }
    };
  }, []);

  const view = statusView[status];

  return (
    <View className="flex-row items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1">
      <View className={cn('h-2 w-2 rounded-full', view.dotClassName)} />
      <Ionicons name={view.icon} size={12} color={view.iconColor} />
      <Text className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {view.label}
      </Text>
    </View>
  );
};
