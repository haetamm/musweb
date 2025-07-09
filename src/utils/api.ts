import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from 'axios';
import { urlPage } from './constans';
import Cookies from 'js-cookie';

const apiBaseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface QueueItem {
  resolve: (value: string) => void;
  reject: (reason?: any) => void;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  maxRedirects: 0,
  headers: new AxiosHeaders(),
});

// Store pending refresh token requests
let isRefreshing: boolean = false;
let failedQueue: QueueItem[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
): void => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Fungsi untuk handle redirect
const handleSessionExpired = () => {
  if (typeof window !== 'undefined') {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.assign(urlPage.HOME); // Redirect ke HOME
  }
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Skip Authorization header untuk login endpoint
    if (
      config.url?.includes('/authentications') &&
      config.method?.toLowerCase() === 'post'
    ) {
      return config;
    }
    const accessToken: string | undefined = Cookies.get('accessToken');
    if (accessToken) {
      config.headers = config.headers || new AxiosHeaders();
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } =
      error.config || { headers: new AxiosHeaders() };

    const refreshToken: string | undefined = Cookies.get('refreshToken');
    const accessToken: string | undefined = Cookies.get('accessToken');

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Kondisi 1: Error 401, nggak ada refreshToken
      if (!refreshToken) {
        // Kalau nggak ada accessToken dan refreshToken, jangan redirect
        if (!accessToken) {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          return Promise.reject(error); // Nggak redirect
        }
        // Kalau ada accessToken tapi nggak ada refreshToken, redirect
        handleSessionExpired();
        return Promise.reject(error);
      }

      // Kondisi 2: Ada refreshToken, coba refresh
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers =
              originalRequest.headers || new AxiosHeaders();
            originalRequest.headers.set('Authorization', `Bearer ${token}`);
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response: AxiosResponse<{ accessToken: string }> =
          await axios.put(`${apiBaseUrl}/authentications`, { refreshToken });

        const newAccessToken: string = response.data.accessToken;
        Cookies.set('accessToken', newAccessToken);

        originalRequest.headers = originalRequest.headers || new AxiosHeaders();
        originalRequest.headers.set(
          'Authorization',
          `Bearer ${newAccessToken}`
        );

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;

        // Kondisi 3: Refresh gagal, pasti ada accessToken dan refreshToken, redirect
        handleSessionExpired();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
