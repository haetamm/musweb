import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const axios = await createServerInternalAxios();
    const res = await axios.get('/playlists/all');
    const { playlists } = res.data.data;
    const response = NextResponse.json({ playlists });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
