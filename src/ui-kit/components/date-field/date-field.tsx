import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import cn from 'classnames';
import { useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';

import { lightTheme } from '@/src/ui-kit';
import { Modal } from '@/src/ui-kit/components/modal';
import { DATE_FORMATS, dateFns } from '@/src/utils/date-fns';

import { toPickerDate } from './helpers';

export type DateFieldProps ={
  label?: string;
  value: string;
  minimum?: string;
  maximum?: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
}

export const DateField = ({
  label,
  value,
  minimum,
  maximum,
  placeholder = 'Оберіть дату',
  className,
  onChange,
}: DateFieldProps) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => dateFns.today());

  const apply = (date: Date) => {
    onChange(dateFns.format(date, DATE_FORMATS.isoDate));
  };

  const openPicker = () => {
    setDraft(value ? toPickerDate(value) : dateFns.today());
    setOpen(true);
  };

  const handlePickerChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') {
      setOpen(false);

      if (event.type === 'set' && selected) {
        apply(selected);
      }

      return;
    }

    if (selected) {
      setDraft(selected);
    }
  };

  return (
    <View className={cn('w-full gap-1', className)}>
      {label ? <Text className="text-xs font-medium text-muted-foreground">{label}</Text> : null} 
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        onPress={openPicker}
        className="h-11 flex-row items-center rounded-2xl border border-border bg-card px-4"
      >
        <Text
          numberOfLines={1}
          className={cn(
            'flex-1 text-sm font-medium',
            value ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          {value ? dateFns.format(value, DATE_FORMATS.short) : placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={16} color={lightTheme.colors.mutedForeground} />
      </Pressable>
      {open && Platform.OS === 'android' ? (
        <DateTimePicker
          value={draft}
          mode="date"
          minimumDate={minimum ? toPickerDate(minimum) : undefined}
          maximumDate={maximum ? toPickerDate(maximum) : undefined}
          onChange={handlePickerChange}
        />
      ) : null}
      {Platform.OS === 'ios' ? (
        <Modal
          isOpen={open}
          setIsOpen={setOpen}
          title={label ?? placeholder}
          actions={[
            {
              label: 'Готово',
              closeOnClick: true,
              onClick: () => apply(draft),
            },
          ]}
        >
          {open ? (
            <DateTimePicker
              value={draft}
              mode="date"
              display={Platform.isPad ? 'inline' : 'spinner'}
              locale="uk-UA"
              accentColor={lightTheme.colors.primary}
              themeVariant="light"
              minimumDate={minimum ? toPickerDate(minimum) : undefined}
              maximumDate={maximum ? toPickerDate(maximum) : undefined}
              onChange={handlePickerChange}
              style={Platform.isPad ? { height: 360 } : undefined}
            />
          ) : null}
        </Modal>
      ) : null}
    </View>
  );
};
