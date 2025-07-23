import axios from 'axios';
import { ApiResponse } from './types';

export const isActive = (prefix: string, target: string) => {
  return target.startsWith(prefix);
};

export const isActiveSubNav = (prefix: string, target: string) => {
  return target === prefix;
};

export const formatDurationToMinutes = (duration: string | number): string => {
  const minutes = Math.floor(Number(duration) / 60);
  return `${minutes} min`;
};

export const handleApiError = <T = unknown>(
  error: unknown,
  defaultData: T | null = null
): ApiResponse<T> => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      // Kasus API mati atau ga bisa connect
      return {
        data: defaultData,
        error:
          'Gagal terhubung ke server. Cek koneksi atau server mungkin sedang down.',
        status: 503, // Service Unavailable
      };
    }
    return {
      data: defaultData,
      error: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
    };
  }

  return {
    data: defaultData,
    error: (error as Error)?.message || 'Terjadi kesalahan tidak diketahui',
    status: 500,
  };
};
