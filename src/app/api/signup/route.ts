import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

import { PrismaClient } from '@prisma/client';
import { COOKIES_HOURS, EXPIRES_HOURS, serverMessages, statusCodes } from '@/shared/config';

import { ErrorResponse, UserResponse } from '../types';

const { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR, CREATED } = statusCodes;
const { FIELDS_REQUIRED, USER_EXISTS, SUCCESS_REGISTRATION, SERVER_ERROR } = serverMessages;
const JWT_SECRET = process.env.JWT_SECRET;
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

    const secret = new TextEncoder().encode(JWT_SECRET);

    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(EXPIRES_HOURS)
      .sign(secret);

    const filteredUser = { id: user.id, username: user.username };

    const response = NextResponse.json(
      { message: SUCCESS_REGISTRATION, filteredUser },
      { status: CREATED },
    );

    response.cookies.set('token', token, {
      maxAge: COOKIES_HOURS,
      httpOnly: true,
      path: '/',
      secure: IS_PRODUCTION,
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: SERVER_ERROR }, { status: INTERNAL_SERVER_ERROR });
  }
}
