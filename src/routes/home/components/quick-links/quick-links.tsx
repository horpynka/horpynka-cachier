import { lightTheme } from '@/src/ui-kit';
import { Ionicons } from '@expo/vector-icons';
import { type Href, Link } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

const links: { href: Href; icon: IoniconName; label: string }[] = [
  { href: '/cash' as unknown as Href, icon: 'wallet', label: 'Каса' },
  { href: '/archive' as unknown as Href, icon: 'archive', label: 'Архів' },
  { href: '/bistro' as unknown as Href, icon: 'restaurant', label: 'Бістро' },
  { href: '/inventory' as unknown as Href, icon: 'clipboard', label: 'Облік' },
];

export const QuickLinks = () => {
  return (
    <View className="flex-row flex-wrap justify-between gap-y-2">
      {links.map((link) => (
        <Link key={link.label} href={link.href} asChild>
          <Pressable className="h-16 w-[48%] flex-row items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 active:bg-muted">
            <Ionicons name={link.icon} size={20} color={lightTheme.colors.primary} />
            <Text className="text-sm font-semibold text-foreground">{link.label}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
};
