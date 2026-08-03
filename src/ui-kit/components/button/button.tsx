import cn from 'classnames';
import React from 'react';
import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const containerVariants: Record<ButtonVariant, string> = {
  default: 'bg-primary active:opacity-90',
  destructive: 'bg-destructive active:opacity-90',
  outline: 'border border-input bg-background active:bg-accent',
  secondary: 'bg-secondary active:opacity-80',
  ghost: 'bg-transparent active:bg-accent',
  link: 'bg-transparent',
};

const textVariants: Record<ButtonVariant, string> = {
  default: 'text-primary-foreground',
  destructive: 'text-destructive-foreground',
  outline: 'text-foreground',
  secondary: 'text-secondary-foreground',
  ghost: 'text-foreground',
  link: 'text-primary underline',
};

const containerSizes: Record<ButtonSize, string> = {
  default: 'h-9 px-4',
  sm: 'h-8 px-3 rounded-md',
  lg: 'h-10 px-8 rounded-md',
  icon: 'h-9 w-9',
};

const textSizes: Record<ButtonSize, string> = {
  default: 'text-sm',
  sm: 'text-xs',
  lg: 'text-sm',
  icon: 'text-sm',
};

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = 'default',
  size = 'default',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      className={cn('flex-row items-center justify-center gap-2 rounded-md font-medium opacity-100 disabled:opacity-50', containerVariants[variant], containerSizes[size], className)}
      {...props}
    >
      {loading && <ActivityIndicator size="small" />}
      {typeof children === 'string' ? (
        <Text className={cn('font-medium', textVariants[variant], textSizes[size])}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};
