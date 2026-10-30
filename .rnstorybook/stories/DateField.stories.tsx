import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { DateField, type DateFieldProps } from '../../src/ui-kit/components/date-field';

const DateFieldStory = (args: DateFieldProps) => {
  const [value, setValue] = useState(args.value);

  return (
    <View style={{ width: 280 }}>
      <DateField {...args} value={value} onChange={setValue} />
    </View>
  );
};

const meta: Meta<typeof DateField> = {
  title: 'UI Kit/DateField',
  component: DateField,
  tags: ['autodocs'],
  args: {
    label: 'Дата',
    value: '',
    placeholder: 'Оберіть дату',
  },
  argTypes: {
    onChange: {
      action: 'changed',
    },
  },
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <Story />
      </View>
    ),
  ],
  render: (args) => <DateFieldStory {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithValue: Story = {
  args: {
    value: '2026-10-30',
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
};
