import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import prisma from '@/shared/lib/prisma';
import { statusCodes, serverMessages } from '@/shared/config';
import { clearCookies } from '@/shared/lib';

const { SUCCESS } = statusCodes;
const { SUCCESS_LOGOUT } = serverMessages;

export async function POST(): Promise<NextResponse<{ message: string }>> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id')?.value;

    if (sessionId) {
      await prisma.refreshToken.deleteMany({
        where: { sessionId },
      });
    }

    const response = NextResponse.json({ message: SUCCESS_LOGOUT }, { status: SUCCESS });

    clearCookies(response);

    return response;
  } catch (error) {
    const response = NextResponse.json({ message: SUCCESS_LOGOUT }, { status: SUCCESS });

    clearCookies(response);

    return response;
  }
}
