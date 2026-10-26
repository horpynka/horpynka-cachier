import { initApiClient } from "@horpynka/api-sdk";

export const initializersStart = () => {
  const apiClient = initApiClient({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    withCredentials: true,
  });

  apiClient.defaults.withCredentials = true;
  // installAuthInterceptors(apiClient);
}