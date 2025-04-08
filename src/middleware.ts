import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

import {
  ACCESS_SECRET,
  COOKIES_HOURS_ACCESS,
  encodedAccessSecret,
  PublicPaths,
  publicPaths,
  serverMessages,
  statusCodes,
} from '@/shared/config';
import { setCookies, clearCookies } from './shared/lib';

const { UNAUTHORIZED } = statusCodes;
const { AUTH_REQUIRED, MISSING_SECRETS, INVALID_USER_IN_TOKEN } = serverMessages;

if (!ACCESS_SECRET) {
  throw new Error(MISSING_SECRETS);
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const pathName = req.nextUrl.pathname as PublicPaths;
  const loginUrl = new URL('/login', req.url);

  const isPublicPath = publicPaths.includes(pathName);
  if (isPublicPath) {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const sessionId = cookieStore.get('session_id')?.value;

  if (!accessToken && !sessionId) {
    return handleUnauthorized(req, pathName, loginUrl);
  }

  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken, encodedAccessSecret);
      const userId = typeof payload.userId === 'string' ? payload.userId : null;

      if (!userId) throw new Error(INVALID_USER_IN_TOKEN);

      req.headers.set('userId', userId);
      return NextResponse.next();
    } catch (error) {
      if (!sessionId) {
        return handleUnauthorized(req, pathName, loginUrl);
      }
    }
  }

  try {
    const sessionCheckUrl = new URL('/api/session', req.url);
    const checkResponse = await fetch(sessionCheckUrl, {
      headers: { Cookie: req.headers.get('Cookie') || '' },
    });

    if (!checkResponse.ok) {
      clearCookies();
      return handleUnauthorized(req, pathName, loginUrl);
    }

    const { accessToken: newAccessToken, userId } = await checkResponse.json();

    const response = NextResponse.next();
    setCookies({
      key: 'access_token',
      response: response,
      maxAge: COOKIES_HOURS_ACCESS,
      token: newAccessToken,
    });

    req.headers.set('userId', userId);
    return response;
  } catch (error) {
    clearCookies();
    return handleUnauthorized(req, pathName, loginUrl);
  }
}

function handleUnauthorized(req: NextRequest, pathName: string, loginUrl: URL) {
  const response = pathName.startsWith('/api/')
    ? NextResponse.json({ message: AUTH_REQUIRED }, { status: UNAUTHORIZED })
    : NextResponse.redirect(loginUrl);

  clearCookies(response);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/session).*)',
    '/api/timer/:path*',
    '/api/tasks/:path*',
    '/api/user',
  ],
};
