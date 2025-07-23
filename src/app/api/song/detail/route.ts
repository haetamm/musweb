import { NextRequest, NextResponse } from 'next/server';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body.id);
  try {
    const axios = await createServerInternalAxios();
    const res = await axios.get(`/songs/${body.id}`);
    const { song } = res.data.data;
    const response = NextResponse.json({ song });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
