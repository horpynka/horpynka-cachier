import { useEffect, useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { lightTheme } from "@/src/ui-kit"
import { Modal } from "@/src/ui-kit/components/modal"
import { moneyService } from "@/src/utils/money-service"

type PaymentMode = "menu" | "cash" | "combo"

type Props = {
  total: number
  isOpen: boolean
  onClose: () => void
}

const toCents = (value: string) => {
  const normalized = value.replace(",", ".").trim()
  if (!normalized) {
    return 0
  }
  const amount = Number(normalized)
  if (!Number.isFinite(amount) || amount < 0) {
    return 0
  }
  return Math.round(amount * 100)
}

export const PaymentSheet = ({ total, isOpen, onClose }: Props) => {
  const [mode, setMode] = useState<PaymentMode>("menu")
  const [received, setReceived] = useState("")
  const [cashPart, setCashPart] = useState("")

  const receivedCents = toCents(received)
  const change = Math.max(0, receivedCents - total)
  const cashPartCents = Math.min(total, toCents(cashPart))
  const cardPart = Math.max(0, total - cashPartCents)

  useEffect(() => {
    if (!isOpen) {
      return
    }
    setMode("menu")
    setReceived("")
    setCashPart("")
  }, [isOpen])

  // TODO: it should be a separate page with big buttons for inputing price and payment logic
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={(open) => {
        if (!open) {
          onClose()
        }
      }}
      title={
        <View className="flex flex-row items-center gap-2">
          {mode !== "menu" && (
            <Pressable
              onPress={() => setMode("menu")}
              accessibilityRole="button"
              accessibilityLabel="Назад"
              className="h-9 w-9 items-center justify-center rounded-xl bg-muted/60 active:bg-muted"
            >
              <Ionicons size={20} name="arrow-back" />
            </Pressable>
          )}
          <Text>Оплата</Text>
        </View>
      }
    >
      <View className="gap-3 pb-4">
        <View>
          <Text className="text-xs text-muted-foreground">До оплати</Text>
          <Text className="text-2xl font-bold">{moneyService.toMoney(total)}</Text>
        </View>
        {mode === "menu" && (
          <>
            <Pressable
              onPress={() => setMode("cash")}
              className="h-16 w-full flex-row items-center gap-4 rounded-2xl border-2 border-border bg-card px-5 active:bg-muted"
            >
              <Ionicons name="cash" size={24} color={lightTheme.colors.success} />
              <Text className="font-bold text-foreground">Готівка</Text>
            </Pressable>
            <Pressable
              onPress={() => undefined}
              className="h-16 w-full flex-row items-center gap-4 rounded-2xl bg-primary px-5 active:opacity-90"
            >
              <Ionicons name="card" size={24} color={lightTheme.colors.primaryForeground} />
              <Text className="font-bold text-primary-foreground">Картка</Text>
            </Pressable>
            <Pressable
              onPress={() => setMode("combo")}
              className="h-16 w-full flex-row items-center gap-4 rounded-2xl border-2 border-border bg-card px-5 active:bg-muted"
            >
              <Ionicons name="swap-horizontal" size={24} color={lightTheme.colors.foreground} />
              <Text className="font-bold text-foreground">Комбінована</Text>
            </Pressable>
          </>
        )}
        {mode === "cash" && (
          <View className="gap-3">
            <View className="gap-1.5">
              <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Отримано</Text>
              <View className="h-14 justify-center rounded-2xl bg-muted px-4">
                <TextInput
                  autoFocus
                  value={received}
                  onChangeText={setReceived}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor={lightTheme.colors.mutedForeground}
                  className="p-0 text-xl font-bold text-foreground"
                />
              </View>
            </View>
            <View className="flex-row items-baseline justify-between">
              <Text className="text-muted-foreground">Решта</Text>
              <Text className="text-2xl font-bold text-success">{moneyService.toMoney(change)}</Text>
            </View>
            <Pressable
              disabled={receivedCents < total}
              onPress={() => undefined}
              className="h-14 w-full items-center justify-center rounded-2xl bg-primary disabled:opacity-50"
            >
              <Text className="font-bold text-primary-foreground">Завершити</Text>
            </Pressable>
          </View>
        )}
        {mode === "combo" && (
          <View className="gap-3">
            <View className="gap-1.5">
              <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Готівка</Text>
              <View className="h-14 justify-center rounded-2xl bg-muted px-4">
                <TextInput
                  value={cashPart}
                  onChangeText={setCashPart}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor={lightTheme.colors.mutedForeground}
                  className="p-0 text-xl font-bold text-foreground"
                />
              </View>
            </View>
            <View className="gap-1.5">
              <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Карткою (авто)</Text>
              <View className="h-14 justify-center rounded-2xl bg-muted px-4">
                <Text className="text-xl font-bold text-muted-foreground">{moneyService.toMoney(cardPart)}</Text>
              </View>
            </View>
            <Pressable
              disabled={cashPartCents + cardPart !== total || total === 0}
              onPress={() => undefined}
              className="h-14 w-full items-center justify-center rounded-2xl bg-primary disabled:opacity-50"
            >
              <Text className="font-bold text-primary-foreground">Завершити</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  )
}
