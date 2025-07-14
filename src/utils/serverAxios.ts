import axios, { AxiosInstance } from 'axios';
import { cookies, headers } from 'next/headers';
import { HandleApiErrors } from './handleApiErrors';

const ALLOWED_ORIGINS = ['http://localhost:3000'];

export async function createServerInternalAxios(): Promise<AxiosInstance> {
  try {
    const accessToken = (await cookies()).get('accessToken')?.value;
    const origin =
      (await headers()).get('origin') || (await headers()).get('referer') || '';

    const isAllowed = ALLOWED_ORIGINS.some((allowedOrigin) =>
      origin.startsWith(allowedOrigin)
    );

    if (!isAllowed) {
      throw new HandleApiErrors(403, 'Access denied: origin not allowed');
    }

    return axios.create({
      baseURL: process.env.API_BASE_URL,
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    });
  } catch (error) {
    throw error instanceof HandleApiErrors
      ? error
      : new HandleApiErrors(500, 'Internal server error');
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
