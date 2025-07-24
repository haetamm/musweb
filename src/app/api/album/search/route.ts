import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { title } = body;
    const axios = await createServerInternalAxios();
    const res = await axios.get(`/albums?title=${title}&page=1&limit=100`);
    const { albums } = res.data.data;
    const response = NextResponse.json({ albums });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
