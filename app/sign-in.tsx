import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import * as yup from 'yup';

import { Button } from '@/src/ui-kit/components/button';
import { TextField } from '@/src/ui-kit/components/text-field';
import { yupService } from '@/src/utils/yup-service';
import { useSession } from '@/src/contexts/auth-context';

const signInSchema = yup.object({
  email: yupService.email(),
  password: yupService.password(),
});

type SignInFormValues = yup.InferType<typeof signInSchema>;

export default function SignIn() {
  const { signIn, isSigningInLoading } = useSession();

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInFormValues> = async ({email, password}) => {
    try {
      const errorMessage = await signIn({ email, password });
      if (errorMessage) {
        setError('password', { message: errorMessage });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-md gap-6 rounded-3xl border border-border bg-card p-6">
          <View className="gap-1">
            <Text className="text-xl font-bold text-card-foreground">Вхід</Text>
            <Text className="text-sm text-muted-foreground">Увійдіть, щоб відкрити касу</Text>
          </View>

          <View className="gap-4">
            <TextField
              {...register('email')}
              label="Електронна пошта"
              placeholder="ваша@пошта.com"
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              textContentType="emailAddress"
              returnKeyType="next"
              disabled={isSigningInLoading}
              onSubmitEditing={() => setFocus('password')}
            />
            <TextField
              {...register('password')}
              label="Пароль"
              placeholder="Введіть пароль"
              error={errors.password?.message}
              secureTextEntry
              autoCapitalize="none"
              disabled={isSigningInLoading}
              autoComplete="password"
              autoCorrect={false}
              textContentType="password"
              returnKeyType="done"
              onSubmitEditing={() => {
                void handleSubmit(onSubmit)();
              }}
            />
          </View>

          <Button loading={isSigningInLoading} className="h-12 w-full rounded-xl" onPress={handleSubmit(onSubmit)}>
            Увійти
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
