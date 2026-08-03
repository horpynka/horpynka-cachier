import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import { SessionProvider, useSession } from "@/src/contexts/auth-context"
import { SplashScreenController } from "@/src/splash"
import "@/src/styles/global.css"

export default function Root() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SessionProvider>
        <SplashScreenController />
        <RootNavigator />
      </SessionProvider>
    </SafeAreaView>
  )
}

function RootNavigator() {
  const { isLoading, session } = useSession()

  if (isLoading) {
    return null
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen options={{ orientation: "portrait" }} name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen options={{ orientation: "portrait" }} name="sign-in" />
      </Stack.Protected>

      <Stack.Protected guard={__DEV__}>
        <Stack.Screen name="storybook" />
      </Stack.Protected>
    </Stack>
  )
}
