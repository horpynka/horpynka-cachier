import { Ionicons } from '@expo/vector-icons';
import cn from 'classnames';
import { useRef, useState, type Ref } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';

import { lightTheme } from '@/src/ui-kit';

type RegisterChangeHandler = (event: {
  target: any;
  type?: any;
}) => Promise<void | boolean> | void;

export interface TextFieldProps extends Omit<TextInputProps, 'onChange' | 'onBlur'> {
  label?: string;
  error?: string;
  className?: string;
  name?: string;
  disabled?: boolean;
  ref?: Ref<TextInput>;
  onChange?: RegisterChangeHandler;
  onBlur?: RegisterChangeHandler;
}

export const TextField = ({
  label,
  error,
  className,
  secureTextEntry,
  onFocus,
  onBlur,
  onChange,
  onChangeText,
  name,
  ref,
  value,
  defaultValue,
  disabled,
  editable,
  ...props
}: TextFieldProps) => {
  const valueRef = useRef(typeof value === 'string' ? value : typeof defaultValue === 'string' ? defaultValue : '');
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(Boolean(secureTextEntry));
  const hasToggle = Boolean(secureTextEntry);

  if (typeof value === 'string') {
    valueRef.current = value;
  }

  const borderClassName = error
    ? 'border-destructive'
    : focused
      ? 'border-ring'
      : 'border-input';

  return (
    <View className={cn('w-full gap-1.5', className)}>
      {label ? <Text className="text-sm font-medium text-foreground">{label}</Text> : null}
      <View className={cn('h-12 flex-row items-center rounded-xl border bg-card px-3', borderClassName)}>
        <TextInput
          ref={ref}
          placeholderTextColor={lightTheme.colors.mutedForeground}
          defaultValue={defaultValue}
          {...props}
          {...(value === undefined ? {} : { value })}
          className="h-full flex-1 text-base text-foreground"
          editable={disabled ? false : editable}
          secureTextEntry={hasToggle ? hidden : secureTextEntry}
          onChangeText={(text) => {
            valueRef.current = text;
            onChangeText?.(text);
            void onChange?.({ target: { name, value: text } });
          }}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={() => {
            setFocused(false);
            void onBlur?.({
              target: { name, value: valueRef.current },
              type: 'blur',
            });
          }}
        />
        {hasToggle ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Показати пароль' : 'Сховати пароль'}
            hitSlop={8}
            onPress={() => setHidden((value) => !value)}
          >
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={lightTheme.colors.mutedForeground}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text className="text-xs text-destructive">{error}</Text> : null}
    </View>
  );
};
