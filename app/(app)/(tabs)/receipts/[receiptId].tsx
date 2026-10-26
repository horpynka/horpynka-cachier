import { ProductsDishesMenu } from "@/src/routes/receiptId/components/products-dishes-menu"
import { ReceiptSidebar } from "@/src/routes/receiptId/components/receipt-sidebar"
import { View, Text } from "react-native"

export default function ReceiptDetails() {
  return (
    <View className='flex flex-row justify-between h-full'>
      <ProductsDishesMenu />
      <ReceiptSidebar />
    </View>
  )
}
