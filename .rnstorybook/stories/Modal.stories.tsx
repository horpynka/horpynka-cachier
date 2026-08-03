
import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '../../src/ui-kit/components/button';
import { Modal, type ModalAction } from '../../src/ui-kit/components/modal/modal';

type ModalStoryArgs = {
  title: string;
  description: string;
  showCloseButton: boolean;
  closeOnOverlayClick: boolean;
  actions: ModalAction[];
};

const ModalStory = ({
  title,
  description,
  showCloseButton,
  closeOnOverlayClick,
  actions,
}: ModalStoryArgs) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <Button variant="outline" onPress={() => setIsOpen(true)}>
        Open modal
      </Button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={title}
        description={description}
        showCloseButton={showCloseButton}
        closeOnOverlayClick={closeOnOverlayClick}
        actions={actions}
      >
        <Text style={{ color: '#475569', fontSize: 14, lineHeight: 20 }}>
          Use this area for contextual details, warnings, or a short summary of what is about to happen.
        </Text>
      </Modal>
    </View>
  );
};

const meta: Meta<ModalStoryArgs> = {
  title: 'UI Kit/Modal',
  component: ModalStory,
  tags: ['autodocs'],
  args: {
    title: 'Confirm action',
    description: 'Are you sure you want to continue?',
    showCloseButton: true,
    closeOnOverlayClick: true,
    actions: [
      {
        label: 'Cancel',
        variant: 'ghost',
        closeOnClick: true,
      },
      {
        label: 'Continue',
        variant: 'default',
      },
    ],
  },
  argTypes: {
    showCloseButton: {
      control: 'boolean',
    },
    closeOnOverlayClick: {
      control: 'boolean',
    },
    actions: {
      control: false,
    },
  },
  render: (args) => <ModalStory {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryAndGhost: Story = {};

export const DestructiveFlow: Story = {
  args: {
    title: 'Delete receipt',
    description: 'This action cannot be undone.',
    actions: [
      {
        label: 'Keep it',
        variant: 'outline',
        closeOnClick: true,
      },
      {
        label: 'Delete',
        variant: 'destructive',
      },
    ],
  },
};

export const ThreeActions: Story = {
  args: {
    title: 'Save changes?',
    description: 'Choose how you want to proceed with the edited item.',
    actions: [
      {
        label: 'Discard',
        variant: 'ghost',
        closeOnClick: true,
      },
      {
        label: 'Save draft',
        variant: 'outline',
      },
      {
        label: 'Publish',
        variant: 'default',
      },
    ],
  },
};

export const LoadingAndDisabled: Story = {
  args: {
    title: 'Sync in progress',
    description: 'A background task is currently running. Please wait.',
    actions: [
      {
        label: 'Back',
        variant: 'ghost',
        closeOnClick: true,
      },
      {
        label: 'Retry',
        variant: 'outline',
        disabled: true,
      },
      {
        label: 'Syncing',
        variant: 'default',
        loading: true,
      },
    ],
  },
};
