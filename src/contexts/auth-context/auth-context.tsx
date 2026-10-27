import { use, createContext, type PropsWithChildren, useEffect, useState } from 'react';

import { SignInUserDTO, useAuthApi } from '@horpynka/api-sdk';
import { secureStoreService } from '@/src/utils/secure-store-service';
import { AxiosError } from 'axios';

const AuthContext = createContext<{
    signIn: (signInUserDTO: SignInUserDTO) => Promise<string | null>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  isSigningInLoading: boolean;
} | null>(null);

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(secureStoreService.getItemSync('accessToken') || null)
  const { mutateSignIn } = useAuthApi()

  useEffect(() => {}, [])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (signInUserDTO: SignInUserDTO): Promise<string | null> => {
          let errorMessage = null;
          try {
            await mutateSignIn.mutateAsync({params: { signInUserDTO }}, {
              onSuccess: ({ data }) => {
                if (data.accessToken) {
                  setSession(data.accessToken);
                  secureStoreService.setItem('accessToken', data.accessToken);
                }
              },
              onError: (error) => {
                if (error instanceof AxiosError && error.response?.status === 401) {
                  errorMessage = error.response?.data?.message;
                }
              },
            });
          } catch {}
          return errorMessage;
        },
        signOut: () => {
          secureStoreService.deleteItem('accessToken');
          secureStoreService.deleteItem('refreshToken');
          setSession(null);
        },
        session,
        isSigningInLoading: mutateSignIn.isPending,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
