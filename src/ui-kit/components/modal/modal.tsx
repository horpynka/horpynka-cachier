import { Ionicons } from '@expo/vector-icons';
import React, { PropsWithChildren } from 'react';
import { Modal as NativeModal, Pressable, Text, View } from 'react-native';

export type ModalAction = {
  label: React.ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  closeOnClick?: boolean;
};

type Props = PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
  actions?: ModalAction[];
}>;

export const Modal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
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

            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1 min-w-0">
                {title && (
                  <Text className="text-lg font-bold leading-tight text-card-foreground">
                    {title}
                  </Text>
                )}
                {description && (
                  <Text className="mt-1 text-sm text-muted-foreground">{description}</Text>
                )}
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
        </Pressable>
      </Pressable>
    </NativeModal>
  );
};
