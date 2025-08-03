import { HandleServerInternalErrors } from '@/utils/handleServerInternalErrors';
import { createServerInternalAxios } from '@/utils/serverAxios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { name } = body;
    const axios = await createServerInternalAxios();
    const res = await axios.get(`/users?name=${name}`);
    const { users } = res.data.data;
    const response = NextResponse.json({ users });
    return response;
  } catch (error: any) {
    return HandleServerInternalErrors.toNextResponse(error);
  }
}
