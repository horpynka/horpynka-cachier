import { Ionicons } from "@expo/vector-icons"
import { PropsWithChildren, ReactNode } from "react"
import { Modal as NativeModal, Pressable, Text, View } from "react-native"
import { Button } from "../button"

export type ModalAction = {
  label: ReactNode
  onClick?: () => void | Promise<void>
  variant?: "default" | "destructive" | "outline" | "ghost"
  loading?: boolean
  disabled?: boolean
  closeOnClick?: boolean
}

type Props = PropsWithChildren<{
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  title?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  actions?: ModalAction[]
}>

export const Modal = ({
  isOpen = false,
  setIsOpen,
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  actions,
}: Props) => {
  return (
    <NativeModal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      statusBarTranslucent
      onRequestClose={() => setIsOpen(false)}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/50 px-4"
        onPress={() => closeOnOverlayClick && setIsOpen(false)}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-full max-w-lg max-h-[90%] rounded-3xl border border-border bg-card shadow-2xl"
        >
          <View className="px-5 pt-5 pb-4">
            <View className="flex flex-row items-center justify-between gap-3">
              <View>
                {title && <Text className="text-lg font-bold leading-tight text-card-foreground">{title}</Text>}
              </View>

              {showCloseButton && (
                <Pressable
                  onPress={() => setIsOpen(false)}
                  className="h-9 w-9 items-center justify-center rounded-xl bg-muted/60 active:bg-muted"
                >
                  <Ionicons size={20} name="close" />
                </Pressable>
              )}
            </View>
          </View>

          {children !== undefined && <View className="px-5 py-2">{children}</View>}

          {actions && (
            <View className="flex-row flex-wrap justify-end gap-2 p-5 pt-4">
              {actions!.map((action, i) => (
                <Button
                  key={i}
                  variant={action.variant ?? "default"}
                  loading={action.loading}
                  disabled={action.disabled || action.loading}
                  onPress={() => {
                    action.onClick?.()
                    if (action.closeOnClick) setIsOpen(false)
                  }}
                  className="h-11 rounded-xl px-5"
                >
                  {typeof action.label === "string" ? action.label : action.label}
                </Button>
              ))}
            </View>
          )}
        </Pressable>
      </Pressable>
    </NativeModal>
  )
}
