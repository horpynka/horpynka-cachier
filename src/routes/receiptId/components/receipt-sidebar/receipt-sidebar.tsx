import { useStore } from "@/src/store"
import { Modal } from "@/src/ui-kit/components/modal"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"
import { OrderItem } from "./components/order-item"
import { useOrdersApi } from "@horpynka/api-sdk"

type Props = {}

export const ReceiptSidebar = (props: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const receipt = useStore((s) => s.receipt)

  const router = useRouter()
  const { mutateDeleteReceipt } = useOrdersApi()

  const deleteReceipt = () => {
    if (receipt?.id) {
      mutateDeleteReceipt.mutate({ params: { id: receipt.id }, onSettledCallback: () => setIsDeleteModalOpen(false) })
      router.push("/")
    }
  }

  if (!receipt) {
    return null
  }

  return (
    <View className="w-full max-w-[40%] bg-card border border-border rounded-3xl flex flex-col">
      <View className="border-b border-b-border p-4 flex flex-row justify-between items-center">
        <View>
          <Text className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Чек</Text>
          <Text className="font-bold text-lg leading-tight">№ {receipt.id}</Text>
        </View>
        <TouchableOpacity
          className="flex flex-row items-center justify-center w-[54px]"
          onPress={() => setIsDeleteModalOpen(true)}
        >
          <Ionicons color="#dc2626" name="trash" size={20} />
        </TouchableOpacity>
      </View>
      <View className='flex flex-col flex-1 p-3'>
        <FlatList data={receipt.orderItems} renderItem={({ item }) => <OrderItem data={item} />} />
      </View>
      <Modal
        actions={[
          {
            label: "Скасувати",
            variant: "outline",
            onClick: () => {
              setIsDeleteModalOpen(false)
            },
          },
          {
            label: "Видалити",
            variant: "destructive",
            onClick: deleteReceipt,
          },
        ]}
        title={`Видалити чек №${receipt?.id}?`}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      >
        <View>
          <Text>Чек буде видалено.</Text>
        </View>
      </Modal>
    </View>
  )
}
