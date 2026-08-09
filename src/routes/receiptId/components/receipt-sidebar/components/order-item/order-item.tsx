import { OrderItem as OrderItemType } from "@/src/api/generated"
import { moneyService } from "@/src/utils/money-service"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

type Props = {
  data: OrderItemType
}

export const OrderItem = ({ data }: Props) => {
  const { product, dish } = data
  const item = product || dish

  return (
    <View className="flex flex-row justify-between items-center bg-muted/40 rounded-2xl p-3 mb-3">
      <View className="flex flex-col gap-2">
        <Text className="font-semibold text-sm flex-1 min-w-0">
          {item?.name}
          <Text className="text-[10px] text-muted-foreground"> / {moneyService.toMoney(item?.ownPrice || 0)}</Text>
        </Text>
        <Text>smth</Text>
      </View>
      <View className="flex flex-col items-end justify-start gap-1">
        <TouchableOpacity
          className="flex flex-row"
          // onPress={() => setIsDeleteModalOpen(true)}
        >
          <Ionicons color="#dc2626" name="trash" size={20} />
        </TouchableOpacity>
        <Text className="font-bold text-sm">{moneyService.toMoney(item?.ownPrice || 0)}</Text>
      </View>
    </View>
  )
}
