import { Href, Link, Slot, usePathname } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import type { ComponentProps } from "react"

import { FlatList, StyleSheet, View } from "react-native"
import cn from "classnames"
import { Header } from "@/src/components/header"

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
      <View style={styles.verticalTabs} className="bg-[#0f172a]">
        <FlatList
          scrollEnabled={false}
          data={tabs}
          contentContainerClassName="flex items-center justify-center"
          renderItem={({ item }) => (
            <Link href={item.route}>
              <View
                className={cn("flex items-center justify-center h-[60px] w-[60px] rounded-2xl", {
                  "bg-[#2563eb]": pathname === item.route,
                })}
              >
                <Ionicons
                  name={pathname === item.route ? item.chosenIcon : item.icon}
                  color={pathname === item.route ? "#fff" : "rgba(255, 255, 255, 0.6)"}
                  size={24}
                />
              </View>
            </Link>
          )}
        />
      </View>
      <View className="flex-1 flex flex-col bg-background text-foreground">
        <Header />
        <View className="h-full p-5">
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
