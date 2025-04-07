import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

import { encodedAccessSecret } from '@/shared/config';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(accessToken, encodedAccessSecret);
    const userId = typeof payload.userId === 'string' ? payload.userId : null;

    if (!userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.json({ userId });
  } catch (error) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
