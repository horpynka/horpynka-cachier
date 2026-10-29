import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import { SessionProvider, useSession } from "@/src/contexts/auth-context"
import { SplashScreenController } from "@/src/splash"
import "@/src/styles/global.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { initializersStart } from "@/src/initializers"
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function Root() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <SessionProvider>
              <SplashScreenController />
              <RootNavigator />
            </SessionProvider>
          </QueryClientProvider>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

function RootNavigator() {
  const { isLoading, session } = useSession()

  useEffect(() => {
    initializersStart()
  }, [])

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
