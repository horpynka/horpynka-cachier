import * as SecureStore from 'expo-secure-store';

export type SecureStoreOptions = SecureStore.SecureStoreOptions;

class SecureStoreService {
  getItem(key: string, options?: SecureStoreOptions): Promise<string | null> {
    return SecureStore.getItemAsync(key, options);
  }

  setItem(key: string, value: string, options?: SecureStoreOptions): Promise<void> {
    return SecureStore.setItemAsync(key, value, options);
  }

  deleteItem(key: string, options?: SecureStoreOptions): Promise<void> {
    return SecureStore.deleteItemAsync(key, options);
  }

  getItemSync(key: string, options?: SecureStoreOptions): string | null {
    return SecureStore.getItem(key, options);
  }

  setItemSync(key: string, value: string, options?: SecureStoreOptions): void {
    SecureStore.setItem(key, value, options);
  }

  isAvailable(): Promise<boolean> {
    return SecureStore.isAvailableAsync();
  }

  canUseBiometricAuthentication(): boolean {
    return SecureStore.canUseBiometricAuthentication();
  }
}

export const secureStoreService = new SecureStoreService();
