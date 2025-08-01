import { NextResponse } from 'next/server';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';

export async function POST() {
  try {
    const axios = await createServerInternalAxios();
    const res = await axios.get('/users/me');
    const { user } = res.data.data;
    const response = NextResponse.json({ user });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
