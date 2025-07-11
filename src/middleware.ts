import { urlPage } from '@/utils/constans';
import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = [urlPage.PLAYLIST, urlPage.LIBRARY];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !accessToken) {
    const loginUrl = new URL(urlPage.HOME, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/playlist/:path*', '/you/:path*'],
};
