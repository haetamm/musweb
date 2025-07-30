import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const { id, songId } = await req.json();

  try {
    const axios = await createServerInternalAxios();
    const res = await axios.delete(`/playlists/${id}/songs`, {
      data: { songId },
    });

    const { message } = res.data;
    const response = NextResponse.json({ message });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
