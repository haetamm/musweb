import { NextResponse } from 'next/server';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { cookies } from 'next/headers';
import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';

export async function DELETE() {
  try {
    const axios = await createServerInternalAxios();
    const refreshToken = (await cookies()).get('refreshToken')?.value;
    await axios.delete('/authentications', { data: { refreshToken } }); // panggil backend logout
    const res = NextResponse.json({ message: 'Logged out' });
    return res;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
