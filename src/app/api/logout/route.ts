import { NextRequest, NextResponse } from 'next/server';

import { statusCodes, serverMessages } from '@/shared/config';
import prisma from '@/shared/lib/prisma';

const { SUCCESS } = statusCodes;
const { SUCCESS_LOGOUT } = serverMessages;

export async function POST(req: NextRequest): Promise<NextResponse<{ message: string }>> {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    if (refreshToken) {
      await prisma.refreshToken.delete({ where: { token: refreshToken } });
    }

    const response = NextResponse.json({ message: SUCCESS_LOGOUT }, { status: SUCCESS });
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: SUCCESS_LOGOUT }, { status: SUCCESS });
  }
}
