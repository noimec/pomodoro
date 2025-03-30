import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { PublicPaths, publicPaths, serverMessages, statusCodes } from './shared/config';

const { UNAUTHORIZED } = statusCodes;
const { AUTH_REQUIRED, INVALID_TOKEN } = serverMessages;
const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const headersToken = req.headers.get('Authorization')?.replace('Bearer ', '');
  const cookiesToken = req.cookies.get('token')?.value;
  const pathName = req.nextUrl.pathname as PublicPaths;
  const token = headersToken || cookiesToken;
  const loginUrl = new URL('/login', req.url);

  const isPublicPath = publicPaths.includes(pathName);

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathName.startsWith('/api/')) {
      return NextResponse.json({ message: AUTH_REQUIRED }, { status: UNAUTHORIZED });
    }
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    const userId = payload.userId as string;
    req.headers.set('userId', userId);

    return NextResponse.next();
  } catch (error) {
    if (pathName.startsWith('/api/')) {
      return NextResponse.json({ message: INVALID_TOKEN }, { status: UNAUTHORIZED });
    }
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/timer/:path*',
    '/api/tasks/:path*',
  ],
};
