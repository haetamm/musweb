import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  try {
    const axios = await createServerInternalAxios();
    const res = await axios.get(`/playlists/${id}/activities`);
    const { playlist } = res.data.data;
    const response = NextResponse.json({ playlist });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
