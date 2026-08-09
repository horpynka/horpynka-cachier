import { Order } from "@/src/api/generated"
import { useOrdersApi } from "@/src/api/operations/ordersApi"
import { Modal } from "@/src/ui-kit/components/modal"
import { DATE_FORMATS, dateFns } from "@/src/utils/date-fns"
import { moneyService } from "@/src/utils/money-service"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

type Props = {
  data: Order
}

export const ActiveReceiptCard = ({ data: { id, orderItems, orderPrice, createdAt } }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const router = useRouter()

  const { mutateDeleteReceipt } = useOrdersApi()

  return (
    <View className="h-22 bg-card rounded-3xl border border-border flex items-stretch">
      <TouchableOpacity onPress={() => router.push(`/receipts/${id}`)} className="flex flex-row justify-between">
        <View className="flex-1 flex flex-row justify-between items-center border-r border-border ">
          <View className="flex justify-between p-4">
            <View className="flex flex-col">
              <Text className="font-bold text-lg">Чек №{id}</Text>
              <Text className="text-xs text-muted-foreground">
                {orderItems.length} поз.{" "}
                {dateFns.isSameDay(createdAt, new Date())
                  ? dateFns.format(createdAt, DATE_FORMATS.time)
                  : dateFns.format(createdAt, DATE_FORMATS.datetime)}
              </Text>
            </View>
          </View>
          <View className="flex flex-col p-4">
            <Text>{moneyService.toMoney(orderPrice)}</Text>
            <Text></Text>
          </View>
        </View>
        <TouchableOpacity
          className="flex flex-row items-center justify-center w-[54px]"
          onPress={() => setIsDeleteModalOpen(true)}
        >
          <Ionicons color="#dc2626" name="trash" size={20} />
        </TouchableOpacity>
      </TouchableOpacity>
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
            onClick: () =>
              mutateDeleteReceipt.mutate({ params: { id }, onSettledCallback: () => setIsDeleteModalOpen(false) }),
          },
        ]}
        title={`Видалити чек №${id}?`}
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      >
        <View>
          <Text>Чернетку буде видалено назавжди. Цю дію не можна скасувати.</Text>
        </View>
      </Modal>
    </View>
  )
}
