import { initApiClient } from "@horpynka/api-sdk";
import { AxiosInstance } from "axios";
import { secureStoreService } from "./utils/secure-store-service";

const installAuthInterceptors = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use((config) => {
    const accessToken = secureStoreService.getItemSync('accessToken')
    config.withCredentials = true;
    config.headers.set('X-Client-Type', 'mobile');
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  });

  // TODO: implement refresh token
  // apiClient.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     if (!axios.isAxiosError(error)) {
  //       return Promise.reject(error);
  //     }

  //     const originalRequest = error.config as RetryableRequestConfig | undefined;

  //     if (
  //       originalRequest &&
  //       error.response?.status === 401 &&
  //       !originalRequest._retry &&
  //       !shouldSkipTokenRefresh(originalRequest.url)
  //     ) {
  //       if (isRefreshing) {
  //         return new Promise<string>((resolve, reject) => {
  //           failedQueue.push({ resolve, reject });
  //         })
  //           .then((token) => {
  //             originalRequest.headers.set("Authorization", `Bearer ${token}`);
  //             return apiClient(originalRequest);
  //           })
  //           .catch((err: unknown) => Promise.reject(err));
  //       }

  //       originalRequest._retry = true;
  //       isRefreshing = true;

  //       try {
  //         const { data } = await apiClient.get<RefreshResponse>("/auth/refresh", {
  //           withCredentials: true,
  //         });
  //         if (!data?.accessToken) {
  //           throw new Error("Refresh response is missing accessToken");
  //         }
  //         setAccessToken(data.accessToken);
  //         originalRequest.headers.set("Authorization", `Bearer ${data.accessToken}`);
  //         processQueue(null, data.accessToken);
  //         return apiClient(originalRequest);
  //       } catch (refreshError) {
  //         processQueue(refreshError);
  //         signOut();
  //         return Promise.reject(refreshError);
  //       } finally {
  //         isRefreshing = false;
  //       }
  //     }

  //     return Promise.reject(error);
  //   },
  // );
}

export const initializersStart = () => {
  const apiClient = initApiClient({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    withCredentials: true,
  });

  apiClient.defaults.withCredentials = true;
  installAuthInterceptors(apiClient);
}