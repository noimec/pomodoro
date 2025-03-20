import { NextRequest, NextResponse } from 'next/server';

import { statusCodes, serverMessages } from '@/shared/config';

const { SUCCESS } = statusCodes;
const { SUCCESS_LOGOUT } = serverMessages;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const response = NextResponse.json({ message: SUCCESS_LOGOUT }, { status: SUCCESS });

  response.cookies.set('token', '', {
    maxAge: 0,
    httpOnly: true,
    path: '/',
    secure: IS_PRODUCTION,
    sameSite: 'strict',
  });

  return response;
}
