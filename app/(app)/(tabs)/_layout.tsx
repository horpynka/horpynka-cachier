import { Href, Link, Slot, usePathname } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import type { ComponentProps } from "react"

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import cn from "classnames"
import { Header } from "@/src/components/header"
import { lightTheme } from "@/src/ui-kit"

type IoniconName = ComponentProps<typeof Ionicons>["name"]

type Tab = {
  icon: IoniconName
  chosenIcon: IoniconName
  route: Href
  title: string
}

const tabs: Tab[] = [
  {
    icon: "home-outline",
    chosenIcon: "home-sharp",
    route: "/",
    title: "Головна",
  },
  {
    icon: "receipt-outline",
    chosenIcon: "receipt",
    route: "/receipts",
    title: "Чеки",
  },
  {
    icon: "restaurant-outline",
    chosenIcon: "restaurant",
    route: "/kitchen",
    title: "Кухня",
  },
  {
    icon: "menu-outline",
    chosenIcon: "menu",
    route: "/menu",
    title: "Menu",
  },
  {
    icon: "restaurant-outline",
    chosenIcon: "restaurant",
    route: "/bistro",
    title: "Бістро",
  },
  ...(process.env.EXPO_PUBLIC_DEVELOPMENT === "true"
    ? ([
        {
          icon: "cog-outline",
          chosenIcon: "cog",
          route: "/storybook",
          title: "Storybook",
        },
      ] satisfies Tab[])
    : []),
]

export default function TabLayout() {
  const pathname = usePathname()

  return (
    <View style={styles.container}>
      <View style={styles.verticalTabs} className="bg-slate-900">
        <FlatList
          scrollEnabled={false}
          data={tabs}
          contentContainerClassName="w-full gap-1"
          renderItem={({ item }) => {
            const active = pathname === item.route

            return (
              <Link href={item.route} asChild>
                <Pressable
                  className={cn(
                    "w-full items-center justify-center gap-1 rounded-2xl py-2",
                    active ? "bg-primary" : "active:bg-white/10",
                  )}
                >
                  <Ionicons
                    name={active ? item.chosenIcon : item.icon}
                    color={active ? lightTheme.colors.primaryForeground : "rgba(255, 255, 255, 0.6)"}
                    size={20}
                  />
                  <Text
                    className={cn(
                      "text-[10px] font-semibold",
                      active ? "text-primary-foreground" : "text-white/60",
                    )}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              </Link>
            )
          }}
        />
      </View>
      <View className="flex-1 flex flex-col bg-background text-foreground">
        <Header />
        <View className="min-h-0 flex-1 p-5">
          <Slot />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  verticalTabs: {
    height: "100%",
    width: 88,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 8,
  },
  pageContainer: {
    flex: 1,
  },
})
