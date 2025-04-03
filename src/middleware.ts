import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';

import {
  COOKIES_HOURS_ACCESS,
  EXPIRES_HOURS_ACCESS,
  PublicPaths,
  publicPaths,
  serverMessages,
  statusCodes,
} from '@/shared/config';

const { UNAUTHORIZED } = statusCodes;
const { AUTH_REQUIRED, INVALID_TOKEN, MISSING_SECRETS, INVALID_USER_IN_TOKEN } = serverMessages;
const ACCESS_SECRET = process.env.ACCESS_SECRET || '';
const REFRESH_SECRET = process.env.REFRESH_SECRET || '';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error(MISSING_SECRETS);
}

const encoder = new TextEncoder();
const accessSecret = encoder.encode(ACCESS_SECRET);
const refreshSecret = encoder.encode(REFRESH_SECRET);

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;
  const pathName = req.nextUrl.pathname as PublicPaths;
  const loginUrl = new URL('/login', req.url);
  const isPublicPath = publicPaths.includes(pathName);

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken, accessSecret);

      const userId = typeof payload.userId === 'string' ? payload.userId : null;
      if (!userId) throw new Error(INVALID_USER_IN_TOKEN);

      req.headers.set('userId', userId);

      return NextResponse.next();
    } catch (error) {}
  }

  if (!refreshToken) {
    return pathName.startsWith('/api/')
      ? NextResponse.json({ message: AUTH_REQUIRED }, { status: UNAUTHORIZED })
      : NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(refreshToken, refreshSecret);

    const userId = typeof payload.userId === 'string' ? payload.userId : null;
    if (!userId) throw new Error(INVALID_USER_IN_TOKEN);

    const newAccessToken = await new SignJWT({ userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(EXPIRES_HOURS_ACCESS)
      .sign(encoder.encode(ACCESS_SECRET));

    const response = NextResponse.next();
    response.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: 'strict',
      maxAge: COOKIES_HOURS_ACCESS,
    });

    req.headers.set('userId', userId);

    return response;
  } catch (error) {
    return pathName.startsWith('/api/')
      ? NextResponse.json({ message: INVALID_TOKEN }, { status: UNAUTHORIZED })
      : NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/timer/:path*',
    '/api/tasks/:path*',
  ],
};
