import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const body = await req.json();

  try {
    const axios = await createServerInternalAxios();
    const res = await axios.put(`/songs/${body.id}`, body);
    const { song } = res.data.data;
    const response = NextResponse.json({ song });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
