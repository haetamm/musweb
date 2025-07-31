import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const body = await req.json();

  try {
    const { id, ...updateData } = body;
    const axios = await createServerInternalAxios();
    const res = await axios.put(`/playlists/${id}`, updateData);
    const { message } = res.data;
    const response = NextResponse.json({ message });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
