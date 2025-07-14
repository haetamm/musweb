import { HandleApiErrors } from '@/utils/handleApiErrors';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const axios = await createServerInternalAxios();
    const res = await axios.post('/authentications/google', body);
    const { accessToken, refreshToken } = res.data.data;
    const response = NextResponse.json({ accessToken, refreshToken });
    return response;
  } catch (error: any) {
    return HandleApiErrors.toNextResponse(error);
  }
}
