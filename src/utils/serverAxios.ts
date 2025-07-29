import axios, { AxiosInstance } from 'axios';
import { cookies, headers } from 'next/headers';
import { HandleServerInternalErrors } from './handleServerInternalErrors';

const ALLOWED_ORIGINS =
  process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(',') || [];

export async function createServerInternalAxios(): Promise<AxiosInstance> {
  try {
    const accessToken = (await cookies()).get('accessToken')?.value;
    const origin =
      (await headers()).get('origin') || (await headers()).get('referer') || '';

    const isAllowed = ALLOWED_ORIGINS.some((allowedOrigin) =>
      origin.startsWith(allowedOrigin)
    );

    if (!isAllowed) {
      throw new HandleServerInternalErrors(403, 'Access denied');
    }

    return axios.create({
      baseURL: process.env.API_BASE_URL,
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    });
  } catch (error) {
    throw error instanceof HandleServerInternalErrors
      ? error
      : new HandleServerInternalErrors(500, 'Internal server error');
  }
}

export async function createServerApiAxios(): Promise<AxiosInstance> {
  try {
    const accessToken = (await cookies()).get('accessToken')?.value;

    return axios.create({
      baseURL: process.env.API_BASE_URL,
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    });
  } catch (error) {
    console.error('createServerApiAxios error:', error);

    return axios.create({
      baseURL: process.env.API_BASE_URL,
    });
  }
}
