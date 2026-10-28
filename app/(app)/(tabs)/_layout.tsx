import { Ionicons } from '@expo/vector-icons';
import { Href, Link, Slot, usePathname } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';

import cn from "classnames"
import { Header } from '@/src/components/header';
import { useSession } from '@/src/contexts/auth-context';
import { lightTheme } from '@/src/ui-kit';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type RailItem = {
  icon: IoniconName;
  route: string;
  title: string;
  exact: boolean;
};

const tabs: RailItem[] = [
  { icon: 'home', route: '/', title: 'Головна', exact: true },
  { icon: 'archive', route: '/archive', title: 'Архів', exact: false },
  { icon: 'wallet', route: '/cash', title: 'Каса', exact: false },
  { icon: 'restaurant', route: '/bistro', title: 'Бістро', exact: false },
  { icon: 'clipboard', route: '/inventory', title: 'Облік', exact: false },
  ...(process.env.EXPO_PUBLIC_DEVELOPMENT === 'true'
    ? ([
        {
          icon: 'cog',
          route: '/storybook',
          title: 'Storybook',
          exact: true,
        },
      ] satisfies RailItem[])
    : []),
];

const isRailItemActive = (pathname: string, item: RailItem) => {
  if (item.exact) {
    return pathname === item.route;
  }

  return pathname.startsWith(item.route);
};

export default function TabLayout() {
  const pathname = usePathname();
  const { signOut } = useSession();

  return (
    <View className="flex-1 flex-row">
      <View className="h-full w-[88px] shrink-0 flex-col items-center gap-1 bg-slate-900 py-3">
        <View className="w-full flex-1 flex-col items-center gap-1 px-2">
          {tabs.map((item) => {
            const active = isRailItemActive(pathname, item);

            return (
              <Link key={item.route} href={item.route as Href} asChild>
                <Pressable
                  className={cn(
                    'w-full flex-col items-center gap-1 rounded-2xl py-3',
                    active ? 'bg-primary' : 'active:bg-white/10',
                  )}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={
                      active
                        ? lightTheme.colors.primaryForeground
                        : 'rgba(255, 255, 255, 0.6)'
                    }
                  />
                  <Text
                    className={cn(
                      'text-[10px] font-semibold',
                      active ? 'text-primary-foreground' : 'text-white/60',
                    )}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </View>
        <View className="w-full px-2">
          <Pressable
            onPress={signOut}
            className="w-full flex-col items-center gap-1 rounded-2xl py-3 active:bg-white/10"
          >
            <Ionicons name="log-out" size={20} color="rgba(255, 255, 255, 0.5)" />
            <Text className="text-[10px] font-semibold text-white/50">Вийти</Text>
          </Pressable>
        </View>
      </View>
      <View className="flex-1 flex flex-col bg-background text-foreground">
        <Header />
        <View className="h-full p-5">
          <Slot />
        </View>
      </View>
    </View>
  );
}
