import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { id, songId } = await req.json();

  try {
    const axios = await createServerInternalAxios();
    const res = await axios.post(`/playlists/${id}/songs`, {
      songId,
    });

    const { playlistId } = res.data.data;
    const response = NextResponse.json({ playlistId });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
