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

import { ErrorResponse, UserResponse } from '../../types';
import prisma from '@/shared/lib/prisma';
import { setCookies, signJWT } from '@/shared/lib';

const { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR, CREATED } = statusCodes;
const { USER_EXISTS, SUCCESS_REGISTRATION, SERVER_ERROR, MISSING_SECRETS } = serverMessages;

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

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ message: USER_EXISTS }, { status: CONFLICT });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

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
      { message: SUCCESS_REGISTRATION, filteredUser },
      { status: CREATED },
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
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0].message;
      return NextResponse.json({ message: errorMessage }, { status: BAD_REQUEST });
    }

    return NextResponse.json({ message: SERVER_ERROR }, { status: INTERNAL_SERVER_ERROR });
  }
}
