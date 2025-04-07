import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/shared/lib/prisma';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('userId');
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const stats = await prisma.stat.findMany({
    where: { userId },
    orderBy: { timestamp: 'desc' },
  });

  return NextResponse.json(stats);
}
