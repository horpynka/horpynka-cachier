import { ArchiveReceipt } from "@/src/routes/archive/components/archive-receipt"
import { useOrdersApi, type Order } from "@horpynka/api-sdk"
import { useQuery } from "@tanstack/react-query"
import { Link, useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function ArchiveReceiptScreen() {
  const { id: rawId } = useLocalSearchParams<{ id: string | string[] }>()
  const { getOrderQuery } = useOrdersApi()
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<Order>(getOrderQuery(Number(rawId)))

  if (isLoading) {
    return <View className="flex-1" />
  }

  if (isError || !order) {
    return (
      <View className="flex-1 flex-row flex-wrap items-center justify-center">
        <Text className="text-center text-muted-foreground">Чек не знайдено. </Text>
        <Link href='/archive'>
          <Text className="text-primary underline">До архіву</Text>
        </Link>
      </View>
    )
  }

  return <ArchiveReceipt order={order} />
}
