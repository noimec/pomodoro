import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import {
  ACCESS_SECRET,
  authSchema,
  COOKIES_HOURS_ACCESS,
  COOKIES_HOURS_REFRESH,
  encodedAccessSecret,
  encodedRefreshSecret,
  EXPIRES_HOURS_ACCESS,
  EXPIRES_HOURS_REFRESH,
  expiresRefreshDate,
  REFRESH_SECRET,
  serverMessages,
  statusCodes,
} from '@/shared/config';
import prisma from '@/shared/lib/prisma';
import { setCookies, signJWT } from '@/shared/lib';

import { ErrorResponse, UserResponse } from '../../types';

const { UNAUTHORIZED, INTERNAL_SERVER_ERROR, SUCCESS, BAD_REQUEST } = statusCodes;
const { INCORRECT_DATA, SERVER_ERROR, SUCCESS_LOGIN, MISSING_SECRETS } = serverMessages;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error(MISSING_SECRETS);
}

export async function POST(req: NextRequest): Promise<NextResponse<UserResponse | ErrorResponse>> {
  try {
    const getUserIp =
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      'unknown';
    const getUserAgent = req.headers.get('user-agent') || '';

    const { username, password } = authSchema.parse(await req.json());

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: INCORRECT_DATA }, { status: UNAUTHORIZED });
    }

    const accessToken = await signJWT({
      payload: { userId: user.id },
      expiration: EXPIRES_HOURS_ACCESS,
      secret: encodedAccessSecret,
    });
    const refreshToken = await signJWT({
      payload: { userId: user.id },
      expiration: EXPIRES_HOURS_REFRESH,
      secret: encodedRefreshSecret,
    });

    const existingSession = req.cookies.get('session_id')?.value;
    if (existingSession) {
      await prisma.refreshToken.deleteMany({
        where: { sessionId: existingSession, userId: user.id },
      });
    }

    const createdRefreshToken = await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: expiresRefreshDate,
        ipAddress: getUserIp,
        userAgent: getUserAgent,
      },
      select: {
        sessionId: true,
      },
    });

    const filteredUser = { id: user.id, username: user.username };
    const response = NextResponse.json(
      { message: SUCCESS_LOGIN, filteredUser },
      { status: SUCCESS },
    );

    setCookies({
      key: 'access_token',
      response: response,
      maxAge: COOKIES_HOURS_ACCESS,
      token: accessToken,
    });
    setCookies({
      key: 'session_id',
      response: response,
      maxAge: COOKIES_HOURS_REFRESH,
      token: createdRefreshToken.sessionId,
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);

    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0].message;
      return NextResponse.json({ message: errorMessage }, { status: BAD_REQUEST });
    }

    return NextResponse.json({ message: SERVER_ERROR }, { status: INTERNAL_SERVER_ERROR });
  }
}
