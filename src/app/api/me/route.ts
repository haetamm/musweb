import { NextResponse } from 'next/server';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { HandleApiErrors } from '@/utils/handleApiErrors';

export async function POST() {
  try {
    const axios = await createServerInternalAxios();
    const res = await axios.get('/users');
    const { user } = res.data.data;
    const response = NextResponse.json({ user });
    return response;
  } catch (error: any) {
    return HandleApiErrors.toNextResponse(error);
  }
}
