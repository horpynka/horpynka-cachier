import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@expo/vector-icons';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Text, View } from 'react-native';
import * as yup from 'yup';

import { useSession } from '@/src/contexts/auth-context';
import { Button } from '@/src/ui-kit/components/button';
import { TextField } from '@/src/ui-kit/components/text-field';
import { lightTheme } from '@/src/ui-kit';
import { yupService } from '@/src/utils/yup-service';

const drawerBalanceSchema = yup.object({
  drawerBalance: yupService.money(),
});

type DrawerBalanceFormValues = yup.InferType<typeof drawerBalanceSchema>;

export const CashDrawerBalance = () => {
  const { signOut } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DrawerBalanceFormValues>({
    resolver: yupResolver(drawerBalanceSchema),
    mode: 'onChange',
    defaultValues: {
      drawerBalance: '',
    },
  });

  const onSubmit: SubmitHandler<DrawerBalanceFormValues> = () => {
    // TODO: send the drawer balance, then sign out.
    signOut();
  };

  return (
    <View className="gap-4 rounded-3xl border border-border bg-card p-5">
      <View className="gap-1.5">
        <Text className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Поточний залишок готівки в касі
        </Text>
        <TextField
          {...register('drawerBalance')}
          keyboardType="decimal-pad"
          error={errors.drawerBalance?.message}
        />
      </View>
      <Button
        className="h-14 w-full rounded-2xl"
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-base font-bold text-primary-foreground">Закрити зміну</Text>
      </Button>
    </View>
  );
};
