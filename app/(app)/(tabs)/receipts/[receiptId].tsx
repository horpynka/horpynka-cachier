import { ordersApi } from "@/src/api/client"
import { ReceiptSidebar } from "@/src/routes/receiptId/components/receipt-sidebar"
import { useStore } from "@/src/store"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { View, Text } from "react-native"

export default function ReceiptDetails() {
  const { receiptId } = useLocalSearchParams()
  const { data } = useQuery({queryKey: ['receipts', receiptId], queryFn: () => ordersApi.findOne(Number(receiptId)), select: (data) => data.data})
  const setReceipt = useStore((s) => s.setReceipt)
  const receipt = useStore((s) => s.receipt)

  useEffect(() => {
    data && setReceipt(data)
  }, [data])

  if (!data) {
    return null;
  }

  return (
    <View className='flex flex-row justify-between h-full'>
      <View className='flex flex-col gap-4 max-w-[60%] w-full pb-28'></View>
      <ReceiptSidebar />
    </View>
  )
}
