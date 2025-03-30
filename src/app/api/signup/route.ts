import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

import { PrismaClient } from '@prisma/client';
import { COOKIES_HOURS_ACCESS, COOKIES_HOURS_REFRESH, EXPIRES_HOURS_ACCESS, EXPIRES_HOURS_REFRESH, serverMessages, statusCodes } from '@/shared/config';

import { ErrorResponse, UserResponse } from '../types';

const { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR, CREATED } = statusCodes;
const { FIELDS_REQUIRED, USER_EXISTS, SUCCESS_REGISTRATION, SERVER_ERROR } = serverMessages;
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const accessSecret = new TextEncoder().encode(ACCESS_SECRET);
const refreshSecret = new TextEncoder().encode(REFRESH_SECRET);
const expiresAtRefresh = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const db = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse<UserResponse | ErrorResponse>> {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ message: FIELDS_REQUIRED }, { status: BAD_REQUEST });
    }

    const existingUser = await db.user.findUnique({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ message: USER_EXISTS }, { status: CONFLICT });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: { username, password: hashedPassword },
    });

    const accessToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(EXPIRES_HOURS_ACCESS)
      .sign(accessSecret);

    const refreshToken = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(EXPIRES_HOURS_REFRESH)
      .sign(refreshSecret);

    const filteredUser = { id: user.id, username: user.username };

    const response = NextResponse.json(
      { message: SUCCESS_REGISTRATION, filteredUser },
      { status: CREATED },
    );

    await db.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: expiresAtRefresh,
        ipAddress: req.headers.get('x-real-ip'),
        userAgent: req.headers.get('user-agent') || '',
      }
    })

    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: 'strict',
      maxAge: COOKIES_HOURS_ACCESS
    });

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: 'strict',
      maxAge: COOKIES_HOURS_REFRESH
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: SERVER_ERROR }, { status: INTERNAL_SERVER_ERROR });
  }
}
