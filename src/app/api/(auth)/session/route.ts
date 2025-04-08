import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import prisma from '@/shared/lib/prisma';
import { signJWT } from '@/shared/lib';
import {
  encodedAccessSecret,
  EXPIRES_HOURS_ACCESS,
  serverMessages,
  statusCodes,
} from '@/shared/config';

const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = statusCodes;
const { NO_SESSION, INVALID_SESSION, SERVER_ERROR } = serverMessages;

export async function GET() {
  try {
    const sessionId = (await cookies()).get('session_id')?.value;

    if (!sessionId) {
      return NextResponse.json({ error: NO_SESSION }, { status: UNAUTHORIZED });
    }

    const session = await prisma.refreshToken.findUnique({
      where: { sessionId },
      select: { userId: true, expiresAt: true },
    });

    if (!session || new Date(session.expiresAt) < new Date()) {
      return NextResponse.json({ error: INVALID_SESSION }, { status: UNAUTHORIZED });
    }

    const accessToken = await signJWT({
      payload: { userId: session.userId },
      expiration: EXPIRES_HOURS_ACCESS,
      secret: encodedAccessSecret,
    });

    return NextResponse.json({
      accessToken,
      userId: session.userId,
    });
  } catch (error) {
    return NextResponse.json({ error: SERVER_ERROR }, { status: INTERNAL_SERVER_ERROR });
  }
}
