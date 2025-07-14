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
    return {
      data: defaultData,
      error: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }

  return {
    data: defaultData,
    error: (error as Error)?.message || 'Unknown error occurred',
    status: 500,
  };
};
