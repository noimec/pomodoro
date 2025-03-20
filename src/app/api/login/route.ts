import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

import { PrismaClient } from '@prisma/client';
import { COOKIES_HOURS, EXPIRES_HOURS, serverMessages, statusCodes } from '@/shared/config';

import { ErrorResponse, UserResponse } from '../types';

const { CONFLICT, INTERNAL_SERVER_ERROR, SUCCESS } = statusCodes;
const { INCORRECT_DATA, SERVER_ERROR, SUCCESS_LOGIN } = serverMessages;
const JWT_SECRET = process.env.JWT_SECRET;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const db = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse<UserResponse | ErrorResponse>> {
  const { username, password } = await req.json();

  const user = await db.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: INCORRECT_DATA }, { status: CONFLICT });
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);

    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(EXPIRES_HOURS)
      .sign(secret);

    const filteredUser = { id: user.id, username: user.username };

    const response = NextResponse.json(
      { message: SUCCESS_LOGIN, filteredUser, token },
      { status: SUCCESS },
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: COOKIES_HOURS,
      path: '/',
      secure: IS_PRODUCTION,
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: SERVER_ERROR }, { status: INTERNAL_SERVER_ERROR });
  }
}
