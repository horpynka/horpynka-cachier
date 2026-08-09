import { ReceiptSidebar } from "@/src/routes/receiptId/components/receipt-sidebar"
import { View, Text } from "react-native"

export default function ReceiptDetails() {
  return (
    <View className='flex flex-row justify-between h-full'>
      <View className='flex flex-col gap-4 max-w-[60%] w-full pb-28'></View>
      <ReceiptSidebar />
    </View>
  )
}
